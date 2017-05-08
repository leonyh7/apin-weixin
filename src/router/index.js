import Vue from 'vue'
import Router from 'vue-router'
import OrderList from '@/components/OrderList'
import OrderDetail from '@/components/OrderDetail'
import PutNeed from '@/components/PutNeed'
import SupplyQuo from '@/components/SupplyQuo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/detail',
      name: 'OrderDetail',
      component: OrderDetail
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
    }
  ]
})
