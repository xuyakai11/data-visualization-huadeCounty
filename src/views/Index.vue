<template>
  <div class="wrap">
    <div class="banner">
      <h1>化德县电子商务数据展示平台</h1>
      <div class="banner-img">
        各数据综合展示屏
      </div>
    </div>
    <div class="main">
      <div class="main-left">
        <div class="common lt">
          <h3>全市电商2019年销售额统计</h3>
          <div class="money"><div v-for="item in SKURankDataTotal[0]">{{item}}</div><i>.</i><div v-for="item in SKURankDataTotal[1]">{{item}}</div><span>万元</span></div>
          <RollingOfRankings ref="roller"/>
        </div>
        <div class="common lb">
          <h3>各县区销售统计</h3>
          <DiyBarHorizen :datas="areaSale" />
        </div>
      </div>
      <div class="main-middle">
        <div class="common mm">
          <h3>张掖市电商销售额统计</h3>
          <div class="saleStatistics">
            <div>
              <div class="title">日销售总额</div>
              <div class="sale-money">
                <div><span>{{sale.dayMoney}}</span>万元</div>
                <div class="rate">{{sale.dayTrend}}%<img src="../assets/img/up.png" alt=""></div>
              </div>
              
            </div>
            <div>
              <div class="title">月销售总额</div>
              <div class="sale-money">
                <div><span style="color: #FFC760;">{{sale.monthMoney}}</span>万元</div>
                <div class="rate">{{sale.monthTrend}}%<img src="../assets/img/up.png" alt=""></div>
              </div>
              
            </div>
            <div>
              <div class="title">年销售总额</div>
              <div class="sale-money">
                <div><span style="color: #EC7751;">{{sale.totalMoney}}</span>万元</div>
                <div class="rate">{{sale.totalTrend}}%<img src="../assets/img/up.png" alt=""></div>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix">
          <div class="common mb" style="padding:0">
            <h3>主营产品占比</h3>
            <PieDoughnut ref="PieDoughnut1" />
          </div>
          <div class="common mb" style="margin: 0 .1rem;">
            <h3>各县区销售额占比</h3>
            <PieDoughnut ref="PieDoughnut2" />
          </div>
          <div class="common mb">
            <h3>各县区网店数占比</h3>
            <PieDoughnut ref="PieDoughnut3" />
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="common lt">
          <h3>历年销售额统计（万元）</h3>
          <BarAndLine :datas="yearStatistics" />
        </div>
        <div class="common r inout">
          <h3>本年度全市快递数据累计统计</h3>
          <h4 class="title">张掖市快递出入件统计：</h4>
          <div class="top">
            <div>
            <img src="../assets/img/in.png" alt="">
            入件<strong>{{express.in}}</strong>件
            </div>
            <div>
            <img src="../assets/img/out.png" alt="">
            出件<strong style="color:#fb497c">{{express.out}}</strong>件
            </div>
          </div>
          <ul>
            <li v-for="item in express.county" :key="item.name">
              <div class="county">{{item.name}}：</div><div class="content"><strong>{{item.value}}</strong>件</div>
            </li>
          </ul>
        </div>
        <div class="common lb">
          <h3 style="margin-bottom: .25rem">订单地域分布</h3>
          <DiyBar :datas="orderArea" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RollingOfRankings from '@/components/RollingOfRankings.vue'
import DiyBar from '@/components/DiyBar.vue'
import PieDoughnut from '@/components/chart/PieDoughnut.vue'
import BarAndLine from '@/components/chart/BarAndLine.vue'
import ChinaMap from '@/components/chart/ChinaMap.vue'
import DiyBarHorizen from '@/components/DiyBarHorizen.vue'

interface echartData{
  w:string,
  h: string,
  xAxisData: Array<number>,
  seriesData: Array<number>
}

@Component({
  components: {
  RollingOfRankings,
  DiyBar,DiyBarHorizen,ChinaMap,
  PieDoughnut,
  BarAndLine
  }
  })
export default class Index extends Vue {
  SKURankDataTotal = ['012345','21'];
  tradeTotal = ['1234','11'];
  sale:any = {}
  express:any = {}
  orderArea: any = {
    h: 2.33,
    bg: 'linear-gradient(0deg, #FA3434 0%, #F7B95E 100%)',
    list: []
  } 
  trade: any = {
    h: 1,
    bg: 'linear-gradient(180deg, #87E8FF 0%, #4FCCFF 100%)',
    list: []
  } 
  areaSale: any = {
    h: 1,
    bg: 'linear-gradient(180deg, #87E8FF 0%, #4FCCFF 100%)',
    list: []
  } 
  SKURankData: Array<object> = []
  yearStatistics: Array<object> = []

  
  mounted() {
    this.getData()
  }
  

  getFormateNumber(n:number, len:number):Array<string> {
    let y = String(n).split('.');
    let int = y[0],
        l = y[1]||'00';
    l = l.length < 2 ? l + '0' : l;
    let zero = int.length < len ? len - int.length : 0;
    int = '0'.repeat(zero)+int;
    console.log([int,l])
    return [int,l];
  }

