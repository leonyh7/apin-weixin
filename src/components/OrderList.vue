<template>
  <div class="apin-container">
    <tab v-model="index">
      <tab-item v-for="(tab, index) in tabs" :key="index" @click.native="toggleTab(index)">{{tab.name}}</tab-item>
    </tab>
  
    <swipeout class="page" :class="{active: index==i}" v-for="(tab,i) in tabs" :key="i">
  
      <swipeout-item ref="swipeoutItem" :right-menu-width="210" class="list" v-for="(order,j) in tab.orderList" :key="i+''+j" @click.native="toDetail(order.orderId)">
        <div slot="right-menu">
          <swipeout-button @click.native="deleteOrder(j)" type="warn" :width="70">删除</swipeout-button>
        </div>
        <div slot="content" class="list-content">
          <div class="row">
            <div class="col">订单号：</div>
            <div class="col">{{order.orderId}}</div>
          </div>
          <div class="row">
            <div class="col">订单时间：</div>
            <div class="col">{{order.time}}</div>
          </div>
          <div class="row">
            <div class="col">
              {{order.start}}
              <img src="../assets/plane.png" /> {{order.end}}
            </div>
          </div>
          <div class="row">
            <div class="col">人数：</div>
            <div class="col">{{order.number}}人</div>
          </div>
          <div class="row">
            <div class="col">{{order.status}}</div>
          </div>
        </div>
      </swipeout-item>
  
    </swipeout>
  
  </div>
</template>

<script>
import axios from 'axios'
import { Tab, TabItem, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
export default {
  data () {
    return {
			index: 0, // 当前tab
			tabs: [{
				name: "待处理",
				init: false,
				orderList: [],
				isLoaded: false,
				pages: 0
			}, {
				name: "处理中",
				init: false,
				orderList: [],
				isLoaded: false,
				pages: 0
			}, {
				name: "已出票",
				init: false,
				orderList: [],
				isLoaded: false,
				pages: 0
			}]
    }
  },
  methods: {
			// 获取订单列表
			getOrderList() {
        this.$vux.loading.show({
          text: 'Loading'
        })
        axios.get('/api/getOrderList')
        .then((response) => {
          Object.assign(this.tabs[this.index],{
            orderList: response.data.orderList,
            init: true
          });
          this.$nextTick(() => {
            this.$vux.loading.hide();
          })
        });
			},
			toggleTab (index) { // 切换tab
				// 初始化
        this.index = index;
				if (!this.tabs[this.index].init) {
					setTimeout(() => {
						this.getOrderList();
					},500);
				}
			},
      deleteOrder(index) {
        this.tabs[this.index].orderList.splice(index,1);
        event.stopPropagation();
      },
      toDetail(id) {
        this.$router.push({ path: '/detail', query: { id: id }})
      }
  },
  mounted () {
			this.getOrderList()
  },
  components: {
    Tab,
    TabItem,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  }
}
</script>

<style type="text/css" scoped>
.apin-container {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.apin-swipe {
  padding: .2rem;
  flex: 1;
}

.apin-tab-swiper {
  height: 100%;
  overflow-y: auto;
}

.page {
  padding: .2rem;
  flex: 1;
  overflow-y: auto;
  display: none;
}

.page.active {
  display: block;
}

.list {
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, .2);
  margin-top: 0;
  margin-bottom: 0.2rem;
}

.page .list:last-child {
  margin-bottom: 0;
}


.list-content {
  display: inline-block;
  width: 100%;
  padding: 0.13rem 0.3rem;
  box-sizing: border-box;
  font-size: 14px;
}


.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.row .col:first-child {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.row .col:nth-child(2) {
  -webkit-box-flex: 2;
  -ms-flex: 2;
  flex: 2;
}

.row .col img {
  vertical-align: middle;
}
</style>