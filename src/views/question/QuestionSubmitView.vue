<template>
  <div id="questionView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="题号" style="min-width: 240px">
        <a-input
          v-model="searchParams.questionId"
          placeholder="请输入题目名称"
        />
        <a-form-item field="title" label="编程语言" style="min-width: 240px">
          <a-select
            v-model="searchParams.language"
            :style="{ width: '160px' }"
            placeholder="请选择编程语言"
          >
            <a-option>java</a-option>
            <a-option>cpp</a-option>
            <a-option>go</a-option>
          </a-select>
        </a-form-item>
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 280px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入题目标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSearch">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
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
      <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();

const tableRef = ref();
const dataList = ref([]);

const total = ref(0);

const colors = ref(["magenta", "cyan", "arcoblue", "pinkpurple"]);

const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 2,
  current: 1,
  title: "",
  tags: [],
});

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 去搜索
 */
const doSearch = () => {
  // 此处需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

/**
 * 点击跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/do/question/${question.id}`,
  });
};

const loadData = async () => {
  const res =
    await QuestionControllerService.listQuestionSubmitVoByPageUsingPost(
      {
        ...searchParams.value,
        sortField: 'createTime',
        sortOrder: 'descend',
      }
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
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    dataIndex: "judgeInfo",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    dataIndex: "status",
  },
  {
    title: "题号",
    dataIndex: "questionId",
  },
  {
    title: "提交者 Id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];
</script>

<style scoped>
#questionView {
  margin: 0 auto;
  max-width: 1300px;
}
</style>
