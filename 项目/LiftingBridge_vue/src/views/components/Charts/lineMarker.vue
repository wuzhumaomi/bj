<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart3'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '216px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        backgroundColor: '#fff',
        title : {
          text: '各岗业作业超节拍次数汇总图',
          subtext: '纯属虚构',
          x:'center'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
            type : 'category',
            data : ['岗位1', '岗位2', '岗位3', '岗位4'],
            axisTick: {
                alignWithLabel: true
            }
        }],
        yAxis: [{
          type: 'value',
        }],
        series: [{
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[334,200,152,120]
        }]
      })
    }
  }
}
</script>
