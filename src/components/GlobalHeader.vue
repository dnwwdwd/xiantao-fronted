<template>
  <a-row class="grid-demo" id="globalHeader" align="center" :wrap="false">
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
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
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
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

const router = useRouter();
const route = useRoute();
const store = useStore();

const loginUser = store.state.user.loginUser;

const visibleRoutes = computed(() =>{
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限显示菜单
    if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

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

onMounted(() => {
  store.dispatch("user/getLoginUser", {
    userName: "C1own",
    userRole: 'admin',
  });
});

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