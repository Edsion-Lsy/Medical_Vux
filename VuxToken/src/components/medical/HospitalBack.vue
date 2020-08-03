<template>
<div>
<div  class="vux-header-box" slot="header">
  <x-header style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
    院内反馈<a slot="right" style="color:black "   @click="SaveBasicinfo()">保存</a>
  </x-header>
</div>
        <group style="margin-top: 3em;">


          
    <x-input title="院内救治情况" :show-clear="false"  readonly  v-model="MainData.HospitalCare"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupHospitalCare=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupHospitalCare" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('四肢')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="MainData.HospitalCare=[],showPopupHospitalCare = false "
            @on-click-right="showPopupHospitalCare = false"></popup-header>  
            <checker v-model="MainData.HospitalCare" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in HospitalCareList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
    </div>
    
        <popup-picker title="收住院" :data="[HospitalizationList]" show-name v-model="MainData.Hospitalization" value-text-align="left"></popup-picker>
        <x-textarea  :autosize="true" title='收住科室'  :rows="2"   :max="200"  v-model="MainData.HospitalDepartments" ></x-textarea>
        <x-textarea :autosize="true" title='收住诊断'  :rows="2" :max="200"   v-model="MainData.HospitalDiagnosis" ></x-textarea>

        <popup-picker title="入院转归" :data="[LapseToList]" show-name v-model="MainData.LapseTo" value-text-align="left"></popup-picker>

        <x-textarea :autosize="true" title='院内主要救治措施' :max="200"   :rows="2"   v-model="MainData.HospitalMeasures" ></x-textarea>


        </group>
        

</div>
        


    
</template>

<script>
    import HospitalBack  from  "./js/HospitalBack.js"
    
    export default HospitalBack
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