<template>
  <div id="manageQuestionView">
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @pageChange="onPageChange"
    >
      <template #optional="{ record }">
        <a-button type="primary" @click="doUpdate(record)">修改</a-button>
        <a-button
          type="primary"
          status="danger"
          style="margin-top: 5px"
          @click="doDelete(record)"
          >删除
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const router = useRouter();

const show = ref(true);
const tableRef = ref();
const dataList = ref([]);

const total = ref(0);
const searchParams = ref({
  pageSize: 2,
  current: 1,
});


const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doUpdate = async (question: Question) => {
  console.log(question);
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};

const doDelete = async (question: Question) => {
  console.log(question);
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res?.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败" + (res.message ? `${res.message}` : ""));
  }
};

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res?.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败" + (res.message ? `，${res.message}` : ""));
  }
};

/**
 * 监听 searchParams 变化时，重新加载 dataList
 */
watchEffect(() => {
  loadData();
});


onMounted(() => {
  loadData();
  console.log(tableRef);
});

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "题目",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "accessNum",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "用户 id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
</script>

<style scoped>
#manageQuestionView {
}
</style>
