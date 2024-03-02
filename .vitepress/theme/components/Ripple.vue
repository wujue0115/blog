<script lang="ts" setup>
import type { TRippleOptions } from "wowfy";
import { useData } from "vitepress";
import { Wowfy } from "wowfy";

const { isDark } = useData();

const wowfy = ref<Wowfy>();
const wowfyRef = ref<HTMLElement>();
const isLooping = ref(false);

const rippleAnimationLoop = () => {
  if (!isLooping.value) return;

  wowfy.value?.update("ripple", {
    background: isDark.value
      ? "radial-gradient(#fff3, #fff)"
      : "radial-gradient(#0003, #000)",
  });
  wowfyRef.value?.dispatchEvent(new Event("dblclick"));
  setTimeout(rippleAnimationLoop, 200);
};

const rippleInit = () => {
  const defaultOptions: TRippleOptions = {
    sizeRatio: 0.01,
    duration: "2s",
    event: "dblclick",
    maxCount: 20,
    position: "rd",
  };

  wowfy.value = new Wowfy(
    wowfyRef.value as HTMLElement,
    "ripple",
    defaultOptions
  );

  rippleAnimationLoop();
};

onMounted(() => {
  isLooping.value = true;
  rippleInit();
});

onUnmounted(() => {
  isLooping.value = false;
});
</script>

<template>
  <div class="fixed inset-0 z-9999 pointer-events-none">
    <div ref="wowfyRef" class="h-full"></div>
  </div>
</template>
