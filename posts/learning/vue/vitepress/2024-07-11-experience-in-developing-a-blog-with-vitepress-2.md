---
title: 使用 VitePress 開發部落格的心得 2 - SEO 篇
description: 在上一篇文章中，我們介紹了如何使用 VitePress 快速建立一個部落格。這篇文章則是分享有關 SEO 的部分，添加了 Title、Description、Sitemap、Canonical URL、OG meta、Twitter cards meta、RSS 等等，透過這些方法來提升部落格在搜尋引擎中的排名。
date: 2024-07-11
lastUpdated: 2024-07-17
estimatedReadingTime: 8 min
tags:
  - Blog
  - VitePress
  - Vue
  - SEO
  - Frontend
---

<p hidden>
在上一篇文章中，我們介紹了如何使用 VitePress 快速建立一個部落格。這篇文章則是分享有關 SEO 的部分，添加了 Title、Description、Sitemap、Canonical URL、OG meta、Twitter cards meta、RSS 等等，透過這些方法來提升部落格在搜尋引擎中的排名。
</p>

---

# 使用 VitePress 開發部落格的心得 2 - SEO 篇

## 序

在上一篇文章中，我們介紹了如何使用 VitePress 快速建立一個部落格。這篇文章則是分享有關 SEO 的部分，添加了 Title、Description、Sitemap、Canonical URL、OG meta、Twitter cards meta、RSS 等等，透過這些方法來提升部落格在搜尋引擎中的排名。

## SEO (Search Engine Optimization)

SEO 中文叫做搜尋引擎最佳化。當開啟瀏覽器輸入關鍵字搜尋時，搜尋引擎會根據關鍵字的相關性，回傳相關的網頁給使用者。SEO 就是透過一些方法，提升網站在搜尋引擎中的排名，進而提高網站的曝光度。既然花了時間做部落格和寫文章，當然希望能夠被更多人看到，所以一些基本的 SEO 是肯定要做的。

## Title 和 Description

首先是最基本也是最重要的部分，就是 Title 和 Description。Title 是網頁的標題，Description 是網頁的描述。Title 和 Description 可以讓搜尋引擎更了解網頁的內容，使用者在搜尋關鍵字時也更容易找到這個網頁，同時也是使用者對網頁的第一印象，寫的越好越能吸引使用者點進進去看。

<img src="/learning/vue/title-and-description.jpg" alt="Title and description shown on the Google search page." />

