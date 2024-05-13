<template>
  <div id="doQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
            </a-card>
            <a-card v-if="question">
              <md-viewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    :color="colors[index % 4]"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论"> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案">
            {{ (question && question.answer) || "" }}
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item field="title" label="编程语言" style="min-width: 240px">
            <a-select
              v-model="form.language"
              :style="{ width: '160px' }"
              placeholder="请选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <code-editor
          :value="form.code"
          :language="form.language"
          :handle-change="changeLanguage"
        />
        <a-divider size="0" />
        <a-button
          type="dashed"
          status="warning"
          style="min-width: 100px"
          @click="doSubmit"
        >
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";

const colors = ref(["magenta", "cyan", "arcoblue", "pinkpurple"]);

const question = ref<QuestionVO>();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res?.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败" + (res.message ? `，${res.message}` : ""));
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "",
  code: "",
});

onMounted(() => {
  loadData();
});

/**
 * 切换编程语言
 * @param value
 */
const changeLanguage = (value: string) => {
  form.value.code = value;
};

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value?.id,
  });
  if (res?.code === 0) {
    message.success("提交成功，请稍等片刻");
  } else {
    message.error("提交失败" + (res.message ? `，${res.message}` : ""));
  }
};
</script>

<style>
#doQuestionView {
  margin: 0 auto;
  max-width: 1400px;
}

#doQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0px !important;
}
</style>
