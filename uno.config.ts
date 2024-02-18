import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  rules: [
    [
      /^object-(\d+)([px|\%]*)-(\d+)([px|\%]*)$/,
      (match) => ({
        "object-position": `${match[1]}${match[2]} ${match[3]}${match[4]}`,
      }),
    ],
  ],
  shortcuts: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.25,
    }),
    presetTypography(),
    presetWebFonts(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
