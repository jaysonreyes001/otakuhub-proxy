import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import { Icon } from "@iconify/vue";

import router from "./router/index.ts";

const app = createApp(App);
app.use(router)
.component('Icon',Icon)
.mount("#app");
