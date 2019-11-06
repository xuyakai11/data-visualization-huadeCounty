<template>
  <div class="wrap">
    <div class="flex">
      <div class="left">
        <h3>化德县电子商务数据展示平台</h3>
        <p>HUADE E-COMMERCE DATA DISPLAY PLATFORM</p>
      </div>
      <div class="right">
        <div class="time">
          <strong>{{timer[0]}}</strong> - <strong>{{timer[1]}}</strong> - <strong>{{timer[2]}}</strong>
          <strong class="week">周{{timer[6]}}</strong>
          <strong>{{timer[3]}}:</strong>
          <strong>{{timer[4]}}:</strong>
          <strong>{{timer[5]}}</strong>
        </div>
        <p>农村站点及物流兼GPS地图</p>
      </div>
    </div>
    <div class="iframe">
      <iframe src="http://183.230.40.192:8088/cmcc/Login" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
  }
  })
export default class MapPage extends Vue {
  timer: Array<string> = []
  created () {
    let t = setInterval(()=>{
      this.timerFunction()
    },1000)
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
}
</script>
<style lang="scss" scoped>
  .wrap {
    min-height: 100vh;
    background: url('../assets/img/bg1.jpg') 0 0 no-repeat;
    background-size: 100% auto;
    .flex {
      display: flex;
      justify-content: space-between;
    }
    .left {
      h3 {
        padding: .42rem 0 0 1rem;
        font: 600 .40rem/.52rem "MicrosoftYaHei";
      }
      p {
        font-family: "MicrosoftYaHeiLight";
        font-weight: 200;
        padding: .1rem 0 0 2.2rem;
        font-size: .2rem;
      }
    }
    .right {
      padding: .26rem .43rem;
      .time {
        margin-bottom: .08rem;
        font-size: .24rem;
        strong {
          font-weight: 500;
        }
      }
      .week{
        padding: 0 .3rem;
      }
      p {
        font-weight: 600;
        font-size: .3rem;
      }
    }
    .iframe {
      width: 17.9rem;
      height: 9rem;
      margin: .1rem auto;
      background: #fff;
      iframe {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>