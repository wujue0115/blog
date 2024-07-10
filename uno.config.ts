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

const transformValue = (value: string, unit: string) => {
  return unit ? value + unit : parseFloat(value) * 0.25 + "rem";
};

export default defineConfig({
  rules: [
    [
      /^object-(\d+)([px|\%]*)-(\d+)([px|\%]*)$/,
      (match) => ({
        "object-position": `${match[1]}${match[2]} ${match[3]}${match[4]}`,
      }),
    ],
    [
      /^(m|p)-(\d*\.?\d+)(px|em|ex|rem|%|vw|vh)?-(\d*\.?\d+)(px|em|ex|rem|%|vw|vh)?$/,
      (match) => ({
        [match[1] === "m" ? "margin" : "padding"]: `
          ${transformValue(match[2], match[3])}
          ${transformValue(match[4], match[5])}
        `,
      }),
    ],
  ],
  shortcuts: {
    "outline-base": "outline-1 outline-solid outline-#0006 dark:outline-#fff6",
    "chip-base":
      "rounded-full bg-[var(--vp-c-brand-soft)] text-base select-none",
    "btn-base":
      "chip-base hover:(outline-base animate-pulse-alt) cursor-pointer",
  },
  theme: {
    breakpoints: {
      sm: "576px",
      md: "768px",
      lg: "992px",
    },
  },
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
