<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="addDialogVisible = true"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="tableDate">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="success"
                    @click="assignPermission(scope)"
                    >分配权限</el-button
                  >

                  <!-- v-if="isHasBtnPermission(point.roles.edit)" -->

                  <el-button
                    size="small"
                    type="primary"
                    v-isHasBtnPermission="point.roles.edit"
                    >编辑</el-button
                  >

                  <!-- v-if="isHasBtnPermission(point.roles.del)" -->

                  <el-button
                    size="small"
                    type="danger"
                    @click="delRole(scope)"
                    v-isHasBtnPermission="point.roles.del"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                :page-sizes="[3, 5, 10, 15, 20]"
                layout="sizes,prev,pager,next"
                :total="total"
                :page-size="pageSize"
                @current-change="currentChange"
                @size-change="sizeChange"
                @prev-click="prevClick"
                @next-click="nextClick"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.name"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.companyAddress"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.mailbox"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.remarks"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <!-- 对话框组件 -->
    <el-dialog
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
      @click="dialogClose"
    >
      <el-form
        :model="addRolesForm"
        :rules="rules"
        label-width="100px"
        ref="form"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRolesForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="addRolesForm.description"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onAddRoles">确 定</el-button>
    </el-dialog>

    <!-- 权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="showPermission"
      destroy-on-close
      @close="onClose"
    >
      <el-tree
        :data="PermissionList"
        :props="{ label: 'name' }"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="selectCheckTree"
        ref="treePer"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showPermission = false">取 消</el-button>
        <el-button type="primary" @click="onSaveRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import point from '@/constant/permission'
import {
  addRolesApi,
  assignPermApi,
  delRolesApi,
  getRolesApi,
  getRolesInfo,
} from '@/api/roles'
import { getCompanyInfoApi, getPermissionListApi, getRolesInfoApi } from '@/api'
import { departmentList } from '@/utils'
import MixinsPremission from '@/Mixins/permisson'
export default {
  mixins: [MixinsPremission],
  data() {
    return {
      point,
      tableDate: [],
      total: 0,
      pageSize: 2,
      page: 1,
      addDialogVisible: false, //新增弹层
      addRolesForm: {
        name: '',
        description: '',
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
      },
      companyInfo: {},
      showPermission: false,
      PermissionList: [], //列表
      selectCheckTree: [], //默认选中的权限
      roleId: '', //当前角色id
    }
  },

  created() {
    this.getRoles()
    this.geComInfo()
    this.getPermissionList()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      this.tableDate = rows
      this.total = total
    },
    //改变页数
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    //改变每次条数
    sizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    //下一页上一页
    prevClick() {
      this.page + 1
      this.getRoles()
    },
    nextClick(val) {
      this.page - 1
      this.getRoles()
    },
    //取消按钮
    onCancel() {
      this.addDialogVisible = false
    },
    //关闭弹窗
    dialogClose() {
      //重新校验表单
      this.$refs.form.resetFields()
      this.addRolesForm.description = ''
    },
    //添加角色
    async onAddRoles() {
      await this.$refs.form.validate()
      await addRolesApi(this.addRolesForm)
      this.$message.success('添加成功')
      this.addDialogVisible = false
      this.getRoles()
    },
    //删除角色
    async delRole(scope) {
      await delRolesApi(scope.row.id)
      this.$message.success('删除成功')
      this.getRoles()
    },

    //获取公司信息
    async geComInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId,
      )
      console.log(res)
      this.companyInfo = res
    },
    //打开分配权限弹框
    async assignPermission(scope) {
      //保存当前角色id
      this.roleId = scope.row.id
      console.log(scope)
      this.showPermission = true
      //获取元工权限
      const res = await getRolesInfoApi(scope.row.id)
      // console.log(res.permIds)
      this.selectCheckTree = res.permIds
    },
    //获取权限
    async getPermissionList() {
      const res = await getPermissionListApi()
      // console.log(res)
      const treePermission = departmentList(res, '0')
      this.PermissionList = treePermission
    },
    //关闭弹层，清除清除默认权限
    onClose() {
      //清除默认选中，需要先销毁当前的组件里面内容
      this.selectCheckTree = []
    },
    //保存修改的权限
    async onSaveRight() {
      // console.log(this.$refs.treePer.getCheckedKeys())
      await assignPermApi({
        id: this.roleId,
        permIds: this.$refs.treePer.getCheckedKeys(),
      })
      this.showPermission = false
      this.$message.success('权限分配成功')
    },
  },
}
</script>

<style scoped></style>
