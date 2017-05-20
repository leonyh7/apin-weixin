import Vue from 'vue'
import VueRouter from 'vue-router'
import OrderList from './orderList'
import OrderDetail from './orderDetail'
import Issue from './issue'
import PutNeed from './putNeed'
import SupplyQuo from './supplyQuo'

// import 'assets/a.css'

Vue.use(VueRouter)

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: {name: 'OrderList'}
    },
    {
      path: '/list',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/detail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/issue',
      name: 'Issue',
      component: Issue
    },
    {
      path: '/need',
      name: 'PutNeed',
      component: PutNeed
    },
    {
      path: '/supply',
      name: 'SupplyQuo',
      component: SupplyQuo
    }]
})

/* eslint-disable no-new */
new Vue({
  router: router
}).$mount('#index')
