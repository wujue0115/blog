<script lang="ts" setup>
import type { TPost } from "../../types";
import Chip from "../atoms/Chip.vue";

const props = defineProps<{ post: TPost }>();
const { post } = toRefs(props);
</script>

<template>
  <div>
    <div flex="~ wrap" gap-3 items-start>
      <h2 text="24px" font-600>{{ post.title }}</h2>
      <div m="l-auto" text="left sm [var(--vp-c-text-2)]" leading="1em">
        <p flex items-center>
          <i
            class="i-material-symbols:event-note-outline-rounded"
            m="r-1"
            inline-block
          ></i>
          發布日期: {{ post.date.string }}
        </p>
        <p m="t-0.5em" flex items-center>
          <i
            class="i-material-symbols:event-available-outline-rounded"
            m="r-1"
            inline-block
          ></i>
          最後更新: {{ post.lastUpdated.string }}
        </p>
        <p m="t-0.5em" flex items-center>
          <i
            class="i-material-symbols:hourglass-bottom-rounded"
            m="r-1"
            inline-block
          ></i>
          閱讀時間: ~ {{ post.estimatedReadingTime }}
        </p>
      </div>
      <div flex="~ wrap" justify-start gap-2 w-full>
        <Chip v-for="tag in post.tags" :key="tag">
          {{ tag }}
        </Chip>
      </div>
    </div>
    <p class="text-multi-ellipsis" m="t-5" max-h-7.5em>
      {{ post.excerpt }}
    </p>
    <div m="t-5" flex justify-center>
      <a :href="post.url" btn-base p-1.5-4 flex items-center>
        閱讀更多
        <div class="i-material-symbols:book-5-outline-rounded" m="l-1"></div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.text-multi-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
</style>
