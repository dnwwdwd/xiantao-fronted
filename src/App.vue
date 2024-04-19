<template>
  <div id="app">
    <basic-layout />
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

router.beforeEach((to, from, next) => {
  console.log(store.state.user.loginUser?.role);
  console.log(to.meta?.access);

  if (store.state.user.loginUser?.role !== "admin") {
    if (to.meta?.access === "canAdmin") {
      next("/noauth");
      return;
    }
  }
  next();
});
</script>