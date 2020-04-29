<template>
  <div class="login-dialog-container">
    <div class="login-dialog-close" @click="closeLoginDialog">×</div>
    <p class="login-dialog-title">登录</p>
    <div class="login-dialog-input">
      <div class="input-account">
        <p>账号</p>
        <input type="text" />
      </div>
      <div class="input-password">
        <p>密码</p>
        <input type="password" />
      </div>
    </div>
    <p class="login-dialog-error-tip">密码验证不通过，请重试</p>
    <div class="login-dialog-btn">登录</div>
  </div>
</template>

<script>
export default {
  name: 'LoginDialog',
  data () {
    return {
    }
  },

  components: {},

  methods: {
    closeLoginDialog: function () {
      console.log(1)
      this.$emit('closeLoginDialog', true)
    }
  }
}
</script>
<style scoped>
.login-dialog-container {
  width: 400px;
  height: 300px;
  padding: 10px;
  background-color:rgba(255,255,255,0.5);
  border-radius: 18px;
}
.login-dialog-title {
  text-align: center;
  font-size: 20px;
  color: #111111;
}
.login-dialog-input{
  width:260px;
  margin:10px auto ;
}
.input-account p,
.input-password p {
  margin: 10px;
  color: #111111;
}
input {
  width:260px;
  background-color: transparent;
  border-bottom: 1px solid #707070;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}
.login-dialog-error-tip{
  width: 260px;
  margin: 10px auto;
  color: #ff4133;
  font-size: 12px;
}
.login-dialog-btn{
  width: 180px;
  height: 40px;
  background-color: #ff4133;
  box-shadow: 0px 6px 20px 0px rgba(250, 43, 43, 0.22);
  border-radius: 33px;
  text-align: center;
  font-size:20px;
  color: #ffffff;
  line-height: 40px;
  vertical-align: middle;
  margin: 10px auto;
  cursor: pointer;
}
.login-dialog-close{
  margin: 0 0 0 450px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius:50% ;
  text-align: center;
  background-color:rgba(255,255,255,0.5);
}
</style>
