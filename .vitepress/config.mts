import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wujue's Blog",
  description: "Wujue's blog",
  head: [
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
          collapsed: true,
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
  sitemap: {
    hostname: "https://blog.wujue.dev",
  },
  lastUpdated: true,
  transformPageData(pageData, { siteConfig }) {
    pageData.frontmatter.head ??= [];
    const metas = [
      {
        name: "description",
        content: pageData.description,
      },
      {
        property: "og:title",
        content: pageData.title,
      },
      {
        property: "og:description",
        content: pageData.description,
      },
    ];

    metas.forEach((metaInfo) => {
      pageData.frontmatter.head.push(["meta", metaInfo]);
    });

    const canonicalUrl = `https://blog.wujue.dev/${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, ".html");

    pageData.frontmatter.head.push([
      "link",
      { rel: "canonical", href: canonicalUrl },
    ]);
  },
});
