import { createApp } from "vue";
import { VIdle } from 'v-idle-3'; // Perhatikan bahwa kita mengimpor VIdle dari v-idle-3

import App from "./App.vue"; // Pastikan ini sesuai dengan path ke file App.vue Anda

const myApp = createApp(App);
myApp.use(VIdle);

myApp.mount("#app");