<template>
  <div class="user-manage-container">
    <!-- 按钮栏 -->
    <el-row class="btn-container" :gutter="10" type="flex" justify="space-between">
      <el-col class="operate-btn" :span="7">
        <div v-if="currentTable=='ManagerTable'" @click="showAddAdminDialog()" class="add-manager">添加管理员</div>
        <div v-if="currentTable=='UserTable'" class="data-import">数据导入</div>
        <div v-if="currentTable=='UserTable'" @click="showAddUserDialog()" class="add-user">添加用户</div>
        <div v-if="currentTable=='UserTable'" @click="multipleDelete()" class="delete">批量删除</div>
      </el-col>
      <el-col :span="4">
        <el-input
          v-if="currentTable=='UserTable'"
          class="search-input"
          prefix-icon="el-icon-search"
          type="text"
          placeholder="字符特征查询"
        ></el-input>
      </el-col>
    </el-row>
    <!-- tab切换表格 -->
    <div class="table-container">
      <div class="table-tabbar">
        <div id="user-tab" :class="activeClass==0?'active-user-tab':'normal-user-tab'" data-index="0" @click="changeTable('UserTable',$event)">小程序用户</div>
        <div id="manager-tab" :class="activeClass==1?'active-tab':'normal-tab'" data-index="1" @click="changeTable('ManagerTable',$event)">管理员用户</div>
      </div>
      <component :ref="currentTable" :is ="currentTable" :currentPage="currentPage" @getTotal="getTotal($event)"></component>
    </div>
    <!-- 分页 -->
    <div class="user-manage-pagination">
      <el-pagination
        class="user-manage-el-pagination"
        :page-size="10"
        :current-page.sync="currentPage"
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, jumper, slot"
        :total="total">
        <el-button>跳转</el-button>
      </el-pagination>
    </div>
    <el-dialog class="add-admin-container" width="65%" title="添加管理员" :visible.sync="isShowAddAdminDialog">
      <el-form :model="addAdmin" label-width="80px" :inline="true">
        <el-form-item label="用户名">
          <el-input v-model="addAdmin.username"></el-input>
        </el-form-item>
        <el-form-item label="工号(账号)">
          <el-input v-model="addAdmin.number"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="addAdmin.password"></el-input>
        </el-form-item>
        <hr>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="addAdmin.confirmPassword"></el-input>
        </el-form-item>
        <hr>
        <div class="btns-container">
          <el-button @click="addAdminFunc()">确认添加</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Qs from 'qs'
import global from '../../assets/config/global'
import UserTable from '../UserManage/components/UserTable'
import ManagerTable from '../UserManage/components/ManagerTable'

