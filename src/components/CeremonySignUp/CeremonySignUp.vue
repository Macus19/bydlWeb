<template>
  <div class="ceremony-signup-container">
    <!-- 按钮栏 -->
    <el-row class="btn-container" :gutter="10" type="flex" justify="space-between">
      <el-col :span="5" class="data-btn">
        <div id="data-import" @click="showUploadDialog()">
          数据导入
        </div>
        <div id="data-outport" @click="outputData()">数据导出</div>
      </el-col>
      <el-col :span="8" class="operator-btn">
        <div id="add" @click="showAddDialog()">添加</div>
        <div id="delete" @click="multipleDeleteStudent()">批量删除</div>
        <div id="change" v-if="!isEditStatus" @click="changeStatus()">修改状态</div>
        <div class="confirmChangeStatus" @click="updateStatus()" v-if="isEditStatus">确定修改</div>
      </el-col>
      <el-col :span="8" class="selector-input">
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
        <el-input
          class="search-input"
          prefix-icon="el-icon-search"
          type="text"
          placeholder="字符特征查询"
        ></el-input>
      </el-col>
    </el-row>
    <!-- 学生展示 -->
    <el-table
      :data="studentList"
      ref="multipleTable"
      class="ceremony-signup-table"
      :header-cell-style="tableHeaderStyle"
      :cell-style="tableCellStyle"
    >
      <el-table-column type="selection" width="60px" align="center"></el-table-column>
      <el-table-column prop="username" label="姓名" align="center"></el-table-column>
      <el-table-column prop="number" label="学号" align="center"></el-table-column>
      <el-table-column prop="college_name" label="学院" align="center"></el-table-column>
      <el-table-column prop="major_class" label="专业班级" align="center"></el-table-column>
      <el-table-column label="学历" align="center">
        <template slot-scope="scope">{{educationMap[scope.row.education]}}</template>
      </el-table-column>
      <el-table-column prop="degree1" label="学位[1]" align="center"></el-table-column>
      <el-table-column prop="degree2" label="学位[2]" align="center"></el-table-column>
      <el-table-column prop="nationality" label="国籍" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="!isEditStatus">{{statusMap.get(scope.row.status)}}</span>
          <el-select class="status-selector" @change="changeSelect(scope.row.user_id)" v-else v-model="state[scope.row.user_id]">
            <el-option
              v-for="(item) in statusArray"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="table-operate">
            <div @click="showEditDialog(scope.$index)">
              <i class="el-icon-edit"></i>
              <span>编辑</span>
            </div>
            <div @click="deleteStudent(scope.row.user_id)">
              <i class="el-icon-remove"></i>
              <span>移除</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="ceremony-signup-pagination">
      <el-pagination
        class="signup-el-pagination"
        :page-size="10"
        :current-page.sync="currentPage"
        @current-change="getStudentList()"
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, jumper, slot"
        :total="total"
      >
        <el-button>跳转</el-button>
      </el-pagination>
    </div>
    <!-- 添加框 -->
    <el-dialog class="add-student-container" title="添加学生" :visible.sync="isShowAddDialog" width="65%">
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
        <hr>
        <el-form-item label="专业班级">
          <el-input v-model="addStudent.majorAndClass"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="addStudent.education"></el-input>
        </el-form-item>
        <el-form-item label="学位[1]">
          <el-input v-model="addStudent.degree1"></el-input>
        </el-form-item>
        <hr>
        <el-form-item label="学位[2]">
          <el-input v-model="addStudent.degree2"></el-input>
        </el-form-item>
        <el-form-item label="国籍">
          <el-input v-model="addStudent.nationality"></el-input>
        </el-form-item>
        <hr>
      </el-form>
      <div class="btns-container">
        <el-button @click="addStudentFunc()">确认添加</el-button>
      </div>
    </el-dialog>
    <!-- 编辑框 -->
    <el-dialog class="add-student-container" title="编辑学生" :visible.sync="isShowEditDialog" width="65%">
      <el-form ref="form" v-model="editStudent" label-width="80px" :inline="true">
        <el-form-item label="姓名">
          <el-input v-model="editStudent.name"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="editStudent.studentId"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="editStudent.collage"></el-input>
        </el-form-item>
        <hr>
        <el-form-item label="专业班级">
          <el-input v-model="editStudent.majorAndClass"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="editStudent.education"></el-input>
        </el-form-item>
        <el-form-item label="学位[1]">
          <el-input v-model="editStudent.degree1"></el-input>
        </el-form-item>
        <hr>
        <el-form-item label="学位[2]">
          <el-input v-model="editStudent.degree2"></el-input>
        </el-form-item>
        <el-form-item label="国籍">
          <el-input v-model="editStudent.nationality"></el-input>
        </el-form-item>
        <hr>
      </el-form>
      <div class="btns-container">
        <el-button @click="editStudentInfo()">确认修改</el-button>
      </div>
    </el-dialog>
    <!-- 上传框 -->
    <el-dialog class="upload-container add-student-container" title="上传文件" :visible.sync="isShowUploadDialog" width="65%">
      <el-upload
        class="upload"
        drag
        action="/api/admin/upload_excel"
        :headers="uploadHeaders"
        name="excel_file"
        :on-success="successUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import global from '../../assets/config/global'
