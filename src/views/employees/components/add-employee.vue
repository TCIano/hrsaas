<template>
  <el-dialog title="新增员工" :visible="visible" width="50%" @close="onClose">
    <el-form :model="formData" :rules="rules" label-width="120px" ref="form">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-select
          v-model="formData.departmentName"
          placeholder="请选择部门"
          @focus="getDepts"
          ref="refSelect"
        >
          <el-option value="" v-loading="loading" class="treeOption">
            <el-tree :data="depts" :props="treeDepts" @node-click="nodeClick" />
          </el-option>
        </el-select>
        <!-- 放置一个tree组件 -->
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { departmentList } from '@/utils'
import employees from '@/constant/employees'
import { addEmployeeApi, getDeptsApi } from '@/api'
const { hireType } = employees
export default {
  data() {
    return {
      depts: [],
      showTree: false, // 控制树形的显示或者隐藏
      loading: false, // 控制树的显示或者隐藏进度条
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: '',
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位',
          },
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur',
          },
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' },
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' },
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' },
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }],
      },
      hireType,
      treeDepts: {
        label: 'name',
      },
      loading: false,
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
      //   this.formData = {
      //     username: '',
      //     mobile: '',
      //     formOfEmployment: '',
      //     workNumber: '',
      //     departmentName: '',
      //     timeOfEntry: '',
      //     correctionTime: '',
      //   }
      this.$refs.form.resetFields()
    },
    //获取组织架构
    async getDepts() {
      this.loading = true
      const { depts } = await getDeptsApi()
      //   this.depts = depts
      //处理树形数据
      this.depts = departmentList(depts, '')
      this.loading = false
    },

    //点击获取当前节点
    nodeClick(row) {
      this.formData.departmentName = row.name
      //隐藏下拉框
      this.$refs.refSelect.blur()
    },

    //保存
    onSave() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        // console.log('发送请求')
        await addEmployeeApi(this.formData)
        this.onClose()
        this.$message.success('添加成功')
        //更新页面
        this.$emit('add-success')
      })
    },
  },
}
</script>

<style scoped lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover .el-select-dropdown__item {
  background-color: #fff;
  overflow: unset;
}

.treeOption {
  height: 160px;
}
</style>
