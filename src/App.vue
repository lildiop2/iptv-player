<template>
  <div id="app">
    <NavBar />
    <div class="container mt-3">
      <!-- Hero Section -->
      <div class="row mb-4">
        <div class="col-12">
          <VideoPlayer v-if="renewVideoPlayer" :options="videoOptions" />
        </div>
      </div>

      <!-- Movie Categories -->
      <div class="row">
        <div class="col-12">
          <h4 class="category-title">Top Picks</h4>
          <MovieList :movies="topPicks" @stream="updateForNewStream" />
        </div>
        <div class="col-12 mt-4">
          <h4 class="category-title">Trending Now</h4>
          <MovieList :movies="trendingMovies" @stream="updateForNewStream" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { parseM3U } from "@iptv/playlist";
import NavBar from "./components/NavBar.vue";
import VideoPlayer from "./components/VideoPlayer.vue";
import MovieList from "./components/MovieList.vue";

export default {
  name: "App",
  components: {
    NavBar,
    VideoPlayer,
    MovieList,
  },
  data() {
    return {
      topPicks: [
        {
          id: 1,
          title: "Movie 1",
          thumbnail: "https://i.ytimg.com/vi/nIvePkFzaMw/maxresdefault.jpg",
        },
        {
          id: 2,
          title: "Movie 2",
          thumbnail:
            "https://thumbs.dreamstime.com/z/move-word-mobile-cart-pushed-around-little-man-51835627.jpg",
        },
        // More movies
      ],
      trendingMovies: [
        {
          id: 3,
          title: "Movie 3",
          thumbnail:
            "https://supersimple.com/wp-content/uploads/2020/07/songs_move_thumbnail_website-1080x740_en.jpg",
        },
        {
          id: 4,
          title: "Movie 4",
          thumbnail: "https://i.ytimg.com/vi/5_RJfEif1AE/maxresdefault.jpg",
        },
        // More movies
      ],
      videoOptions: {
        autoplay: true,
        controls: true,
        // width: window.innerWidth - 20,
        height: Math.ceil(window.innerHeight - window.innerHeight / 3),

        sources: [
          {
            src: "https://install.akctvcontrol.com/speed/broadcast/138/desktop-playlist.m3u8",
            type: "application/x-mpegURL",
            withCredentials: false,
          },
        ],
        // fluid: true,
        liveui: true,
        responsive: true,
      },
      renewVideoPlayer: true,
    };
  },
  async created() {
    const m3u = `https://iptv-org.github.io/iptv/index.m3u`; // M3U file contents
    const playlist = parseM3U(m3u);
    const canais = playlist;
    console.log(canais);
    const blockList = (await axios.get("/blocklist.json")).data;
    const channels = (await axios.get("/channels.json")).data;
    this.channels = channels
      .filter(
        (channel) =>
          channel.name &&
          channel.logo &&
          channel.country === "BR" &&
          !this.isBlock(channel.id, blockList)
      )
      .map((channel) => {
        return {
          country: channel.country,
          id: channel.id,
          title: channel.name,
          thumbnail: channel.logo,
        };
      });
    this.topPicks = this.channels.slice(0, 1000);
    this.trendingMovies = this.channels.slice(-20, this.channels.length);
  },
  methods: {
    async updateForNewStream(channel) {
      const sources = (await axios.get("/streams.json")).data
        .filter((streams) => streams.channel === channel.id)
        .map((stream) => {
          return {
            src: stream.url,
            type: "application/x-mpegURL",
          };
        });
      this.renewVideoPlayer = false;
      let options = { ...this.videoOptions, poster: channel.thumbnail };
      options.sources = sources;
      this.videoOptions = options;

      setTimeout(() => {
        this.renewVideoPlayer = true;
      }, 500);
    },

    isBlock(channel, blocklist) {
      return (blocklist || [])
        .map((blockedChannel) => blockedChannel.channel)
        .some((blockedChannel) => blockedChannel === channel);
    },
  },
};
</script>

<style scoped>
.category-title {
  font-weight: bold;
  color: #210799;
  padding-left: 15px;
}
</style>
