<template>
	<div>
		<div class="echart" ref="echart" style="width:2rem;height:1.2rem">
		</div>
		<div class="list">
			<div v-for="(item,index) in listName.slice(0,3)" :key="index">
				<span :style="{background:colorList[index]}"></span>{{item}}
			</div>
		</div>
		<div class="list" :class="{duble: listName.length>3}">
			<div v-for="(item,index) in listName.slice(3)" :key="index">
				<span :style="{background:colorList.slice(3)[index]}"></span>{{item}}
			</div>
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
	// @Prop()private datas!: any
	// @Watch('datas', {deep: true})
	// mounted() {
	// 	if (!this.datas) return;
	// 	this.drawChartBarBasic(this.datas.xAxisData, this.datas.seriesData)
	// }
	listName: Array<string> = []
	colorList:Array<string> = ['#FB497C','#FFC760','#6FE621','#4FCCFF','#329AF9','#9990FA']
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
					radius: ['60%', '90%'],
					silent: true,
					hoverAnimation: false,
					legendHoverLink: false,
					label: {
						normal: {
							color:'#fff',
							backgroundColor: 'rgba(0,0,0,.75)',
							padding: 5,
							show: true,
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
.echart {
	margin: .2rem auto .2rem;
}
.list {
	// display: flex;
	// flex-wrap: wrap;
	// align-items: center;
	// justify-content: space-between;
	// align-content: center;
	text-align: center;
	&>div {
		position: relative;
		// flex-basis: 33%;
		display: inline-block;
		padding-left: .2rem;
		margin-bottom: .05rem;
		font-size: .12rem;
		line-height: .16rem;
		height: .16rem;
		&:nth-child(3n-1){
			margin: 0 .05rem;
		}
		span {
			position: absolute;
			left: 0;
			top: .01rem;
			width: .14rem;
			height: .14rem;
		}
	}
}
</style>
