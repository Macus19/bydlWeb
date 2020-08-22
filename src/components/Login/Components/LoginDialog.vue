<template>
  <div class="login-dialog-container">
    <div class="login-dialog-close" @click="closeLoginDialog">×</div>
    <p class="login-dialog-title">登录</p>
    <div class="login-dialog-input">
      <div class="input-account">
        <p>账号</p>
        <input type="text" v-model="account"/>
      </div>
      <div class="input-password" >
        <p>密码</p>
        <input type="password" v-model="password"/>
      </div>
    </div>
    <p v-if="showErrorTip" class="login-dialog-error-tip">密码验证不通过，请重试</p>
    <div class="login-dialog-btn" @click="login">登录</div>
  </div>
</template>

<script>
import Qs from 'qs'
import global from '../../../assets/config/global'

export default {
  name: 'LoginDialog',
  data () {
    return {
      // 账号
      account: '',
      // 密码
      password: '',
      // 是否显示密码错误提示
      showErrorTip: false
    }
  },

  components: {},

  methods: {
    /**
     *关闭登录框，触发父组件函数
     */
    closeLoginDialog: function () {
      this.$emit('closeLoginDialog', true)
    },
    /**
     * 登录
     */
    login: function () {
      this.axios({
        url: '/api/admin/web_login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          number: this.account,
          password: this.password
        },
        transformRequest: [function (data) {
          data = Qs.stringify(data)
          return data
        }]
      }).then((res) => {
        if (res.data.status === 200) {
          global.token = res.data.msg
          localStorage.setItem('token', res.data.msg)
          this.closeLoginDialog()
          this.getCollageList()
          this.$router.push('/CeremonySignUp')
        } else {
          this.isShowErrorTip = true
        }
      })
    },
    /**
     * 获取所有学院id
     */
    getCollageList: function () {
      this.axios.get('/api/admin/get_college_id', {
        headers: {
          token: global.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        this.global.collageList = res.data.data
      })
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
