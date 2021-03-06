<template>
  <div :class="clasName">
    <div class="list-title title" :style="{height: eachHeight+'rem'}">
      <div v-for="item in titleList" :key="item">{{item}}</div>
    </div>
    <div class="roll-wrap" ref="rollElement" :style="{height: lenEach*eachHeight+'rem'}">
      <div
        class="list"
        v-for="(item,i) in datas"
        :key="item.id"
        :style="{transform: 'translate(0, '+eachHeight*(lenEach + i)+'rem)'}"
        :data-index="i"
      >
        <div class="ellipsis" v-for="(key, index) in dataName" :key="index">{{item[key]}}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
interface SelectProtected {
    readonly doc: HTMLDivElement
}

@Component
export default class RollingOfRankings extends Vue {
  @Prop() private clasName?: string;
  @Prop() private lenEach!: number;
  @Prop() private titleList!: Array<string>;
  @Prop() private dataName!: Array<string>;
  datas: Array<any> = []
  timer: number = 0; // 定时器
  timerDuration: number = 12000; // 定时器持续时长(s)
  // timerDurationNumber: number = 60000; // 每间隔n秒更新数据
  eachHeight: number = .4
  animationDone:boolean =  true
  
  runRoller(data:any) {
    // devLog-q1 在数据频繁更新时需要做处理，当动画还未执行完毕就更新数据会导致动画失效。加锁
    if(this.animationDone) {
      clearTimeout(this.timer)
      this.datas = data.map((v: any, i: number) => {
        v.id = Date.now() + '' + i;
        return v;
      });
      this.$nextTick(() => {
        this.animationDone = false;
        this.initRoll()
      })
    }
  }
  initRoll (): void {
    let el: any = this.$refs.rollElement as HTMLDivElement;
    let child: Array<any> = el.children || [];
    const len: number = child.length;
    const cycle: number = Math.ceil(len/this.lenEach); // 循环周期
    el.loopCurrent = 0; // 当前循环动画队列执行索引
    el.current = 0;// 当前循环(有且仅有一次0，初始化时)
    
    const eventTransitionend = () => {
      if (++el.loopCurrent !== len) return
      // 动画队列执行完毕
      el.loopCurrent = 0;
      this.animationDone = true;
      if (el.current) {
        // 实现无限衔接滚动，每次把滚动到上部视区之外的元素移到队列最后
        const ceil = el.current !== cycle ? this.lenEach : len%this.lenEach === 0 ? this.lenEach : len%this.lenEach
        for (let i = 0; i < ceil; i++) {
          let childR = el.removeChild(child[0]);
          const index = +childR.getAttribute('data-index')%this.lenEach;
          childR.style.transform = 'translate(0, '+ this.eachHeight*(index+this.lenEach*(cycle-1)) +'rem)';
          el.appendChild(childR)
        }
      }
      
      this.timer = setTimeout(() => {
        this.animationDone = false;
        el.current = el.current === cycle ? 1 : ++el.current;
        this.doTransform(child)
      }, this.timerDuration)
    }
    if (cycle > 1 && !this.timer) {
      el.addEventListener('transitionend', eventTransitionend, false)
    }
    
    setTimeout(() => {
      this.doTransform(child)
    });
  }
  doTransform (child: any): void {
    [].slice.call(child).forEach((v: any, i: number) => {
      const preY = parseFloat(v.style.transform.split(',')[1]);
      v.style.transform = 'translate(0, '+ (preY-this.lenEach*this.eachHeight) +'rem)';
    })
  }

  beforeDestroy (): void {
    clearTimeout(this.timer)
  }
}
</script>
<style lang="scss" scoped>
  .roll-wrap{
    position: relative;
    overflow: hidden;
    border-radius: .08rem;
  }
  .title {
    color: #04172E;
    font-weight: 600;
  }
  .list-title{
    overflow: hidden;
    display: flex;
    align-items: center;
    background: rgba(0,228,255,.5);
    &>div{
      flex: 1 0 16.66%;
      line-height: .4rem;
      text-align: center;
    }
    .ellipsis {
      // flex-basis: 1rem;
    }
    .circle{
      flex-basis: .26rem;
      flex-grow: 0;
      height: .26rem;
      margin: 0 .14rem 0 .1rem;
      line-height: .26rem;
      text-align: center;
      border-radius: .02rem;
      color: rgba(161,203,255,1);
      background:rgba(21,48,100,1)
    }
  }
  .list{
    @extend .list-title;
    position: absolute;
    width: 100%;
    transition: transform .8s cubic-bezier(0, .3, .58, 1); 
    background: transparent;
    &:nth-child(2n){
      background: rgba(0,228,255,.1)
    }
    &>div:last-child {
      color:rgba(233,127,103,1)
    }
  }
  .roll-left-bottom {
    .list {
      &>div:last-child {
        color:#00e4ff
      }
    }
  }
  .roll-mid-in-bottom{
    flex-basis: 5.66rem !important;
    margin-left: .2rem;
    .list,.list-title {
      &>div {
        flex-basis: 14.3%;
        &:first-child {
          flex-basis: 28.5%;
        }
      }
    }
  }
  .pink {
    background: rgba(232,54,50,1)
  }
  .yellow {
    background: rgba(255,131,2,1)
  }
  .red {
    color: #000 !important;
    background: rgba(255,2,54,1)
  }
  .orange {
    color: #27221f !important;
    background: rgba(250,184,0,1)
  }
  .pdd {
    background: #FF4B66
  }
  .a1688 {
    background: #FC7001
  }
</style>
