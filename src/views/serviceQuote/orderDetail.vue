<template>
  <flexbox orient="vertical" :gutter="0" class="apin-order">
    <flexbox-item class="apin-form-area">
      <group>
        <cell title="区域" :value="orderInfo.area_code"></cell>
        <cell title="团散" :value="orderInfo.is_group"></cell>
        <cell title="人员" :value="orderInfo.is_employee"></cell>
        <cell title="开始日期" :value="orderInfo.from_date"></cell>
        <cell title="结束日期" :value="orderInfo.to_date"></cell>
        <cell title="旅行社城市" :value="orderInfo.trval_agency_city"></cell>
        <cell title="旅行社名称" :value="orderInfo.trval_agency_name"></cell>
        <cell title="出发城市" :value="orderInfo.from_city"></cell>
        <cell title="到达城市" :value="orderInfo.to_city"></cell>
        <cell title="返程天数" :value="orderInfo.turn_days"></cell>
        <cell title="出行人数" :value="orderInfo.total_count"></cell>
        <cell title="儿童人数" :value="orderInfo.child_count"></cell>
      </group>
    </flexbox-item>
    <flexbox-item class="apin-btn-area">
      <x-button type="primary" class="apin-btn" @click.native="supply">领单</x-button>
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
    orderId() {
      return this.$route.query.id
    }
  },
  methods: {
    supply() {
      axios.post(this.$store.state.host + '/order/orderManager/handleOrder', {
        order_id: this.orderId
      }).then((response) => {
        if (response.data.code == 1)
          this.$router.push({ path: '/list', query: { type: 1 } });
        else
          this.$vux.alert.show({
            title: '提示',
            content: response.data.msg,
          })
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted() {
    axios.post(this.$store.state.host + '/order/orderManager/orderDetail', {
      order_id: this.orderId
    }).then((response) => {
      console.log(response);
      this.orderInfo = Object.assign({}, this.orderInfo, response.data.data);
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