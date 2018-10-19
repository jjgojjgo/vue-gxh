<template>
  <transition name="fm-move">
    <div class="friends-more ft-14 bg-lightblue">
      <div class="title t-center"><span>关注好友列表</span></div>
      <scroll-view @scrollEnd="scrollEnd" :data="friendsList">
        <div slot="scroll-view-content">
          <div class="friend bg-white" v-for="item in friendsList" :key="item.id">
            <img :src="item.avatar">
            <span>{{item.username}}</span>
          </div>
        </div>
      </scroll-view>
      <div class="close-btn t-center"><button class="bg-red col-white" @click="onClose">关闭</button></div>
    </div>
  </transition>
</template>

<script type="text/javascript">
// import * as Config from '@/api/config'
// import getFriendsList from '@/api/getFriendsList'
// import {mapState} from 'vuex'
import ScrollView from '@/base/scroll-view/scroll-view'
export default {
  // data () {
  //   return {
  //     friendsList: [],
  //     pagestart: 0,
  //     limit: 1000
  //   }
  // },
  props: {
    friendsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  // mounted () {
  //   this._getFriendsList()
  // },
  // computed: {
  //   ...mapState(['retailerInfo'])
  // },
  // props: {
  //   friendsMoreShow: {
  //     type: Boolean,
  //     default () {
  //       return false
  //     }
  //   }
  // },
  components: {
    ScrollView
  },
  methods: {
    // _getFriendsList () {
    //   getFriendsList(this.retailerInfo.uid, this.pagestart, this.limit).then(res => {
    //     const data = res.data
    //     if (data.flag !== Config.ERR_NUM) {
    //       if (this.pagestart === 0) {
    //         this.friendsList = data.data
    //       } else {
    //         this.friendsList.push(...data.data)
    //       }
    //     }
    //     console.log(this.friendsList)
    //   })
    // },
    onClose () {
      // this.friendsMoreShow = false
      this.$emit('setFriendsMoreShow')
    },
    scrollEnd (params) {
      console.log(params)
      // const clientHeight = this.$refs.scrollView.$el.clientHeight
      // const scrollHeight = this.$refs.friendsList.clientHeight
      // const scrollBottom = scrollHeight - clientHeight
      // if (Math.abs(params.y) >= scrollBottom) {
      //   console.log('in scrollEnd')
      //   if (this.friendsList.length === ((this.pagestart++) * this.limit)) {
      //     // this.pagestart++
      //     this._getFriendsList()
      //   }
      // }
    }
  }
};
</script>
<style lang="stylus" scoped>
  .friends-more
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    // min-height: 100vh
    padding: 0 0.266667rem
    box-sizing: border-box
    .title
      font-weight: 700
      line-height: 1.44rem
    .friend
      display: flex
      flex-direction: row
      align-items: center
      // padding-bottom: 0.266667rem
      width: 100%
      padding: 1.333333rem 0.266667rem
      box-sizing: border-box
      margin-bottom: 0.266667rem
      img
        flex: 0 0 1.333333rem
        width: 1.333333rem
        height: 1.333333rem
        border-radius: 50%
        margin-right: 0.266667rem
      span
        flex: 1
    .close-btn
      position: absolute
      left: 0
      right: 0
      bottom: 0.266667rem
      button
        padding: 0.133333rem 0.8rem
        border-radius: 0.133333rem
  .fm-move-enter-active
    transition: all 1s
  .fm-move-enter
    transform: translateY(100vh)
  .fm-move-leave-active
    transition: all 1s
  .fm-move-leave-to
    transform: translateY(100vh)
</style>
