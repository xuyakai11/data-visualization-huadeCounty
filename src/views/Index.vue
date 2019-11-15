<template>
  <div class="wrap">
    <div class="banner">
      <!-- <img src="../assets/img/banner.gif" alt=""> -->
      <div class="time">
        <strong>{{timer[0]}}</strong> - <strong>{{timer[1]}}</strong> - <strong>{{timer[2]}}</strong>
        <strong class="week">周{{timer[6]}}</strong>
        <strong>{{timer[3]}}:</strong>
        <strong>{{timer[4]}}:</strong>
        <strong>{{timer[5]}}</strong>
      </div>
    </div>
    <div class="main">
      <!-- <div class="weather">

      </div> -->
      <div class="main-left">
        <div class="common lt">
          <h3>扶贫数据</h3>
          <div class="lt-head">
            <div class="left">
              <h4>累计扶贫人数：</h4>
              <div class="number">{{allData.fupinNumber}}</div>
              <h4>累计扶贫金额：</h4>
              <div class="number">
                <div>{{fupinMoney[0]}}</div>
                <div class="decimal"><span>RMB / 万元</span>
                  <div>.{{fupinMoney[1]}}</div>
                </div>
              </div>
            </div>
            <div class="pie"> 
              <h4>各乡镇扶贫人数占比</h4>
              <PieDoughnut ref="PieDoughnut3" width="1.1rem" height="1.1rem" clasName="word-in-left" />
            </div>
          </div>
          <RollingOfRankings ref="rollerTop" :lenEach="4" :titleList="['乡村','人名','日收入','月收入','年收入','增长']" :dataName="['nameTown','name','dayIncome','monthIncome','yearIncome','increase']" />
        </div>
        <div class="common lb">
          <h3>站点便民服务</h3>
          <div class="money-wrap">
            <h4>累计便民服务总金额：</h4>
            <div class="money">
              <div v-for="item in serviceMoney[0]">{{item}}</div>
              <i></i>
              <div class="decimal">
                <span>RMB / 万元</span>
                <div v-for="item in serviceMoney[1]">{{item}}</div>
              </div>
            </div>
            <div class="today">今日便民服务金额：<span>{{allData.serviceMoneyToday&&allData.serviceMoneyToday.toFixed(2)}}</span>RMB / 元
            </div>
          </div>
          <RollingOfRankings clasName="roll-left-bottom" ref="rollerLB" :lenEach="6" :titleList="['乡村','电费','话费','代买代卖','助农取款','快递']"  :dataName="['nameTown','eleFee','phoneFee','buying','helpMoney','expressFee']" />
          <img src="../assets/img/border.gif" alt="">
        </div>
      </div>
      <div class="main-middle">
        <div class="common mid">
          <h3>电商交易数据</h3>
          <div class="money-wrap">
            <h4>电商销售累计总额：</h4>
            <div class="money">
              <div v-for="item in tradeTotal[0]">{{item}}</div>
              <i></i>
              <div class="decimal"><span>RMB / 元</span>
                <div v-for="item in tradeTotal[1]">{{item}}</div>
              </div>
            </div>
            <div class="saleStatistics">
              <div>
                <div class="title">日销售总额</div>
                <div class="sale-money">
                  <div><span>{{sale.dayMoney}}</span>万元</div>
                  <div class="rate"><template v-if="sale.dayTrend>0">+</template>{{sale.dayTrend}}%
                    <img src="../assets/img/up.png" v-if="sale.dayTrend>=0" alt="">
                    <img src="../assets/img/down.png" v-else alt="">
                  </div>
                </div>
                
              </div>
              <div>
                <div class="title">月销售总额</div>
                <div class="sale-money">
                  <div><span style="color: #FFC760;">{{sale.monthMoney}}</span>万元</div>
                  <div class="rate"><template v-if="sale.monthTrend>0">+</template>{{sale.monthTrend}}%
                    <img src="../assets/img/up.png" v-if="sale.monthTrend>=0" alt="">
                    <img src="../assets/img/down.png" v-else alt="">
                  </div>
                </div>
                
              </div>
              <div>
                <div class="title">年销售总额</div>
                <div class="sale-money">
                  <div><span style="color: #EC7751;">{{sale.totalMoney}}</span>万元</div>
                  <div class="rate"><template v-if="sale.totalTrend>0">+</template>{{sale.totalTrend}}%
                    <img src="../assets/img/up.png" v-if="sale.totalTrend>=0" alt="">
                    <img src="../assets/img/down.png" v-else alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mid-in-bottom">
            <div>
              <h4>商品类型占比</h4>
              <PieDoughnut ref="PieDoughnut1" width="1.58rem" height="1.58rem" />
              <h4 style="margin-top: .3rem">平台占有率占比</h4>
              <PieDoughnut ref="PieDoughnut2" width="1.58rem" height="1.58rem" />
            </div>
            <RollingOfRankings clasName="roll-mid-in-bottom" ref="rollerMidInBottom" :lenEach="15" :titleList="['店名','商品类型','交易量','商品数量','平均单价','增长']"  :dataName="['name','type','tradeNumber','skuNumber','price','increase']" />
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="common right-top">
          <h3>快递上下行数据</h3>
          <div class="inout">
            <div class="inout-left">
              {{{today:'今日',week:'本周',month:'本月',year:'本年'}[expressType]}}
            </div>
            <div class="inout-right">
              <div>
              <img src="../assets/img/in.png" alt="">
              入件<strong>{{express[expressType].in}}</strong>件
              </div>
              <div>
              <img src="../assets/img/out.png" alt="">
              出件<strong style="color:#fb497c">{{express[expressType].out}}</strong>件
              </div>
            </div>
          </div>
          <p>今日快递上下行累计数据：</p>
          <BarBasic ref="barBasic" :datas="express[expressType].county" height="1.7rem"/>
        </div>
        <div class="common right-middle">
          <h3>大宗商品交易数据</h3>
          <div class="right-middle-top">
            <div class="right-middle-top-left">
              {{skuDetail[skuIndex].name}}
            </div>
            <div class="right-middle-top-mid">
              今日价格：<strong>{{skuDetail[skuIndex].price}}</strong>元 / 斤 
            </div>
            <div class="right-middle-top-right">
              <img src="../assets/img/up.png" v-if="skuDetail[skuIndex].rate>=0" alt="">
              <img src="../assets/img/down.png" v-else alt="">
              {{skuDetail[skuIndex].rate}}%
            </div>
          </div>
          <p>商品价格变化趋势：</p>
          <LineBasic ref="lineBasic" :datas="skuDetail[skuIndex].yearData" height="1.7rem"/>
        </div>
        <div class="common right-bottom">
          <h3>培训统计</h3>
          <div class="right-bottom-top">
            累计培训人数：<div>{{trainData.total}}</div>人
          </div>
          <PieWithScrollableLegend ref="PieDoughnut4" width="100%" height="1.38rem"/>
          <div class="time-select">
            <div class="prev" @click="yearMonthFunction(-1)"></div>
            <div class="date">
              <div :class="{active: index === 1}" v-for="(item,index) in timePicker" :key="index">
                {{item.year}}年{{item.month}}月
              </div>
            </div>
            <div class="next" @click="yearMonthFunction(1)"></div>
          </div>
          <img src="../assets/img/border.gif" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RollingOfRankings from '@/components/RollingOfRankings.vue'
