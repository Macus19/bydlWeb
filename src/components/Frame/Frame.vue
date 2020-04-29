<template>
  <div class="frame">
    <div class="inner">
      <navigator></navigator>
      <div class="main">
          <router-view @showBlur="showBlur" @closeBlur="closeBlur"></router-view>
      </div>
      <foot></foot>
    </div>
    <div class="mask" :class="{'dialog-blur':isShowDialog}"></div>
  </div>
</template>

<script>
import navigator from '../Frame/Components/Navigator'
import foot from '../Frame/Components/Footer'
import LoginDialog from '../../components/Login/Components/LoginDialog'

export default {
  data () {
    return {
      isShowDialog: false
    }
  },

  components: {
    navigator,
    foot,
    LoginDialog
  },

  methods: {
    showBlur: function () {
      console.log(4)
      this.isShowDialog = true
    },
    closeBlur: function () {
      this.isShowDialog = false
    }
  }
}

</script>
<style scoped>

.frame{
  height: 100%;
  position: relative;
}
.main{
  height: 88vh;
  /* padding-bottom: 150px; */
}
.mask{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
  z-index: -1
}
.dialog-blur{
  backdrop-filter: blur(10px);
  z-index: 5;
}
.footer{
  width: 100%;
  bottom:0;
  position: absolute;
}
.login-dialog{
  position: absolute;
  z-index: 100;
  top:20px;
  left:20px;
}
</style>
