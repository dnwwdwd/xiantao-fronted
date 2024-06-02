<template>
  <a-list>
    <a-list-item v-for="user in userList" :key="user.id">
      <a-list-item-meta :title="user.username" :description="user.profile">
        <template #avatar>
          <a-avatar shape="circle">
            <img alt="avatar" :src="user.avatarUrl" />
          </a-avatar>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script setup lang="ts">
import { UserVO } from "../../generated";

interface UserListProps {
  userList: UserVO;
}

// eslint-disable-next-line no-undef
defineProps<UserListProps>();
</script>

<style scoped></style>