import PieWithScrollableLegend from '@/components/chart/PieWithScrollableLegend.vue'
import PieDoughnut from '@/components/chart/PieDoughnut.vue'
import LineBasic from '@/components/chart/LineBasic.vue'
import BarBasic from '@/components/chart/BarBasic.vue'
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
  PieWithScrollableLegend,DiyBarHorizen,BarBasic,
  PieDoughnut,
  LineBasic
  }
  })
export default class Index extends Vue {
  allData: any = {};
  tradeTotal: Array<string> = ['012345','21'];
  fupinMoney: Array<string> = ['012345','21'];
  serviceMoney: Array<string> = ['012345','21'];
  sale:any = {}
  orderArea: any = {
    h: 2.33,
    bg: 'linear-gradient(0deg, #FA3434 0%, #F7B95E 100%)',
    list: []
  } 
  areaSale: any = {
    h: 1,
    bg: 'linear-gradient(180deg, #87E8FF 0%, #4FCCFF 100%)',
    list: []
  } 
  tradeRankData: Array<object> = []
  skuDetail: Array<object> = [{}]
  skuIndex:number = 0
  trainData: any = {}
  timePicker: Array<any> = [{}]
  timer: Array<string> = []

  created () {
    let t = setInterval(()=>{
      this.timerFunction()
    },1000);

    this.yearMonthFunction(0)
  }
  mounted() {
    this.getData();
    this.getTrainData()
  }

