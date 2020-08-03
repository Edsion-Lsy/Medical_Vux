<template>
<div>
 <div  class="vux-header-box" slot="header"><x-header style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >心肺复苏登记<a slot="right" style="color:black "   @click="SaveBasicinfo()">保存</a> </x-header></div>   
    <group style="margin-top: 3em;">
      <popup-picker title="是否使用心肺复苏术" show-name :data="[CRPList]" 
      
          v-model="MainData.CRP" value-text-align="center"></popup-picker>

    <div v-if="showContent">
        <cell :title="('心肺复苏开始时间')"> 
        <el-date-picker required v-model="MainData.CPRStartTime"  @focus="forbid" value-format="yyyy-MM-dd HH:mm:ss"  size="large"  type="datetime"  placeholder="选择出车时间"  default-time="12:00:00">
        </el-date-picker></cell>
        <cell :title="('终止复苏时间')"> 
        <el-date-picker required v-model="MainData.CPREndTime" @focus="forbid" value-format="yyyy-MM-dd HH:mm:ss"   size="large"  type="datetime"  placeholder="选择出车时间"  default-time="12:00:00">
        </el-date-picker></cell>
        <x-input  v-if="" title="复苏内容" :show-clear="false"  readonly  v-model="MainData.CRPContent"     >
              <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupCRPContent=true"></x-icon></x-input>
          <div v-transfer-dom>
              <popup v-model="showPopupCRPContent" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
              <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('复苏效果')" :show-bottom-border="true"
              align="center"  style="background-color: #fff;"
              @on-click-left="MainData.CRPContent=[],showPopupCRPContent = false "
              @on-click-right="showPopupCRPContent = false"></popup-header>  
              <checker v-model="MainData.CRPContent" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                  <checker-item v-for="itema in CRPContentList"
                  :key="itema.key" :value="itema.value" >{{itema.value}}
                  </checker-item>
              </checker></div></popup>
          </div>
            <!-- <x-input title="复苏效果" :show-clear="false"  readonly  v-model="MainData.CRPEffect"     >
              <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupCRPEffect=true"></x-icon></x-input>
          <div v-transfer-dom>
              <popup v-model="showPopupCRPEffect" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
              <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('复苏效果')" :show-bottom-border="true"
              align="center"  style="background-color: #fff;"
              @on-click-left="MainData.CRPEffect=[],showPopupCRPEffect = false "
              @on-click-right="showPopupCRPEffect = false"></popup-header>  
              <checker v-model="MainData.CRPEffect" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="item-disabled">
                  <checker-item v-for="itema in CRPEffectList"
                  v-bind:disabled="(MainData.CRPEffect.join('').indexOf('无效')==0 &&itema.value!='无效')||(MainData.CRPEffect.join('').indexOf('有效')==0 &&itema.value=='无效') "
                  :key="itema.key" :value="itema.value" >{{itema.value}}


                  </checker-item>
              </checker></div></popup>
      </div> -->




         <x-input title="复苏效果" :show-clear="false"  readonly  v-model="MainData.CRPEffect"     >
              <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupCRPEffect1=true"></x-icon></x-input>
          <div v-transfer-dom>
              <popup v-model="showPopupCRPEffect1" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
              <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('复苏效果')" :show-bottom-border="true"
              align="center"  style="background-color: #fff;"
              @on-click-left="MainData.CRPEffect=[],showPopupCRPEffect1 = false "
              @on-click-right="showPopupCRPEffect1 = false"></popup-header>  
              <checker v-model="MainData.CRPEffect" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="item-disabled">
                  <checker-item v-for="itema in CRPEffectList"
                  v-bind:disabled="disabled(itema)"
                  :key="itema.key" :value="itema.value" >{{itema.value}}
    <!-- v-bind:disabled="MainData.CRPEffect.indexOf('有效')==0&&!MainData.CRPEffect.indexOf('无效')==0 &&itema.value!='有效'&&itema.value!='无效'" -->

                  </checker-item>
              </checker></div></popup>
      </div>
    </div>
    </group>
</div>
        


    
</template>

<script>
    import CPRCheck  from  "./js/CPRCheck.js"
    
    export default CPRCheck
</script>
<style>
    .el-picker-panel .el-popper{
        width: 150px;
    }
</style>

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
.item-disabled {
  //互斥禁用时的css
  background: #cccaca    no-repeat right bottom;
  border-color:  #808080;
}
.black{
  color:black;

}
.gray{
  color:#808080;
  

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