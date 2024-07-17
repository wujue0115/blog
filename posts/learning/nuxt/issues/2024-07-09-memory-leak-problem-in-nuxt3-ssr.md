---
title: 在 Nuxt3 SSR 遇到 Memory leak 的問題與解決方法
description: 這篇文章是關於 Vue I18n 在 Nuxt3 SSR 發生 Memory leak 的問題，並且透過測試找到問題的原因，最後解決方法是改用 Nuxt 官方的 Nuxt I18n 模組。
date: 2024-07-09
lastUpdated: 2024-07-09
estimatedReadingTime: 5 min
tags:
  - Nuxt
  - SSR
  - Memory leak
  - i18n
  - Frontend
---

<p hidden>
前陣子在開發一個 Nuxt3 SSR 的專案，部署後發現伺服器記憶體使用量一直在上升，最後導致伺服器記憶體耗盡，得知問題的當下很納悶，因為專案裡沒有用什麼大量複雜的運算，也沒有用到什麼特別大的資料，而且我們沒有在 Nuxt 內寫後端的程式碼，所以可以確定是前端的問題，但到底是什麼原因造成的呢？這篇文章就是來分享並記錄一下遇到的問題和解決過程。
</p>

---

# 在 Nuxt3 SSR 遇到 Memory leak 的問題與解決方法

## 序
前陣子在開發一個 Nuxt3 SSR 的專案，部署後發現伺服器記憶體使用量一直在上升，最後導致伺服器記憶體耗盡，得知問題的當下很納悶，因為專案裡沒有用什麼大量複雜的運算，也沒有用到什麼特別大的資料，而且我們沒有在 Nuxt 內寫後端的程式碼，所以可以確定是前端的問題，但到底是什麼原因造成的呢？這篇文章就是來分享並記錄一下遇到的問題和解決過程。

