<template>
  <div class="center-seller bg-lightblue">
    <div class="bg-top"></div>
    <div class="userinfo t-center center-seller-panel">
      <div class="avatar">
        <img :src="userInfo.avatar">
      </div>
      <div class="username col-black ft-14">
        <span>{{userInfo.username}}</span>
      </div>
    </div>
    <div class="order center-seller-panel">
      <h2 class="title col-gray ft-14 t-left">我的订单</h2>
      <div class="items ft-12 t-center">
        <div class="item" @click="onOrders" data-index="0">
          <span class="al al-quanbudingdan"></span>
          <span>全部订单</span>
        </div>
        <div class="item" @click="onOrders" data-index="1">
          <span class="al al-daifahuo"></span>
          <span>待发货</span>
        </div>
        <div class="item" @click="onOrders" data-index="2">
          <span class="al al-yifahuo"></span>
          <span>已发货</span>
        </div>
        <div class="item" @click="onOrders" data-index="3">
          <span class="al al-yiwancheng"></span>
          <span>已完成</span>
        </div>
      </div>
    </div>
    <div class="service center-seller-panel">
      <h2 class="title col-gray ft-14 t-left">服务</h2>
      <div class="items ft-12 t-center">
        <div class="item service-item" @click="onSellerCenter">
          <span class="al al-zhongxin bg-green"></span>
          <span>卖家中心</span>
        </div>
        <div class="item service-item">
          <span class="al al-dizhi bg-blue"></span>
          <span>我的地址</span>
        </div>
        <div class="item service-item">
          <span class="al al-fenxiang bg-orange"></span>
          <span>我的分享</span>
        </div>
        <div class="item service-item">
          <span class="al al-shoucang bg-purple"></span>
          <span>我的收藏</span>
        </div>
        <div class="item service-item">
          <span class="al al-tuichu bg-lightred"></span>
          <span>退出</span>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
// import * as Config from '../../api/config'
import getUserInfo from '@/api/getUserInfo'
import {mapMutations} from 'vuex'
// import axios from 'axios'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this._getUserInfo()
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    onOrders (event) {
      console.log(event)
      const index = parseInt(event.target.parentNode.dataset.index)
      this.$router.push({
        // path: '/centerseller/orders',
        name: 'orders',
        params: {
          index: index
        }
      })
    },
    _getUserInfo () {
      getUserInfo()
        .then((res) => {
          console.log(res)
          this.userInfo = res.data
          this.setUserInfo(res.data)
          // this.$store.commit('setUserInfo', this.userInfo)
          // console.log(this.$store)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSellerCenter () {
      if (this.userInfo.isretailer) {
        this.$router.push({
          path: '/sellercenter'
        })
      } else {
        this.$router.push({
          path: '/applyseller'
        })
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  .center-seller
    height: 100vh
    .center-seller-panel
      width: 9.36rem
      margin: 0 auto 0.266667rem
      border-radius: 0.2rem
      background-color: #fff
      .title
        line-height: 0.8rem
        border-bottom: 0.013333rem solid #e3e3e3
        padding-left: 0.266667rem
        box-sizing: border-box
      .items
        display: flex
        flex-direction: row
        flex-wrap: wrap
        .item
          flex: 0 0 2.34rem
          padding: 0.266667rem 0
          span
            display: inline-block
            width: 100%
            height: 0.8rem
            line-height: 0.8rem
          .al
            color: #1777ce
            font-size: 30px
          .al-quanbudingdan
            font-size: 36px
          .al-yiwancheng
            font-size: 26px
          .al-zhongxin
            font-size: 32px
          .al-shoucang
            font-size: 26px
          .al-tuichu
            font-size: 28px
        .service-item
          .al
            width: 1.066667rem
            height: 1.066667rem
            line-height: 1.066667rem
            border-radius: 50%
            color: #fff
    .bg-top
      height: 0
      padding-top: 33.9%
      background: url('./bg-top.png') no-repeat top left
      background-size: 100%
    .userinfo
      margin-top: -2.0rem
      padding-bottom: 0.8rem
      background: url('./bg-userinfo.png') no-repeat bottom left
      background-size: 100%
      background-color: #fff
      .avatar
        padding-top: 0.8rem
        img
          display: block
          margin: 0 auto
          width: 2.0rem
          height: 2.0rem
          border-radius: 50%
      .username
        line-height: 1.333333rem
</style>