  timerFunction (): void {
    let nowDate = new Date(),
        weekDay: any = {0:'日',1:'一',2:'二',3:'三',4:'四',5:'五',6:'六'},
        y = nowDate.getFullYear()+'',
        m = nowDate.getMonth() + 1,
        d = nowDate.getDate(),
        h = nowDate.getHours(),
        mi = nowDate.getMinutes(),
        s = nowDate.getSeconds(),
        week = weekDay[nowDate.getDay()],
        fm = (v: number): string => {
          return v < 10 ? '0' + v : '' + v;
        };
    this.timer = [y,fm(m),fm(d),fm(h),fm(mi),fm(s),week]
  } 
  setIntervIn:number = 0;
  setIntervOut:number = 0;
  expressType:string = 'today'
  express:any = {'today':{}}
  getRandom(min:number, max:number) {
    return Math.random()*(max-min) + min;
  }
  getRandomExpress(express:any) {
    this.setIntervIn = setInterval(()=>{
      let n:number = ~~this.getRandom(1,5),
          cur:number = +this.express[this.expressType].in + n;
      if(cur > express[this.expressType].in + 1000) {
        cur = express[this.expressType].in
      }
      this.express[this.expressType].in = cur;
    },30000);
    this.setIntervOut = setInterval(()=>{
      let n:number = ~~this.getRandom(1,5),
          cur:number = +this.express[this.expressType].out + n;
      if(cur > express[this.expressType].out + 1000) {
        cur = express[this.expressType].out
      }
      this.express[this.expressType].out = cur;
    },28000);
  }
  getRandomService(money:number) {
    setInterval(()=>{
      let n:number = this.getRandom(0,1),
          cur:number = +this.serviceMoney[0]+ +this.serviceMoney[1]/100 + n;
      if(cur > money + 100) {
        cur = money
        this.allData.serviceMoneyToday -= 100;
      }
      this.serviceMoney = this.getFormateNumber(cur, 5);
      this.allData.serviceMoneyToday += n;
    },30000);
  }

  getRandomTrade(money:number) {
    setInterval(()=>{
      let n:number = this.getRandom(0,1),
          cur:number = +this.tradeTotal[0]+ +this.tradeTotal[1]/100 + n;
      if(cur > money + 100) {
        cur = money
      }
      this.tradeTotal = this.getFormateNumber(cur, 9);
    },30000);
  }

  getFormateNumber(n:number, len:number):Array<string> {
    let y = n.toFixed(2).split('.');
    let int = y[0],
        l = y[1]||'00';
    l = l.length < 2 ? l + '0' : l;
    let zero = int.length < len ? len - int.length : 0;
    int = '0'.repeat(zero)+int;
    return [int,l]
  }

