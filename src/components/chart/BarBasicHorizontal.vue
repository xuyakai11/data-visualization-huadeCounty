<template>
  <div ref="echart" :style="{width:datas.w, height: datas.h}">
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import echarts from 'echarts'
import 'echarts/lib/chart/bar';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/tooltip'

@Component
export default class BarBasicHorizontal extends Vue {
	@Prop()private datas!: any
	
	baseUrl: string = process.env.BASE_URL
  mounted() {
    console.log(this.baseUrl)
    // this.drawChartBarBasic(this.datas.xAxisData, this.datas.seriesData)
  }
	@Watch('datas', {deep: true})
	watchDatas (): void {
		// if (!this.datas) return;
		this.drawChartBarBasic(this.datas.xAxisData, this.datas.seriesData)
	}
  drawChartBarBasic (xAxisData: Array<number>, seriesData: Array<number>) {
		const myChart = echarts.init(this.$refs.echart as HTMLDivElement)
		myChart.resize()
    myChart.setOption({
      title: {
        text: '区域销售金额TOP5',
        textStyle: {
          color: '#fff'
        },
        left: 'center'
      },
			tooltip: {
				trigger: 'item',
				formatter: '{b}<br/>{c} (p / km2)'
      },
      textStyle:{
        color: '#fff'
      },
      xAxis:{
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        type: 'value'
      },
      yAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        data: xAxisData
      },
			series: [
				{
          // name: 'title',
          label: {
            normal: {
              show: true,
              position: 'right'
            }
          },
					type: 'bar',
					data: seriesData,
				}
			]
    }, true)
	}
}
</script>
