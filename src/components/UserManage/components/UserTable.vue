<template>
  <div class="user-table-container">
    <el-table
      :data="studentList"
      class="user-manage-table"
      ref="multipleTable"
      :header-cell-style="tableHeaderStyle"
      :cell-style="tableCellStyle"
    >
      <el-table-column type="selection" width="60px" align="center"></el-table-column>
      <el-table-column prop="username" label="姓名" align="center"></el-table-column>
      <el-table-column prop="number" label="账号" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="table-operate">
            <div @click="showEditDialog(scope.$index)">
              <i class="el-icon-edit"></i>
              <span>编辑</span>
            </div>
            <div @click="resetPassword()">
              <span>重置密码</span>
            </div>
            <div @click="deleteStudent(scope.row.user_id)">
              <i class="el-icon-remove"></i>
              <span>删除</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑用户信息 -->
    <el-dialog class="edit-container" width="65%" title="编辑信息" :visible.sync="isShowEditDialog">
      <el-form :v-model="editStudent" label-width="80px" :inline="true">
        <el-form-item label="用户名">
          <el-input v-model="editStudent.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="editStudent.studentId"></el-input>
        </el-form-item>
        <hr />
        <div class="btns-container">
          <el-button @click="editStudentInfo()">确认修改</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 添加框 -->
    <el-dialog
      class="edit-container"
      title="添加学生"
      :visible.sync="isShowAddDialog"
      width="65%"
    >
      <el-form ref="form" v-model="addStudent" label-width="80px" :inline="true">
        <el-form-item label="姓名">
          <el-input v-model="addStudent.name"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="addStudent.studentId"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="addStudent.collage"></el-input>
        </el-form-item>
        <hr />
        <el-form-item label="专业班级">
          <el-input v-model="addStudent.majorAndClass"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="addStudent.education"></el-input>
        </el-form-item>
        <el-form-item label="学位[1]">
          <el-input v-model="addStudent.degree1"></el-input>
        </el-form-item>
        <hr />
        <el-form-item label="学位[2]">
          <el-input v-model="addStudent.degree2"></el-input>
        </el-form-item>
        <el-form-item label="国籍">
          <el-input v-model="addStudent.nationality"></el-input>
        </el-form-item>
        <hr />
      </el-form>
      <div class="btns-container">
        <el-button @click="addStudentFunc()">确认添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import global from '../../../assets/config/global'
import Qs from 'qs'