  getData (): void {
    // (this as any).$get('http://47.92.72.173/api/Zhangyedata/getDataInfo').then((r:any)=>{
    (this as any).$get('huade.json').then((r:any)=>{
      r = r.data;
      if(r.code === 200) {
        console.log(r.data);
        this.allData = r.data;
        let data = r.data;
        this.tradeTotal = this.getFormateNumber(data.tradeTotal, 5);
        this.fupinMoney = this.getFormateNumber(data.fupinMoney, 5);
        this.serviceMoney = this.getFormateNumber(data.serviceMoney, 5);
        this.getRandomService(data.serviceMoney)

        this.sale = data.sale;

        this.express = data.express;
        this.getRandomExpress(data.express);
        let index = 0;
        setInterval(()=>{
          index = index > 2 ? 0 : index + 1;
          this.expressType = ['today','week','month','year'][index]
        },30000);
        this.$nextTick(()=>{
          (this.$refs.rollerTop as any).runRoller(data.fupinPeopleList);
          (this.$refs.rollerLB as any).runRoller(data.serviceList);
          (this.$refs.rollerMidInBottom as any).runRoller(data.tradeRankData);

          (this.$refs.PieDoughnut1 as any).drawEchart(data.skuTypeRate);
          (this.$refs.PieDoughnut2 as any).drawEchart(data.platformRate);
          (this.$refs.PieDoughnut3 as any).drawEchart(data.fupinRateList);
          
        });
        this.skuDetail = data.skuDetail;
        this.tradeTotal = this.getFormateNumber(data.tradeTotal, 9);
        this.getRandomTrade(data.tradeTotal);

        // this.areaSale.list = data.areaSale
        // this.orderArea.list = data.orderArea;
      }
    })
  }

  getTrainData(): void {
    (this as any).$get('train.json').then((r:any)=>{
      r = r.data;
      if(r.code === 200) {
        this.trainData = r.data;
        this.$nextTick(()=>{
          (this.$refs.PieDoughnut4 as any).drawEchart(r.data.detail);
        })
      }
    })
  }