  getData (): void {
    // (this as any).$get('http://47.92.72.173/api/Zhangyedata/getDataInfo').then((r:any)=>{
    (this as any).$get('zhangye.json').then((r:any)=>{
      r = r.data;
      if(r. code === 200) {
        console.log(r.data);
        let data = r.data;
        this.SKURankDataTotal = this.getFormateNumber(data.SKURankDataTotal, 6);
        (this.$refs.roller as any).runRoller(data.SKURankData);
        this.yearStatistics = data.yearStatistics;

        this.trade.list = data.trade.slice(0,5);
        this.tradeTotal = this.getFormateNumber(data.tradeTotal, 4)

        this.areaSale.list = data.areaSale
        this.sale = data.sale;
        this.express = data.express

        this.orderArea.list = data.orderArea;
        (this.$refs.PieDoughnut1 as any).drawEchart(data.rate1);
        (this.$refs.PieDoughnut2 as any).drawEchart(data.rate2);
        (this.$refs.PieDoughnut3 as any).drawEchart(data.rate3);
      }
    });
    
  }
}
</script>
<style lang="scss" scoped>
  .wrap{
    box-sizing: border-box;
    min-height: 100vh;
    padding: .3rem;
    background: url('../assets/img/bg.jpg') 0 0 no-repeat;
    background-size: cover;
  }
  .banner {
    display: flex;
    h1 {
      font-size: .32rem;
      font-weight: 600;
    }
    .banner-img {
      width: 11.54rem;
      height: .42rem;
      padding-left: 2.16rem;
      font-size: .24rem;
      line-height: .38rem;
      background: url('../assets/img/banner.png') 0 -.33rem no-repeat / 100% auto;
    }
  }
  .main {
    display: flex;
    justify-content: space-between
  }
  .main-left{
    width: 5.08rem;
    margin-top: .22rem;
  }
  .main-middle{
    width: 8.7rem;
    margin-top: .22rem;
  }
  .main-right {
    width: 4.2rem;
    margin-top: -.42rem;
  }
  .common {
    position: relative;
    overflow: hidden;
    padding: 0 .18rem;
    margin-bottom: .1rem;
    width: 100%;
    color:#fff;
    background: url('../assets/img/lt.png') no-repeat center center / 100% 100%;
    h3 {
      margin-top: .05rem;
      padding-left: .32rem;
      font-size: .18rem;
      line-height: 1;
      color: #DBE9FF;
      font-weight: 500;
    }
    .money {
      height: .6rem;
      padding: .1rem .1rem .1rem 0;
      margin-bottom: .05rem;
      opacity: 0.8;
      background: #0064BC;
      border-radius: .08rem;
      font-size: .35rem;
      line-height: .4rem;
      color: #17D0AC;
      div,i,span {
        float: left;
        margin-left: .1rem;
      }
      i {
        font-style: normal;
        font-size: .38rem;
        line-height: .44rem;
      }
      span {
        font-size: .18rem;
        color: #FFFFFF;
        font-weight: 600;
      }
      div {
        height: .4rem;
        width: .32rem;
        font-weight: 600;
        text-align: center;
        background: #00143B;
        border-radius: .04rem;
      }
    }
  }
  .lt {
    height: 3.98rem;
    .money {
      margin-top: .22rem
    }
  }
  .r {
    height: 2.69rem;
    .money {
      margin-top: .17rem
    }
    background-image: url('../assets/img/r.png')
  }
  .lb {
    height: 3.2rem;
    background-image: url('../assets/img/lb.png')
  }
  .mm {
    height: 1.29rem;
  }
  .mb {
    height: 2.29rem;
    width: 2.81rem;
    float: left;
    h3 {
      margin-top: .02rem;
    }
  }
  .earth {
    position: absolute;
    top: .85rem;
    left: .18rem;
    width: 1.6rem;
    height: 1.6rem;
    img {
      width: 100%;
    }
  }
  .saleStatistics {
    overflow: hidden;
    margin-top: .29rem;
    &>div{
      position: relative;
      float: left;
      width: 2.63rem;
      padding-left: .3rem;
      &:first-child {
        padding-left: 0;
      }
      &:nth-child(2) {
        width: 2.98rem; 
      }
      &:last-child {
        padding-left: .28rem;
        &:after {
          display: none;
        }
      }
      &:after {
        content: '';
        font-size: 0;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        background: linear-gradient(rgba(102,172,235,0),rgba(102,172,235,1),rgba(102,172,235,0))
      }
    }
    .title {
      margin-bottom: .18rem;
      font-size: .16rem;
      color: #FFF;
      line-height: 1;
    }
    .sale-money {
      overflow: hidden;
      font-size: .16rem;
      color: #fff;
      &>div{
        float: left;
        &:first-child {
          width: 1.6rem;
        }
      }
      .rate {
        padding-top: .08rem;
        font-size: .12rem;
      }
      span {
        font-size: .3rem;
        font-weight: 600;
        padding-right: .04rem;
        color: #17D0AC;
        line-height: .24rem;
      }
      img {
        width: .16rem;
        height: .16rem;
        margin-left: .02rem;
      }
    }
    
  }
  .inout {
    .title {
      margin: .28rem 0 .14rem;
      font-weight: 600;
      font-size: .18rem;
    }
    .top {
      height: .6rem;
      padding: .16rem .1rem;
      background: #00143B;
      border-radius: .04rem;
      &>div{
        float: left;
        width: 50%;
      }
      strong {
        font-size: .24rem;
        line-height: .28rem;
        padding: 0 2px;
        color: #17D0AC;
      }
      img {
        width: .28rem;
        height: .28rem;
        margin-right: .06rem;
      }
    }
    ul {
      overflow: hidden;
      padding-top: .2rem;
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        flex-basis: 50%;
        margin-bottom: .15rem;
        strong {
          padding: 0 2px;
          color: #4fccff
        }
      }
    }
  }
</style>