import DeleteDialog from '../CeremonySignUp/component/DeleteDialog'
import Qs from 'qs'

export default {
  data () {
    return {
      total: 0,
      isShowEditDialog: false,
      isShowAddDialog: false,
      // 状态映射，0为屏蔽，1为开放
      statusMap: new Map([[0, '屏蔽'], [1, '开放']]),
      statusArray: [
        {
          value: 0,
          label: '屏蔽'
        },
        {
          value: 1,
          label: '开放'
        }
      ],
      isShowUploadDialog: false,
      uploadHeaders: {
        token: global.token
      },
      // 学历映射，后端返回1为本科，2为硕士，3为博士
      educationMap: ['null', '本科', '硕士', '博士'],
      // 学院列表
      collageList: ['全部', '信息科学与技术学院', '英文学院', '中文学院'],
      collage: '',
      college_id: 0,
      userStatusList: [],
      // 显示报名学生列表
      studentList: [
        {
          username: '学生1',
          number: '20181003105',
          college_name: '信息科学与技术学院',
          major_class: '软件工程1802',
          education: '本科',
          degree1: '工学学位',
          degree2: '',
          nationality: '中国',
          status: '屏蔽'
        }
      ],
      // 当前页
      currentPage: 1,
      // 是否允许修改状态，若允许则显示下拉框
      isEditStatus: false,
      // 是否显示删除提示框
      isShowDeleteDialog: false,
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
      },
      editStudent: {
        name: '',
        studentId: '',
        collage: '',
        majorAndClass: '',
        education: '',
        degree1: '',
        degree2: '',
        nationality: ''
      },
      state: {}
    }
  },

  components: {
    DeleteDialog
  },
  created: function () {
    this.getStudentList()
  },
  mounted: function () {
  },
  methods: {
    /**
     * 样式函数，修改表头样式
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
     * 样式函数，修改单元函数
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
        .get('/api/admin/check_sign', {
          params: {
            college_id: this.college_id,
            page: this.currentPage
          },
          headers: {
            token: global.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.studentList = res.data.data.user
            this.total = res.data.data.total
          } else {
            this.studentList = []
          }
          this.setState()
        })
    },
    /**
     * 删除报名学生(单个)
     */
    deleteStudent: function (userId) {
      let tmp = {}
      tmp['0'] = userId
      this.$confirm('确定要删除该学生吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          url: '/api/admin/remove_sign',
          method: 'POST',
          data: {
            'user_id': JSON.stringify(tmp)
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
     * 删除学生（批量）
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
     * 导出学院报名数据
     */
    outputData: function () {
      this.axios
        .get('/api/admin/export_excel', {
          params: {
            college_id: this.college_id
          },
          headers: {
            token: global.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(res => {
          console.log(res)
        })
    },
    /**
     * 设置为修改状态模式，状态文字变为下拉框
     */
    changeStatus: function () {
      this.isEditStatus = true
    },
    /**
     * 显示添加Dialog
     */
    showAddDialog: function () {
      this.isShowAddDialog = true
    },
    /**
     * 添加学生
     */
    addStudentFunc: function () {
      this.axios({
        url: '/api/admin/add_student_sign',
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
    },
    /**
     * 显示编辑框，将对应的表格行数据传入编辑框
     */
    showEditDialog: function (index) {
      this.isShowEditDialog = true
      console.log(index)
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
      console.log(this.editStudent)
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
          education_background: this.educationMap.indexOf(this.editStudent.education),
          degree1: this.editStudent.degree1,
          degree2: this.editStudent.degree2,
          nationality: this.editStudent.nationality
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
     * 上传文件成功之后的回调函数
     */
    successUpload: function (res) {
      console.log(res)
      if (res.status === 200) {
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
        this.isShowUploadDialog = false
        this.getStudentList()
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    /**
     * 显示上传Dialog
     */
    showUploadDialog: function () {
      this.isShowUploadDialog = true
    },
    changeSelect: function (id) {
      console.log(this.state)
    },
    /**
     * 修改学生状态
     * 这里因为接口原因，修改为屏蔽和修改为开放要分别请求（mgj
     */
    updateStatus: function () {
      let open = []
      let close = []
      for (let i in this.state) {
        if (this.state[i] === 1) {
          open.push(i)
        } else {
          close.push(i)
        }
      }
      this.$confirm('确定要修改状态吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Promise.all([this.updateStatusRequest(JSON.stringify(Object.assign({}, open)), 1), this.updateStatusRequest(JSON.stringify(Object.assign({}, close)), 0)]).then((res) => {
          console.log(res)
          if (res[0] === 200 && res[1] === 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.getStudentList()
            this.isEditStatus = false
          } else {
            this.$message({
              message: '修改有误！',
              type: 'error'
            })
          }
        })
      })
    },
    setState: function () {
      this.studentList.forEach(item => {
        this.$set(this.state, item.user_id, item.status)
      })
    },
    updateStatusRequest: function (userArray, status) {
      return new Promise((resolve, reject) => {
        this.axios({
          method: 'POST',
          url: '/api/admin/change_status',
          data: {
            user_id: userArray,
            status: status
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
          resolve(res.data.status)
        })
      })
    }
  }
}
</script>
<style scoped>
.ceremony-signup-container {
  background-color: rgba(43, 68, 255, 0.05);
  height: 100%;
}
.ceremony-signup-container /deep/ .el-table th.gutter {
  display: table-cell !important;
}
.ceremony-signup-container /deep/ .el-table colgroup.gutter {
  display: table-cell !important;
}
.btn-container {
  padding: 10px 50px;
  margin: 0 !important;
}
.data-btn,
.operator-btn {
  display: flex;
  justify-content: space-between;
}
.data-btn div {
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
.operator-btn div {
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
.collage-selector /deep/ .el-input__inner {
  height: 30px;
  box-shadow: 0px 3px 6px 0px rgba(10, 40, 248, 0.07);
  color: #1f28cf;
  border-radius: 20px;
  border-color: #1f28cf;
}
.collage-selector /deep/ .el-input__inner input::placeholder {
  color: #1f28cf;
}
.status-selector /deep/ .el-input__inner {
  height: 20px;
  box-shadow: 0px 3px 6px 0px rgba(10, 40, 248, 0.07);
  color: #1f28cf;
  border-radius: 20px;
  border-color: #1f28cf;
}
.status-selector /deep/ .el-input__inner input::placeholder {
  color: #1f28cf;
}
.status-selector /deep/ .el-input__icon {
  line-height: 20px;
  color: #1f28cf;
}
.selector-input {
  display: flex;
  justify-content: space-around;
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
.ceremony-signup-table {
  width: 90%;
  margin: 10px auto;
  height: 520px;
}
.ceremony-signup-table /deep/ .el-table__header {
  background-color: rgba(43, 68, 255, 0.05);
}
.table-operate div {
  width: 48%;
  display: inline-block;
  color: #ff4133;
  cursor: pointer;
}
.table-operate div span {
  border-bottom: 1px solid #ff4133;
}
.signup-el-pagination {
  color: #5e14cd;
}
.signup-el-pagination /deep/ .btn-prev {
  color: #5e14cd;
  background-color: rgba(43, 68, 255, 0.05);
}
.signup-el-pagination /deep/ .btn-next {
  color: #5e14cd;
  background-color: rgba(43, 68, 255, 0.05);
}
.signup-el-pagination /deep/ .el-pager li {
  background-color: rgba(43, 68, 255, 0.05);
}
.signup-el-pagination {
  margin: 0 auto;
}
.ceremony-signup-pagination {
  width: 40%;
  margin: 30px auto;
}
.delete-dialog {
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ceremony-signup-container /deep/ .el-dialog{
  width: 400px;
  height: 300px;
  padding: 10px;
  background-color:transparent;
  border:none;
  box-shadow: none;
}
.ceremony-signup-container /deep/  .el-dialog__footer{
  display: flex;
  justify-content: space-around;
}
.ceremony-signup-container /deep/  .el-dialog .el-button{
  width:150px;
  background-color: #ff4133;
  color: #fff;
  border: 1px solid #ff4133;
}
.add-student-container /deep/ .el-dialog{
  background-color:rgba(255,255,255,0.4);
  border-radius: 15px;
}
.add-student-container /deep/ .el-input {
  display: inline-block;
}
.add-student-container /deep/ .el-form-item{
  margin-bottom: 8px;
}
.add-student-container /deep/ .el-input__inner {
  display: inline-block;
  background-color: transparent;
  border: none;
}
.add-dialog-divider{
  width:95%;
  height: 0.5px;
  background-color: #000;
  margin: 0 auto;
}
.btns-container{
  text-align: center;
}
.upload{
  text-align: center;
}
</style>
