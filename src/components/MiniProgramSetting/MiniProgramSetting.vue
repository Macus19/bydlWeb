<template>
  <div class="mini-program-setting-container">
    <div class="mini-program-setting">
      <!-- 头部，选择时间 -->
      <div class="mini-program-setting-top">
        <p class="top-title">典礼报名——截止时间</p>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-date-picker class="top-date-select" value-format="yyyy-MM-dd" v-model="endDate" type="date"></el-date-picker>
            <el-time-picker
              class="top-time-select"
              v-model="endTime"
              value-format="HH:mm:ss"
              :picker-options="{
               selectableRange: '00:00:00 - 23:00:00'
            }"
            ></el-time-picker>
          </el-col>
          <el-col :span="4">
            <div class="top-confirm-btn" @click="setEndTime()">确认</div>
          </el-col>
        </el-row>
      </div>
      <div class="mini-program-setting-bottom">
        <p class="bottom-title">小程序主页面信息</p>
        <el-collapse v-model="activeItems" @change="handleChange">
          <!-- 标题设置 -->
          <el-collapse-item class="ceremony-title-setting" name="1">
            <span class="ceremony-title" slot="title">毕业典礼标题</span>
            <el-row class="bottom-input-tab" type="flex" justify="space-between">
              <el-col :span="2">
                <div class="bottom-input-tab-title">主标题</div>
              </el-col>
              <el-col :span="10">
                <span class="bottom-input">{{mainTitle}}</span>
              </el-col>
              <el-col :span="3">
                <div class="bottom-input-tab-operate" @click="setTitle()">更改</div>
              </el-col>
            </el-row>
            <el-row class="bottom-input-tab" type="flex" justify="space-between">
              <el-col :span="2">
                <div class="bottom-input-tab-title">副标题</div>
              </el-col>
              <el-col :span="10">
                <span class="bottom-input">{{subTitle}}</span>
              </el-col>
              <el-col :span="3">
                <div class="bottom-input-tab-operate">更改</div>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item class="ceremony-photo-setting" name="2">
            <span class="ceremony-photo" slot="title">滚动照片</span>
            <el-row class="bottom-input-tab" type="flex" justify="space-between">
              <el-col :span="10">
                <span class="bottom-input">{{pic1}}</span>
                <input type="file" ref="fileInput1" @change="getFile($event, 1)" style="display:none" />
              </el-col>
              <el-col :span="4" class="bottom-input-btns">
                <div class="bottom-input-tab-operate" @click="showBanner(1)">预览</div>
                <div class="bottom-input-tab-operate" @click="uploadBanner(1)">更改</div>
                <div class="bottom-input-tab-operate" @click="uploadPic(1)">上传</div>
              </el-col>
            </el-row>
            <el-row class="bottom-input-tab" type="flex" justify="space-between">
              <el-col :span="10">
                <span class="bottom-input">{{pic2}}</span>
                <input type="file" ref="fileInput2" @change="getFile($event, 2)" style="display:none" />
              </el-col>
              <el-col :span="4" class="bottom-input-btns">
                <div class="bottom-input-tab-operate" @click="showBanner(2)">预览</div>
                <div class="bottom-input-tab-operate" @click="uploadBanner(2)">更改</div>
                <div class="bottom-input-tab-operate" @click="uploadPic(2)">上传</div>
              </el-col>
            </el-row>
            <el-row class="bottom-input-tab" type="flex" justify="space-between">
              <el-col :span="10">
                <span class="bottom-input">{{pic3}}</span>
                <input type="file" ref="fileInput3" @change="getFile($event, 3)" style="display:none" />
              </el-col>
              <el-col :span="4" class="bottom-input-btns">
                <div class="bottom-input-tab-operate" @click="showBanner(3)">预览</div>
                <div class="bottom-input-tab-operate" @click="uploadBanner(3)">更改</div>
                <div class="bottom-input-tab-operate" @click="uploadPic(3)">上传</div>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <el-dialog :visible.sync="isShowBannerDialog">
          <img :src="imgUrl" class="pre-show">
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import global from '../../assets/config/global'
import Qs from 'qs'

