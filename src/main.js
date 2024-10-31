import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";
import App from "./App.vue";
const app = createApp(App);

// app.use(VideoPlayer);

app.mount("#app");
