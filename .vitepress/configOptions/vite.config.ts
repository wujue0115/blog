import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";

export const config = {
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
};
