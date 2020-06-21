<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  created: function() {
    const app = this;
    axios.interceptors.response.use(undefined, function(err) {
      if (
        err.response.status === 401 &&
        err.response.config &&
        !err.response.config.__isRetryRequest
      ) {
        app.$store.dispatch("AUTH_LOGOUT");
        app.$router.push("/login");
      }
      return Promise.reject(err.message);
    });
  }
};
</script>

<style lang="scss">
</style>
