<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select
        v-model="currentYear"
        size="small"
        style="width: 120px"
        @change="updateMonth"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
          >{{ item }}</el-option
        >
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px; margin-left: 10px"
        @change="updateMonth"
      >
        <el-option v-for="item in 12" :key="item" :label="item" :value="item">{{
          item
        }}</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="calendarData">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <!-- 周末休息字体 -->
          <span v-if="isWeekends(date)" class="reset">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      yearList: [], //当前年份的前五年和后五年加当前年份
      currentMonth: '',
      calendarData: '',
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      //先填充十一个都为前五年的年份的数组，然后遍历每一个年份，让其自增。
      //   this.yearList = Array(11)
      //     .fill(this.currentYear - 5)
      //     .map((item, i) => item + i)
      this.yearList = Array.from(
        Array(11).fill(this.currentYear - 5),
        (item, i) => item + i,
      )
      this.calendarData = date
    },
    //判断是否为周末
    isWeekends(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    //更新年份月份
    updateMonth() {
      //赋值给v-model的日历时间
      this.calendarData = this.currentYear + '-' + this.currentMonth
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar__body {
    .current {
      border: none;
    }
    .next {
      border: none;
    }
    .prev {
      border: none;
    }
    .cell-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .reset {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background-color: rgb(232, 140, 140);
        border-radius: 20px;
      }
    }
  }
}
</style>
