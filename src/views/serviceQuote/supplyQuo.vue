<template>
  <flexbox orient="vertical" :gutter="0" class="apin-order">
    <flexbox-item>
      <group label-width="5em" label-margin-right="1.5em" ref="validate">
        <x-input title="业务员姓名" placeholder="必填" v-model="formData.clerk_name" value-text-align="left" required></x-input>
        <cell title="供应匹配" value-align="left">
          <checker v-model="formData.is_supply_match" default-item-class="apin-select" selected-item-class="apin-selected">
            <checker-item value="0">是</checker-item>
            <checker-item value="1">否</checker-item>
          </checker>
        </cell>
        <x-input title="供应商A" placeholder="必填" v-model="formData.a_supplier" value-text-align="left" required></x-input>
        <x-textarea title="航班信息" placeholder="必填" v-model="formData.a_flight_info" value-text-align="left" required></x-textarea>
        <x-input type="number" title="总价含税/人" placeholder="必填" v-model="formData.a_total_price_tax" value-text-align="left" required></x-input>
        <x-input title="供应商B" placeholder="选填" v-model="formData.b_supplier" value-text-align="left"></x-input>
        <x-input title="航班信息" placeholder="选填" v-model="formData.b_flight_info" value-text-align="left"></x-input>
        <x-input type="number" title="总价含税/人" placeholder="选填" v-model="formData.b_total_price_tax" value-text-align="left"></x-input>
        <x-input title="供应商C" placeholder="选填" v-model="formData.c_supplier" value-text-align="left"></x-input>
        <x-input title="航班信息" placeholder="选填" v-model="formData.c_flight_info" value-text-align="left"></x-input>
        <x-input type="number" title="总价含税/人" placeholder="选填" v-model="formData.c_total_price_tax" value-text-align="left"></x-input>
        <popup-picker title="未成交原因" :data="resonList" v-model="formData.unsubmite_reason_code" show-name></popup-picker>
        <x-input title="备注" placeholder="选填" v-model="formData.remarks" value-text-align="left"></x-input>
      </group>
    </flexbox-item>
    <flexbox-item class="apin-btn-area">
      <x-button type="primary" @click.native="confirm">供应商报价</x-button>
    </flexbox-item>
  </flexbox>
</template>

<script>
import axios from 'axios'
import { Group, Cell, Flexbox, FlexboxItem, XButton, PopupPicker, XInput, Checker, CheckerItem, XTextarea } from 'vux'
export default {
  data() {
    return {
      formData: {
        a_flight_info: '',
        a_supplier: '',
        a_total_price_tax: '',
        b_flight_info: '',
        b_supplier: '',
        b_total_price_tax: '',
        c_flight_info: '',
        c_supplier: '',
        c_total_price_tax: '',
        clerk_name: '',
        is_supply_match: '0',
        order_id: '',
        remarks: '',
        unsubmite_reason_code: ['1']
      },
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
    resonCode() {
      return this.formData.unsubmite_reason_code[0];
    },
    orderId() {
      return this.$route.query.id
    }
  },
  components: {
    Group, Cell, Flexbox, FlexboxItem, XButton, PopupPicker, XInput, XTextarea, Checker, CheckerItem
  },
  methods: {
    validate() {
      var res = true;
      this.$refs.validate.$children.map(item => {
        if (('valid' in item) && !item.valid && ('iconType' in item)) {
          item.blur();
          res = false;
        };
      });
      return res;
    },
    confirm() {
      if (!this.validate()) return;
      let formData = Object.assign({}, this.formData, {
        unsubmite_reason_code: this.resonCode,
        order_id: this.orderId
      })
      axios.post(this.$store.state.host + '/order/orderManager/offerPriceOrder', formData)
        .then((response) => {
          if (response.data.code == 1)
            this.$router.push({ path: '/list', query: { type: 2 } });
          else
            this.$vux.alert.show({
              title: '提示',
              content: response.data.msg,
            })
        })
        .catch(function (error) {
          console.log(error);
        });
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