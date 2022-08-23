import emploeesPoint from '@/constant/permission'
export default {
  data() {
    return {
      point: emploeesPoint,
    }
  },
  methods: {
    //判断按钮权限
    isHasBtnPermission(point) {
      return this.$store.state.permission.points.includes(point)
    },
  },
}