在 VitePress 中，可以直接在文章的 [Frontmatter](https://vitepress.dev/reference/frontmatter-config) 中設定 Title 和 Description，VitePress 會自動將 Title 和 Description meta tag 加入到網頁 head 中。

```markdown:line-numbers
---
title: 使用 VitePress 開發部落格的心得 | Wujue's blog
description: 這篇文章主要是分享我使用 VitePress 開發部落格的心得，包括技術選擇、頁面開發等等。
---
```

寫完 Title 和 Description 之後，可以在瀏覽器中檢查網頁的 head，確認 Title 和 Description 是否正確顯示。

<img src="/learning/vue/title-and-description-in-head.jpg" alt="The title and description are shown in the DevTools HTML head." />

## Sitemap

Sitemap 是一個 XML 檔案，裡面包含了網站的所有頁面的 URL，可以讓搜尋引擎知道確保網站裡有哪些頁面 (更多資訊可閱讀 [Sitemap網站地圖是什麼？對SEO有幫助嗎？](https://www.yesharris.com/seo-basic/sitemap-seo/))。

VitePress config 提供了 [Sitemap](https://vitepress.dev/guide/sitemap-generation#sitemap-generation) 選項，讓我們可以很輕鬆的為部落格生成 Sitemap 檔案。

## Canonical URL

Canonical URL 是指網頁的主要 URL，當網頁有多個 URL 指向同一個內容時，為了避免 Googlebot 去檢索重複的內容，我們可以透過 Canonical URL 告訴搜尋引擎哪個 URL 是主要的 (更多資訊可閱讀 [如何使用 rel="canonical" 和其他方法指定標準網址](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?sjid=3358609976049657890-AP&hl=zh-tw))。

VitePress config 雖然沒有提供 Canonical URL 的選項，但可以透過 `transformPageData` hook 在生成網頁時，將 Canonical URL 加入到網頁的 head 中，而官網也有示範如何添加 Canonical URL ([Example: Adding a canonical URL <link>](https://vitepress.dev/reference/site-config#example-adding-a-canonical-url-link))。

## Open Graph protocol

Open Graph protocol 是一個由 Facebook 提出的規範，後來也被其他社群平台廣泛使用。透過添加 OG (Open Graph) meta tag 可以讓網頁在社群平台上更好的展示內容，包括標題、描述、圖片等等。

以下是最常用的三個 OG meta tag (其他 meta tag 請閱讀 [The Open Graph protocol](https://ogp.me/))：
- og:title: 網頁的標題
- og:description: 網頁的描述
- og:image: 網頁的圖片，尺寸建議 1200 x 630 pixels

設定了 OG meta tag 之後，當使用者分享網頁到社群平台時，平台會自動抓取 OG meta tag 的內容，展示在分享的內容中，如下圖分別是在 Facebook 和 Line 上分享的效果。

<div class="sm:flex">
  <img class="sm:w-1/2 object-contain" src="/learning/vue/facebook-og-meta.jpg" alt="The OG meta card shows on Facebook." />
  <img class="mt-4 object-contain" sm="mt-0 ml-4 w-1/2" src="/learning/vue/line-og-meta.jpg" alt="The OG meta card shows on Line." />
</div>

我在部落格所設定的 OG meta tag 都是透過 `transformPageData` hook 加入到網頁的 head 中的，`transformPageData` 的第一個參數可以設定頁面的 head 內容，如果要在 `Frontmatter` 中設定需要每個頁面去添加，所以我選擇統一在 `transformPageData` 中設定。

添加完 OG meta tag 並重新部署後，如果要檢查在社群平台是否正確顯示，以及想要清除社群平台對 OG meta tag 的快取，可以使用以下工具：
- Facebook: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)。
- Line: [LINE Page Poker](https://poker.line.naver.jp/)。

## Twitter Cards

Twitter cards 跟 Open Graph Protocol 類似，是由 Twitter 提出的規範，可以讓網頁在 Twitter 上更好的展示內容。這裡略過其他 meta tag，只介紹一個比較特別的 meta tag 就是 `twitter:card` (若想了解更多 meta tag 可閱讀 [Twitter Cards Getting Started Guide](https://developer.x.com/en/docs/twitter-for-websites/cards/guides/getting-started))。

`twitter:card` 有幾種不同的類型，最常用的是 `summary` 和 `summary_large_image`：
- `summary`: 顯示標題、描述和圖片。
- `summary_large_image`: 顯示標題和大圖片。

以下是 `summary_large_image` 的效果 (`summary` 效果我就不呈現了，因為要重新改掉部署最後再改回來，我懶:)，想知道的可以去 Google~)：

<img src="/learning/vue/twitter-card-summary-large-image.jpg" alt="The Twitter 'summary_large_image' card shows on X." />

同樣的，Twitter 也有提供檢查的工具 [Twitter Cards Validator](https://cards-dev.twitter.com/validator?)，但可惜的是預覽功能被移除了 (詳請閱 [Card Validator - preview removal](https://devcommunity.x.com/t/card-validator-preview-removal/175006))，所以只能透過發文來檢查效果了。

## RSS (Really Simple Syndication)

RSS 是指一種網頁內容的格式，可以讓使用者訂閱網站的內容，當網站有新的內容時，使用者可以透過 RSS 閱讀器收到通知，提升網站的曝光度 (更多關於 RSS 的好處可以閱讀 [RSS 與 SEO | Summer。桑莫。夏天](https://www.cythilya.tw/2017/03/28/rss-and-seo/))。

我參考了 [Vue.js blog](https://blog.vuejs.org/) 的 RSS 設定方式，使用 [jpmonette/feed](https://github.com/jpmonette/feed) 這個套件並透過 VitePress 的 [buildEnd](https://vitepress.dev/reference/site-config#buildend) hook 在部署時生成 RSS 檔案。

RSS feed 有很多種格式，例如 `RSS`、`Atom`、`JSON` 等等，根據 [What are the differences between RSS, ATOM, and JSON?](https://www.quora.com/What-are-the-differences-between-RSS-ATOM-and-JSON#:~:text=In%20conclusion%2C%20JSON%20is%20a,created%20for%20syndicating%20online%20content.) 的說明，我選擇使用 `Atom` 格式和 `JSON` 格式，前者為 `RSS` 的替代品且有更多的功能，後者則是一個新的 RSS feed 格式，因為是基於 JSON 格式，結構更為簡單，所以越來越多的網站也開始使用。

## 結論

這篇文章分享了一些基本的 SEO 技巧，在查找資料的過程學到了很多新知識，才發現 SEO 其實有很多技巧與細節，而且部署後要等待搜尋引擎的爬蟲去檢索，我的部落格大約等了 3 個月才可以在 Google 上搜尋到，真的是一個漫長的過程，最後希望讀者們可以透過這篇文章更了解 SEO。

## 參考資料

- [VitePress](https://vitepress.dev/)
- [Sitemap網站地圖是什麼？對SEO有幫助嗎？](https://www.yesharris.com/seo-basic/sitemap-seo/)
- [如何使用 rel="canonical" 和其他方法指定標準網址](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?sjid=3358609976049657890-AP&hl=zh-tw)
- [The Open Graph protocol](https://ogp.me/)
- [Twitter Cards Getting Started Guide](https://developer.x.com/en/docs/twitter-for-websites/cards/guides/getting-started)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LINE Page Poker](https://poker.line.naver.jp/)
- [Twitter Cards Validator](https://cards-dev.twitter.com/validator?)
- [Card Validator - preview removal](https://devcommunity.x.com/t/card-validator-preview-removal/175006)
- [RSS 與 SEO | Summer。桑莫。夏天](https://www.cythilya.tw/2017/03/28/rss-and-seo/)
- [Vue.js blog](https://blog.vuejs.org/)
- [jpmonette/feed](https://github.com/jpmonette/feed)
- [What are the differences between RSS, ATOM, and JSON?](https://www.quora.com/What-are-the-differences-between-RSS-ATOM-and-JSON#:~:text=In%20conclusion%2C%20JSON%20is%20a,created%20for%20syndicating%20online%20content.)