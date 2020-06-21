<template>
  <div>
    <Loader v-if="doingAuth()" />
    <div class="loginContainer" v-if="!doingAuth()">
      <div class="notice">By pressing the button you will login using the default apikey</div>
      <button @click="logIn('23567b218376f79d9415')">Login</button>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  name: "Login",
  components: {
    Loader
  },
  methods: {
    async logIn(apikey) {
      const data = { apiKey: apikey };
      await this.$store.dispatch("AUTH_REQUEST", data);
      if (this.$store.getters.isAuthenticated) {
        this.$router.push("/page/1");
      }
    },
    doingAuth() {
      if (this.$store.getters.authStatus == "loading") {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped lang="scss">
div.loginContainer {
  width: 100%;
  height: 100vh;
  padding-top: 35vh;

  .notice {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  button {
    display: block;
    width: 100px;
    margin: 0 auto;
  }
}
</style>
