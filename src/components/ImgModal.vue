<template>
    <div class="imgModal" :style="backgroundValue">
        <div class="close-container" @click="closeModal">
            <div class="leftright"></div>
            <div class="rightleft"></div>
            <label class="close">close</label>
        </div>

        <ul class="info">
            <li>Author: {{info.author}}</li>
            <li>Camera: {{info.camera}}</li>
            <li>{{info.tags}}</li>
        </ul>

        <a class="share" target="_blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${info.full_picture}`">
            <img src="/facebook.png" />
        </a>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ImgModal',
  props: {
    img: {}
  },
  data() {
      return {
          info: {}
      }
  },
  created() {
    this.fetchData();
  },
  methods : {
      fetchData() {
          axios.get(`${process.env.VUE_APP_API_BASE_URL}/images/${this.img.id}`).then(response => {
            this.info = response.data;
        });
      },
      closeModal() {
          this.$emit('closeModal');
      }
  },
  computed: {
      backgroundValue() {
          return `background-image: url('${this.info.full_picture}');`;
      }
  }
}
</script>

<style scoped lang="scss">
.imgModal {
    $softorange: #F4A259;
    $tomatored: #F25C66;

    width: 90vw;
    height: 90vh;
    position: fixed;
    top: 5vh;
    left: 5vw;
    border-radius: 10px;
    background-color: #333333;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;

    .info {
        transition: all 0.3s;
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
        color: #FFFFFF;
        background: rgba(0, 0, 0, 0.7);
        padding: 20px 0;
        opacity: 0;

        li {
            padding: 5px 0;
        }
    }

    &:hover {
        .info {
            opacity: 1;
        }
    }

    .share {
        width: 50px;
        position: absolute;
        right: 20px;
        bottom: 40px;
    }

    .close-container{
        position: absolute;
        margin: auto;
        width: 50px;
        height: 50px;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    .leftright{
        height: 4px;
        width: 50px;
        position: absolute;
        margin-top: 24px;
        background-color: $softorange;
        border-radius: 2px;
        transform: rotate(45deg);
        transition: all .3s ease-in;
    }   

    .rightleft{
        height: 4px;
        width: 50px;
        position: absolute;
        margin-top: 24px;
        background-color: $softorange;
        border-radius: 2px;
        transform: rotate(-45deg);
        transition: all .3s ease-in;
    }

    label{
        color: white;
        font-family: Helvetica, Arial, sans-serif; 
        font-size: .6em;
        text-transform: uppercase;
        letter-spacing: 2px;
        transition: all .3s ease-in;
        opacity: 0;
    }

    .close{
        margin: 60px 0 0 5px;
        position: absolute;
    }

    .close-container:hover .leftright{
        transform: rotate(-45deg);
        background-color: $tomatored;
    }
    .close-container:hover .rightleft{
        transform: rotate(45deg);
        background-color: $tomatored;
    }
    .close-container:hover label{
        opacity: 1;
    }
}
</style>
