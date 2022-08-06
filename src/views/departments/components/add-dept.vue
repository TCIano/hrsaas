<template>
  <el-dialog title="添加部门" :visible="visiable" width="50%" @close="onClose">
    <el-form label-width="100px" :model="formDate" :rules="rules" ref="form">
      <el-form-item label="部门名称" prop="name">
        <el-input
          placeholder="请输入部门名称"
          v-model="formDate.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="请输入部门编码"
          v-model="formDate.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          placeholder="请选择部门负责人"
          style="width: 100%"
          v-model="formDate.manager"
        >
          <el-option
            :label="item.username"
            :value="item.username"
            v-for="item in employeesList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          placeholder="请输入部门介绍"
          type="textarea"
          v-model="formDate.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addDeptApi, getDeptsApi, getEmployeesApi } from '@/api'
export default {
  data() {
    //校验部门名称
    const checkDeptName = (rule, value, callback) => {
      if (!this.currentNode.children) return callback()
      console.log(this.currentNode, value)
      //判断添加的部门是否和已存在的当前子部门重复，
      const isReapt = this.currentNode.children.some(
        (item) => item.name === value,
      )
      //如果重复那就调用callback（new Error）
      //如果不重复那就 调用callback（）继续
      isReapt ? callback(new Error('部门重复')) : callback()
    }
    //校验部门编码
    const checkDeptCode = async (rule, value, callback) => {
      //获取所有部门
      const { depts } = await getDeptsApi()
      console.log(depts)
      const isReapt = depts.some((item) => item.code === value)
      isReapt ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formDate: {
        code: '',
        name: '',
        introduce: '',
        manager: '',
      },
      employeesList: [], //员工列表
      rules: {
        name: [
          { required: true, message: '请输入部门名字', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '请输入部门名字', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur',
          },
        ],
        manager: [
          { required: true, message: '请输入部门名字', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '请输入部门名字', trigger: 'blur' },
        ],
      },
    }
  },
  props: {
    visiable: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.getEmployees()
  },

  methods: {
    async getEmployees() {
      const res = await getEmployeesApi()
      console.log(res)
      this.employeesList = res
    },
    //关闭对话框 叉号以及点击遮罩都会触发
    onClose() {
      // console.log(111)
      this.$emit('update:visiable', false)
    },
    //确定提交
    async onSave() {
      //校验表单
      await this.$refs.form.validate()
      this.formDate.pid = this.currentNode.id
      try {
        await addDeptApi(this.formDate)
        //关闭弹框
        this.onClose()
        //更新数据
        this.$emit('updateList')
      } catch (error) {}
    },
  },
}
</script>

<style scoped></style>
