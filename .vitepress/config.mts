import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wujue's blog",
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
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
                      text: "32. Longest Valid Parentheses",
                      link: "/learning/data-structure-and-algorithm/problems/leetcode/2024-03-23-leetcode-32-longest-valid-parentheses",
                    },
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
  transformPageData(pageData) {
    pageData.frontmatter.head ??= [];
    const head = pageData.frontmatter.head;

    const canonicalUrl = `https://blog.wujue.dev/${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, ".html");
    const title = `${pageData.title}${
      pageData.frontmatter.page === "home" ? "" : " | Wujue's blog"
    }`;

    // basic meta
    head.push(["link", { rel: "canonical", href: canonicalUrl }]);

    // og meta
    const ogMetaInfos = [
      {
        property: "og:title",
        content: title,
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
        content: "https://blog.wujue.dev/og-image.png",
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

    // twitter meta
    const twitterMetaInfos = [
      {
        name: "twitter:title",
        content: title,
      },
      {
        name: "twitter:description",
        content: pageData.description,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:site",
        content: "@wujue0115",
      },
      {
        name: "twitter:image",
        content: "https://blog.wujue.dev/twitter-image.png",
      },
      {
        name: "twitter:image:alt",
        content: "Wujue's blog - logo",
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

    const metaInfos = [...ogMetaInfos, ...twitterMetaInfos];

    metaInfos.forEach((metaInfo) => {
      head.push(["meta", metaInfo]);
    });
  },
});
