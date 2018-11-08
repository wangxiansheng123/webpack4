<template>
  <nav class="lh_nav">
    <div class="swiper-container" v-if="true">
      <div class="swiper-wrapper">
        <div class="swiper-slide food_types_container" v-for="(item, index) in lehuTitleSlide.slideShow" :key="index">
          <router-link
            :to="{path: item.h5LinkUrl}" class="link_to_food">
            <img :src="item.imgUrl">
          </router-link>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
  </nav>
</template>

<script>
  import 'src/plugins/swiper.min.js'
  import 'src/style/swiper.min.css'

  export default {
    name: "Slider",
    data() {
      return {}
    },
    props: ['lehuTitleSlide',],
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  .lh_nav {
    width: auto;
    height: auto;
    .swiper-container {
      @include wh(100%, auto);
      padding-bottom: 0.6rem;
      .swiper-slide {
        width: 100%;
        a {
          img {
            width: 100%;
            height: 100%;
          }
        }

      }
      .swiper-pagination {
        bottom: 0.2rem;
        background: red;
      }
    }
  }

</style>
