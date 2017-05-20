<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
html,
body,
#app {
  height: 100%;
}
body {
  background-color: #fbf9fe;
}
.vux-x-input.weui-cell_warn {
  color: #000;
}

#app .weui-cells {
  margin-top: -1px;
}
</style>
