<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col>
        <el-tag v-if="iShowLeft">
          <i :class="leftIcon"></i>
          <slot name="left-tag" />
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right-tag" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTools',
  data() {
    return {}
  },
  props: {
    iShowLeft: {
      type: Boolean,
      default: true,
    },
    leftIcon: {
      type: String,
      default: 'el-icon-info',
    },
  },
  created() {},

  methods: {},
}
</script>

<style scoped></style>
