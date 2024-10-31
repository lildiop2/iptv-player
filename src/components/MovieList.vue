<template>
  <div class="movie-list">
    <div class="row">
      <div
        class="col-3 col-md-1 mb-4"
        v-for="movie in movies"
        :key="movie.id"
        @click="$emit('stream', movie)"
      >
        <div class="movie-item">
          <img
            :src="movie.thumbnail"
            class="img-fluid movie-thumbnail"
            alt="movie.title"
          />
          <p class="movie-title">{{ movie.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieList",
  props: ["movies"],
  emits: ["stream"],
};
</script>

<style scoped>
.movie-thumbnail {
  border-radius: 5px;
  box-shadow: 7px 1px 99px -3px rgba(0, 0, 0, 0.74);
  -webkit-box-shadow: 7px 1px 99px -3px rgba(0, 0, 0, 0.74);
  -moz-box-shadow: 7px 1px 99px -3px rgba(0, 0, 0, 0.74);
  transition: transform 0.3s;
  width: 100%;
}

.movie-thumbnail:hover {
  transform: scale(1.05);
}

.movie-title {
  font-size: 0.9rem;
  text-align: center;
  color: rgb(121, 10, 10);
  margin-top: 5px;
}
</style>
