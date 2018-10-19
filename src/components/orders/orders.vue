<template>
  <div class="orders bg-lightblue">
    <div class="nav ft-14 t-center bg-white" ref="nav">
      <div @click="_getOrders" data-index="0">全部</div>
      <div @click="_getOrders" data-index="1">待发货</div>
      <div @click="_getOrders" data-index="2">待收货</div>
      <div @click="_getOrders" data-index="3">已完成</div>
    </div>
    <scroll-view :data="orders" @scrollEnd="scrollEnd" ref="scrollView">
      <order-list :orders="orders" slot="scroll-view-content" ref="orderList"></order-list>
    </scroll-view>
  </div>
</template>

<script type="text/javascript">
import ScrollView from '@/base/scroll-view/scroll-view'
import OrderList from '@/base/order-list/order-list'
import * as Config from '@/api/config'
import getOrders from '@/api/getOrders'
let pagestart = 0
let limit = 5
export default{
  data () {
    return {
      orders: [],
      ordersFiltered: []
    }
  },
  mounted () {
    const index = this.$route.params.index
    this.initOrders(index)
    this.$refs.nav.children[index].classList.add('active')
  },
  components: {
    ScrollView,
    OrderList
  },
  methods: {
    scrollEnd (params) {
      console.log(params)
      const clientHeight = this.$refs.scrollView.$el.clientHeight
      const scrollHeight = this.$refs.orderList.$el.clientHeight
      const scrollBottom = scrollHeight - clientHeight
      if (Math.abs(params.y) > scrollBottom) {
        console.log('滚动条滚动到底了！')
        console.log(this.orders.length)
        console.log(pagestart)
        if (this.orders.length === (pagestart + 1) * limit) {
          pagestart++
          getOrders(0, pagestart, limit).then(res => {
            const data = res.data
            if (data.flag !== Config.ERR_NUM) {
              this.orders.push(...data.data)
              console.log(this.orders)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    initOrders (param) {
      getOrders(param).then(res => {
        const data = res.data
        if (data.flag !== Config.ERR_NUM) {
          this.orders = data.data
          console.log(this.orders)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _getOrders (event) {
      console.log(event.target.dataset.index)
      const index = event.target.dataset.index
      for (let i = 0; i < this.$refs.nav.children.length; i++) {
        const ele = this.$refs.nav.children[i]
        if (i === parseInt(index)) {
          ele.classList.add('active')
        } else {
          ele.classList.remove('active')
        }
      }
      pagestart = 0
      getOrders(index, pagestart, limit).then(res => {
        const data = res.data
        if (data.flag !== Config.ERR_NUM) {
          this.orders = data.data
          console.log(this.orders)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
  .orders
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    z-index: 100
    .nav
      display: flex
      flex-direction: row
      div
        flex: 1
        height: 1.173333rem
        line-height: 1.173333rem
        box-sizing: border-box
      .active
        color: #208cef
        border-bottom: 3px solid #208cef
    .scroll-view
      top: 1.173333rem
</style>