export default {
  data () {
    return {
      isShowBannerDialog: false,
      isEdit: false,
      activeItems: ['1'],
      mainTitle: '',
      subTitle: '',
      endDate: '',
      endTime: '',
      pic1: '图片标题1',
      pic2: '图片标题2',
      pic3: '图片标题3',
      imgUrl: '',
      imgFiles: []
    }
  },
  created: function () {
    this.getTitle()
    this.getBanner()
    this.getEndTime()
  },
  components: {},

  methods: {
    handleChange: function (val) {
      console.log(val)
    },
    /**
     * 获取页面标题
     */
    getTitle: function () {
      this.axios.get('/api/admin/get_title', {
        headers: {
          token: global.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.data.status === 200) {
          this.mainTitle = res.data.msg
        } else {
          this.$message({
            message: res.data.msg,
            type: 'info'
          })
        }
      })
    },
    /**
     * 修改标题
     */
    setTitle: function () {
      this.$prompt('请输入新的主标题', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.axios({
          url: '/api//admin/set_title',
          method: 'POST',
          data: {
            title: value
          },
          headers: {
            token: global.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [function (data) {
            data = Qs.stringify(data, { encode: false })
            return data
          }]
        }).then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.getTitle()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'info'
            })
          }
        })
      }).catch(() => {
      })
    },
    /**
     * 获得滚动轮播图
     */
    getBanner: function () {
      this.axios.get('/api/admin/get_photo', {
        headers: {
          token: global.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.data.status === 200) {
          res.data.data.forEach((item) => {
            this[`pic${item.photo_id}`] = item.url
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'info'
          })
        }
      })
    },
    /**
     * 点击按钮，触发上传事件
     */
    uploadBanner: function (id) {
      console.log(this.$refs.fileInput1)
      console.log(this.$refs[ `fileInput${id}` ])
      this.$refs[ `fileInput${id}` ].click()
    },
    /**
     * 获得图片
     */
    getFile: function (event, id) {
      const file = event.target.files[0]
      this.imgFiles[id] = file
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.addEventListener('load', () => {
        this['pic' + id] = fileReader.result
      })
      console.log(this['pic' + id])
    },
    /**
     * 显示图片预览
     */
    showBanner: function (id) {
      this.isShowBannerDialog = true
      this.imgUrl = this['pic' + id]
    },
    /**
     * 图片提交给后台服务器
     */
    uploadPic: function (id) {
      console.log(this.imgFiles[id])
      let params = new FormData()
      params.append('photo', this.imgFiles[id])
      params.append('photo_id', id)
      this.axios({
        method: 'POST',
        url: '/api/admin/upload_photo',
        data: params,
        headers: {
          token: global.token,
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        if (res.data.status === 200) {
          this.$message({
            message: '上传成功！',
            type: 'success'
          })
          this.getBanner()
        } else {
          this.$message({
            message: res.data.msg,
            type: 'info'
          })
        }
      })
    },
    /**
     * 设置报名截止时间
     */
    setEndTime: function () {
      let time = new Date(`${this.endDate} ${this.endTime}`).getTime()
      console.log(time)
      this.axios({
        method: 'POST',
        url: '/api/admin/set_deadline',
        data: {
          time: time
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
            message: '成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'info'
          })
        }
      })
    },
    /**
     * 获取报名截止时间
     */
    getEndTime: function () {
      this.axios.get('/api/admin/get_deadline', {
        headers: {
          token: global.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.data.status === 200) {
          this.endDate = res.data.msg.substring(0, 10)
          this.endTime = res.data.msg.substring(12, 16)
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
.mini-program-setting-container{
  background-color: rgba(43, 68, 255, 0.05);
  height: 100%;
  overflow: hidden;
}
.mini-program-setting{
  width: 80%;
  margin: 20px auto;
  border-radius: 36px 36px 0px 0px;
}
.mini-program-setting-top {
  padding: 20px 40px;
  background-color: #5e14cd;
  border-radius: 36px 36px 0px 0px;
}
.mini-program-setting-bottom {
  padding: 20px 40px;
  background-color: #fff;
}
.top-title {
  font-size: 24px;
  color: #fff;
  margin: 20px;
}
.top-date-select /deep/ .el-input__inner {
  background-color: #5e14cd;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  color: #fff;
}
.top-time-select /deep/ .el-input__inner {
  background-color: #5e14cd;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  color: #fff;
}
.top-confirm-btn {
  width: 200px;
  height: 40px;
  text-align-last: center;
  line-height: 40px;
  color: #5e14cd;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
}
.bottom-title {
  color: #5e14cd;
  margin: 10px;
  font-size: 18px;
}
.bottom-input-tab {
  padding: 10px 0;
  border-bottom: 1px solid #5e14cd;
}
.bottom-input-tab-title {
  color: #7b80e7;
  font-size: 16px;
}
.bottom-input {
  display: inline-block;
  max-width:800px;
  overflow: hidden;
  border: none;
  color: #7b80e7;
  font-size: 16px;
  padding: 5px 0;
  vertical-align: middle;
}
.bottom-input-tab-operate {
  cursor: pointer;
  color: #ff4133;
  font-size: 16px;
  text-align: right;
}
.ceremony-title,
.ceremony-photo {
  flex: 1 0 90%;
  order: 1;
  color: #ff4133;
}
.el-collapse-item__header {
  flex: 1 0 auto;
  order: -1;
  color: #ff4133;
}
.ceremony-title-setting >>> .el-collapse-item__arrow {
  color: #ff4133 !important;
  font-weight: bold;
}
.ceremony-photo-setting >>> .el-collapse-item__arrow {
  color: #ff4133 !important;
  font-weight: bold;
}
.bottom-input-btns {
  display: flex;
  justify-content: space-between;
}
.pre-show{
  max-width:500px
}
</style>
