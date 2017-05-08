<template>
  <flexbox orient="vertical" :gutter="0" class="apin-order">
    <flexbox-item>
      <group>
        <cell title="人数" :value="orderInfo.number"></cell>
        <cell title="价格" :value="orderInfo.price"></cell>
      </group>
    </flexbox-item>
    <flexbox-item class="apin-btn-area">
      <x-button type="primary">确认</x-button>
    </flexbox-item>
  </flexbox>
</template>

<script>
import axios from 'axios'
import { Group, Cell, Flexbox, FlexboxItem, XButton } from 'vux'
export default {
  data () {
    return {
      orderInfo: {}
    }
  },
  mounted () {
    axios.get('/api/suuply')
        .then((response) => {
          this.orderInfo = response.data;
        });
  },
  components: {
    Group, Cell,Flexbox, FlexboxItem, XButton
  }
}
</script>

<style type="text/css" scoped>
.apin-order {
  height: 100%;
}

.vux-flexbox .vux-flexbox-item.apin-btn-area {
  flex: none;
  padding: 1em;
  box-sizing: border-box;
}
</style>