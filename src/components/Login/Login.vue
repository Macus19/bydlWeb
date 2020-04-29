/* eslint-disable no-tabs */
<template>
  <div class="login-container">
    <div class="login-title">
      <p>毕业典礼排队后台系统</p>
      <p>Backstage System for Graduation Ceremony</p>
    </div>
    <div class="login-btn" @click="showLoginDialog">
      登录
    </div>
    <login-dialog class="login-dialog" v-show="isShowLoginDialog" @closeLoginDialog="closeLoginDialog"></login-dialog>
  </div>
</template>

<script>
import LoginDialog from '../../components/Login/Components/LoginDialog'

export default {
  data () {
    return {
      isShowLoginDialog: false
    }
  },

  components: {
    LoginDialog
  },

  methods: {
    showLoginDialog: function () {
      this.$emit('showBlur', true)
      this.isShowLoginDialog = true
    },
    closeLoginDialog: function () {
      this.$emit('closeBlur', false)
      this.isShowLoginDialog = false
    }
  }
}

</script>
<style scoped>
.login-container{
    width:100%;
    height: 100%;
    background-image: url('../../assets/image/Login/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
}
.login-title{
  margin-top: 150px;
  font-size: 34px;
  text-align: center;
}
.login-title p{
  margin:10px 0;
}
.login-btn{
  width: 300px;
  height: 50px;
  background-color: #ff4133;
  box-shadow: 0px 6px 20px 0px rgba(250, 43, 43, 0.22);
  border-radius: 33px;
  text-align: center;
  font-size:26px;
  color: #ffffff;
  line-height: 50px;
  vertical-align: middle;
  margin: 10px auto;
  cursor: pointer;
}
.login-dialog{
  position: fixed;
  z-index: 100;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
</style>
