<template>
  <div class="on-site-manage-container">
    <!-- 按钮栏 -->
    <el-row class="btn-container" :gutter="10" type="flex" justify="space-between">
      <el-col :span="5" class="operate-btn">
        <div id="add-btn" @click="showAddStudentDialog()">添加</div>
        <div id="remove-btn" @click="multipleDeleteSignInStudent()">批量删除</div>
      </el-col>
      <el-col :span="15" class="signup-btn">
        <el-select class="length-selector" v-model="groupLength" placeholder="请选择分组长度">
          <el-option v-for="item in groupLengthList" :key="item.index" :value="item" :label="item"></el-option>
        </el-select>
        <el-select
            size="small"
            class="collage-selector"
            v-model="college_id"
            placeholder="全部学生/各学院"
          >
            <el-option
              v-for="(item, index) in collageList"
              :key="index"
              :value="index"
              :label="item"
            ></el-option>
        </el-select>
        <div id="begin-grad" @click="startCeremony()">开始典礼</div>
        <div id="begin-signup" @click="beginSignIn()">开始签到</div>
        <div id="pause-signup" @click="stopSignIn()">暂停签到</div>
      </el-col>
    </el-row>
    <!-- 表格显示 -->
    <el-table
      :data="groupList"
      ref="multipleTable"
      class="onsite-manage-table"
      :header-cell-style="tableHeaderStyle"
      :cell-style="tableCellStyle"
    >
      <el-table-column type="selection" width="60px" align="center"></el-table-column>
      <el-table-column prop="id" label="序号" align="center"></el-table-column>
      <el-table-column prop="position" label="坐标" align="center"></el-table-column>
      <el-table-column prop="education" label="学历" align="center"></el-table-column>
      <el-table-column prop="collage" label="学院" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="degree1" label="学位[1]" align="center"></el-table-column>
      <el-table-column prop="degree2" label="学位[2]" align="center"></el-table-column>
      <el-table-column prop="majorAndClass" label="专业班级" align="center"></el-table-column>
      <el-table-column prop="nation" label="国籍" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="table-operate">
            <div>
              <i class="el-icon-edit"></i>
              <span>编辑</span>
            </div>
            <div @click="deleteSignInStudent(scope.row.user_id)">
              <i class="el-icon-remove"></i>
              <span>移除</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="on-site-manage-bottom-btn">
      <div class="bottom-go-back bottom-btn">回到当前位置</div>
      <div class="bottom-prev bottom-btn" @click="turnGroup(0)">上一组</div>
      <div class="bottom-next bottom-btn" @click="turnGroup(1)">下一组</div>
    </div>
    <el-dialog class="qrcode-container" :visible.sync="isShowQRCodeDialog" width="65%">
      <el-image :src="qrCodeImg"></el-image>
      <p>典礼已开始！可扫描二维码进行签到。</p>
    </el-dialog>
    <!-- 添加学生Dialog -->
    <el-dialog
      class="add-student-container"
      title="添加学生"
      width="65%"
      :visible.sync="isShowAddDialog"
    >
      <el-form ref="form" v-model="addStudent" label-width="80px" :inline="true">
        <el-form-item label="学号">
          <el-input v-model="addStudent.number"></el-input>
        </el-form-item>
        <hr />
        <div class="btn-container">
          <el-button type="primary" @click="addSignInStudent()">添加</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Qs from 'qs'
import global from '../../assets/config/global'