export default {
  data () {
    return {
      total: 0,
      currentPage: 1,
      isShowAddAdminDialog: false,
      activeClass: 0,
      currentTable: 'UserTable',
      userList: [
        {
          name: '学生1',
          studentId: '2018100102'
        },
        {
          name: '学生1',
          studentId: '2018100102'
        },
        {
          name: '学生1',
          studentId: '2018100102'
        }
      ],
      adminList: [
        {
          name: '管理员1',
          managerId: '20181003063'
        },
        {
          name: '管理员1',
          managerId: '20181003063'
        },
        {
          name: '管理员1',
          managerId: '20181003063'
        }
      ],
      addAdmin: {
        username: '',
        number: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  watch: {
    currentTable: function () {
      this.propList = (this.currentTable === 'UserTable' ? this.userList : this.adminList)
    }
  },

  components: {
    UserTable,
    ManagerTable
  },

  methods: {
    /**
     * 切换当前显示
     */
    changeTable: function (component, event) {
      this.currentTable = component
      this.activeClass = event.target.dataset.index
    },
    /**
     * 显示添加管理员Dialog
     */
    showAddAdminDialog: function () {
      this.isShowAddAdminDialog = true
    },
    /**
     * 添加管理员
     */
    addAdminFunc: function () {
      if (this.addAdmin.password !== this.addAdmin.confirmPassword) {
        this.$message({
          message: '两次输入密码不相等！',
          type: 'error'
        })
        return
      }
      this.axios({
        method: 'POST',
        url: '/api/admin/add_admin',
        data: {
          username: this.addAdmin.username,
          number: this.addAdmin.number,
          password: this.addAdmin.password
        },
        headers: {
          token: global.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
          data = Qs.stringify(data)
          return data
        }]
      }).then((res) => {
        if (res.data.status === 200) {
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
          this.isShowAddAdminDialog = false
          this.$refs.ManagerTable.getAdmin()
        } else {
          this.$message({
            message: res.data.msg,
            type: 'info'
          })
        }
      })
    },
    /**
     * 显示添加学生Dialog
     */
    showAddUserDialog: function () {
      this.$refs.UserTable.showAddDialog()
    },
    /**
     * 批量删除学生
     */
    multipleDelete: function () {
      this.$refs.UserTable.multipleDeleteStudent()
    },
    /**
     * 获得总的数据条目
     */
    getTotal: function (total) {
      this.total = total
    }
  }
}
</script>
<style scoped>
.user-manage-container{
  background-color: rgba(43, 68, 255, 0.05);
  height: 100%;
}
.user-manage-container /deep/ .el-dialog{
  width: 400px;
  height: 300px;
  padding: 10px;
  background-color:transparent;
  border:none;
  box-shadow: none;
}
.user-manage-container /deep/  .el-dialog__footer{
  display: flex;
  justify-content: space-around;
}
.user-manage-container /deep/  .el-dialog .el-button{
  width:150px;
  background-color: #ff4133;
  color: #fff;
  border: 1px solid #ff4133;
}
.data-import {
  cursor: pointer;
  width: 120px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  vertical-align: middle;
  background-color: #ff4133;
  box-shadow: 0px 3px 6px 0px rgba(10, 40, 248, 0.07);
  border-radius: 20px;
}
.add-user,
.delete,
.add-manager
{
  cursor: pointer;
  width: 120px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  vertical-align: middle;
  background-color: #1f28cf;
  box-shadow: 0px 3px 6px 0px rgba(10, 40, 248, 0.07);
  border-radius: 20px;
}
.operate-btn {
  display: flex;
  justify-content: space-between;
}
.search-input /deep/ .el-input {
  width: 200px;
}
.search-input /deep/ .el-input__inner {
  width: 180px;
  height: 30px;
  border-radius: 20px;
}
.search-input /deep/ input::placeholder {
  color: #ff4133;
  opacity: 0.55;
}
.search-input /deep/ .el-input__icon {
  line-height: 30px;
  color: #ff4133;
}
.btn-container {
  padding: 10px 50px;
  margin: 0 !important;
}
.table-tabbar{
  width:48px;
  z-index: 10;
  position: absolute;
  top:0;
  left:45px;
  cursor: pointer;
}
.table-container{
  width:60%;
  padding-left:45px;
  position:relative;
  margin: 10px auto;
}
#user-tab{
  width:24px;
  padding: 71px 20px;
  line-height: 28px;
  font-size: 16px;
  border-top-left-radius: 36px;
  text-align: center;
}
#manager-tab{
  width:24px;
  margin-top: -25px;
  padding: 61px 20px;
  line-height: 28px;
  font-size: 16px;
  border-top-left-radius: 36px;
  text-align: center;
}
.active-tab{
  background-color: #7b80e7;
  color: #fff;
}
.active-user-tab::after{
  content:'';
  width:30px;
  height: 20px;
  position: absolute;
  top:0;
  left:55px;
  background:radial-gradient(40px at right bottom,transparent 50%,#7b80e7 50%);
}
.normal-user-tab::after{
  content:'';
  width:30px;
  height: 20px;
  position: absolute;
  top:0;
  left:55px;
  background:radial-gradient(40px at right bottom,transparent 50%,#fff 50%);
}
.active-user-tab{
  background-color: #7b80e7;
  color: #fff;
}
.normal-user-tab{
  background-color: #fff;
  color: #7b80e7;
}
.normal-tab{
  background-color: #fff;
  color: #7b80e7;
}
.user-manage-table /deep/ .el-table__header{
  background-color: rgba(43, 68, 255, 0.05);
}
.user-manage-pagination{
  color:#5e14cd
}
.user-manage-pagination /deep/ .btn-prev{
  color:#5e14cd;
  background-color: rgba(43, 68, 255, 0.05);
}
.user-manage-pagination /deep/ .btn-next{
  color:#5e14cd;
  background-color: rgba(43, 68, 255, 0.05);
}
.user-manage-pagination /deep/ .el-pager li {
  background-color: rgba(43, 68, 255, 0.05);
}
.user-manage-pagination{
  margin:0 auto;
}
.user-manage-pagination{
  width:35%;
  margin:0px auto
}
.ceremony-signup-container /deep/  .el-dialog .el-button{
  width:150px;
  background-color: #ff4133;
  color: #fff;
  border: 1px solid #ff4133;
}
.add-admin-container /deep/ .el-dialog{
  background-color:rgba(255,255,255,0.4);
  border-radius: 15px;
}
.add-admin-container /deep/ .el-input {
  display: inline-block;
}
.add-admin-container /deep/ .el-form-item{
  margin-bottom: 8px;
}
.add-admin-container /deep/ .el-input__inner {
  display: inline-block;
  background-color: transparent;
  border: none;
}
.btns-container{
  text-align: center;
}
</style>
