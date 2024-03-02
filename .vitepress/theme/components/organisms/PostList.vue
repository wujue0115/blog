<script lang="ts" setup>
import type { TPost, TSortType } from "../../types";
import { data as posts } from "../../posts.data";
import PostCard from "../molecules/PostCard.vue";
import Divider from "../atoms/Divider.vue";

import { useFP } from "../../composables/useFP";

const { pipe } = useFP();

const props = withDefaults(
  defineProps<{
    tags?: string[];
    sortType?: TSortType;
  }>(),
  {
    tags: () => [],
    sortType: "publishDateNewToOld",
  }
);

const { tags, sortType } = toRefs(props);

const filterPosts = (_posts: TPost[]) => {
  if (!tags.value.length) return _posts;

  return _posts.filter((post) =>
    tags.value.every((tag) => post.tags.includes(tag))
  );
};

const sortPosts = (_posts: TPost[]) => {
  const compares = {
    publishDateNewToOld: (a: TPost, b: TPost) => b.date.time - a.date.time,
    publishDateOldToNew: (a: TPost, b: TPost) => a.date.time - b.date.time,
    lastUpdatedNewToOld: (a: TPost, b: TPost) =>
      b.lastUpdated.time - a.lastUpdated.time,
    lastUpdatedOldToNew: (a: TPost, b: TPost) =>
      a.lastUpdated.time - b.lastUpdated.time,
  };

  return _posts.sort(compares[sortType.value]);
};

const postsFactory = pipe(filterPosts, sortPosts);
const processedPosts = ref<TPost[]>([]);

watch(
  [tags, sortType],
  () => {
    processedPosts.value = postsFactory(posts);
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <template v-for="(post, index) in processedPosts" :key="index">
      <PostCard :post="post" m="t-8" />
      <Divider m="t-8" />
    </template>
  </div>
</template>
