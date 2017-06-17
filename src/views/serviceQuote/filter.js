import Vue from 'vue'

// 区域
Vue.filter('area', function (code) {
    switch (code) {
        case '1':
            return '国外';
        case '0':
        default:
            return '国内';
    }
})

// 大区
Vue.filter('bigArea', function (code) {
    switch (code) {
        case '4':
            return '西南';
        case '3':
            return '华南';
        case '2':
            return '华北';
        case '1':
        default:
            return '华东';
    }
})

// 人员
Vue.filter('employee', function (code) {
    switch (code) {
        case '1':
            return '员工';
        case '0':
        default:
            return '计调';
    }
})

// 团散
Vue.filter('group', function (code) {
    switch (code) {
        case '3':
            return '临时团';
        case '2':
            return '计划团';
        case '1':
            return '询价团';
        case '0':
        default:
            return '散客';
    }
})

// 行程类型
Vue.filter('route', function (code) {
    switch (code) {
        case '3':
            return '多程';
        case '2':
            return '往返';
        case '1':
        default:
            return '单程';
    }
})

// 供应匹配
Vue.filter('supply', function (code) {
    switch (code) {
        case '1':
            return '是';
        case '0':
        default:
            return '否';
    }
})
