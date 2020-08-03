<template>
<div>
 <div  class="vux-header-box" slot="header"><x-header style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >急性创伤评分<a slot="right" style="color:black "   @click="SaveBasicinfo()">保存</a> </x-header></div>
    
      <group label-width="5.5em" label-margin-right="0em"  label-align="left"  style=" margin-top: 3em;">

          
        <popup-picker title="受伤部位" :data="[InjuredPartList]" @on-change="SumTIScore()"    v-model="MainData.InjuredPart" value-text-align="left"></popup-picker>
        <popup-picker title="损伤类型" :data="[DamagTypesList]" @on-change="SumTIScore()"    v-model="MainData.DamagTypes" value-text-align="left"></popup-picker>
        <popup-picker title="循&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp环" :data="[CirculationList]"  @on-change="SumTIScore()"   v-model="MainData.Circulation" value-text-align="left"></popup-picker>
        <popup-picker title="呼&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp吸" :data="[BreathingsList]"   @on-change="SumTIScore()"  v-model="MainData.Breathings" value-text-align="left"></popup-picker>
        <popup-picker title="意&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp识" :data="[ConsciousnessList]"  @on-change="SumTIScore()"   v-model="MainData.Consciousness" value-text-align="left"></popup-picker>
        <x-input  readonly   title="创伤评分" v-model="TIScore"></x-input>

          

      </group>
        

</div>
        


    
</template>

<script>
    import Trauma  from  "./js/Trauma.js"
    
    export default Trauma
</script>


<style lang="less">
.vux-header-box {
  z-index: 100;
  /* position: absolute; */
   position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}
.popup-item-selected {
    background: #ffffff  url(../../assets/images/active.png)  no-repeat right bottom;
    border-color: #ff4a00;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .touch-action-none{

      touch-action: none;

  }
.SendAdd-item {
  font-size: 9px;
  width: 130px;
  height: 30px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 12px;
        margin-left: 12px;
        margin-top: 1px;
        margin-bottom: 1px;
}
.SendAdd-item-selected {
  background: #ffffff  url(../../assets/images/active.png)  no-repeat right bottom;
  border-color: #ff4a00;
}
.black{
  color:black;

}
.gray{
  color:gray;
  

}
.red{
  color:red;

}
.navBarWrap { //吸顶效果
    position: fixed;
    top: 1rem;
    z-index: 999;
    width:100%;
  }

  .navBarWrapUnder { //吸顶效果
    position: fixed;
    top: 30rem;
    z-index: 999;
    width:100%;
  }
</style>