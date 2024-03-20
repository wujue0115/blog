<script lang="ts" setup>
import { useData } from "vitepress";
import { useDate } from "../composables/useDate";
import Chip from "../components/atoms/Chip.vue";

const { formatDate } = useDate();

const { frontmatter } = useData();
</script>

<template>
  <div
    class="flex flex-col-reverse items-end"
    md="flex-row justify-between items-center"
  >
    <div
      class="mt-3 self-center flex flex-wrap justify-start gap-2"
      md="self-center mt-0"
    >
      <Chip v-for="tag in frontmatter.tags" :key="tag">{{ tag }}</Chip>
    </div>
    <div text="left sm [var(--vp-c-text-2)]" whitespace-nowrap>
      <p flex items-center>
        <i
          class="i-material-symbols:event-note-outline-rounded"
          m="r-1"
          inline-block
        ></i
        >發布日期: {{ formatDate(frontmatter.date).string }}
      </p>
      <p flex items-center>
        <i
          class="i-material-symbols:event-available-outline-rounded"
          m="r-1"
          inline-block
        ></i
        >最後更新: {{ formatDate(frontmatter.lastUpdated).string }}
      </p>
      <p flex items-center>
        <i
          class="i-material-symbols:hourglass-bottom-rounded"
          m="r-1"
          inline-block
        ></i
        >閱讀時間: ~ {{ frontmatter.estimatedReadingTime }}
      </p>
    </div>
  </div>
</template>
../new
