import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wujue's blog",
  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }],
    // Google Analytics
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-MPYPZ0MSLM",
      },
    ],
    [
      "script",
      {},
      `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MPYPZ0MSLM');
      `,
    ],
    // Cloudflare Analytics
    [
      "script",
      {
        defer: "",
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": '{"token": "85d6ed7a2cbe45eca284dc0ddaaca257"}',
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: false,
    logo: {
      light: "/logo.svg",
      dark: "/logo-dark.svg",
    },
    nav: [
      {
        text: "所有文章",
        link: "/post-preview",
      },
      {
        text: "學習文章",
        link: "/learning/vue/2024-03-02-experience-in-developing-a-blog-with-vitepress",
      },
    ],
    sidebar: {
      "/learning/": [
        {
          text: "Vue",
          collapsed: false,
          items: [
            {
              text: "VitePress",
              collapsed: true,
              items: [
                {
                  text: "使用 VitePress 開發部落格的心得",
                  link: "/learning/vue/2024-03-02-experience-in-developing-a-blog-with-vitepress",
                },
              ],
            },
          ],
        },
        {
          text: "Data Structure & Algorithm",
          collapsed: false,
          items: [
            {
              text: "解題分享",
              collapsed: false,
              items: [
                {
                  text: "LeetCode",
                  collapsed: true,
                  items: [
                    {
                      text: "72. Edit Distance",
                      link: "/learning/data-structure-and-algorithm/problems/leetcode/2024-03-20-leetcode-72-edit-distance",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/wujue0115/blog" },
    ],

    search: {
      provider: "local",
    },
  },
  srcDir: "posts",
  vite: {
    plugins: [
      UnoCSS(),
      AutoImport({
        imports: ["vue"],
        dts: "../auto-imports.d.ts",
      }),
    ],
    ssr: {
      noExternal: ["super-typer", "wowfy"],
    },
  },
  markdown: {
    math: true,
  },
  sitemap: {
    hostname: "https://blog.wujue.dev",
  },
  lastUpdated: true,
  transformPageData(pageData) {
    pageData.frontmatter.head ??= [];
    const head = pageData.frontmatter.head;

    const canonicalUrl = `https://blog.wujue.dev/${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, ".html");

    // basic meta
    head.push([
      "meta",
      {
        name: "description",
        content: pageData.description,
      },
    ]);
    head.push(["link", { rel: "canonical", href: canonicalUrl }]);

    // og meta
    const ogMetaInfos = [
      {
        property: "og:title",
        content: `${pageData.title}${
          pageData.frontmatter.page === "home" ? "" : " | Wujue's blog"
        }`,
      },
      {
        property: "og:description",
        content: pageData.description,
      },
      {
        property: "og:site_name",
        content: "Wujue's blog",
      },
      {
        property: "og:image",
        content: "/og-image.png",
      },
      {
        property: "og:image:alt",
        content: "Wujue's blog - logo",
      },
      {
        property: "og:image:type",
        content: "image/png",
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:locale",
        content: "zh_TW",
      },
      {
        property: "og:url",
        content: canonicalUrl,
      },
      {
        property: "og:type",
        content: pageData.frontmatter.page ? "website" : "article",
      },
    ];

    if (!pageData.frontmatter.page) {
      ogMetaInfos.push({
        property: "article:published_time",
        content: pageData.frontmatter.date,
      });
      ogMetaInfos.push({
        property: "article:modified_time",
        content: pageData.frontmatter.lastUpdated,
      });
      ogMetaInfos.push({
        property: "article:author",
        content: "Wujue",
      });
      ogMetaInfos.push({
        property: "article:tag",
        content: pageData.frontmatter.tags,
      });
    }

    ogMetaInfos.forEach((metaInfo) => {
      head.push(["meta", metaInfo]);
    });
  },
});
