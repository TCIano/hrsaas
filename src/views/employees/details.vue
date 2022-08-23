<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="changeTabActive">
          <el-tab-pane label="登录账户设置" name="account">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="detail">
            <user-info></user-info>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="job">
            <jobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import jobInfo from './components/job-info.vue'
import Cookie from 'js-cookie'
import UserInfo from './components/user-info.vue'
import { getUserDetail, saveUserDetailById } from '@/api'
export default {
  data() {
    return {
      formData: {},
      activeName: Cookie.get('activeName') || 'account',
    }
  },
  components: {
    UserInfo,
    jobInfo,
  },
  created() {
    this.getUserDetail()
  },

  methods: {
    async getUserDetail() {
      const res = await getUserDetail(this.$route.params.id)
      this.formData = res
    },
    async onSave() {
      await saveUserDetailById(this.formData)
      this.$message.success('更新用户信息成功')
    },

    //切换tab 持久化
    changeTabActive() {
      Cookie.set('activeName', this.activeName)
    },
  },
}
</script>

<style scoped></style>
