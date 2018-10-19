<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
require('./common/js/setRem.js')
export default {
  name: 'App'
};
</script>

<style lang="stylus">
  @import './common/stylus/index.styl';
</style>
