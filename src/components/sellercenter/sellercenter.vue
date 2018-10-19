<template>
  <div class="seller-center bg-lightblue">
    <div class="userinfo">
      <img :src="userInfo.avatar">
      <div class="name-logo col-white">
        <span class="ft-16">{{userInfo.username}}</span>
        <span class="ft-14">共销汇-社交销售工具</span>
      </div>
    </div>
    <div class="nav t-center bg-white">
      <div class="nav-header bg-white ft-14">
        <div class="nav-header-item" :data-id="userInfo.uid" data-url="/sellershow" @click.stop="onNavItem">
          <span class="al al-zhaopian col-white"></span>
          <span>卖家秀</span>
        </div>
        <div class="nav-header-item">
          <span class="al al-dianpu col-white"></span>
          <span>店铺</span>
        </div>
        <div class="nav-header-item">
          <span class="al al-shouru col-white"></span>
          <span>收入</span>
        </div>
      </div>
      <div class="nav-shdow col-white">
        <div class="nav-shdow-item">
          <span class="al al-shangpin"></span>
          <span>商品</span>
        </div>
        <div class="nav-shdow-item">
          <span class="al al-huodong"></span>
          <span>活动</span>
        </div>
        <div class="nav-shdow-item">
          <span class="al al-wenzhang"></span>
          <span>文章</span>
        </div>
        <div class="nav-shdow-item">
          <span class="al al-ren"></span>
          <span>返点客</span>
        </div>
        <div class="nav-shdow-item">
          <span class="al al-jihui"></span>
          <span>销售机会</span>
        </div>
        <div class="nav-shdow-item">
          <span class="al al-lianxi"></span>
          <span>联系客户</span>
        </div>
      </div>
    </div>
    <div class="nav-others ft-14 bg-white">
      <div class="nav-others-item">
        <span class="al al-liebiao"></span>
        <span>订单列表</span>
        <span class="al al-gengduo"></span>
      </div>
      <div class="nav-others-item">
        <span class="al al-baogao"></span>
        <span>经营报告</span>
        <span class="al al-gengduo"></span>
      </div>
      <div class="nav-others-item">
        <span class="al al-shezhi"></span>
        <span>设置</span>
        <span class="al al-gengduo"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    onNavItem (event) {
      let url = event.target.parentNode.dataset.url
      let id = event.target.parentNode.dataset.id
      if (id) {
        this.$router.push({
          path: `${url}?id=${id}`
        })
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  .seller-center
    width: 100vw
    min-height: 100vh
    .userinfo
      width: 100vw
      height: 3.466667rem
      background-color: #2a82c6
      box-sizing: border-box
      padding: 0.8rem 0.266667rem 0
      display: flex
      flex-direction: row
      img
        flex: 0 0 1.813333rem
        width: 1.813333rem
        height: 1.813333rem
        border-radius: 50%
      .name-logo
        display: flex
        flex-direction: column
        flex: 1
        height: 1.813333rem
        margin-left: 0.266667rem
        span
          flex: 1
          line-height: 0.906667rem
    .nav
      position: relative
      width: 100%
      padding-left: 0.266667rem
      padding-right: 0.266667rem
      box-sizing: border-box
      padding-top: 1.333333rem
      padding-bottom: 0.8rem
      .nav-header
        position: absolute
        top: -0.4rem
        display: flex
        flex-direction: row
        width: 9.466667rem
        height: 1.2rem
        border-radius: 0.533333rem
        box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.07)
        .nav-header-item
          display: flex
          flex: 1
          justify-content: center
          align-items: center
          span:nth-child(1)
            display: inline-block
            width: 0.666667rem
            height: 0.666667rem
            line-height: 0.666667rem
            border-radius: 50%
          span:nth-child(2)
            margin-left: 0.266667rem
        .nav-header-item:nth-child(1)>span:nth-child(1){
          background-color: #fda428
        }
        .nav-header-item:nth-child(2)>span:nth-child(1){
          background-color: #354b9f
        }
        .nav-header-item:nth-child(3)>span:nth-child(1){
          background-color: #e73c40
        }
      .nav-shdow
        width: 9.466667rem
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: space-between
        .nav-shdow-item
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          width: 2.666667rem
          height: 2.666667rem
          border-radius: 0.266667rem
          box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.07)
          span:nth-child(1)
            font-size: 30px
            margin-bottom: 0.133333rem
          span:nth-child(2)
            font-size: 14px
        .nav-shdow-item:nth-child(1){
          background-color: #ec9f38
          margin-bottom: 0.4rem
        }
        .nav-shdow-item:nth-child(2){
          background-color: #ed4f53
        }
        .nav-shdow-item:nth-child(3){
          background-color: #3fb478
        }
        .nav-shdow-item:nth-child(4){
          background-color: #2da8ec
        }
        .nav-shdow-item:nth-child(5){
          background-color: #ec426a
        }
        .nav-shdow-item:nth-child(6){
          background-color: #6a68ec
        }
    .nav-others
      width: 100%
      padding-left: 0.266667rem
      padding-right: 0.266667rem
      margin-top: 0.533333rem
      .nav-others-item
        display: flex
        flex-direction: row
        align-items: center
        width: 9.466667rem
        height: 1.173333rem
        border-bottom: 1px solid #e3e3e3
        span:nth-child(1)
          flex: 0 0 16px
          margin-right: 0.266667rem
          color: #e73c40
          font-size: 18px
        span:nth-child(2)
          flex: 1
        span:nth-child(3)
          flex: 0 0 16px
          color: #e3e3e3
          font-size: 20px
          font-weight: 700
      .nav-others-item:last-child
        border-bottom: none
</style>
