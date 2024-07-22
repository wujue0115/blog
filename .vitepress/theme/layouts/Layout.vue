<script lang="ts" setup>
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";

import VPNav from "vitepress/dist/client/theme-default/components/VPNav.vue";
import Home from "../pages/Home.vue";
import NotFound from "../pages/NotFound.vue";
import PostPreview from "../pages/PostPreview.vue";
import Ripple from "../components/Ripple.vue";
import DocBefore from "../layouts/DocBefore.vue";

import { useAnalytics } from "../composables/useAnalytics";
import { useStructuredData } from "../composables/useStructuredData";

const { Layout } = DefaultTheme;
const { isDark, page, frontmatter } = useData();
const { addAnalyticsScripts } = useAnalytics();
const {
  script: articleScript,
  addArticleScript,
  removeArticleScript,
} = useStructuredData();

const isHome = computed(() => frontmatter.value.page === "home");
const isNotFound = computed(() => page.value.isNotFound);
const isPostPreview = computed(() => frontmatter.value.page === "post-preview");
const isPost = computed(
  () => !isHome.value && !isNotFound.value && !isPostPreview.value
);

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
});

onMounted(() => {
  import.meta.env.PROD && setTimeout(addAnalyticsScripts, 5000);
});

watch(
  frontmatter,
  () => {
    removeArticleScript();

    if (!isPost.value) return;

    const articleData = {
      title: frontmatter.value.title + " | Wujue's Blog",
      datePublished: frontmatter.value.date,
      dateModified: frontmatter.value.lastUpdated,
      authorList: [
        {
          "@type": "Person",
          name: "Wujue",
          url: "https://github.com/wujue0115",
        },
      ],
    };
    addArticleScript(articleData);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <main>
    <template v-if="isHome || isNotFound || isPostPreview">
      <VPNav />
      <Ripple v-if="!isPostPreview" />
    </template>
    <Home v-if="isHome" />
    <NotFound v-else-if="isNotFound" />
    <PostPreview v-else-if="isPostPreview" />
    <Layout v-else>
      <template #doc-before><DocBefore /></template>
    </Layout>
  </main>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
