<template>
  <el-dialog
    :title="dialogTitle"
    :visible="visiable"
    width="50%"
    @close="onClose"
  >
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
import {
  addDeptApi,
  editDeptByIdApi,
  getDeptByIdApi,
  getDeptsApi,
  getEmployeesApi,
} from '@/api'
export default {
  data() {
    //校验部门名称
    const checkDeptName = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()

      //如果当前处于编辑部
      if (this.formDate.id) {
        //先过滤出兄弟节点，然后再通过some判断当前编辑与返回数据是否重复，重复就去掉。
        const filterList = depts.filter(
          (item) =>
            item.pid === this.formDate.pid && item.id !== this.formDate.id,
        )
        const isReapt = filterList.some((item) => item.name === value)
        isReapt ? callback(new Error('部门重复')) : callback()
      } else {
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
    }
    //校验部门编码
    const checkDeptCode = async (rule, value, callback) => {
      //获取所有部门
      const { depts } = await getDeptsApi()
      console.log(depts)
      let isReapt
      //如果处于编辑状态
      if (this.formDate.id) {
        //先把自己剔除出，然后再判断和其他是否重复
        isReapt = depts
          .filter((item) => item.id !== this.formDate.id)
          .some((item) => item.code === value)
      } else {
        //如果处于添加状态
        isReapt = depts.some((item) => item.code === value)
      }
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
  computed: {
    dialogTitle() {
      return this.formDate.id ? '编辑部门' : '添加部门'
    },
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
      //重置交单校验规则
      this.$refs.form.resetFields()
      //重置数据去除id
      // this.formDate.id = ''
      this.formDate = {
        code: '',
        name: '',
        introduce: '',
        manager: '',
      }
    },
    //确定提交
    async onSave() {
      //如果处于 编辑
      await this.$refs.form.validate()
      if (this.formDate.id) {
        await editDeptByIdApi(this.formDate)
        //关闭弹框
        this.onClose()
        //更新数据
        this.$emit('updateList')
        this.$message.success('修改成功')
      } else {
        //校验表单
        this.formDate.pid = this.currentNode.id

        await addDeptApi(this.formDate)
        //关闭弹框
        this.onClose()
        //更新数据
        this.$emit('updateList')
        this.$message.success('添加成功')
      }
    },

    async getDeptById(id) {
      //获取当前编辑框的id
      console.log(id)
      // 通过id获取内容
      this.formDate = await getDeptByIdApi(id)
    },
  },
}
</script>

<style scoped></style>
