<template>
  <el-dropdown @command="onCommand">
    <span class="el-dropdown-link" style="margin-left: 10px">
      <svg-icon
        style="color: #fff; font-size: 20px; margin-left: 10px !important"
        icon-class="language"
      />
    </span>
    <el-dropdown-menu slot="dropdown">
      <!-- 当前语言不可切换，只能切换其他语言 -->
      <el-dropdown-item
        :disabled="key === $root.$i18n.locale"
        v-for="(value, key) in messages"
        :command="key"
        :key="key"
      >
        {{ value.name }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookies from 'js-cookie'
import { messages } from '@/i18n'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages,
    }
  },

  created() {},

  methods: {
    onCommand(val) {
      console.log(val)
      this.$root.$i18n.locale = val
      //刷新页面
      this.$router.go(0)
      //持久化语言
      Cookies.set('lang', val)
    },
  },
}
</script>

<style scoped lang="scss">
// span.el-dropdown-link .el-dropdown-selfdefine {
//   margin-left: 10px;
// }
</style>
