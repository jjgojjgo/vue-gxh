<template>
  <div class="order-list">
    <ul>
      <li class="ft-12 order bg-white" v-for="orderFlag in orders" :key="orderFlag.id">
        <div class="order-flag t-left col-orange">
          <span class="t-left">{{orderFlag.retaileruser}}的店铺</span>
          <span class="t-right">{{orderFlag.flagstr}}</span>
        </div>
        <ul>
          <li v-for="order in orderFlag.orderlist" :key="order.id">
            <div class="product-info bg-gray">
              <img :src="order.photo">
              <span class="ft-12">{{order.name}}</span>
            </div>
            <div class="pay-info t-right">
              <span>订单金额：¥{{order.takemoney}}</span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    orders: {
      type: Array,
      default () {
        return []
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  .order-list
    // padding-top: 0.266667rem
    .order
      margin-top: 0.266667rem
      padding: 0 0.266667rem
      box-sizing: border-box
      .order-flag
        display: flex
        flex-direction: row
        height: 0.933333rem
        line-height: 0.933333rem
        span
          flex: 1
      .product-info
        padding: 0.266667rem
        font-size: 0
        img
          width: 1.653333rem
          height: 1.653333rem
        span
          display: inline-block
          vertical-align: top
          margin-left: 0.266667rem
      .pay-info
        height: 0.933333rem
        line-height: 0.933333rem
</style>
