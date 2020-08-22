<template>
  <div class="backgroung-system-setting-container">
    <div class="backgroung-system-setting-tabbar">
        <div class="tabbar-help">帮助与反馈</div>
        <div class="tabbar-instructor">系统使用说明</div>
        <div class="tabbar-solution">常见问题解决方法</div>
        <img class="sitting-image" src="../../assets/image/BackgroundSystemSetting/sitting.png">
    </div>
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
.backgroung-system-setting-container{
  background-color: rgba(43, 68, 255, 0.05);
  height: 100%;
  overflow: hidden;
}
.backgroung-system-setting-tabbar{
    width:70%;
    margin: 150px auto;
    box-shadow: 0px 3px 6px 0px rgba(10, 40, 248, 0.07);
    border-radius:30px ;
    position: relative;
}
.backgroung-system-setting-tabbar div{
    height: 100px;
    text-align: center;
    line-height: 100px;
    color:#ff4133 ;
}
.tabbar-help{
    background-color: #fff;
    border-radius: 30px 30px 0 0;
}
.tabbar-instructor{
    background-color: rgba(255, 65, 51, 0.08);
}
.tabbar-solution{
    background-color:rgba(31, 40, 207, 0.1);
    border-radius: 0 0 30px 30px;
}
.sitting-image{
    width:250px;
    height:auto;
    position: absolute;
    bottom: -50px;
    right:-100px
}
</style>
