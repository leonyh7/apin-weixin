<template>
  <flexbox orient="vertical" :gutter="0" class="apin-order">
    <flexbox-item class="apin-form-area">
      <group label-width="5em">
        <cell title="区域" :value="orderInfo.area_code | area"></cell>
        <cell title="人员" :value="orderInfo.is_employee | employee"></cell>
        <cell title="行程类型" :value="orderInfo.route_type | route"></cell>
        <cell title="团散" :value="orderInfo.is_group | group"></cell>
        <cell title="大区域" :value="orderInfo.area_code | bigArea"></cell>
        <cell title="开始日期" :value="orderInfo.from_date"></cell>
        <cell title="结束日期" :value="orderInfo.to_date"></cell>
        <cell title="旅行社名称" :value="orderInfo.trval_agency_name"></cell>
        <cell title="出发城市" :value="orderInfo.from_city"></cell>
        <cell title="到达城市" :value="orderInfo.to_city"></cell>
        <cell title="返程天数" :value="orderInfo.turn_days"></cell>
        <cell title="出行人数" :value="orderInfo.total_count"></cell>
        <cell title="业务员姓名" :value="orderInfo.clerk_name"></cell>
        <cell title="供应匹配" :value="orderInfo.is_supply_match | supply"></cell>
        <cell title="供应商A" :value="orderInfo.a_supplier"></cell>
        <cell title="航班信息" :value="orderInfo.a_flight_info"></cell>
        <cell title="总价含税/人" :value="orderInfo.a_total_price_tax"></cell>
        <cell title="供应商B" :value="orderInfo.b_supplier"></cell>
        <cell title="航班信息" :value="orderInfo.b_flight_info"></cell>
        <cell title="总价含税/人" :value="orderInfo.b_total_price_tax·"></cell>
        <cell title="供应商C" :value="orderInfo.c_supplier"></cell>
        <cell title="航班信息" :value="orderInfo.c_flight_info"></cell>
        <cell title="总价含税/人" :value="orderInfo.c_total_price_tax"></cell>
        <popup-picker title="未成交原因" :data="resonList" v-model="resonCode" show-name></popup-picker>
        <cell title="备注" :value="orderInfo.remarks"></cell>
      </group>
    </flexbox-item>
    <flexbox-item class="apin-btn-area">
      <x-button type="primary" class="apin-btn" @click.native="toList">归集</x-button>
    </flexbox-item>
  </flexbox>
</template>

<script>
import axios from 'axios'
import { Flexbox, FlexboxItem, Group, Cell, XButton, PopupPicker } from 'vux'
export default {
  data() {
    return {
      orderInfo: {
      },
      resonCode: [],
      resonList: [[{
        name: '待客人回复',
        value: '1',
      }, {
        name: '询参考价',
        value: '2',
      }, {
        name: '行程不可靠',
        value: '3',
      }, {
        name: '客人预算低',
        value: '4',
      }, {
        name: '供应商价格高',
        value: '5',
      }]]
    }
  },
  computed: {
    type() {
      return this.$route.query.type
    },
    orderId() {
      return this.$route.query.id
    },
    newReasonCode() {
      return this.resonCode[0]
    }
  },
  methods: {
    toList() {
      axios.post(this.$store.state.host + '/order/orderManager/orderToCollection', {
        order_id: this.orderId,
        unsubmite_reason_code: this.newReasonCode || 1
      })
        .then((response) => {
          this.$router.push({ path: '/list', query: { type: 3 } });
        });
    }
  },
  mounted() {
    axios.post(this.$store.state.host + '/order/orderManager/offPriceOrderDetail', {
      order_id: this.orderId
    })
      .then((response) => {
        this.orderInfo = Object.assign({}, this.orderInfo, response.data.data);
        this.resonCode = [String(this.orderInfo.unsubmite_reason_code)];
        this.$forceUpdate();
      });
  },
  components: {
    Group, Cell, Flexbox, FlexboxItem, XButton, PopupPicker
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