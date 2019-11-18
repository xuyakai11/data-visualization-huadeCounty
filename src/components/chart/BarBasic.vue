<template>
  <div ref="echart" :style="{height: height, width: '100%'}">
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
	@Prop() private height!: string
  @Prop() private datas!: any
  
	colorList:Array<string> = ['#1890ff','#13c2c2','#9270ca','#f6c74a','#e97f67','#d3f261']


	@Watch('datas', {deep: true})
	watchDatas (): void {
    if (!this.datas) return;
    let xAxisData:any = [], seriesData:any = [];
    this.datas.forEach((v:any, index:number) => {
      xAxisData.push(v.name)
      seriesData.push({
        value: v.value,
        itemStyle: {
          color: this.colorList[index%this.colorList.length]
        }
      })
    });
		this.drawChartBarBasic(xAxisData, seriesData)
	}
  drawChartBarBasic (xAxisData: Array<string>, seriesData: Array<number>) {
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
        right: 0,
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
        data: xAxisData
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
          // name: 'title',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          type: 'bar',
          barWidth: '50%',
					data: seriesData,
				}
			]
    }, true)
	}
}
</script>
