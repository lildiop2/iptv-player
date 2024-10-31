<template>
  <div>
    <video ref="videoPlayer" class="video-js container-fluid"></video>
  </div>
</template>

<script>
import videojs from "video.js";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // watch: {
  //   options: function (newValue, oldValue) {
  //     // Note: `newValue` will be equal to `oldValue` here
  //     // *unless* state.someObject has been replaced
  //     // this.disposePlayer();
  //     console.log({ oldValue });
  //     // this.initializePlayer(newValue);
  //     this.player.src(newValue.sources);
  //     this.player.liveTracker.handlePlay();
  //     // this.$data.player = this.player;
  //   },
  // },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.initializePlayer(this.options);
  },
  beforeUnmount() {
    this.disposePlayer();
  },
  methods: {
    initializePlayer(options) {
      this.player = videojs(this.$refs.videoPlayer, options, () => {
        this.player.log("onPlayerReady", this);
      });
    },
    disposePlayer() {
      if (this.player) {
        this.player.dispose();
      }
    },
  },
};
</script>
