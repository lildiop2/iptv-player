<template>
  <div>
    <video-player :options="videoOptions" />
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    VideoPlayer,
  },
  data() {
    return {
      streams: [],
      videoOptions: {
        autoplay: true,
        controls: true,
        width: window.innerWidth - 20,
        height: window.innerHeight - 20,
        sources: [
          {
            src: "https://install.akctvcontrol.com/speed/broadcast/138/desktop-playlist.m3u8",
            type: "application/x-mpegURL",
            withCredentials: false,
          },
        ],
        // fluid: true,
        liveui: true,
      },
    };
  },
  async created() {
    this.videoOptions.sources = (await axios.get("/streams.json")).data
      .filter((stream) => stream.channel)
      .map((stream) => {
        return {
          channel: stream.channel,
          src: stream.url,
          type: "application/x-mpegURL",
          withCredentials: false,
        };
      })
      .filter((stream) => /CNN/gi.test(stream.channel));
  },
};
</script>
{ }
