<template>
  <div class="msg-wraper" v-if="msgShow">
    <div class="msg t-center">
      <span class="title ft-16">{{msgTitle}}</span>
      <span class="content ft-14">{{message}}</span>
      <button class="bg-lightblue" type="button"  @click="onConfirm">确定</button>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    msgShow: {
      type: Boolean,
      default () {
        return false
      }
    },
    message: {
      type: String,
      default () {
        return ''
      }
    },
    msgTitle: {
      type: String,
      default () {
        return ''
      }
    }
  },
  methods: {
    onConfirm () {
      this.$emit('resetmsgshow')
    }
  }
};
</script>

<style lang="stylus" scoped>
  .msg-wraper
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-color: rgba(0, 0, 0, 0.3)
  .msg
    width: 60vw
    // height: 30vh
    position: absolute
    left: 20vw
    right: 20vw
    top: 5.333333rem
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    z-index: 1000
    // padding-bottom: 0.266667rem
    box-sizing: border-box
    background-color: #fff
    border-radius: 0.133333rem
    .title
      width: 100%
      padding: 0.266667rem 0
      // flex: 0 0 5vh
      // line-height: 5vh
      box-sizing: border-box
      font-weight: 700
      color: #000
    .content
      // flex: 0 0 10vh
      // line-height: 10vh
      padding: 0.8rem 0
      color: #999
    button
      // flex: 0 0 5vh
      border-top: 1px solid #d5d5d6 !important
      width: 100%
      height: 1.066667rem
      color: #fd9827
      background-color: transparent
</style>
