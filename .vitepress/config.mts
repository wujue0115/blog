import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wujue's Blog",
  description: "Wujue's blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Examples", link: "/markdown-examples" }],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

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
      AutoImport({ imports: ["vue"], dts: "../auto-imports.d.ts" }),
    ],
    ssr: {
      noExternal: ["super-typer", "wowfy"],
    },
  },
});
