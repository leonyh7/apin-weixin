import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import Apin from 'assets/apin'
// import Mock from 'mockjs'

import OrderList from './orderList'
import OrderDetail from './orderDetail'
import Issue from './issue'
import PutNeed from './putNeed'
import SupplyQuo from './supplyQuo'
import  { AlertPlugin } from 'vux'

Vue.use(Vuex)
Vue.use(AlertPlugin)

//日期格式化
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        };
    };
    return format;
};

// Mock.mock('/api/getOrderList', {
//     "orderList|200": [{
//         "orderId": "@string('0123456789', 6)",
//         "time": "@datetime('yyyy-MM-dd HH:mm')",
//         "start": "@region",
//         "end": "@region",
//         "number": "@integer(60,100)",
//         "status": "@integer(1,3)"
//     }]
// })

// Mock.mock('/api/getOrderDetail', {
//     "zone": "@integer(0,1)",
//     "group": "@integer(0,1)",
//     "people": "@natural(0,1)",
//     "startTime": "@now('day', 'yyyy-MM-dd')",
//     "endTime": "@now('day', 'yyyy-MM-dd')",
//     "travelAgencyCity": "@region",
//     "travelAgencyName": "@word",
//     "startCity": "@region",
//     "endCity": "@region",
//     "days": "@natural(0,100)",
//     "number": "@natural(50,100)",
//     "child": "@natural(0,50)",
// })

// Mock.mock('/api/suuply', {
//     "number": "@integer(1,100)",
//     "price": "@integer(1,10000)"
// })


Vue.use(VueRouter)

const store = new Vuex.Store({
  state: {
    host: 'http://10.0.0.107:8090'
  }
})

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
    router: router,
    store
}).$mount('#app')