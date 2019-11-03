<template>
  <div class="echart" ref="echart" style="width:5rem;height:3.98rem">
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import echarts from 'echarts'
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/tooltip'

@Component
export default class BarAndLine extends Vue {
  @Prop()private datas!: any
  baseFont: number = 10;
	
	@Watch('datas', {deep: true})
	watchDatas (): void {
		if (!this.datas) return;
		this.drawChartBarBasic(this.datas.map((v:any)=>v.sale_name), this.datas.map((v:any)=>v.sale_value))
  }
	mounted() {
		let doc:any = document.documentElement
		this.baseFont = doc.style.fontSize.slice(0,-2)
	}
  drawChartBarBasic (xAxisData: Array<string>, seriesData: Array<number>) {
    const myChart = echarts.init(this.$refs.echart as HTMLDivElement)
    // let seriesDataArr = seriesData.map((v,i)=>{
    //   return {
    //     value: v,
    //     itemStyle:{
    //       color: {
    //         type: 'linear',
    //         x: 0,
    //         y: 0,
    //         x2: 0,
    //         y2: 1,
    //         colorStops: [{
    //             offset: 0, color: '#'+['E77200','F9CA00','9DD800','00d16c','00cfd0'][i] // 0% 处的颜色
    //         }, {
    //             offset: 1, color: '#'+['972400','937A00','447800','005f29','005261'][i] // 100% 处的颜色
    //         }],
    //       }
    //     }
    //   }
    // })
		// myChart.resize(true)
    myChart.setOption({
      
      grid: {
        // left: 100,
        top: 30,
        right: 20,
        bottom: .7*this.baseFont,
        borderWidth: 0
      },
      xAxis:{
        type: 'category',
        splitLine: { show: false },
        axisLine: {
          show: false
        },
        axisLabel: {
          padding: [10,0,0,10],
          textStyle: {
            color: 'rgba(255, 255, 255,1)',
            fontSize: .12*this.baseFont
          }
        },
        data: xAxisData
      },
      yAxis: [{
        type: 'value',
        splitLine: { 
          lineStyle: {
            type: 'solid',
            color: ['#4fccff'],
            opacity: 0.2
          }
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          formatter: function(v:any) {
            return v;
          },
          textStyle: {
            color: 'rgba(255, 255, 255, 1)',
            fontSize: .12*this.baseFont
          }
        }
      },{
        type: 'value',
        splitLine: { 
          show:false
        },
        axisLine: {
          show: false
        }
      }],
			series: [
				{
          type: 'bar',
          barWidth: .12*this.baseFont,
          itemStyle: {
            color:{
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#0072f6' // 0% 处的颜色
              }, {
                  offset: 1, color: '#33f4e6' // 100% 处的颜色
              }],
            },
            barBorderRadius: .08*this.baseFont
          },
					data: seriesData
        },
        {
          type:'line',
          symbol: 'circle',
          symbolSize: .1*this.baseFont,
          itemStyle:{
            color: '#ffc760'
          },
          lineStyle:{
            color: '#ffc760',
            width: 1
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              fontSize: .12*this.baseFont
            }
          },
          yAxisIndex: 0,
          data: seriesData.map(v=>~~(1.1*v))
        }
			]
    }, true)
	}
}
</script>

<style lang="scss" scoped>
.echart {
  margin: 0 auto;
}
</style>
