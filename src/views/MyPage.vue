<template>

  <!-- Tab 栏 -->
  <a-space direction="vertical" size="large">
    <a-tabs
      type="rounded"
      size="large"
      v-model:selectedKey="selectedKey"
      @change="doMenuClick"
    >
      <a-tab-pane key="1" title="发布">
        <post-card-list :post-list="postList"/>
      </a-tab-pane>
      <a-tab-pane key="2" title="点赞">
        <post-card-list :post-list="postList"/>
      </a-tab-pane>
      <a-tab-pane key="3" title="收藏">
        <post-card-list :post-list="postList"/>
      </a-tab-pane>
    </a-tabs>
  </a-space>
</template>


<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { PostControllerService } from "../../generated/services/PostControllerService";
import { PostThumbControllerService } from "../../generated/services/PostThumbControllerService";
import { PostFavourControllerService } from "../../generated/services/PostFavourControllerService";
import PostCardList from "@/components/PostCardList.vue";

const postList = ref([]);
const favourList = ref([]);
const starList = ref([]);

const selectedKey = ref("1");

const doMenuClick = (key: string) => {
  selectedKey.value = key;
};


watchEffect(async () => {
  if (selectedKey.value === '1') {
    const res : any = await PostControllerService.listMyPostUsingGet(1, 8);
    if (res?.code === 0) {
      postList.value = res.data;
    }
  }
  if (selectedKey.value === '2') {
    const res : any = await PostThumbControllerService.listMyPostThumbUsingGet(1, 8);
    if (res?.code === 0) {
      postList.value = res.data;
    }
  }
  if (selectedKey.value === '3') {
    const res : any = await PostFavourControllerService.listMyPostFavourUsingGet(1, 8);
    if (res?.code === 0) {
      postList.value = res.data;
    }
  }

});

</script>

<style scoped></style>