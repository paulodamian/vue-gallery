<template>
  <div class="imgList">
    <ImgCard v-for="img in list" :key="img.id" :img='img'></ImgCard>
  </div>
</template>


<script>
import ImgCard from '@/components/ImgCard.vue'

export default {
  name: 'ImgList',
  props: {
    list: Array
  },
  components: {
    ImgCard
  }
}
</script>

<style scoped lang="scss">
.imgList {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 1rem;
    width: 1070px;
    max-width: 90%;
    margin: 0 auto;
} 
</style>
