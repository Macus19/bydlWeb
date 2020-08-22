<template>
  <div class="delete-dialog-container">
    <p>是否确定删除该学生？</p>
    <div class="btns-container">
      <div class="btns" @click="deleteUser()">确定</div>
      <div class="btns" @click="closeDeleteDialog()">取消</div>
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

  methods: {
    closeDeleteDialog: function () {
      this.$emit('closeDialog', true)
    },
    deleteUser: function () {
      this.$emit('deteleUser', true)
    }
  }
}

</script>
<style scoped>
.delete-dialog-container{
    width: 400px;
    text-align: center;
}
.btns-container{
    display: flex;
    justify-content: space-between;
}
.btns{
    width:150px;
    height: 30px;
    color: #fff;
    background-color: #ff4133;
    text-align: center;
    line-height: 30px;
    vertical-align: middle;
    border-radius: 5px;
    cursor: pointer;
}
</style>
