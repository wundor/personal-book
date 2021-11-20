import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

const app = createApp(App);

app.use(ElementPlus);
app.config.globalProperties.$api = "http://localhost:4001";
// app.provide("api", "http://localhost:4001");
app.mount("#app");
