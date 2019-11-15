<template>
  <div ref="echart" :style="{height: height, width: '100%'}">
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import echarts from 'echarts'
import 'echarts/lib/chart/line';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/tooltip'

@Component
export default class LineBasic extends Vue {
	@Prop() private height!: string
  @Prop() private datas!: any
  
	colorList:Array<string> = ['#1890ff','#13c2c2','#9270ca','#f6c74a','#e97f67','#d3f261']


	@Watch('datas', {deep: true})
	watchDatas (): void {
    if (!this.datas) return;
		this.drawChartBarBasic(this.datas)
	}
  drawChartBarBasic (seriesData: Array<number>) {
		const myChart = echarts.init(this.$refs.echart as HTMLDivElement)
    // myChart.resize(true)
    
    myChart.setOption({
      // title: {
      //   text: '全国货柜销售金额',
      //   textStyle: {
      //     color: '#fff'
      //   },
      //   left: 'center'
      // },
      grid: {
        // left: 10,
        top: 20,
        right: 20,
        bottom: 20,
        borderWidth: 0
      },
			tooltip: {
        show: false,
				trigger: 'item',
				formatter: '{b}<br/>{c} (p / km2)'
      },
      textStyle:{ // 图片所有文字样式，优先级最高
        // color: '#00e4ff'
      },
      xAxis:{
        nameTextStyle: {
          color: '#00e4ff',
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#00e4ff',
            width: 1
          }
        },
        axisTick: {
          show: false
        },
        type: 'category',
        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
      },
      yAxis: {
        type: 'value',
        // name: 'YY',
        axisLine: {
          lineStyle: {
            color: '#29929e',
            width: 1
          },
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#003560',
            width: 1
          },
          show: true
        }
      },
			series: [
				{
          type: 'line',
          symbol: '',
          symbolSize: 0,
          lineStyle: {
            width: 2,
            color: "rgba(232,104,74,1)"
          },
          label: {
            normal: {
              show: false,
              position: 'top'
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(232,104,74,0.8)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(245,161,129,0)' // 100% 处的颜色
              }]
            }
          },
          z: 1,
					data: seriesData,
				}
			]
    }, true)
	}
}
</script>
