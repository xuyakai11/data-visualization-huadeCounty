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
export default class BarBasic extends Vue {
	@Prop()private datas!: any
	
	@Watch('datas', {deep: true})
	watchDatas (): void {
		if (!this.datas) return;
		this.drawChartBarBasic(this.datas.xAxisData, this.datas.seriesData)
	}
  drawChartBarBasic (xAxisData: Array<string>, seriesData: Array<number>) {
		const myChart = echarts.init(this.$refs.echart as HTMLDivElement)
		// myChart.resize(true)
    myChart.setOption({
      title: {
        text: '全国货柜销售金额',
        textStyle: {
          color: '#fff'
        },
        left: 'center'
      },
      grid: {
        left: 100
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
        axisTick: {
          show: false
        },
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        // name: 'YY',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        splitLine: {
          show: false
        }
      },
			series: [
				{
          // name: 'title',
          label: {
            normal: {
              show: true,
              position: 'top'
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
