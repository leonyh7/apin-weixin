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
        <cell title="儿童人数" :value="orderInfo.child"></cell>
      </group>
    </flexbox-item>
    <flexbox-item class="apin-btn-area">
      <x-button type="primary" class="apin-btn" @click.native="pay">支付款项</x-button>
    </flexbox-item>
  </flexbox>
</template>

<script>
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
    }
  },
  methods: {
    pay() {
      this.$router.push({ path: '/apply' });
    }
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