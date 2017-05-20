<template>
  <flexbox orient="vertical" :gutter="0" class="apin-order">
    <flexbox-item class="apin-form-area">
      <group>
        <cell title="区域" :value="orderInfo.zone"></cell>
        <cell title="团散" :value="orderInfo.group"></cell>
        <cell title="人员" :value="orderInfo.people"></cell>
        <cell title="开始日期" :value="orderInfo.startTime"></cell>
        <cell title="结束日期" :value="orderInfo.endTime"></cell>
        <cell title="旅行社城市" :value="orderInfo.travelAgencyCity"></cell>
        <cell title="旅行社名称" :value="orderInfo.travelAgencyName"></cell>
        <cell title="出发城市" :value="orderInfo.startCity"></cell>
        <cell title="到达城市" :value="orderInfo.endCity"></cell>
        <cell title="返程天数" :value="orderInfo.days"></cell>
        <cell title="出行人数" :value="orderInfo.number"></cell>
        <cell title="业务员姓名" :value="orderInfo.child"></cell>
        <cell title="供应匹配" :value="orderInfo.child"></cell>
        <cell title="起飞机场" :value="orderInfo.child"></cell>
        <cell title="降落机场" :value="orderInfo.child"></cell>
        <cell title="供应商A" :value="orderInfo.child"></cell>
        <cell title="航班信息" :value="orderInfo.child"></cell>
        <cell title="总价含税/人" :value="orderInfo.child"></cell>
        <cell title="供应商B" :value="orderInfo.child"></cell>
        <cell title="航班信息" :value="orderInfo.child"></cell>
        <cell title="总价含税/人" :value="orderInfo.child"></cell>
        <cell title="供应商C" :value="orderInfo.child"></cell>
        <cell title="航班信息" :value="orderInfo.child"></cell>
        <cell title="总价含税/人" :value="orderInfo.child"></cell>
        <cell title="未成交原因" :value="orderInfo.child"></cell>
        <cell title="备注" :value="orderInfo.child"></cell>
      </group>
    </flexbox-item>
    <flexbox-item class="apin-btn-area">
      <x-button type="primary" class="apin-btn" @click.native="toList">{{tip}}</x-button>
    </flexbox-item>
  </flexbox>
</template>

<script>
import axios from 'axios'
import { Flexbox, FlexboxItem, Group, Cell, XInput, Datetime, XNumber, XButton, Checker, CheckerItem } from 'vux'
export default {
  data() {
    return {
      orderInfo: {}
    }
  },
  computed: {
    type() {
      return this.$route.query.type
    },
    tip() {
      let tip = ''
      // switch (this.type) {
      //   case '2':
      //     tip = "出票";
      //     break;
      //   case '3':
      //   debugger;
      //     tip = "确认";
      //     break;
      // }
      if (this.type == '3') {
        tip = "确认";
      }else {
        tip = '出票'
      }
      return tip;
    }
  },
  methods: {
    toList() {
      this.$router.push({ path: '/list', query: { type: 3 } });
    }
  },
  mounted() {
    axios.get('/api/getOrderDetail')
      .then((response) => {
        this.orderInfo = response.data;
      });
  },
  components: {
    Group, Cell, Flexbox, FlexboxItem, XButton
  }
}
</script>

<style type="text/css" scoped>
.apin-order {
  min-height: 100%;
}

.vux-flexbox .vux-flexbox-item.apin-btn-area {
  flex: none;
  padding: 1em;
  box-sizing: border-box;
}

.apin-btn {
  background-color: orange;
  color: #fff;
}

.apin-btn.weui-btn_primary:not(.weui-btn_disabled):active {
  background-color: #fa0;
}
</style>