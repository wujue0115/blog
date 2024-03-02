---
title: 使用 VitePress 開發部落格的心得
date: 2024-03-02
lastUpdated: 2024-03-02
estimatedReadingTime: 10 min
tags:
  - Blog
  - VitePress
  - Vue
  - Frontend
---

<p hidden>
學生時期就曾經想過要做一個自己的部落格，但那時被「口試」和「論文」這兩座大山壓著，所以沒什麼心力去實踐。畢業後行程也被我安排的很滿，工作、接案、學習、開發 Open Source 等等，直到去年底離職後才有比較空閒的時間。這段時間我查了一些資料，發現一篇文章叫做「[用 Nuxt Content 重寫我的部落格
](https://rock070.me/notes/vue/nuxt/2023-02-16-rebuild-my-blog)」，是一個很厲害的前端前輩寫的筆記，內容很精彩，也讓我燃起了做部落格的念頭，於是這個部落格就誕生了。
</p>

---

# 使用 VitePress 開發部落格的心得

## 序

學生時期就曾經想過要做一個自己的部落格，但那時被「口試」和「論文」這兩座大山壓著，所以沒什麼心力去實踐。畢業後行程也被我安排的很滿，工作、接案、學習、開發 Open Source 等等，直到去年底離職後才有比較空閒的時間。這段時間我查了一些資料，發現一篇文章叫做「[用 Nuxt Content 重寫我的部落格
](https://rock070.me/notes/vue/nuxt/2023-02-16-rebuild-my-blog)」，是一個很厲害的前端前輩寫的筆記，內容很精彩，讓我燃起了做部落格的念頭，於是這個部落格就誕生了。

## 需求分析

我對部落格的需求不高，只是想要一個簡單的部落格，可以寫文章、放一些筆記、分享一些心得。當然我還是想要能客製化一些東西，比如說主題、樣式，希望自己的部落格能有一些特色，所以我對部落格所使用的技術需求如下：
- 簡單易用
- 快速開發
- 靈活性高

## 技術選擇

我自己對 Vue 比較熟悉，所以希望部落格能夠使用 Vue 相關的框架來開發。在稍微查了一些資料後，有幾個選擇：
- [Docus](https://docus.dev/)
- [Astro](https://astro.build/)
- [VitePress](https://vitepress.dev/)

### Docus

Docus 是一個基於 [Nuxt Content](https://content.nuxt.com/) 所延伸出來的框架，並且提供了很多好用的 Components，比方說可以簡單的在 md 裡插入 [sandbox](https://docus.dev/api/components#sandbox) 或是 [影片播放器](https://docus.dev/api/components#videoplayer) 等方便的功能，但沒想到偶然得知了 Docus 的主要維護者已經沒有在維護此專案了 ([Issue #1016](https://github.com/nuxt-themes/docus/issues/1016))，因此我放棄了這個選擇。

### Astro

Astro 聽說是一個很優秀的框架，並且支援用 Vue、React、Svelte 等框架來開發 ([Add Integrations](https://docs.astro.build/en/guides/integrations-guide/))，另外在 Performance 方面表現的也非常好，總之是一個很厲害的框架，但那時考量到我對 Astro 不太熟悉，需要耗費一點心力和時間研究，我決定選擇曾經使用過的框架 - VitePress (以後有機會我還是會想研究 Astro)。

### VitePress

終於到了今天的主角 - VitePress，選擇 VitePress 的原因主要是我曾經使用過，是一個簡單好上手且開發快速的框架，上述技術需求分析已經符合兩點了，剩下就是靈活性的問題。首先 VitePress 可以在 md 裏面使用 [Vue SFC](https://vuejs.org/guide/scaling-up/sfc.html) ([Using Vue in Markdown](https://vitepress.dev/guide/using-vue))，這對於 Vue 開發者來說真的很方便，另外還提供 [Custom Theme](https://vitepress.dev/guide/custom-theme) 和 [Layout Slots](https://vitepress.dev/guide/extending-default-theme#layout-slots) 等方法，讓我們可以自由的客製化部落格樣式，這樣靈活性的需求也符合了，因此我最後選擇了 VitePress 來開發我的部落格。

## 頁面開發

為了讓部落格有自己的特色，我希望有些頁面能自己開發，所以我新增一些頁面，並且客製化了一些樣式。

### 首頁

一開始我只是想要在首頁放個 Avatar 和一些簡單的介紹，但後來想到如果能把自己曾經開發的 Open Source 加到首頁會不會更有趣，畢竟我開發了兩個套件都能在頁面上呈現，於是就開始開發首頁了。

#### Ripple 背景

背景我想使用我的套件 [Wowfy](https://wowfyjs.com/) 所提供的 [Ripple](https://wowfyjs.com/effects/ripple.html) 特效來呈現。

首先添加一個基本的 Ripple 特效：

```ts-vue:line-numbers
<script setup lang="ts">
import type { TRippleOptions } from "wowfy";
import { Wowfy } from "wowfy";

const wowfy = ref<Wowfy>();
const wowfyRef = ref<HTMLElement>();

const rippleInit = () => {
  // 設置 Ripple 的基本參數
  const defaultOptions: TRippleOptions = {
    sizeRatio: 0.01,   // Ripple 的大小比例 (相對於 Wowfy 內部所計算的大小)
    duration: "2s",    // Ripple 的持續時間
    event: "dblclick", // 連點兩下時觸發
    maxCount: 20,      // 最大同時存在的 Ripple 數量
    position: "rd",    // Ripple 的位置 ("rd" = "random")
  };

  // 初始化 Wowfy
  wowfy.value = new Wowfy(
    wowfyRef.value as HTMLElement, // 要套用特效的元素
    "ripple",                      // 特效名稱
    defaultOptions                 // 特效參數
  );
};

onMounted(() => {
  // 要等到元素渲染後才能初始化
  rippleInit();
});
</script>

<template>
  <div class="fixed inset-0 z-9999 pointer-events-none">
    <div ref="wowfyRef" class="h-full"></div>
  </div>
</template>
```

上述設定完成後就可以連擊兩下觸發 Ripple 特效了。

接下來，我想讓 Ripple 特效能夠自動被觸發，所以我寫了一個循環函數，並且利用 [dispatchEvent](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) 來觸發事件，這樣就能夠達到自動觸發的效果了。不過還有一點要注意，VitePress 能支援 dark mode 和 light mode，所以要根據目前的模式來改變 Ripple 的顏色 (可以透過 [useData](https://vitepress.dev/reference/runtime-api#usedata) 提供的 `isDark` 來取得目前的模式)。

```ts-vue:line-numbers
<script setup lang="ts">
import type { TRippleOptions } from "wowfy";
import { Wowfy } from "wowfy";
import { useData } from "vitepress"; // [!code highlight]

const { isDark } = useData(); // [!code highlight]

const wowfy = ref<Wowfy>();
const wowfyRef = ref<HTMLElement>();

const rippleAnimationLoop = () => {  // [!code highlight]
  // 更新 Ripple 的顏色 // [!code highlight]
  wowfy.value?.update("ripple", { // [!code highlight]
    // 根據目前的模式來改變 Ripple 的顏色 // [!code highlight]
    background: isDark.value // [!code highlight]
      ? "radial-gradient(#fff3, #fff)" // [!code highlight]
      : "radial-gradient(#0003, #000)", // [!code highlight]
  }); // [!code highlight]
  // 觸發事件 // [!code highlight]
  wowfyRef.value?.dispatchEvent(new Event("dblclick")); // [!code highlight]
  // 循環呼叫 // [!code highlight]
  setTimeout(rippleAnimationLoop, 200); // [!code highlight]
}; // [!code highlight]

const rippleInit = () => {
  ...
  rippleAnimationLoop(); // [!code highlight]
};

onMounted(() => {
  rippleInit();
});
</script>

<template>
  <div class="fixed inset-0 z-9999 pointer-events-none">
    <div ref="wowfyRef" class="h-full"></div>
  </div>
</template>
```

這樣就完成 Ripple 的背景特效了~

最後要注意在 `onUnmounted` 時清除特效，避免 memory leak。

```ts-vue:line-numbers
<script setup lang="ts">
...
const isLooping = ref(false); // [!code highlight]

const rippleAnimationLoop = () => {  
  if (!isLooping.value) return; // [!code highlight]
  ...
}; 

onMounted(() => {
  isLooping.value = true; // [!code highlight]
  rippleInit();
});

onUnmounted(() => {
  isLooping.value = false; // [!code highlight]
});
</script>
```

#### 打字效果

[Super-typer](https://github.com/wujue0115/super-typer) 是我開發的一個模擬打字套件，既然首頁有簡短的介紹，那就使用打字效果來呈現吧！

實作方法很簡單，直接看程式碼：

```ts-vue:line-numbers
<script lang="ts" setup>
import Typer from "super-typer";

const introRef = ref<HTMLElement>();
const isLooping = ref(false);

const typer = new Typer(
  { 
    speed: 70 // 速度參數 (字母間隔時間，單位：毫秒)
  },
  {
    // 當打字內容改變時觸發
    onChange(text) {
      // 更新內容在畫面上
      introRef.value && (introRef.value.innerText = text + "|");
    },
  }
);

const typeLoop = () => {
  // 關閉循環時重置打字效果
  if (!isLooping.value) {
    typer.reset();
    return;
  }

  // 開始觸發效果
  typer
    // 等待 300 毫秒
    .wait(300)
    // 打字效果
    .type("嗨！歡迎來到我的部落格！")
    .wait(800)
    .type("\n我是 Wujue，一位網頁前端工程師。")
    .wait(800)
    .type("\n在這裡我會分享一些學習筆記、技術研究、生活紀錄等文章。")
    .wait(800)
    .type("\n如果有任何問題歡迎聯繫我哦～")
    .wait(1500)
    // -1 為刪除所有內容 (設置當前命令速度為 10 毫秒)
    .backspace(-1, { speed: 10 })
    // 在最後一次命令且執行 onAfterChange (結束所有改動) 時循環呼叫
    .wait(500, {}, { onAfterChange: typeLoop });
};

onMounted(() => {
  isLooping.value = true;
  // 開始循環
  typeLoop();
});

onUnmounted(() => {
  isLooping.value = false;
});
</script>

<template>
  ...
  <p ref="introRef"></p>
  ...
</template>

```

這樣就完成了打字效果囉！到這裡首頁的特效就完成了！

### 文章頁

文章 Markdown 頁面樣式部分 VitePress 已經處理好了，其他部分我想要為每個文章頁面添加一些資訊，比如說文章標籤、日期。

#### frontmatter 資料定義

在每個文章的 Markdown 檔案裡，VitePress 提供了 [frontmatter](https://vitepress.dev/reference/frontmatter-config#frontmatter-config) 來定義一些文章的資訊。由於我之後想要新增`所有文章`的頁面，並且提供文章過濾功能，因此我需要為每篇文章添加一些基本資訊，以下是我定義的 frontmatter 資料 (以此文章為例)：

```md:line-numbers
---
<!-- 文章標題 -->
title: 使用 VitePress 開發部落格的心得
<!-- 發布日期 -->
date: 2024-03-01
<!-- 最後更新日期 -->
lastUpdated: 2024-03-01
<!-- 預估閱讀時間 -->
estimatedReadingTime: 20 min
<!-- 文章標籤 -->
tags:
  - Blog
  - VitePress
  - Vue
  - Frontend
---
```

#### 文章上方資訊

很多部落格文章上方都會呈現一些文章基本資訊，增加閱讀體驗，因此我想要在文章頁面上方添加一些資訊，比如說文章標籤、日期等等。

VitePress 的 `<Layout />` 提供了 [doc-before slot](https://vitepress.dev/guide/extending-default-theme#layout-slots) 讓我們可以在文章上方添加一些自定義的內容，因此我寫了一個 `DocBefore` 組件來呈現文章的基本資訊，包括文章標籤、發布日期、最後更新日期、預估閱讀時間。

### 所有文章

我認為一個部落格需要能讓讀者快速找到自己想要的文章，而透過標籤過濾和文章排序是一個非常有用的方法，所以此小節我主要會介紹這兩個功能的相關內容。

#### createContentLoader

在此頁面我們需要取得每個文章的基本資料 (標籤、日期等)，而 VitePress 提供的 [createContentLoader](https://vitepress.dev/guide/data-loading#createcontentloader) 能滿足我要的需求，此方法預設會輸出 `ContentData[]` 類型的資料 (每個文章的基本資訊，預設會提供 url、frontmatter)，在頁面可以透過 `import { data } from "..."` 來取得，詳細用法請參考官方文件。

另外此方法提供了 `transform` 的 option，可以自己處理資料的轉換 (詳細用法可以參考 [Vue.js blog](https://blog.vuejs.org/))，以下為我定義處理完的資料內容：

```ts:line-numbers
interface TPost {
  // 文章標題
  title: string;
  // 文章連結
  url: string;
  // 預估閱讀時間
  estimatedReadingTime?: string;
  // 發布日期
  date: {
    // 日期量值 (用來排序)
    time: number;
    // 字串值 (用來顯示)
    string: string;
  };
  // 最後更新日期
  lastUpdated: {
    // 日期量值 (用來排序)
    time: number;
    // 字串值 (用來顯示)
    string: string;
  };
  // 文章摘要
  excerpt: string | undefined;
  // 文章標籤
  tags?: string[];
  // 所有文章標籤
  allTags?: string[];
}
```

上述資料關於時間的部分，`time` 是使用 `Date` 物件的 [getTime](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime) 方法取得的時間量值，`string` 是使用 [toLocaleDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) 取得的日期字串值。另外你可能會注意到 `excerpt`，這是根據 `createContentLoader` 提供的 `excerpt` option 取得的文章摘要。

::: info excerpt option
將 excerpt option 設定為 true 之後，transform 的 raw 參數中每篇文章會包含 excerpt 屬性，此 excerpt 為文章中 frontmatter 之後且 `---` 之前的內容，以下為舉例：

```md:line-numbers
---
<!-- 這裡是 frontmatter 內容 -->
---
<!-- 這裡是 excerpt 內容 --> // [!code highlight]
---
<!-- 這裡是文章內容 -->
```
:::

介紹完資料格式後，接下來我們要處理資料的轉換，簡單來說就是將 `ContentData[]` 轉換成 `TPost[]`，這裡就不贅述了，直接附上處理資料的程式碼：

```ts:line-numbers
export default createContentLoader("posts/**/*.md", {
  // 是否取得文章摘要
  excerpt: true,
  transform(raw): TPost[] {
    // 過濾掉非文章的頁面資料
    const posts = raw.filter(({ frontmatter }) => !frontmatter.page);
    // 取得所有文章標籤
    const allTags = getAllTags(raw);

    return posts.map(({ url, frontmatter, excerpt }) => ({
      title: frontmatter.title,
      url,
      // 由於我的文章 excerpt 是用 html element 包起來的 (為了不顯示在頁面上)
      // 所以要處理成純文字內容
      excerpt: excerpt ? excerpt.split("\n")[1] : undefined,
      estimatedReadingTime: frontmatter.estimatedReadingTime,
      // 轉換發布日期格式 (轉成 { time: number, string: string } 格式)
      date: formatDate(frontmatter.date),
      // 同上
      lastUpdated: formatDate(frontmatter.lastUpdated),
      tags: transformTags(frontmatter.tags),
      allTags,
    }));
  },
});
```

#### 標籤過濾

根據上述資料格式，可以取得所有文章的標籤，再來就是實作 UI 和邏輯了。UI 部分由於是自己的部落格，所以打算自己刻 UI component，有興趣的人直接去看原始碼吧。過濾標籤的部分採用 `and` 邏輯，以下是程式碼：

```ts:line-numbers
const filterPosts = (_posts: TPost[]) => {
  if (!tags.value.length) return _posts;

  return _posts.filter((post) =>
    tags.value.every((tag) => post.tags.includes(tag))
  );
};
```

#### 文章排序

排序部分目前是依據 `發布日期` 和 `最後更新日期` 來排序，分別有 `新到舊` 和 `舊到新` 兩種排序方式，所以總共有四種排序方式。實作時利用 `transform` 時處理的 `日期量值` 來比較日期先後，以下是程式碼：

```ts:line-numbers
const sortPosts = (_posts: TPost[]) => {
  const compares = {
    // 發布日期: 新到舊
    publishDateNewToOld: (a: TPost, b: TPost) => b.date.time - a.date.time,
    // 發布日期: 舊到新
    publishDateOldToNew: (a: TPost, b: TPost) => a.date.time - b.date.time,
    // 最後更新日期: 新到舊
    lastUpdatedNewToOld: (a: TPost, b: TPost) => b.lastUpdated.time - a.lastUpdated.time,
    // 最後更新日期: 舊到新
    lastUpdatedOldToNew: (a: TPost, b: TPost) => a.lastUpdated.time - b.lastUpdated.time,
  };

  return _posts.sort(compares[sortType.value]);
};
``` 

## 結論

這次 Blog 開發心得大致上就是這樣了，篇幅不多但實際上花了不少時間，除了熟悉 VitePress 功能，我覺得最花時間的就是開發 UI 了，而且也是第一次使用 [UnoCSS](https://unocss.dev/) 來開發 (以前很少使用 Atomic CSS，花了一點時間習慣)。再次感謝 [Rock](https://rock070.me/) 的文章，讓我有開發部落格的動力！未來有想到我還會繼續開發部落格，也會陸續更新一些文章，希望能夠幫助到一些人。有興趣的人也可以來看看部落格的原始碼，歡迎提出建議！最後，感謝你的閱讀！

## 參考資料

- [VitePress](https://vitepress.dev/)
- [UnoCSS](https://unocss.dev/)
- [Vue.js blog](https://blog.vuejs.org/)
- [Nuxt vs VitePress vs Astro](https://www.vuemastery.com/blog/nuxt-vs-vitepress-vs-astro/)
- [用 Nuxt Content 重寫我的部落格](https://rock070.me/notes/vue/nuxt/2023-02-16-rebuild-my-blog)
- [Wowfy.js](https://wowfyjs.com/)
- [Super-typer.js](https://github.com/wujue0115/super-typer)