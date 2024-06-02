<template>
  <div class="search-container">
    <a-input-search
      :style="{ width: '320px' }"
      placeholder="搜索帖子或者用户"
      v-model="searchParam"
      @search="doSearch"
      search-button
      style="margin-bottom: 20px"
    />
  </div>
  <!-- Tab 栏 -->
  <a-space direction="vertical" size="large">
    <a-tabs
      type="rounded"
      size="large"
      v-model:selectedKey="selectedKey"
      @change="doMenuClick"
    >
      <a-tab-pane key="1" title="推荐">
        <post-card-list :post-list="postList" />
      </a-tab-pane>
      <a-tab-pane key="2" title="用户">
        <user-card-list :user-list="userList" />
      </a-tab-pane>
    </a-tabs>
  </a-space>
</template>

<script setup lang="ts">
import PostCardList from "@/components/PostCardList.vue";
import UserCardList from "@/components/UserCardList.vue";
import { ref, watchEffect } from "vue";
import { Message } from "@arco-design/web-vue";
import { PostControllerService } from "../../generated";
import { UserControllerService } from "../../generated";

const searchParam = ref("");

const postList = ref([]);
const userList = ref([]);
const selectedKey = ref("1");

// const searchParams =ref({
//   pageSize: 8,
//   pageNum: 1,
// });

const doMenuClick = (key: string) => {
  selectedKey.value = key;
};

const loadPost = async () => {
  const res: any = await PostControllerService.recommendPostsUsingGet( 1, 8);
  if (res.code === 0) {
    postList.value = res.data;
  } else {
    Message.error("加载失败");
  }
};

const searchUser = async () => {
  const res : any = await UserControllerService.searchUsersUsingPost({
    username: searchParam.value,
    pageNum: 1,
    pageSize: 8,
  });
  if (res.code === 0) {
    userList.value = res.data;
  } else {
    Message.error("加载失败");
  }
};

const searchPost = async () => {
  const res : any = await PostControllerService.searchPostUsingPost({
    searchParam: searchParam.value,
    pageNum: 1,
    pageSize: 8,
  });
  if (res?.code === 0) {
    postList.value = res.data;
    Message.info('搜索成功');
  } else {
    Message.error('搜索失败');
  }
};

watchEffect(async () => {
    if (selectedKey.value === '1') {
      loadPost();
    }
    if (selectedKey.value === '2') {
      searchUser();
    }
});

const doSearch = async () => {
  if (selectedKey.value === '1') {
    if (searchParam.value) {
      console.log('1')
      searchPost();
    } else {
      loadPost();
    }
  }
  if (selectedKey.value === '2') {
    searchUser();
  }
};

</script>

<style scoped>
.search-container {
  margin-top: 20px;
  display: flex;
  justify-content: center; /* 水平居中 */
}
</style>