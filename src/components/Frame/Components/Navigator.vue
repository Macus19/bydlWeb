<template>
  <div class="navi-container">
    <!-- 菜单导航栏 -->
    <el-menu router="true" class="navi-el-menu" :default-active="activeIndex" mode="horizontal" background-color="#ffffff" text-color="#AEB0F0">
      <el-menu-item index="/CeremonySignUp">
        <div class="navi-item">典礼报名管理</div>
      </el-menu-item>
      <el-menu-item index="2">
        <div class="navi-item">主控现场管理</div>
      </el-menu-item>
      <el-menu-item index="/UserManage">
        <div class="navi-item">用户账号管理</div>
      </el-menu-item>
      <el-menu-item index="4">
        <div class="navi-item">小程序设置</div>
      </el-menu-item>
      <el-menu-item index="5">
        <div class="navi-item">系统后台设置</div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  methods: {}
}

</script>
<style scoped>
.navi-item{
  margin: 0;
  height: 40px;
  border-bottom: 1px solid #1f28cf;
}
.navi-el-menu /deep/ .el-menu-item{
  -webkit-transition: none;
  transition: none;
}
.navi-el-menu /deep/ .el-menu-item.is-active{
  border-bottom: none
}
</style>
