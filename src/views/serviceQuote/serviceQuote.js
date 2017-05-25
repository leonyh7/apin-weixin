import Vue from 'vue'
import VueRouter from 'vue-router'

import Apin from 'assets/apin'
import Mock from 'mockjs'

import OrderList from './orderList'
import OrderDetail from './orderDetail'
import Issue from './issue'
import PutNeed from './putNeed'
import SupplyQuo from './supplyQuo'

Mock.mock('/api/getOrderList', {
    "orderList|200": [{
        "orderId": "@string('0123456789', 6)",
        "time": "@datetime('yyyy-MM-dd HH:mm')",
        "start": "@region",
        "end": "@region",
        "number": "@integer(60,100)",
        "status": "@integer(1,3)"
    }]
})

Mock.mock('/api/getOrderDetail', {
    "zone": "@integer(0,1)",
    "group": "@integer(0,1)",
    "people": "@natural(0,1)",
    "startTime": "@now('day', 'yyyy-MM-dd')",
    "endTime": "@now('day', 'yyyy-MM-dd')",
    "travelAgencyCity": "@region",
    "travelAgencyName": "@word",
    "startCity": "@region",
    "endCity": "@region",
    "days": "@natural(0,100)",
    "number": "@natural(50,100)",
    "child": "@natural(0,50)",
})

Mock.mock('/api/suuply', {
    "number": "@integer(1,100)",
    "price": "@integer(1,10000)"
})


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: { name: 'OrderList' }
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
        }
    ]
})

router.afterEach(function(route) {
    let title = ""
    switch (route.name) {
        case 'OrderList':
            title = '订单列表';
            break;
        case 'OrderDetail':
            title = '订单详情';
            break;
        case 'PutNeed':
            title = '发布需求';
            break;
        case 'SupplyQuo':
            title = '供应商报价';
            break;
        case 'Issue':
            title = '出票';
            break;
    }
    document.title = title
})

/* eslint-disable no-new */
new Vue({
    router: router
}).$mount('#app')