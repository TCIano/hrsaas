<template>
  <el-dialog
    title="角色分配"
    @open="open"
    @close="onClose"
    :visible="showRoleDia"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in RolesList" :label="item.id" :key="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="assignRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { assignRolesApi, getUserDetail } from '@/api'
import { getRolesApi } from '@/api/roles'
export default {
  data() {
    return {
      checkList: [],
      RolesList: [], //角色列表
    }
  },
  props: {
    showRoleDia: {
      type: Boolean,
    },
    currentEmployeeId: {
      type: String,
    },
  },
  created() {},

  methods: {
    onClose() {
      this.$emit('update:showRoleDia', false)
    },
    //获取角色列表
    async getRolesList() {
      const { rows } = await getRolesApi()
      //   console.log(rows)
      this.RolesList = rows
    },
    //根据员工详细信息，获取员工所属角色
    async getEmployeeRoles() {
      const { roleIds } = await getUserDetail(this.currentEmployeeId)
      console.log(roleIds)
      this.checkList = roleIds
    },
    open() {
      this.getRolesList()
      //获取当前员工所属角色
      this.getEmployeeRoles()
    },
    //分配角色
    async assignRoles() {
      if (!this.checkList.length) return this.$message.warning('请添加角色')
      await assignRolesApi({
        id: this.currentEmployeeId,
        roleIds: this.checkList,
      })
      this.$message.success('角色分配成功')
      this.onClose()
    },
  },
}
</script>

<style scoped></style>
