<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel
        :beforeUpload="uploadExcel"
        :onSuccess="onSuccess"
      ></UploadExcel>
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { importmapKeyPath } = employees
import UploadExcel from '../../components/UploadExcel/index.vue'
import { importEmployees } from '@/api'
import { filterDate } from '@/filters'
export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    uploadExcel({ name }) {
      // console.log(name)
      if (!name.endsWith('.xlsx')) {
        return this.$message.error('请传入xlsx的文件')
      }
      console.log('继续上传')
      return true //true之后继续上传
    },
    //上传成功回调
    async onSuccess({ header, results }) {
      //可以拿到表单的表头和表格内容

      const newArr = results.map((item) => {
        const obj = {}
        for (const key in importmapKeyPath) {
          //映射表的属性值作为新的对象的属性名
          if (key === '入职日期' || key === '转正日期') {
            //excel 时间 比js时间多70年
            const timestamp = item[key]
            const date = new Date((timestamp - 1) * 24 * 3600000)
            //设置时间
            date.setFullYear(date.getFullYear() - 70)
            //处理时间
            obj[importmapKeyPath[key]] = filterDate(date)
          } else {
            obj[importmapKeyPath[key]] = item[key]
          }
        }
        // return Object.keys(importmapKeyPath).reduce((sumObj, key) => {
        //   sumObj[importmapKeyPath[key]] = item[key]
        //   return sumObj
        // }, {})

        return obj
      })
      console.log(newArr)
      await importEmployees(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    },
  },
  components: { UploadExcel },
}
</script>

<style scoped></style>