## 解決過程
在稍微搜尋關鍵字後幸運的找到了一篇文章在講這個問題 ([The day I faced Nuxt 3 SSR Memory leak](https://medium.com/@gaetan.wichlacz/the-day-i-faced-nuxt-3-ssr-memory-leak-76990ed7edec))，在文中提到了造成此問題的諸多原因，而其中跟我們專案有關的問題就是 `i18n`！

在進入測試過程之前，我有重現 Minimal reproduction，讀者可以下載下來測試 ([Nuxt3 memory leak reproduction](https://codesandbox.io/p/devbox/nuxt3-memory-leak-reproduction-ng89j6))。

首先先來測試記憶體的問題，我們可以直接 build 專案然後在本地用 node 執行。

```bash
npm run build
node --inspect ./output/server/index.mjs
```

:::info 關於 --inspect
使用 `--inspect` 開啟 inspect 模式後就可以用 chrome 來檢查 node server 的記憶體使用等情況。
:::

接著可以打開 Chrome，並在網址列輸入 `chrome://inspect`，可以看到以下畫面。

<img src="/learning/nuxt/chrome-inspect.jpg" />

點擊 `inspect` 進入開發者工具，然後點擊 `Memory` 頁籤，可以看到記憶體使用情況。

<img src="/learning/nuxt/debug-page.jpg" />

接下來，如果我們用手動的方式去重整頁面太累了，這裡可以使用 [ab - Apache HTTP server benchmarking tool](https://httpd.apache.org/docs/2.4/programs/ab.html) 來測試，用來測試的指令如下：

```bash
ab -n 1000 -c 10 http://localhost:3000/
```

:::info 參數說明
- `-n` 表示總共發送的請求數量
- `-c` 表示一次會同時發送的請求數量

上面的指令表示總共發送 1000 個請求，每次同時發送 10 個請求 (所以會發送 100 次)。
:::

在發送的過程中，可以看到記憶體使用量一直在上升，發送完後可以點擊 `Take snapshot` 來記錄記憶體使用情況，以下是我連續發送了 3 次每次 1000 個請求的結果：

<img src="/learning/nuxt/memory-snapshot.jpg" />

可以看到記憶體使用量一直在上升，到最後就會導致 Memory leak。

:::details 關於其他檢查記憶體的方法
在查資料的過程中還有找到另外一個方法可以檢查記憶體使用情況 ([Potential memory leak on fresh nuxt 3 install #26405](https://github.com/nuxt/nuxt/issues/26405))，此方法是使用 [Nuxt app:rendered hook](https://nuxt.com/docs/api/advanced/hooks#app-hooks-runtime)，這個 hook 會在每次頁面渲染完後觸發，可以在這個 hook 裡面加上記憶體使用量的檢查，這樣就可以知道每次頁面渲染完後記憶體使用量的變化，程式碼如下 (如果不知道此程式碼放哪裡請看 [App Hooks (Runtime)](https://nuxt.com/docs/guide/going-further/hooks#app-hooks-runtime))：

```js
process.lastRequestMemoryUsed = -1;
process.requestsServed = 0;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:rendered', (renderContext) => {
    // Force Garbage Collection for consistency, more about that later
    global.gc();

    process.requestsServed++;

    // Get currently used memory in MB
    const currentMemory = process.memoryUsage().heapUsed / 1024 / 1024;

    let memoryUsed;
    if (process.lastRequestMemoryUsed > 0) {
        memoryUsed = currentMemory - process.lastRequestMemoryUsed;
    } else {
        memoryUsed = currentMemory;
    }
    process.lastRequestMemoryUsed = currentMemory;

    console.log(`===== REQUEST COMPLETED (${process.requestsServed}) =====`);
    console.log('Unreleased memory used in last request: ', memoryUsed);
    console.log('Total: ', currentMemory);
  })
})
```

記得在 run node server 時加上 `--expose-gc`，這樣才能使用 `global.gc()` 來強制執行 Garbage Collection。
```bash
node --expose-gc ./output/server/index.mjs
```
:::

在一開始的文章中有提到造成此問題的原因很多，他們先把所有頁面都刪除，只留下一個空白頁面以及插件模組相關的程式碼，然後再透過逐一刪除插件和模組來找出問題。
第一次他們發現是 `Vuetify` 的問題，在解決問題後卻又發現還有問題，而第二次他們發現是 `i18n` 的問題。

接下來我們來檢查一下剛剛記錄的 `Memory snapshot` 內容，也發現 `i18n` 真的很有可能是造成記憶體上升的原因。

<img src="/learning/nuxt/memory-snapshot-i18n.jpg" />

根據文章的內容加上我們的測試結果，幾乎可以確定我們所遇到的問題跟文章中提到的一樣。在文章中提到他們是使用 [Vue I18n](https://vue-i18n.intlify.dev/) 來做多語系的處理，解決方法則是改用 Nuxt 官方的 [Nuxt I18n](https://nuxt.com/modules/i18n) 模組。而我們專案也在改用 nuxt-i18n 後就解決這個問題了！

:::info 關於在 Nuxt 中使用 Vue I18n
其實在 `Vue I18n` 官網已經有推薦使用 `Nuxt I18n` 了 ([Nuxt 3 integration](https://vue-i18n.intlify.dev/guide/integrations/nuxt3.html))，如下圖。

<img src="/learning/nuxt/vue-i18n-nuxt3-integration.jpg" />
:::

## 結論

經歷了這次的問題後，以後在使用 Nuxt3 時會盡量使用官方的模組，避免遇到更多的問題，但有時也像第一篇文章所提到的，他們是直接在瀏覽器上搜尋模組，然後就直接安裝使用了，因此在使用其他模組時記得可以先去看看官方有沒有提供相關的模組。這次的問題如果不是剛好有人寫了文章，絕對會花更多時間在找問題，就像文章所說的一樣，一個一個模組和插件去排除測試，所以我寫了這篇文章來記錄這次的問題，希望也能幫助到有遇到相同問題的人。

## 參考資料

- [The day I faced Nuxt 3 SSR Memory leak](https://medium.com/@gaetan.wichlacz/the-day-i-faced-nuxt-3-ssr-memory-leak-76990ed7edec)
- [Potential memory leak on fresh nuxt 3 install #26405](https://github.com/nuxt/nuxt/issues/26405)
- [ab - Apache HTTP server benchmarking tool](https://httpd.apache.org/docs/2.4/programs/ab.html)
- [Vue I18n](https://vue-i18n.intlify.dev/)
- [Nuxt I18n](https://nuxt.com/modules/i18n)