  yearMonthFunction(step: number) {
    let date:any,year:any, month:any,
        get2Nmuber = (m:any) => {
          m = m < 10 ? '0' + m : m;
          return m
        },
        getPNMonth = (step:number) => {
          let m = month + step,
              y = year;
          if(m === 0) {
            y = y - 1
            m = 12
          }
          if(m === 13) {
            y = y + 1
            m = 1
          }
          return {
            year: y,
            month: get2Nmuber(m)
          }
        };
    if(step === 0) {
      let now = new Date();
      year = now.getFullYear();
      month = now.getMonth() + 1;
    } else {
      year = this.timePicker[1+step].year;
      month = +this.timePicker[1+step].month;
    }
    
    this.timePicker = [
      getPNMonth(-1),
      {
        year: year,
        month: get2Nmuber(month)
      },
      getPNMonth(1)
    ]
  }
}
</script>
<style lang="scss" scoped>
  $yellow: #FFC760;
  .wrap{
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    padding: .3rem;
    background: url('../assets/img/bg.jpg') 0 0 no-repeat;
    background-size: cover;
  }
  
  .banner {
    position: absolute;
    // left: 9.7rem;
    left: .7rem;
    top: .3rem;
    right: 4.8rem;
    height: .78rem;
    background: url('../assets/img/banner.gif') left bottom no-repeat / auto .6rem;
    .time {
      text-align: right;
      font-size: .24rem;
      strong {
        font-weight: 500;
      }
      .week{
        padding: 0 .3rem;
      }
    }
  }
  .main {
    display: flex;
    justify-content: space-between
  }
  .weather {
    width: 8.7rem;
    height: 10.56rem;
    background: url('../assets/img/weather.png') no-repeat center center / 100% 100%;
  }
  .main-left{
    width: 5.08rem;
    margin-top: .76rem;
  }
  .main-middle{
    width: 8.7rem;
    margin-top: .46rem;
    .common {
      h3 {
        top: .1rem;
        font-size: .32rem;
        line-height: .42rem;
      }
      .money-wrap {
        margin-top: .36rem;
      }
      .money {
        &>div {
          height: .8rem;
          width: .64rem;
          font-weight: 600;
          font-size: .7rem;
          line-height: .8rem;
          border-radius: .08rem;
        }
        i {
          height: .8rem;
        }
        .decimal {
          height: .8rem;
          width: .9rem;
          padding-top: .32rem;
          div {
            height: .48rem;
            line-height: .48rem;
            width: .38rem;
            font-size: .42rem;
          }
          span {
            left: 0;
            top: .04rem;
            font-size: .18rem;
          }
        }
      }
    }
  }
  .main-right {
    width: 4.2rem;
    margin-top: .1rem;
  }
  .lt-head {
    display: flex;
    margin-bottom: .14rem;
    flex: auto;
    .left {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 2.5rem;
      height: 1.45rem;
      padding: .1rem;
      background: rgba(0,228,255,.1);
      border-radius: .05rem;
      h4 {
        flex-basis: .64rem;
        margin-bottom: .14rem;
        font-size: .16rem;
        line-height: .2rem;
        font-weight: 600;
      }
      .number {
        flex-basis: 1.56rem;
        height: .56rem;
        margin-left: .1rem;
        margin-bottom: .14rem;
        line-height: .58rem;
        padding: 0 .04rem;
        font-size: .4rem;
        color: $yellow;
        background: #04172E;
        border-radius: .08rem;
        &>div {
          float: left;
          letter-spacing: -.02rem;
        }
      }
      .decimal {
        position: relative;
        height: .56rem;
        width: .4rem;
        padding-top: .1rem;
        div {
          height: .56rem;
          line-height: .52rem;
          font-size: .2rem;
          &:last-child {
            margin-left: .06rem;
          }
        }
        span {
          position: absolute;
          left: -.1rem;
          top: .1rem;
          right: 0;
          width: .8rem;
          font-size: .12rem;
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0;
          transform: scale(.6)
        }
      }
    }
    .pie {
      margin-left: .2rem;
      h4 {
        margin-bottom: .1rem;
        font-weight: 600;
      }
    }
  }
  .common {
    position: relative;
    padding: .32rem .2rem 0 .2rem;
    margin-bottom: .1rem;
    width: 100%;
    background: url('') no-repeat center center / 100% 100%;
    h3 {
      position: absolute;
      top: -.08rem;
      left: .4rem;
      font-size: .2rem;
      height: .26rem;
      line-height: .26rem;;
      font-weight: 600;
    }
    .money-wrap {
      margin-bottom: .14rem;
      padding: .1rem;
      background: rgba(0,228,255,.1);
      border-radius: .05rem;
      h4 {
        font-size: .16rem;
        line-height: .2rem;
        font-weight: 600;
      }
      .today {
        position: relative;
        padding-left: .27rem;
        span {
          padding-right: .05rem;
          color: $yellow
        }
        &::before {
          position: absolute;
          left: .07rem;
          top: .05rem;
          content: '';
          width: .1rem;
          height: .1rem;
          border-radius: 50%;
          background: $yellow
        }
      }
    }
    .money {
      display: flex;
      height: .72rem;
      margin: .12rem 0;
      color: $yellow;
      &>div,i {
        margin-right: .1rem;
      }

      i {
        position: relative;
        width: .16rem;
        height: .72rem;
        font-size: 0;
        &::after {
          content: '';
          position: absolute;
          bottom: .16rem;
          left: .05rem;
          width: .06rem;
          height: .06rem;
          background: $yellow
        }
        
      }
      .decimal {
        position: relative;
        height: .72rem;
        width: .8rem;
        padding-top: .28rem;
        background: transparent;
        div {
          float: left;
          height: .44rem;
          line-height: .44rem;
          width: .34rem;
          font-size: .38rem;
          background: #04172E;
          border-radius: .04rem;
          &:last-child {
            margin-left: .06rem;
          }
        }
        span {
          position: absolute;
          left: 0;
          top: .04rem;
          font-size: .15rem;
          font-weight: 600;
          line-height: 1;
        }
      }
      &>div {
        height: .72rem;
        width: .57rem;
        font-weight: 600;
        font-size: .63rem;
        line-height: .72rem;
        text-align: center;
        background: #04172E;
        border-radius: .07rem;
      }
    }
  }
  .lt {
    height: 4.1rem;
    margin-bottom: .3rem;
    background-image: url('../assets/img/lt.png')
  }
  
  .lb {
    position: relative;
    height: 5.04rem;
    background-image: url('../assets/img/lb.png');
    img {
      position: absolute;
      bottom: -.05rem;
      right: 0;
      height: .6rem;
      width: 100%; 
    }
  }
  .mid {
    height: 9.74rem;
    background-image: url('../assets/img/m.png')
  }
  .saleStatistics {
    margin-top: .2rem;
    display: flex;
    &>div{
      flex: auto;
      position: relative;
      padding-left: .3rem;
      &:first-child {
        padding-left: 0;
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
      margin-bottom: .1rem;
    }
    .sale-money {
      overflow: hidden;
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
        color: #4E98FF;
        line-height: .24rem;
      }
      img {
        width: .16rem;
        height: .16rem;
        margin-left: .02rem;
      }
    }
    
  }
  .mid-in-bottom {
    display: flex;
    &>div {
      flex: auto;
    }
    h4 {
      font-weight: 600;
      margin-bottom: .24rem;
    }
    .roll-wrap {
      margin-left: .2rem;
      flex-basis: 5.86rem;
    }
  }
  .right-top,.right-middle,.right-bottom {
    background-image: url('../assets/img/r.png')
  }
  .right-top {
    height: 3.25rem;
    margin-bottom: .3rem;
    .inout {
      display: flex;
      align-items: center;
      padding: .05rem;
      margin-bottom: .1rem;
      border-radius: .05rem;
      background: rgba(0,228,255,.1);
      &-left {
        height: .6rem;
        flex-basis: .88rem;
        text-align: center;
        line-height: .6rem;
        font-size: .32rem;
        font-weight: 600;
        border-radius: .05rem;
        background: rgba(4,23,46,1)
      }
      &-right {
        margin-left: .2rem;
        &>div {
          display: flex;
          align-items: center;
          &:first-child{
            margin-bottom: .06rem;
          }
        }
        strong {
          font-size: .24rem;
          line-height: .28rem;
          padding: 0 .04rem;
          color: #17D0AC;
        }
        img {
          width: .2rem;
          height: .2rem;
          margin-right: .12rem;
        }
      }
    }
  }
  .right-middle {
    height: 3.05rem;
    margin-bottom: .3rem;
    &-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .05rem;
      margin-bottom: .1rem;
      border-radius: .05rem;
      background: rgba(0,228,255,.1);
      &-left {
        height: .4rem;
        flex-basis: .88rem;
        text-align: center;
        line-height: .4rem;
        font-size: .18rem;
        font-weight: 600;
        border-radius: .05rem;
        background: rgba(4,23,46,1)
      }
      &-mid {
        strong {
          margin: 0 .05rem;
          color: #FFC760
        }
      }
      &-right {
        img {
          width: .2rem;
          height: .2rem;
          margin-right: .06rem;
        }
      }
    }
  }
  .right-bottom {
    position: relative;
    height: 3.2rem;
    padding-left: .3rem;
    padding-right: .3rem;
    &-top {
      display: flex;
      align-items: center;
      height: .42rem;
      margin-bottom: .15rem;
      padding: 0 .1rem;
      line-height: .42rem;
      font-weight: 600;
      border-radius: .05rem;
      background: rgba(0,228,255,.1);
      div {
        flex-basis: 2.07rem;
        height: .32rem;
        line-height: .33rem;
        margin-right: .05rem;
        padding-right: .1rem;
        text-align: right;
        font-size: .28rem;
        color: #FFC760;
        border-radius: .08rem;
        background: rgba(4,23,46,1);
      }
    }
    .time-select {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: .2rem;
      .prev,.next {
        font-size: 0;
        height: 0;
        border-top: .1rem solid transparent;
        border-bottom: .1rem solid transparent;
        border-radius: 2px;
        cursor: pointer;
      }
      .prev {
        border-right: .14rem solid #00e4ef;
        border-left: none;
      }
      .next {
        border-right: none;
        border-left: .14rem solid #00e4ef;
      }
      .date {
        display: flex;
        flex-basis: 2.9rem;
        justify-content: space-between;
        &>div {
          font-size: .12rem;
          opacity: 0.4;
        }
        .active {
          opacity: 1;
          font-size: .16rem;
          font-weight: 600;
        }
      }
    }
    img {
      position: absolute;
      bottom: -.1rem;
      right: 0;
      height: .6rem;
      width: 100%; 
    }
  }
  
</style>