export default {
  data () {
    return {
      collage: '',
      collage_id: 0,
      isShowAddDialog: false,
      // 学历映射，后端返回1为本科，2为硕士，3为博士
      educationMap: ['null', '本科', '硕士', '博士'],
      // 学院列表
      collageList: ['全部', '信息科学与技术学院', '英文学院', '中文学院'],
      isShowEditDialog: false,
      studentList: [],
      editStudent: {
        username: '',
        number: ''
      },
      // 添加的学生
      addStudent: {
        name: '',
        studentId: '',
        collage: '',
        majorAndClass: '',
        education: '',
        degree1: '',
        degree2: '',
        nationality: ''
      }
    }
  },
  props: [ 'currentPage' ],
  watch: {
    currentPage: function () {
      this.getStudentList()
    }
  },
  mounted: function () {
    this.getStudentList()
  },
  components: {},

  methods: {
    /**
     * 表格头部样式
     */
    tableHeaderStyle: function ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && rowIndex === 0) {
        return `background-color:#5e14cd;color:#fff;border-top-left-radius:20px`
      } else if (columnIndex === 3 && rowIndex === 0) {
        return `background-color:#5e14cd;color:#fff;border-top-right-radius:20px`
      } else {
        return 'background-color:#5e14cd;color:#fff'
      }
    },
    /**
     * 表格单元格样式
     */
    tableCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 1) {
        return `color:#ff4133`
      } else if (columnIndex <= 9) {
        return `color:#1f28cf`
      }
    },
    /**
     * 获得用户报名列表
     */
    getStudentList: function () {
      this.axios
        .get('/api/admin/all_wx_user', {
          params: {
            page: this.currentPage
          },
          headers: {
            token: global.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.studentList = res.data.data
          }
        })
    },
    showEditDialog: function (index) {
      this.isShowEditDialog = true
      this.editStudent = {
        userId: this.studentList[index].user_id,
        name: this.studentList[index].username,
        studentId: this.studentList[index].number,
        collage: this.collageList[this.studentList[index].college_id],
        majorAndClass: this.studentList[index].major_class,
        education: this.educationMap[this.studentList[index].education],
        degree1: this.studentList[index].degree1,
        degree2: this.studentList[index].degree2,
        nationality: this.studentList[index].nationality
      }
    },
    /**
     * 编辑单个学生信息
     */
    editStudentInfo: function () {
      this.axios({
        url: '/api/admin/update_user_info',
        method: 'POST',
        data: {
          user_id: this.editStudent.userId,
          username: this.editStudent.name,
          number: this.editStudent.studentId,
          college_id: this.collageList.indexOf(this.editStudent.collage),
          major_class: this.editStudent.majorAndClass,
          education_background: this.educationMap.indexOf(
            this.editStudent.education
          ),
          degree1: this.editStudent.degree1,
          degree2: this.editStudent.degree2,
          nationality: this.editStudent.nationality
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
      }).then(res => {
        if (res.data.status === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.isShowEditDialog = false
          this.getStudentList()
        } else {
          this.$message({
            message: res.data.msg,
            type: 'info'
          })
        }
      })
    },
    /**
     * 删除学生（单个）
     */
    deleteStudent: function (userId) {
      let tmp = {}
      tmp['0'] = userId
      this.$confirm('确定要删除该小程序用户吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.axios({
          method: 'POST',
          url: '/api/admin/remove_user',
          data: {
            userid: JSON.stringify(tmp)
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
     * 显示添加学生Dialog
     */
    showAddDialog: function () {
      this.isShowAddDialog = true
    },
    /**
     * 删除小程序用户（批量）
     */
    multipleDeleteStudent: function () {
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
          url: '/api/admin/remove_user',
          data: {
            userid: JSON.stringify(Object.assign({}, deleteMap))
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
     * 重置密码
     */
    resetPassword: function (userId) {
      let tmp = {}
      tmp['0'] = userId
      this.$confirm('确定要重置密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: 'POST',
          url: '/api/admin/reset_password',
          data: {
            user_id: tmp
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
     * 添加小程序用户
     */
    addStudentFunc: function () {
      this.axios({
        url: '/api/admin/add_student',
        method: 'POST',
        data: {
          username: this.addStudent.name,
          number: this.addStudent.studentId,
          college_id: this.collageList.indexOf(this.addStudent.collage),
          major_class: this.addStudent.majorAndClass,
          education_background: this.educationMap.indexOf(this.addStudent.education),
          degree1: this.addStudent.degree1,
          degree2: this.addStudent.degree2,
          nationality: this.addStudent.nationality
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
            message: '成功添加！',
            type: 'success'
          })
          this.isShowAddDialog = false
          this.getStudentList()
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
.user-manage-table {
  width: 800px;
  margin: 10px auto;
  height: 520px;
}
.user-manage-table /deep/ .el-table__header {
  background-color: rgba(43, 68, 255, 0.05);
}
.table-operate div {
  width: 30%;
  display: inline-block;
  color: #ff4133;
  cursor: pointer;
}
.table-operate div span {
  border-bottom: 1px solid #ff4133;
}
.edit-container /deep/ .el-dialog {
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 15px;
}
.edit-container /deep/ .el-input, .add {
  display: inline-block;
}
.edit-container /deep/ .el-form-item {
  margin-bottom: 8px;
}
.edit-container /deep/ .el-input__inner {
  display: inline-block;
  background-color: transparent;
  border: none;
}
.btns-container {
  text-align: center;
}
</style>
