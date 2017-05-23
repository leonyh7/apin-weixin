import Vue from 'vue'
import VueRouter from 'vue-router'

import Apin from 'assets/apin'
import Mock from 'mockjs'

import FinanceList from './financeList'
import FinanceDetail from './financeDetail'
import FinanceApply from './financeApply'

Mock.mock('/api/getFinanceList', {
  "financeList|200": [
    {
      "orderId": "@string('0123456789', 6)",
      "time": "@datetime('yyyy-MM-dd HH:mm')",
      "start": "@region",
      "end": "@region",
      "number": "@integer(60,100)",
      "status": "@integer(1,3)"
    }
  ]
})

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/',
      component: FinanceList
    },
    {
      path: '/detail',
      component: FinanceDetail
    },
    {
      path: '/apply',
      component: FinanceApply
    }]
})

/* eslint-disable no-new */
new Vue({
  router: router
}).$mount('#app')
