<script lang="ts" setup>
import type { TSortType } from "../types";

import Divider from "../components/atoms/Divider.vue";
import TagPanel from "../components/organisms/PostPreviewTagPanel.vue";
import SortPanel from "../components/organisms/PostPreviewSortPanel.vue";
import PostList from "../components/organisms/PostList.vue";

const selectedTags = ref<string[]>([]);
const isOpenTagSelectorPanel = ref(false);

const selectedSortType = ref<TSortType>("publishDateNewToOld");
const isOpenSortSelectorPanel = ref(false);

const handleCloseSelectorPanel = () => {
  isOpenTagSelectorPanel.value = false;
  isOpenSortSelectorPanel.value = false;
};
</script>

<template>
  <div
    fixed
    inset-0
    mt-16
    flex
    justify-center
    @click="handleCloseSelectorPanel"
  >
    <div p="y-12" w="85% sm:80% md:60%">
      <h1 text="center 32px" leading-32px font-600>所有文章</h1>

      <Divider m="t-4" />

      <TagPanel
        v-model="selectedTags"
        v-model:isOpenPanel="isOpenTagSelectorPanel"
      />

      <Divider />

      <SortPanel
        v-model="selectedSortType"
        v-model:isOpenPanel="isOpenSortSelectorPanel"
      />

      <Divider />

      <PostList :tags="selectedTags" :sortType="selectedSortType" />
    </div>
  </div>
</template>
