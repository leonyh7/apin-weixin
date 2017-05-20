// 公共文件
import Vue from 'vue'
import FastClick from 'fastclick'
import { LoadingPlugin } from 'vux'

import 'assets/apin.css'
import 'vux/src/styles/reset.less'

Vue.use(LoadingPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false