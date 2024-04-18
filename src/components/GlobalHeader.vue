<template>
  <a-row class="grid-demo" id="globalHeader" align="center">
    <a-col flex="100px"> </a-col>
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :default-selected-keys="['1']"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/fairy.svg" />
            <div class="title">精灵 OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in routes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/router";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();

const selectedKeys = ref(["/"]);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 路由跳转时，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const store = useStore();

/*console.log(store.state.user.loginUser);*/

/*setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "C1own",
    role: 'admin',
  });
}, 3000);*/


</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.logo {
  width: 40px;
  height: 48px;
}
.title {
  margin-left: 16px;
  color: #444;
}
</style>