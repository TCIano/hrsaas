<template>
  <div>
    <el-upload
      action="#"
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      list-type="picture-card"
      :http-request="onRequest"
      :on-change="onChange"
      :file-list="fileList"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewDialogImg">
      <img :src="imgUrl" alt=""
    /></el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDkLkvwoT3Ur6C7UnwqVwA90mOo184wkQk',
  SecretKey: 'GYN3e8RYTDrJXa6OSIwOegV8YkjV3NVP',
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      previewDialogImg: false,
      imgUrl: '',
      loading: false,
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      // id:AKIDkLkvwoT3Ur6C7UnwqVwA90mOo184wkQk
      // keys:GYN3e8RYTDrJXa6OSIwOegV8YkjV3NVP
      //   console.log('上传')
      cos.putObject(
        {
          Bucket: 'tciano-1313341659' /* 必须 */,
          Region: 'ap-nanjing' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          //   console.log(err || data)
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败，请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
          this.loading = false
        },
      )
    },
    //文件状态改变的
    onChange(file, filelist) {
      console.log('上传中')
      this.fileList = filelist
    },
    onRemove() {
      this.fileList = []
    },
    //预览
    onPreview(file) {
      this.previewDialogImg = true
      this.imgUrl = file.url
    },
    //限制文件类型
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请上传 ' + types.join('、') + ' 格式的图片')
        return false
      }
      //图片限制
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过2MB')
        return false
      }
    },
  },
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
