<template>
  <div ref="echart" style="width:700px;height: 500px">
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import echarts from 'echarts'

require('echarts/lib/chart/line')
// 引入提示框和标题组件
// require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

@Component
export default class AreaBasic extends Vue {
  @Prop()private datas!: any

  @Watch('datas', {deep: true})
	watchDatas (): void {
		if (!this.datas) return;
		this.drawChartAreaBasic(this.datas.xAxisData, this.datas.seriesData)
	}
  drawChartAreaBasic (xAxisData: Array<string>, seriesData: Array<number>) {
    console.log(xAxisData, seriesData)
    const myChart = echarts.init(this.$refs.echart as HTMLDivElement)
    myChart.setOption({
      // tooltip: {
      //   show: false,
      //   trigger: 'axis'
      // },
      title: {
        text: '日活用户',
        textStyle: {
          color: '#fff'
        },
        left: 'center'
      },
      calculable: true,
      grid: {
        left: 100,
        borderWidth: 0
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#5b6678',
            width: 1
          }
        },
        axisLabel: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.6)'
          }
        },
        data: xAxisData
      }],
      yAxis: {
        type: 'value',
        name: '金额(元)',
        splitLine: { show: false },
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.6)'
        },
        axisLine: {
          lineStyle: {
            color: '#5b6678',
            width: 1
          }
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.6)'
          }
        }
      },
      series: [
        {
          name: '',
          type: 'line',
          itemStyle: {
            color: '#2187be'
          },
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            color: '#2187be',
            width: 1
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(2,161,222,.9)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(255,255,255,0)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          },
          z: 1,
          data: seriesData
        }
      ]
    })
  }
}
</script>
