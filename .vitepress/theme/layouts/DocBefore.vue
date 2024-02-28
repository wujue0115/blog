<script lang="ts" setup>
import { useData } from "vitepress";
import { formatDate } from "../utils";

const { frontmatter } = useData();
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="self-end flex flex-wrap justify-center gap-2">
      <div
        class="rounded-full bg-[var(--vp-c-brand-soft)] px-3 py-0.5"
        v-for="tag in frontmatter.tags"
        :key="tag"
      >
        {{ tag }}
      </div>
    </div>
    <div class="text-left text-sm whitespace-nowrap">
      <p>發布時間: {{ formatDate(frontmatter.date).string }}</p>
      <p>最後更新: {{ formatDate(frontmatter.lastUpdated).string }}</p>
      <p>閱讀時間: ~ {{ frontmatter.estimatedReadingTime }}</p>
    </div>
  </div>
</template>
../new
