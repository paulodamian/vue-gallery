<template>
  <div>
    <Loader v-if="this.$store.getters.isLoading" />
    <div v-if="!this.$store.getters.isLoading">
      <h1>Image Gallery</h1>
      <ImgList :list="images" />
      <div class="pagination">
        <button v-if="page > 1" @click="goToPrevPage()">&#10094; Prev Page</button>
        <button v-if="hasMorePages" @click="goToNextPage()">Next Page &#10095;</button>
      </div>
    </div>
  </div>
</template>

<script>
import ImgList from "@/components/ImgList.vue";
import Loader from "@/components/Loader.vue";
import axios from "axios";

export default {
  name: "Gallery",
  data() {
    return {
      images: [],
      hasMorePages: false,
      page: 0
    };
  },
  components: {
    ImgList,
    Loader
  },
  created() {
    this.page = parseInt(this.$route.params.page) || 1;
    this.fetchData();
  },
  beforeRouteUpdate(to, from, next) {
      this.page = parseInt(to.params.page) || 1;
      this.fetchData();
      next();
  },
  methods: {
    fetchData() {
        this.$store.dispatch("LOADING_START");
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/images?page=${this.page}`).then(response => {
            this.$store.dispatch("LOADING_STOP");
            this.images = response.data.pictures;
            this.hasMorePages = response.data.hasMore;
        });
    },
    goToPrevPage() {
        this.$router.push(`/page/${this.page - 1}`);
    },
    goToNextPage() {
        this.$router.push(`/page/${this.page + 1}`);
    }
  }
};
</script>

<style scoped lang="scss">
h1 {
  margin: 20px auto;
  text-align: center;
  font-weight: 30px;
}

.pagination {
  text-align: center;
  padding: 20px 0;

  button {
    margin: 0 10px;
  }
}
</style>
