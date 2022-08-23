<template>
  <div>
    <SvgIcon
      iconClass="fullscreen"
      className="fullscreen"
      @click="exchangeFullScreen"
    ></SvgIcon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import SvgIcon from '../SvgIcon/index.vue'
export default {
  name: 'fullScreen',
  data() {
    return {}
  },
  created() {},
  methods: {
    exchangeFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    },
  },
  components: { SvgIcon },
}
</script>

<style scoped lang="scss">
.fullscreen {
  margin-right: 10px;
  margin-left: 10px;
  color: #fff;
}
</style>
