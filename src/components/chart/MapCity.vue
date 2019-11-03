<template>
  <div id="map" ref="echart" :style="{width:datas.w, height: datas.h}">
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import echarts from 'echarts'
import 'echarts/lib/chart/map';
import 'echarts/map/js/china.js';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip'

@Component
export default class MapCity extends Vue {
	@Prop()private datas!: any
	
	baseUrl: string = process.env.BASE_URL

	@Watch('datas', {deep: true})
	watchDatas (): void {
		if (!this.datas) return;
		(this as any).$get(this.baseUrl+'json/'+this.datas.name+'.json').then((r: any) => {
			this.drawChartAreaBasic(r)
		})
	}
  drawChartAreaBasic (geoJson: any) {
		const myChart = echarts.init(this.$refs.echart as HTMLDivElement)
		myChart.resize()
    echarts.registerMap('henan', geoJson);
    myChart.setOption({
			tooltip: {
				trigger: 'item',
				formatter: '{b}<br/>{c} (p / km2)'
			},
			visualMap: {
				min: 800,
				max: 8000,
				text: ['High', 'Low'],
				realtime: false,
				calculable: true,
				show: false,
				inRange: {
					color: ['lightskyblue', 'yellow', 'orangered']
				}
			},
			series: [
				{
					name: 'title',
					type: 'map',
					mapType: 'henan', // 自定义扩展图表类型
					itemStyle: {
						normal: { label: { show: true } },
						emphasis: { label: { show: true } }
					},
					data: [
						{ name: '江阴市', value: 7000 },
						{ name: '惠山区', value: 6000 },
						{ name: '锡山区', value: 5000 },
						{ name: '梁溪区', value: 4000 },
						{ name: '新吴区', value: 3000 },
						{ name: '滨湖区', value: 2000 },
						{ name: '宜兴市', value: 1000 }
					]
				}
			]
    }, true)
	}
}
</script>
