<template>
  <div class="scroll-view" ref="bscroll">
    <slot name="scroll-view-content"></slot>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      bscroll: {}
    }
  },
  mounted () {
    this.bscroll = new BScroll(this.$refs.bscroll)
    this.bscroll.on('scrollEnd', res => {
      // console.log(res)
      this.$emit('scrollEnd', res)
    })
    console.log(this.bscroll)
  },
  watch: {
    data () {
      this.bscroll.refresh()
    }
  }
};
</script>

<style lang="stylus" scoped>
  .scroll-view
    position: fixed
    left: 0
    right: 0
    bottom: 0
    top: 0
    overflow: hidden
</style>
