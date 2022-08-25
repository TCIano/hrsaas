<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #left-tag>
          <span>共166条记录</span>
        </template>
        <template slot="right-tag">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            v-if="isHasBtnPermission(point.employees.import)"
            >导入</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="exportExcel"
            v-if="isHasBtnPermission(point.employees.export)"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="addEmployee"
            v-if="isHasBtnPermission(point.employees.add)"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <!-- //处理加载失败 -->
              <img
                :src="row.staffPhoto"
                v-imgError="require('@/assets/common/head.jpg')"
                style="
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
                  padding: 10px;
                  cursor: pointer;
                "
                @click="showErCodeDia(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatformOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | filterDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ccc"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="getRoles(row.id)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="delEmployee(row.id)"
                v-if="isHasBtnPermission(point.employees.del)"
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
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pages.size"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>

    <!-- //添加员工弹窗 -->
    <add-employee
      :visible.sync="showAddDialog"
      @add-success="getEmployeesList"
    ></add-employee>

    <!-- 头像二维码弹层 -->
    <el-dialog title="头像二维码" :visible.sync="showErCode">
      <canvas id="canvas"></canvas>
    </el-dialog>

    <!-- 角色分配 -->
    <assign-role
      :showRoleDia.sync="showRoleDia"
      :currentEmployeeId="currentEmployeeId"
    />
  </div>
</template>

<script>
import point from '@/constant/permission'

import MixinsPermission from '@/Mixins/permisson'
import assignRole from './components/assign-role.vue'
import QRCode from 'qrcode'
import addEmployee from './components/add-employee.vue'
//引入映射
import employees from '@/constant/employees'
const { exportExcelMapPath, hireType } = employees
import { delEmployeeApi, getEmployeesInfoApi } from '@/api'
export default {
  mixins: [MixinsPermission],
  data() {
    return {
      point,
      showRoleDia: false, //角色弹出层
      employees: [], //员工列表
      pages: {
        page: 1,
        size: 10,
      },
      total: 0,
      showAddDialog: false,
      showErCode: false,
      currentEmployeeId: '', //当选选中员工id,
    }
  },
  components: {
    addEmployee,
    assignRole,
  },
  created() {
    this.getEmployeesList()
  },
  methods: {
    async getEmployeesList() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.employees = rows
      this.total = total
    },
    //改变页数
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesList()
    },
    //过滤聘用形式
    formatformOfEmployment(row, column, cellValue, index) {
      // console.log(typeof cellValue)
      //通过映处理数据
      const findItem = hireType.find((item) => item.id == cellValue)
      // console.log(findItem)
      return findItem ? findItem.value : '未知'
    },

    //删除员工
    async delEmployee(id) {
      await this.$confirm('是否要删除')
      await delEmployeeApi(id)
      this.$message.success('删除成功')
    },

    //新增员工
    addEmployee() {
      this.showAddDialog = true
    },
    //导出员工列表
    async exportExcel() {
      const { rows } = await getEmployeesInfoApi({
        page: 1,
        size: this.total,
      })
      // console.log(rows)
      //处理表头
      const header = Object.keys(exportExcelMapPath)
      // console.log(header)
      //处理数据，为二维数组
      const data = rows.map((item) => {
        // 表头长度和数据每一项的长度对应
        // 把数据的每一项按照表头中按顺序排列
        //根据映射表拿到每一项arr中里面的数据
        return header.map((header) => {
          if (header === '聘用形式') {
            const findItem = hireType.find(
              (hire) => hire.id == item[exportExcelMapPath[header]],
            )
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[header]]
          }
        })
      })
      //懒加载
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
        //
      })
    },
    showErCodeDia(havePhoto) {
      if (!havePhoto) {
        return this.$message.warning('当前用户没有头像，请添加头像')
      }
      this.showErCode = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        //图片转为二维码
        QRCode.toCanvas(canvas, havePhoto)
      })
    },
    //获取角色信息
    getRoles(id) {
      this.showRoleDia = true
      //获取当前员工id
      this.currentEmployeeId = id
    },
  },
}
</script>

<style scoped></style>
