<template>
  <flexbox orient="vertical" :gutter="0" class="apin-order">
    <flexbox-item class="apin-form-area">
      <ul class="chat-wrapper">
        <li v-for="chat in chatList" class="chat-item" :class="{self: chat.self, other: !chat.self}">{{chat.content}}</li>
      </ul>
    </flexbox-item>
    <flexbox-item class="apin-btn-area">
      <x-input v-model="value" :show-clear="false" class="apin-btn-chat" @keyup.native.enter="chat"></x-input>
    </flexbox-item>
  </flexbox>
</template>

<script>
import axios from 'axios'
import { Flexbox, FlexboxItem, XInput } from 'vux'
export default {
  data() {
    return {
      value: '',
      chatList: [{
        content:"sss",
        self:false
      },{
        content:"sssssss",
        self:true
      },{
        content:"sss",
        self:true
      }]
    }
  },
  methods: {
    chat(){
      this.chatList.push({
        self: true,
        content: this.value
      });
      this.value = ''
    }
  },
  components: {
    Flexbox, FlexboxItem, XInput
  }
}
</script>

<style type="text/css" scoped>
.apin-order {
  min-height: 100%;
}
.apin-form-area {
  overflow-y: auto;
}
.chat-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
}
.chat-item {
  padding: 3px 10px;
  margin-bottom: 20px;
  list-style-type: none;
  background-color: #04BE02;
  border-radius: 5px;
  position: relative;
}
.chat-item::after {
  display: block;
  content: '';
  position: absolute;
  top: -12px;
  width: 26px;
  height: 30px;
  border-right: 8px solid #04BE02;
  border-radius: 50%;
  transform: rotate(90deg); 
  z-index: -1;
}
.chat-item.self {
  align-self: flex-end;
}
.chat-item.self::after {
  right: -12px;
}
.chat-item.other::after {
  left: -12px;
}


.vux-flexbox .vux-flexbox-item.apin-btn-area {
  padding: 10px;
  flex: none;
  box-sizing: border-box;
}

.apin-btn-area .apin-btn-chat {
  background-color: white;
  border: 1px solid #ddd;
  padding: 3px 10px;
}
</style>