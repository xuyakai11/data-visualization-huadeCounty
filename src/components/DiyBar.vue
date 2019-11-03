<template>
  <div class="bar">
    <div v-for="item in datas.list" :key="item.name">
      <div class="pic" :style="{height: datas.h + 'rem'}">
        <div :style="{height: getMaxValue(item.value),background:datas.bg}"></div>
      </div>
      <div class="name">{{item.name}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class DiyBar extends Vue {
  @Prop()private datas!: any

  getMaxValue (value:number):String {
    let rate = '', m = 1;
    this.datas.list.forEach((v:any) =>{
      m = v.value > m ? v.value : m
    })
    
    return value/m*this.datas.h+ 'rem'
  }

}
</script>
<style lang="scss" scoped>
.bar {
  display: flex;
  justify-content: space-between;
  .name {
    margin-top: .1rem;
    font-size: .12rem;
  }
}
.pic {
  position: relative;
  width: .12rem;
  margin: 0 auto;
  background: rgba(255,255,255,.2);
  border-radius: .08rem;
  div {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-radius: .08rem;
  }
}
</style>
