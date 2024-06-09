<template>
  <div style="margin-top: 80px; display: flex; justify-content: center">
    <div class="profile-container">
      <div class="profile-header">
        <a-avatar
          :trigger-icon-style="{ color: '#3491FA' }"
          :auto-fix-font-size="false"
          @click="changeAvatar"
          class="profile-avatar"
        >
          <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-avatar>
        <div class="profile-info">
          <h1 class="username">djsj</h1>
          <p class="user-id">小红书号: 1817735030</p>
          <p class="bio">还没有简介</p>
        </div>
      </div>
      <div class="profile-stats">
        <span>1 关注</span>
        <span>1 粉丝</span>
        <span>0 获赞与收藏</span>
      </div>
    </div>
  </div>

  <a-divider />

  <!-- Tab 栏 -->
  <a-space direction="vertical" size="large">
    <a-tabs
      type="rounded"
      size="large"
      v-model:selectedKey="selectedKey"
      @change="doMenuClick"
    >
      <a-tab-pane key="1" title="发布">
        <post-card-list :post-list="postList" />
      </a-tab-pane>
      <a-tab-pane key="2" title="点赞">
        <post-card-list :post-list="postList" />
      </a-tab-pane>
      <a-tab-pane key="3" title="收藏">
        <post-card-list :post-list="postList" />
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
  if (selectedKey.value === "1") {
    const res: any = await PostControllerService.listMyPostUsingGet(1, 8);
    if (res?.code === 0) {
      postList.value = res.data;
    }
  }
  if (selectedKey.value === "2") {
    const res: any = await PostThumbControllerService.listMyPostThumbUsingGet(
      1,
      8
    );
    if (res?.code === 0) {
      postList.value = res.data;
    }
  }
  if (selectedKey.value === "3") {
    const res: any = await PostFavourControllerService.listMyPostFavourUsingGet(
      1,
      8
    );
    if (res?.code === 0) {
      postList.value = res.data;
    }
  }
});

const changeAvatar = () => {
  console.log("1");
};
</script>

<style scoped>
.profile-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 500px; /* 增加宽度以适应头像和信息 */
  padding: 20px;
  text-align: center;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: center; /* 使头像和信息居中对齐 */
  margin-bottom: 20px;
}

.profile-avatar {
  width: 140px;
  height: 140px;
  margin-right: 60px; /* 头像和信息之间的间距 */
  margin-top: 20px;
}

.profile-info {
  text-align: left;
}

.username {
  font-size: 24px;
  margin: 0;
}

.user-id,
.bio {
  color: #666;
  margin: 5px 0;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  color: #999;
}

</style>