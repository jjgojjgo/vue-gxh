import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Orders from '@/components/orders/orders'
import SellerCenter from '@/components/sellercenter/sellercenter'
import ApplySeller from '@/components/applyseller/applyseller'
import SellerShow from '@/components/sellershow/sellershow'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    component: Index,
    children: [{
      path: '/index/orders',
      component: Orders,
      name: 'orders'
    }]
  }, {
    path: '/sellercenter',
    component: SellerCenter
  }, {
    path: '/applyseller',
    component: ApplySeller
  }, {
    path: '/sellershow',
    component: SellerShow
  }]
})
