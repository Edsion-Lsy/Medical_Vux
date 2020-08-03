<template>
<div>
 <div  class="vux-header-box" slot="header"><x-header style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >急性创伤评分<a slot="right" style="color:black "   @click="SaveBasicinfo()">保存</a> </x-header></div>
    
      <group label-width="5.5em" label-margin-right="0em"  label-align="left"  style=" margin-top: 3em;">

          
        <popup-picker title="皮肤颜色" :data="[SkinColorList]" @on-change="SumTIScore()"    v-model="MainData.SkinColor" value-text-align="left"></popup-picker>
        <popup-picker title="心搏速率" :data="[HeartRateList]" @on-change="SumTIScore()"    v-model="MainData.HeartRate" value-text-align="left"></popup-picker>
        <popup-picker title="肌张力及运动" :data="[MuscleTensionAndExerciseList]"  @on-change="SumTIScore()"   v-model="MainData.MuscleTensionAndExercise" value-text-align="left"></popup-picker>
        <popup-picker title="呼&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp吸" :data="[BreathingList]"   @on-change="SumTIScore()"  v-model="MainData.Breathing" value-text-align="left"></popup-picker>
        <popup-picker title="反&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp射" :data="[ReflexList]"  @on-change="SumTIScore()"   v-model="MainData.Reflex" value-text-align="left"></popup-picker>
        <x-input  readonly   title="新生儿评分" v-model="ApgarScore"></x-input>
        
   <!-- ApgarScore = $('#ApgarScore1').val(); //新生儿评分 
            SkinColor = SplitArray(GetCheckBox("SkinColor")); //皮肤颜色
            HeartRate = SplitArray(GetCheckBox("HeartRate")); //心搏速率
            Breathing = SplitArray(GetCheckBox("Breathing")); //呼吸
            MuscleTensionAndExercise = SplitArray(GetCheckBox("MuscleTensionAndExercise")); //肌张力及运动
            Reflex = SplitArray(GetCheckBox("Reflex")); //反射 -->
          

      </group>
        

</div>
        


    
</template>

<script>
    import Apgar  from  "./js/Apgar.js"
    
    export default Apgar
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