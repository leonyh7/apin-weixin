<template>
  <div class="apin-container">
    <tab v-model="index">
      <tab-item v-for="(tab, index) in tabs" :key="index" @click.native="toggleTab(index)">{{tab.name}}</tab-item>
    </tab>
  
    <swipeout class="page" :class="{active: index==i}" v-for="(tab,i) in tabs" :key="i"> 
      <swipeout-item ref="swipeoutItem" class="list pending" v-for="(order,j) in tab.orderList" :right-menu-width="210" :key="i+''+j" @click.native="toDetail(order.orderId, tab.type)">
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
              <img src="../../assets/plane.png" /> {{order.end}}
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
  
    <router-link class="add" :to="{path: '/need'}">
      <span>+</span>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
import { Tab, TabItem, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
export default {
  data() {
    return {
      index: 0, // 当前tab
      tabs: [{
        name: "待审核",
        init: false,
        orderList: [],
        isLoaded: false,
        pages: 0,
        type: 0
      }, {
        name: "已审核",
        init: false,
        orderList: [],
        isLoaded: false,
        pages: 0,
        type: 1
      }, {
        name: "已出票",
        init: false,
        orderList: [],
        isLoaded: false,
        pages: 0,
        type: 2
      }]
    }
  },
  methods: {
    // 获取订单列表
    getOrderList() {
      this.$vux.loading.show({
        text: 'Loading'
      })
      axios.get('/api/getIssueList')
        .then((response) => {
          Object.assign(this.tabs[this.index], {
            orderList: response.data.issueList,
            init: true
          });
          this.$nextTick(() => {
            this.$vux.loading.hide();
          })
        });
    },
    toggleTab(index) { // 切换tab
      // 初始化
      this.index = index;
      if (!this.tabs[this.index].init) {
        setTimeout(() => {
          this.getOrderList();
        }, 500);
      }
    },
    deleteOrder(index) {
      this.tabs[this.index].orderList.splice(index, 1);
      event.stopPropagation();
    },
    toDetail(id, type) {
      switch (type) {
        case 0:
          this.$router.push({ path: '/detail', query: { type } })
          break;
        case 1:
          this.$router.push({ path: '/supply' })
          break;
        case 2:
          this.$router.push({ path: '/issue', query: { type } })
          break;
        case 3:
          this.$router.push({ path: '/issue', query: { type } })
          break;
        default:
          break;
      }
    }
  },
  created() {
    let type = Number(this.$route.query.type)
    if (type) this.index = type
  },
  mounted() {
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

.page {
  box-sizing: border-box;
  padding: 10px;
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
  margin-bottom: 10px;
}

.list.pending {
  border-left: solid 3px #04BE02;
}

.page .list:last-child {
  margin-bottom: 0;
}


.list-content {
  display: inline-block;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
}


.row {
  display: flex;
}

.row .col:first-child {
  flex: 1;
}

.row .col:nth-child(2) {
  flex: 2;
}

.row .col img {
  vertical-align: middle;
}

.add {
  display: flex;
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: #04BE02;
  width: 40px;
  height: 40px;
  font-size: 24px;
  border-radius: 50%;
  color: #fff;
  justify-content: center;
  align-items: center;
}

.add span {
  height: 40px;
}
</style>