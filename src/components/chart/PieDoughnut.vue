<template>
	<div :class="clasName">
		<div class="list">
			<div v-for="(item,index) in listName" :key="index">
				<span :style="{background:colorList[index]}"></span>{{item}}
			</div>
		</div>
		<div class="echart" ref="echart" :style="{width:width,height:height}">
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import echarts from 'echarts'
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
// import 'echarts/lib/component/tooltip'

@Component
export default class PieDoughnut extends Vue {
	@Prop() private width!:string
	@Prop() private height!:string
	@Prop() private clasName?: string
	// @Watch('datas', {deep: true})
	// mounted() {
	// 	if (!this.datas) return;
	// 	this.drawChartBarBasic(this.datas.xAxisData, this.datas.seriesData)
	// }
	listName: Array<string> = []
	colorList:Array<string> = ['#1890ff','#13c2c2','#9270ca','#f6c74a','#e97f67','#d3f261','#1890ff','#13c2c2']
	baseFont: number = 10;
	mounted() {
		let doc:any = document.documentElement
		this.baseFont = doc.style.fontSize.slice(0,-2)
	}
  drawEchart (data: Array<string>) {
		this.listName = data.map((v: any)=>v.name);
		const myChart = echarts.init(this.$refs.echart as HTMLDivElement)
    myChart.setOption({
			gird:{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},
			// legend: {
			// 	show: false,
			// 	bottom: 0,
			// 	// left: 'center',
			// 	width: data.length> 3 ? 2.2*this.baseFont : 2.6*this.baseFont,
			// 	padding: 0,
			// 	itemGap: 5,
			// 	itemWidth: .12*this.baseFont,
			// 	itemHeight: .12*this.baseFont,
			// 	textStyle:{
			// 		color: '#fff',
			// 		fontSize: .12*this.baseFont
			// 	},
			// 	data: this.listName
			// },
			color: this.colorList,
			series: [
        {
					// name:'访问来源',
					type:'pie',
					// center:['50%','45%'],
					radius: ['50%', '100%'],
					silent: true,
					hoverAnimation: false,
					legendHoverLink: false,
					label: {
						normal: {
							color:'#fff',
							backgroundColor: 'rgba(0,0,0,.75)',
							padding: 5,
							show: false,
							position: 'inside',
							formatter: function(r:any){return r.percent + '%'}
						}
					},
					data: data
        }
			]
		}, true)
	}
}
</script>
<style lang="scss" scoped>
.word-in-left {
	display: flex;
	.list {
		display: block;
	}
}
.echart {
	margin: .1rem auto;
}
.list {
	display: flex;
	flex-wrap: wrap;
	&>div {
		position: relative;
		flex-basis: 33.33%;
		padding-left: .18rem;
		margin-bottom: .1rem;
		font-size: .12rem;
		line-height: .16rem;
		height: .16rem;
		span {
			position: absolute;
			left: 0;
			top: .03rem;
			width: .1rem;
			height: .1rem;
			border-radius: 50%;
		}
	}
}
</style>
