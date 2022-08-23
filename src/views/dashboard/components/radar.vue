<template>
  <div class="radar" ref="main"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRadar()
  },
  methods: {
    initRadar() {
      var myChart = echarts.init(this.$refs.main)
      // 绘制图表
      myChart.setOption({
        title: {
          text: '基础雷达图',
        },
        legend: {
          data: ['1', '2'],
        },
        radar: {
          // shape: 'circle',
          //   radius: 120,
          indicator: [
            { name: '考勤', max: 100 },
            { name: '技术', max: 100 },
            { name: '管理', max: 100 },
            { name: '分享', max: 100 },
            { name: 'bug', max: 100 },
            { name: '助人', max: 100 },
          ],
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10,
            },
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 0, 250, 0.8)',
            },
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 122, 122, 0.8)',
            },
          },
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [50, 30, 20, 35, 50, 18],
                name: '1',
              },
              {
                value: [80, 35, 30, 35, 60, 50],
                name: '2',
              },
            ],
          },
        ],
      })
    },
  },
}
</script>

<style scoped lang="scss">
.radar {
  width: 550px;
  height: 500px;
}
</style>
