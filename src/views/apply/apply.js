import Vue from 'vue'
import VueRouter from 'vue-router'

import Apin from 'assets/apin'

import Apply from './apply.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/',
      component: Apply
    }]
})

/* eslint-disable no-new */
new Vue({
  router: router
}).$mount('#app')
