<template>
<div>
<div  class="vux-header-box" slot="header">
  <x-header style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
    妇科检查<a slot="right" style="color:black "   @click="SaveBasicinfo()">保存</a>
  </x-header>
</div>
          <group  label-width="5.5em" label-margin-right="0em"  label-align="left"  style=" margin-top: 3em;">
            <!--  FKWY:[],//妇科外阴
                  FKYD:[],//妇科阴道
                  FKFJ:[],//妇科附件 -->
            <x-textarea  :autosize="true" title="外阴"  :show-clear="false"  text-align="center"   v-model="TG.FKWY" >
                <x-icon slot="restricted-label"  type="ios-plus"  class="cell-x-icon"  @click.native="FKWY=true"></x-icon>
            </x-textarea> 
            <div v-transfer-dom>
            <popup v-model="FKWY" >
            <popup-header
            :left-text="('清空')"
            :right-text="('确认')"
            :title="('外阴')"
            :show-bottom-border="false"
            
            @on-click-right="FKWY = false"></popup-header>
                <group gutter="0">
                    <radio :options="FKWYList" v-model="TG.FKWY"  @click.native="FKWY=false" ></radio>
                </group>
            </popup></div>
            <x-textarea  :autosize="true" title="阴道"  :show-clear="false"  text-align="center"   v-model="TG.FKYD" >
                <x-icon slot="restricted-label"  type="ios-plus"  class="cell-x-icon"  @click.native="FKYD=true"></x-icon>
            </x-textarea> 
            <div v-transfer-dom>
            <popup v-model="FKYD" >
            <popup-header
            :left-text="('清空')"
            :right-text="('确认')"
            :title="('阴道')"
            :show-bottom-border="false"
          
            @on-click-right="FKYD = false"></popup-header>
                <group gutter="0">
                    <radio :options="FKWYList" v-model="TG.FKYD"  @click.native="FKYD=false" ></radio>
                </group>
            </popup></div>


            <x-textarea :autosize="true" title="附件"  :show-clear="false"  text-align="center"   v-model="TG.FKFJ" >
                <x-icon slot="restricted-label"  type="ios-plus"  class="cell-x-icon"  @click.native="FKFJ=true"></x-icon>
            </x-textarea> 
            <div v-transfer-dom>
            <popup v-model="FKFJ" >
            <popup-header
            :left-text="('清空')"
            :right-text="('确认')"
            :title="('附件')"
            :show-bottom-border="false"
           
            @on-click-right="FKFJ = false"></popup-header>
                <group gutter="0">
                    <radio :options="FKFJList" v-model="TG.FKFJ"  @click.native="FKFJ=false" ></radio>
                </group>
            </popup></div>


         
        </group>
        

</div>
        


    
</template>

<script>
    import FKCheck  from  "./js/FKCheck.js"
    
    export default FKCheck
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