import Vue from 'vue'
import VueRouter from 'vue-router'

import Apin from 'assets/apin'
import Mock from 'mockjs'

import Query from './query.vue'

Mock.mock('/api/getIssueList', {
  "issueList|200": [
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
      name: 'query',
      component: Query
    }]
})

/* eslint-disable no-new */
new Vue({
  router: router
}).$mount('#app')
