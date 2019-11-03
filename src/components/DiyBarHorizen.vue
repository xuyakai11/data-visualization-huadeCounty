<template>
  <div class="bar">
    <div v-for="(item,i) in datas.list" :key="item.name">
      <div class="name">{{item.name}}</div>
      <div class="pic">
        <div :style="{width: getMaxValue(item.value),background:colorArr[i]}"></div>
      </div>
      <div class="money" :style="{color:colorArr[i]}">{{item.value}}&nbsp;万元</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class DiyBarHorizen extends Vue {
  @Prop()private datas!: any
  colorArr: Array<string> = ['rgba(251,73,124,1)','rgba(255,199,96,1)','rgba(111,230,33,1)','rgba(79,204,255,1)','rgba(77,123,243,1)','rgba(153,144,250,1)']
  getMaxValue (value:number):String {
    let rate = '', m = 1;
    this.datas.list.forEach((v:any) =>{
      m = v.value > m ? v.value : m
    })
    
    return value/m*3.04+ 'rem'
  }

}
</script>
<style lang="scss" scoped>
.bar {
  display: flex;
  flex-direction: column;
  margin-top: .5rem;
  &>div {
    display: flex;
    align-items: center;
    margin-bottom: .25rem;
    height: .16rem;
  }
  .name,.money {
  }
}
.pic {
  position: relative;
  width: 3.04rem;
  height: .12rem;;
  margin: -0.02rem 0.1rem 0;
  background: rgba(255,255,255,.2);
  border-radius: .08rem;
  div {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%;
    border-radius: .08rem;
  }
}
</style>
