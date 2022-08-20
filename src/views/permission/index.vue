<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :iShowLeft="false">
        <template #right-tag>
          <el-button type="primary" @click="onshowDialog('0', 1)"
            >添加权限</el-button
          >
        </template>
      </PageTools>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 20px"
        row-key="id"
        ref="table"
      >
        <el-table-column prop="name" label="名称" width="180">
          <template slot-scope="{ row }">
            <i
              class="el-icon-folder-opened"
              style="margin-right: 5px"
              v-if="row.children"
              @click="openList(row)"
            ></i>
            <i class="el-icon-folder" style="margin-right: 5px" v-else></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="onshowDialog(row.id, 2)"
              >添加</el-button
            >
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 放置一个弹层 用来编辑新增节点 -->
    <el-dialog
      :title="`新增权限点`"
      :visible.sync="showDialog"
      @close="btnCancel"
    >
      <!-- 表单 -->
      <el-form
        ref="perForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools/index.vue'
import { addPermApi, getPermissionListApi, getPersonalDetailApi } from '@/api'
import { departmentList } from '@/utils'
export default {
  data() {
    return {
      tableData: [],
      showDialog: false,
      formData: {
        name: '',
        code: '',
        description: '',
      },
      rules: {
        name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入权限标识', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const res = await getPermissionListApi()
      // console.log(res)
      this.tableData = departmentList(res, '0')
      // console.log(this.tableData)
    },
    //打开子列表
    openList(row) {
      //点击每一行都给对应行添加一个 展开属性
      row.isExpand = !row.isExpand
      this.$refs.table.toggleRowExpansion(row, row.isExpand)
    },

    //添加权限校验
    btnOK() {
      this.$refs.perForm.validate(async (vali) => {
        if (!vali) return
        //添加权限点
        await addPermApi(this.formData)
        this.$message.success('添加权限成功')
        this.showDialog = false
      })
    },
    btnCancel() {
      this.$refs.perForm.resetFields()
      this.showDialog = false
    },

    //打开添加权限按钮
    onshowDialog(id, type) {
      this.showDialog = true
      this.formData.pid = id
      this.formData.type = type
      console.log(this.formData)
      this.getPermissionList()
    },
  },
  components: { PageTools },
}
</script>

<style scoped lang="scss">
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
