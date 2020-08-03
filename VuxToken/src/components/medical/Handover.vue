<template>
<div>
<div  class="vux-header-box" slot="header">
  <x-header style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
    告知书与交接单<a slot="right" style="color:black "   @click="SaveBasicinfo()">保存</a>
  </x-header>
</div>
        <group style="margin-top: 3em;">
          <popup-picker title="告知书" :data="[IsPTBookList]"     :class="!$v.MainData.IsPTBook.required?'red':'black'"      v-model="MainData.IsPTBook" value-text-align="center"></popup-picker>
          <popup-picker title="交接单" :data="[IsHandoverList]"   :class="!$v.MainData.IsHandover.required?'red':'black'"      v-model="MainData.IsHandover" value-text-align="center"></popup-picker>


        </group>
        

</div>
        


    
</template>

<script>
    import Handover  from  "./js/Handover.js"
    
    export default Handover
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