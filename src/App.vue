<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import global from '../src/assets/config/global'

export default {
  name: 'App',
  created: function () {
    this.getCollageList()
  },
  mounted: function () {
    if (localStorage.getItem('token')) {
      global.token = localStorage.getItem('token')
    } else {
      this.$router.push('/')
    }
  },
  methods: {
  }
}
</script>

<style>
html,body{
  height:100%;
  margin: 0;
}
#app {
  height:100%;
}
.v-modal{
  background: none;
  opacity: 1;
  backdrop-filter: blur(10px);
}
.el-message-box{
  width: 400px;
  height: 300px;
  padding: 10px;
  background-color: transparent;
  border:none;
  box-shadow: none;
}
.el-message-box .el-message-box__btns{
  display: flex;
  justify-content: space-around;
}
.el-message-box /deep/ .el-button{
  width:150px;
  background-color: #ff4133;
  color: #fff;
  border: 1px solid #ff4133;
}
</style>
