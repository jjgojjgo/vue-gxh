<template>
  <div class="swiper" ref="swiper">
    <swiper :list="comImgs" :auto="auto" :loop="loop" dots-position="right" height="6.533333rem" style="background-color: rgba(0, 0, 0, 0.1)">
    </swiper>
  </div>
</template>

<script type="text/javascript">
// import transformCss from '@/common/js/transformCss'
// import BScroll from 'better-scroll'
import {Swiper} from 'vux'
export default {
  data () {
    return {
      loop: true,
      auto: true
    }
  },
  props: {
    imgs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper
  },
  computed: {
    comImgs () {
      let comImgs = []
      for (let i = 0; i < this.imgs.length; i++) {
        let comImg = {ur: 'javascript'}
        comImg.img = this.imgs[i]
        comImgs.push(comImg)
      }
      console.log(comImgs)
      return comImgs
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