export default {
  data () {
    return {
      isShowCollageDialog: false,
      addStudent: {
        number: ''
      },
      currentPage: 1,
      collageList: ['信息科学与技术学院', '英文学院', '中文学院'],
      collage: '',
      college_id: 1,
      isShowAddDialog: false,
      qrCodeImg: '',
      isShowQRCodeDialog: false,
      groupLengthList: [1, 2, 3, 4, 5],
      groupLength: '',
      currentGroup: [], // 当前组
      groupList: [
        {
          id: 1,
          position: '1组1号',
          education: '本科',
          name: '学生1',
          collage: '信息科学与技术学院',
          majorAndClass: '软件工程1802',
          degree1: '工学学位',
          degree2: '',
          nation: '中国'
        },
        {
          id: 2,
          position: '1组2号',
          education: '本科',
          name: '学生2',
          collage: '信息科学与技术学院',
          majorAndClass: '软件工程1802',
          degree1: '工学学位',
          degree2: '',
          nation: '中国'
        },
        {
          id: 3,
          position: '2组1号',
          education: '本科',
          name: '学生3',
          collage: '信息科学与技术学院',
          majorAndClass: '软件工程1802',
          degree1: '工学学位',
          degree2: '',
          nation: '中国'
        }
      ] // 显示的组
    }
  },

  created: function () {
    // this.getQueue()
  },
  components: {},

  methods: {
    /**
      * 二维数组扁平化
      * @param arr 一个二维数组
      * @returns arr 扁平后的一维数组
      */
    flatten: function (arr) {
      while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
      }
      return arr
    },
    /**
     * 修改表头样式
     */
    tableHeaderStyle: function ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && rowIndex === 0) {
        return `background-color:#5e14cd;color:#fff;border-top-left-radius:20px`
      } else if (columnIndex === 10 && rowIndex === 0) {
        return `background-color:#5e14cd;color:#fff;border-top-right-radius:20px`
      } else {
        return 'background-color:#5e14cd;color:#fff'
      }
    },
    /**
     * 修改单元样式
     */
    tableCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 1) {
        return `color:#ff4133`
      } else if (columnIndex <= 9) {
        return `color:#1f28cf`
      }
    },
    /**
     * 获得当前排队的队列
     */
    getQueue: function () {
      this.axios
        .get('/api/admin/queue', {
          params: {
            college_id: this.college_id,
            interval: this.groupLength,
            page: this.currentPage
          },
          headers: {
            token: global.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res) => {
          if (res.data.code === 200) {
            let group = this.flatten(res.data.group)
            let currentGroupNum = res.data.current
            let currentList = []
            group.forEach(item => {
              if (item.group === currentGroupNum) {
                currentList.push(item)
              }
            })
            this.groupList = group
            this.currentGroup = currentList
          }
        })
    },
    /**
     * 显示选择学院Dialog
     */
    showCollageDialog: function () {
      this.isShowCollageDialog = true
    },
    /**
     * 开始毕业典礼
     */
    startCeremony: function () {
      this.$confirm('确定要开始典礼吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: 'POST',
          url: '/api/user/start_grad',
          data: {
            college_id: this.college_id,
            interval: this.groupLength
          },
          headers: {
            token: global.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [
            function (data) {
              data = Qs.stringify(data)
              return data
            }
          ]
        }).then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.getQueue()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'info'
            })
          }
        })
      })
    },
    /**
     * 开始二维码签到
     */
    beginSignIn: function () {
      this.$confirm(`你当前选择的分组长度为：${this.groupLength}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.getQRCode()
      })
    },
    /**
     * 生成签到二维码
     */
    getQRCode: function () {
      this.axios
        .get('/api/admin/qrcode', {
          params: {
            college_id: 1
          },
          headers: {
            token: global.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.qrCodeImg = res.data.msg
            this.isShowQRCodeDialog = true
          } else {
            this.$message({
              message: res.data.msg,
              type: 'info'
            })
          }
        })
    },
    /**
     * 暂停签到
     */
    stopSignIn: function () {
      this.$confirm(`确定要停止签到吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isShowQRCodeDialog = false
      })
    },
    /**
     * 显示添加学生Dialog
     */
    showAddStudentDialog: function () {
      this.isShowAddDialog = true
    },
    /**
     * 添加签到学生
     */
    addSignInStudent: function () {
      this.$confirm('确定要添加吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          url: '/api/admin/add_student_signup',
          method: 'POST',
          data: {
            number: this.addStudent.number
          },
          headers: {
            token: global.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [
            function (data) {
              data = Qs.stringify(data)
              return data
            }
          ]
        }).then((res) => {
          if (res.data.status === 200) {
            this.isShowAddDialog = false
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.msg,
              type: 'info'
            })
          }
        })
      })
    },
    /**
     * 删除单个学生
     */
    deleteSignInStudent: function (userId) {
      let tmp = {}
      tmp['0'] = userId
      this.$confirm('确定要删除该学生吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          url: '/api/admin/remove_sign_in',
          method: 'POST',
          data: {
            user_id: JSON.stringify(tmp)
          },
          headers: {
            token: global.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [
            function (data) {
              data = Qs.stringify(data)
              return data
            }
          ]
        }).then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: '成功删除！',
              type: 'success'
            })
            this.getQueue()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'info'
            })
          }
        })
      })
    },
    /**
     * 删除学生（批量）
     */
    multipleDeleteSignInStudent: function () {
      let deleteMap = this.$refs.multipleTable.selection.map((item, index) => {
        return item.user_id
      })
      console.log(JSON.stringify(Object.assign({}, deleteMap)))
      this.$confirm('确定要删除这些学生吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: 'POST',
          url: '/api/admin/remove_sign',
          data: {
            user_id: JSON.stringify(Object.assign({}, deleteMap))
          },
          headers: {
            token: global.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [
            function (data) {
              data = Qs.stringify(data)
              return data
            }
          ]
        }).then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: '成功删除！',
              type: 'success'
            })
            this.getStudentList()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'info'
            })
          }
        })
      })
    },
    /**
     * 上（或下一组）
     */
    turnGroup: function (num) {
      this.axios({
        url: '/api/admin/next_group',
        method: 'POST',
        data: {
          college_id: this.college_id,
          next: num,
          user_id: this.currentGroup[0].user_id,
          group_num: this.currentGroup.length
        },
        headers: {
          token: global.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [
          function (data) {
            data = Qs.stringify(data)
            return data
          }
        ]
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: '更新成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'info'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.on-site-manage-container {
  background-color: rgba(43, 68, 255, 0.05);
  height: 100%;
}
.btn-container {
  padding: 10px 50px;
  margin: 0 !important;
}
.operate-btn,
.signup-btn {
  display: flex;
  justify-content: space-between;
}
.operate-btn div {
  cursor: pointer;
  width: 120px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  background-color: #1f28cf;
  vertical-align: middle;
  box-shadow: 0px 3px 6px 0px rgba(10, 40, 248, 0.07);
  border-radius: 20px;
}
.signup-btn div {
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
.onsite-manage-table {
  width: 90%;
  margin: 10px auto;
  height: 500px;
}
.table-operate div {
  width: 48%;
  display: inline-block;
  color: #ff4133;
  cursor: pointer;
}
.bottom-btn {
  width: 120px;
  cursor: pointer;
  border-radius: 8px;
  height: 30px;
  padding: 10rpx;
  text-align: center;
  color: #ffffff;
  background-color: #1f28cf;
  line-height: 30px;
}
.on-site-manage-bottom-btn {
  width: 500px;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
}
.on-site-manage-container /deep/ .el-table th.gutter {
  display: table-cell !important;
}
.on-site-manage-container /deep/ .el-table colgroup.gutter {
  display: table-cell !important;
}
.on-site-manage-container /deep/ .el-dialog {
  width: 400px;
  height: 300px;
  padding: 10px;
  background-color: transparent;
  border: none;
  box-shadow: none;
}
.on-site-manage-container /deep/ .el-dialog__footer {
  display: flex;
  justify-content: space-around;
}
.on-site-manage-container /deep/ .el-dialog .el-button {
  width: 150px;
  background-color: #ff4133;
  color: #fff;
  border: 1px solid #ff4133;
}
.qrcode-container {
  text-align: center;
}
.add-dialog-input {
  width: 260px;
  background-color: transparent;
  border-bottom: 1px solid #707070;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}
.add-student-container /deep/ .el-dialog {
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 15px;
}
.add-student-container /deep/ .el-input {
  display: inline-block;
}
.add-student-container /deep/ .el-form-item {
  margin-bottom: 8px;
}
.add-student-container /deep/ .el-input__inner {
  display: inline-block;
  background-color: transparent;
  border: none;
}
.btn-container {
  text-align: center;
}
.length-selector {
  display: flex;
  justify-content: space-around;
}
.length-selector /deep/ .el-input {
  width: 220px;
}
.length-selector /deep/ .el-input__inner {
  width: 180px;
  height: 30px;
  box-shadow: 0px 3px 6px 0px rgba(10, 40, 248, 0.07);
  color: #1f28cf;
  border-radius: 20px;
  border-color: #1f28cf;
}
.length-selector /deep/ .el-input__inner input::placeholder {
  color: #1f28cf;
}
.length-selector /deep/ .el-input__icon {
  line-height: 30px;
}
.collage-selector {
  display: flex;
  justify-content: space-around;
}
.collage-selector /deep/ .el-input {
  width: 220px;
}
.collage-selector /deep/ .el-input__inner {
  width: 180px;
  height: 30px;
  box-shadow: 0px 3px 6px 0px rgba(10, 40, 248, 0.07);
  color: #1f28cf;
  border-radius: 20px;
  border-color: #1f28cf;
}
.collage-selector /deep/ .el-input__inner input::placeholder {
  color: #1f28cf;
}
.collage-selector /deep/ .el-input__icon {
  line-height: 30px;
}
</style>
