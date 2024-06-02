import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@arco-design/web-vue/dist/arco.css";
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import ArcoVue from "@arco-design/web-vue";
import "@/access";
import 'bytemd/dist/index.css'

createApp(App).use(store).use(router).use(ArcoVue).use(ArcoVueIcon).mount("#app");
