<template>
  <a-row :gutter="20" :style="{ marginBottom: '20px' }">
    <a-col :span="8">
      <a-card
        class="post-card"
        :style="{ width: '360px' }"
        :key="post.id"
        hoverable
        v-for="post in postList"
        @click="listPost(post)"
      >
        <template #actions>
          <span class="icon-hover">
            <IconThumbUp @click="doThumb(post)" v-if="!isThumb" />
            <IconThumbUpFill @click="deleteThumb(post)" v-else />
          </span>
          {{ post.thumbNum }}
          <span class="icon-hover">
            <IconStar @click="doFavour(post)" v-if="!isFavour" />
            <icon-star-fill @click="deleteFavour(post)" v-if="isFavour" />
          </span>
          {{ post.favourNum }}
          <span class="icon-hover">
            <IconMore />
          </span>
        </template>
        <template #cover>
          <div
            :style="{
              height: '204px',
              overflow: 'hidden',
            }"
          >
            <img
              :style="{ width: '100%', transform: 'translateY(-20px)' }"
              alt="dessert"
              src="https://img14.360buyimg.com/pop/jfs/t1/208132/16/25377/22182/63197778E85cb6437/9535252444460662.jpg"
            />
          </div>
        </template>
        <a-card-meta :title="post.title" :description="post.content">
          <template #avatar>
            <a-avatar shape="circle" size="small">
              <img alt="avatar" :src="post.userVO.avatarUrl" />
            </a-avatar>
            <a-typography-text style="margin-left: 5px"
              >{{ post.userVO.username }}
            </a-typography-text>
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>

  <a-drawer
    :width="1000"
    :visible="showPost"
    :footer="false"
    :header="false"
    @cancel="handleCancel"
    unmountOnClose
    :drawer-style="{
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      overflow: 'hidden',
      padding: '0',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    }"
  >
    <a-carousel
      :style="{
        width: '600px',
        height: '240px',
      }"
      :default-current="1"
    >
      <a-carousel-item v-for="(image, index) in postVO.images" :key="index">
        <img
          :src="image"
          :style="{
            width: '100%',
          }"
        />
      </a-carousel-item>
    </a-carousel>
  </a-drawer>
</template>

<script setup lang="ts">
import {
  PostFavourControllerService,
  PostThumbControllerService,
  PostVO, UserVO
} from "../../generated";
import { reactive, ref } from "vue";
import { IconThumbUp, IconStar, IconMore } from "@arco-design/web-vue/es/icon";
import { Message } from "@arco-design/web-vue";

interface PostListProps {
  postList: PostVO;
}

const isThumb = ref(false);
const isFavour = ref(false);

const showPost = ref(false);

const imageList = ref<string[]>([]);

let postVO = reactive({
  id: 0,
  favourNum: 0,
  thumbNum: 0,
  userVO: UserVO,
  title: "",
  content: "",
  tags: [] as string[],
  price: 0,
  images: [] as string[]
});

// eslint-disable-next-line no-undef
defineProps<PostListProps>();

// 点赞
const doThumb = async (value: any) => {
  console.log(isThumb.value);
  const res = await PostThumbControllerService.addPostThumbUsingPost({
    postId: value.id,
    isThumb: isThumb.value,
  });
  if (res?.code === 0) {
    isThumb.value = true;
    console.log(isThumb.value);
    Message.info("点赞成功");
  } else {
    Message.info("点赞失败");
  }
};

const deleteThumb = async (value: any) => {
  const res = await PostThumbControllerService.deletePostThumbUsingPost({
    postId: value.id,
    isThumb: isThumb.value,
  });
  if (res?.code === 0) {
    isThumb.value = false;
    Message.info("取消点赞成功");
  } else {
    Message.info("取消点赞失败");
  }
};

const doFavour = async (value: any) => {
  const res = await PostFavourControllerService.addPostFavourUsingPost({
    postId: value.id,
    isFavour: isFavour.value,
  });
  if (res?.code === 0) {
    isFavour.value = true;
    Message.info("收藏成功");
  } else {
    Message.info("收藏失败");
  }
};

const deleteFavour = async (value: any) => {
  const res = await PostFavourControllerService.deletePostFavourUsingPost({
    postId: value.id,
    isFavour: isFavour.value,
  });
  if (res?.code === 0) {
    isFavour.value = false;
    Message.info("取消点赞成功");
  } else {
    Message.info("取消点赞失败");
  }
};

const listPost = (value: PostVO) => {
  console.log(value.images);
  // 清空 postVO 对象的 images 数组
  postVO.images = [];
  postVO.tags = [];
  Object.assign(postVO, value);
  showPost.value = true;
};

const handleCancel = () => {
  showPost.value = false;
};
</script>

<style scoped>
.post-card:hover {
  transform: translateY(-2px);
}
</style>
