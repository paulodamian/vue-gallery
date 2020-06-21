<template>
  <div class="imgCard">
    <img :src="img.cropped_picture" @click="imgClick" />
    <ImgModal :img="img" v-if="showModal" v-on:closeModal="closeModal()" transition="expand" />
  </div>
</template>

<script>
import ImgModal from "@/components/ImgModal.vue";

export default {
  name: "ImgCard",
  components: {
    ImgModal
  },
  props: {
    img: {}
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    imgClick() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped lang="scss">
img {
  cursor: pointer;
}
</style>
