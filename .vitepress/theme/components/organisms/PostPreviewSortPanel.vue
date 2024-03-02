<script lang="ts" setup>
import type { TSortType } from "../../types";
import { SortTypeEnum } from "../../enums";
import Selector from "../atoms/Selector/index.vue";

const selectedSortType = defineModel<TSortType>();
const isOpenSelectorPanel = defineModel<boolean>("isOpenPanel", {
  default: false,
});

const sortTypeItem = ref(SortTypeEnum[selectedSortType.value]);
const sortTypeItems = [
  "發布日期: 新->舊",
  "發布日期: 舊->新",
  "最後更新: 新->舊",
  "最後更新: 舊->新",
];

const handleChange = (item: string) => {
  selectedSortType.value = SortTypeEnum[item];
};
</script>

<template>
  <div p="y-4">
    <p font-600>選擇排序</p>
    <div>
      <Selector
        v-model="sortTypeItem"
        v-model:isOpenPanel="isOpenSelectorPanel"
        :items="sortTypeItems"
        @change="handleChange"
        m="t-2"
      >
        <template #input:before>
          <div class="i-material-symbols:sort-rounded" m="r-1"></div>
        </template>
      </Selector>
    </div>
  </div>
</template>
