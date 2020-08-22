<template>
  <div class="manager-table-container">
    <el-table
        :data="adminList"
        class="manager-manage-table"
        :header-cell-style="tableHeaderStyle"
        :cell-style="tableCellStyle"
      >
        <el-table-column type="selection" width="60px" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" align="center"></el-table-column>
        <el-table-column prop="number" label="账号ID" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="table-operate">
              <div @click="deleteCurrentAdmin(scope.row.admin_id)">
                <i class="el-icon-remove"></i>
                <span>删除</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import Qs from 'qs'
import global from '../../../assets/config/global'

export default {
  data () {
    return {
      total: 0,
      isShowAddAdminDialog: false,
      adminList: [],
      addAdmin: {
        username: '',
        number: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  props: [ 'currentPage' ],
  components: {},
  mounted: function () {
    this.getAdmin()
  },
  methods: {
    /**
     * 修改表头样式
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
     * 修改单元格样式
     */
    tableCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 1) {
        return `color:#ff4133`
      } else if (columnIndex <= 9) {
        return `color:#1f28cf`
      }
    },
    /**
     * 获取管理员列表
     */
    getAdmin: function () {
      this.axios.get('/api/admin/get_admin', {
        params: {
          page: this.currentPage
        },
        headers: {
          token: global.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.data.status === 200) {
          this.adminList = res.data.data.admin
          this.total = res.data.data.total
          console.log(this.total)
          this.$emit('getTotal', this.total)
        } else {
          this.$message({
            message: res.data.msg,
            type: 'info'
          })
        }
      })
    },
    /**
     * 删除管理员（单个）
     */
    deleteCurrentAdmin: function (adminId) {
      let tmp = {}
      tmp['0'] = adminId
      this.$confirm('确定要删除该管理员吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.axios({
          method: 'POST',
          url: '/api/admin/remove_admin',
          data: {
            admin: JSON.stringify(tmp)
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
            this.getAdmin()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'info'
            })
          }
        })
      })
    }
  }
}

</script>
<style scoped>
.manager-manage-table {
  width: 800px;
  margin: 10px auto;
  height: 500px;
}
.manager-manage-table /deep/ .el-table__header{
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
</style>
