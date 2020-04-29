<template>
  <div class="ceremony-signup-container">
    <!-- 按钮栏 -->
    <el-row class="btn-container" :gutter="10" type="flex" justify="space-between">
      <el-col :span="5" class="data-btn">
        <div id="data-import">数据导入</div>
        <div id="data-outport">数据导出</div>
      </el-col>
      <el-col :span="8" class="operator-btn">
        <div id="add">添加</div>
        <div id="delete">批量删除</div>
        <div id="change">修改状态</div>
      </el-col>
      <el-col :span="8" class="selector-input">
        <el-select size="small" class="collage-selector" v-model="collage" placeholder="全部学生/各学院">
          <el-option v-for="item in collageList" :key="item.index" :value="item" :label="item"></el-option>
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
      class="ceremony-signup-table"
      :header-cell-style="tableHeaderStyle"
      :cell-style="tableCellStyle"
    >
      <el-table-column type="selection" width="60px" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="studentID" label="学号" align="center"></el-table-column>
      <el-table-column prop="collage" label="学院" align="center"></el-table-column>
      <el-table-column prop="majorAndClass" label="专业班级" align="center"></el-table-column>
      <el-table-column prop="education" label="学历" align="center"></el-table-column>
      <el-table-column prop="degree1" label="学位[1]" align="center"></el-table-column>
      <el-table-column prop="degree2" label="学位[2]" align="center"></el-table-column>
      <el-table-column prop="nation" label="国籍" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="table-operate">
            <div>
              <i class="el-icon-edit"></i>
              <span>编辑</span>
            </div>
            <div>
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
        :page-size="8"
        @current-change="currentPageChange"
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, jumper, slot"
        :total="600">
        <el-button>跳转</el-button>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      collageList: ['信息科学与技术学院', '英文学院', '中文学院'],
      collage: '',
      studentList: [
        {
          name: '学生1',
          studentID: '20181003105',
          collage: '信息科学与技术学院',
          majorAndClass: '软件工程1802',
          education: '本科',
          degree1: '工学学位',
          degree2: '',
          nation: '中国',
          status: '屏蔽'
        },
        {
          name: '学生1',
          studentID: '20181003105',
          collage: '信息科学与技术学院',
          majorAndClass: '软件工程1802',
          education: '本科',
          degree1: '工学学位',
          degree2: '',
          nation: '中国',
          status: '屏蔽'
        },
        {
          name: '学生1',
          studentID: '20181003105',
          collage: '信息科学与技术学院',
          majorAndClass: '软件工程1802',
          education: '本科',
          degree1: '工学学位',
          degree2: '',
          nation: '中国',
          status: '屏蔽'
        }
      ]
    }
  },

  components: {},

  methods: {
    tableHeaderStyle: function ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && rowIndex === 0) {
        return `background-color:#5e14cd;color:#fff;border-top-left-radius:20px`
      } else if (columnIndex === 10 && rowIndex === 0) {
        return `background-color:#5e14cd;color:#fff;border-top-right-radius:20px`
      } else {
        return 'background-color:#5e14cd;color:#fff'
      }
    },
    tableCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 1) {
        return `color:#ff4133`
      } else if (columnIndex <= 9) {
        return `color:#1f28cf`
      }
    },
    currentPageChange: function (val) {
      console.log(val)
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
  height: 500px;
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
.signup-el-pagination{
  color:#5e14cd
}
.signup-el-pagination /deep/ .btn-prev{
  color:#5e14cd;
  background-color: rgba(43, 68, 255, 0.05);
}
.signup-el-pagination /deep/ .btn-next{
  color:#5e14cd;
  background-color: rgba(43, 68, 255, 0.05);
}
.signup-el-pagination /deep/ .el-pager li {
  background-color: rgba(43, 68, 255, 0.05);
}
.signup-el-pagination{
  margin:0 auto;
}
.ceremony-signup-pagination{
  width:40%;
  margin:30px auto
}
</style>
