<template>
  <div class="dashboard-container" v-loading="loading">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 缺少treeNode -->
        <tree-tools :treeNode="company" :isRoot="true" @add="addDept" />

        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <!-- 自定义树节点的内容，参数为 { node, data,当前el-tree中data行数据 } -->
          <template v-slot="{ data }">
            <tree-tools
              :treeNode="data"
              @remove="getDepts"
              @add="addDept"
              @edit="showEdit"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 对话框 -->
    <!-- 通过点sync子组件修改 弹出关闭数据，传递给父组件 -->
    <add-dept
      ref="addDept"
      :visiable.sync="dialogVisible"
      :currentNode="currentNode"
      @updateList="getDepts"
    ></add-dept>
  </div>
</template>

<script>
import AddDept from './components/add-dept.vue'
import { getDeptsApi } from '@/api'
import treeTools from './components/tree-tools.vue'
import { departmentList } from '@/utils'
export default {
  components: {
    treeTools,
    AddDept,
  },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      defaultProps: {
        label: 'name',
      },
      departs: [],
      dialogVisible: false,
      currentNode: {}, //当前部门
      loading: false,
    }
  },

  created() {
    this.getDepts()
  },

  methods: {
    async getDepts() {
      this.loading = true
      const res = await getDeptsApi()
      console.log(res)
      //把拿到的列表处理为树形结构
      this.departs = departmentList(res.depts, '')
      this.loading = false
    },
    //添加子部门
    addDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    //展示编辑弹窗,拿到 treetools中编辑按钮传递的数据
    showEdit(val) {
      this.dialogVisible = true
      //通过ref拿到子组件定义内部的方法
      this.$refs.addDept.getDeptById(val.id)
    },
  },
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
