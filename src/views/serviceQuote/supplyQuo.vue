<template>
  <flexbox orient="vertical" :gutter="0" class="apin-order">
    <flexbox-item>
      <group label-width="5em" label-margin-right="1.5em" ref="validate">
        <x-input title="业务员姓名" placeholder="必填" v-model="name" value-text-align="left" required></x-input>
        <cell title="供应匹配" value-align="left">
          <checker v-model="supply" default-item-class="apin-select" selected-item-class="apin-selected">
            <checker-item value="1">是</checker-item>
            <checker-item value="2">否</checker-item>
          </checker>
        </cell>
        <x-input title="起飞机场" placeholder="必填" v-model="offAirport" value-text-align="left" required></x-input>
        <x-input title="降落机场" placeholder="必填" v-model="landAirport" value-text-align="left" required></x-input>
        <x-input title="供应商A" placeholder="必填" v-model="supplyA.name" value-text-align="left" required></x-input>
        <x-input title="航班信息" placeholder="必填" v-model="supplyA.flightInfo" value-text-align="left" required></x-input>
        <x-input type="number" title="总价含税/人" placeholder="必填" v-model="supplyA.price" value-text-align="left" required></x-input>
        <x-input title="供应商B" placeholder="选填" v-model="supplyB.name" value-text-align="left"></x-input>
        <x-input title="航班信息" placeholder="选填" v-model="supplyB.flightInfo" value-text-align="left"></x-input>
        <x-input type="number" title="总价含税/人" placeholder="选填" v-model="supplyB.price" value-text-align="left"></x-input>
        <x-input title="供应商C" placeholder="选填" v-model="supplyC.name" value-text-align="left"></x-input>
        <x-input title="航班信息" placeholder="选填" v-model="supplyC.flightInfo" value-text-align="left"></x-input>
        <x-input type="number" title="总价含税/人" placeholder="选填" v-model="supplyC.price" value-text-align="left"></x-input>
        <popup-picker title="未成交原因" :data="resonList" v-model="reason"></popup-picker>
        <x-input title="备注" placeholder="选填" v-model="remarks" value-text-align="left"></x-input>
      </group>
    </flexbox-item>
    <flexbox-item class="apin-btn-area">
      <x-button type="primary" @click.native="confirm">出单</x-button>
    </flexbox-item>
  </flexbox>
</template>

<script>
import axios from 'axios'
import { Group, Cell, Flexbox, FlexboxItem, XButton, PopupPicker, XInput, Checker, CheckerItem } from 'vux'
export default {
  data() {
    return {
      name: '',
      supply: '1',
      offAirport: '',
      landAirport: '',
      supplyA: {
        name: '',
        flightInfo: '',
        price: ''
      },
      supplyB: {
        name: '',
        flightInfo: '',
        price: ''
      },
      supplyC: {
        name: '',
        flightInfo: '',
        price: ''
      },
      resonList: [['待客人回复', '询参考价', '行程不可靠', '客人预算低', '供应商价格高']],
      reason: ['待客人回复'],
      remarks: ''
    }
  },
  components: {
    Group, Cell, Flexbox, FlexboxItem, XButton, PopupPicker, XInput, Checker, CheckerItem
  },
  methods: {
    validate() {
      this.$refs.validate.$children.map(item => {
        if (('valid' in item) && !item.valid && ('iconType' in item)) item.blur();
      });
    },
    confirm() {
      // if (this.validate()) { 
        this.$router.push({ path: '/list', query: { type: 2 } });
      //  }
    }
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

.apin-select {
    padding: 0 20px;
    border: 1px solid #ccc;
    display: inline-block;
    line-height: 25px;
    text-align: center;
    margin-right: 5px;
}

.apin-selected {
    color: #fff;
    background-color: #09bb07;
    border-color: #09bb07;
}
</style>