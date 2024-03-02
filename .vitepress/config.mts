import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wujue's Blog",
  description: "Wujue's blog",
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
});
