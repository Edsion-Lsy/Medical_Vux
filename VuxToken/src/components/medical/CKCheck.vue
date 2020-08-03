<template>
<div>
<div  class="vux-header-box" slot="header">
  <x-header style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
    产科检查<a slot="right" style="color:black "   @click="SaveBasicinfo()">保存</a>
  </x-header>
</div>
        <group  label-width="5.5em" label-margin-right="0em"  label-align="left"  style=" margin-top: 3em;">


<!--           
      AbdominalSList:[],  //腹形             可填
            ContractList:[],    //宫缩          
            TFWList:[],        //胎方位             可填
            //TXY:'',         //胎心音次数
            XLRPList:[],       //先露入盆
            GKKZList:[],       //宫口扩张
            GKCD
            TMPLList:[],       //胎膜破裂
            YSYSList:[],       //羊水颜色           可填
            YDLXList:[],        //阴道流血
            //YDLXLYDLX:'',   //阴道流血量
            //QT:'',          //阴道其他 -->
    
  
            <x-input title="腹形"  :show-clear="false"  text-align="left"   v-model="TG.AbdominalS" >
                <x-icon slot="right"  type="ios-plus" class="cell-x-icon"   @click.native="ShowAbdominalS=true"></x-icon>
          
            </x-input> 
            <div v-transfer-dom>
            <popup v-model="ShowAbdominalS" >
            <popup-header
            :left-text="('返回')"
            :right-text="('确认')"
            :title="('腹形')"
            :show-bottom-border="false"
            @on-click-left="ShowAbdominalS = false"
            @on-click-right="ShowAbdominalS = false"></popup-header>
                <group gutter="0">
                    <radio :options="AbdominalSList" v-model="TG.AbdominalS"   @click.native="ShowAbdominalS=false"     ></radio>
                    <!-- <checklist  :options="Spo2List" v-model="TG.Spo2"
                    :max="2"></checklist> -->
                </group>
            </popup></div>


        <popup-picker title="宫缩" :data="[ContractList]" show-name v-model="TG.Contract" value-text-align="left"></popup-picker>
        <x-input title="胎方位"  :show-clear="false"  text-align="left"   v-model="TG.TFW" >
                <x-icon slot="right"  type="ios-plus" class="cell-x-icon"   @click.native="ShowTFW=true"></x-icon>
          
        </x-input> 
            <div v-transfer-dom>
            <popup v-model="ShowTFW" >
            <popup-header
            :left-text="('返回')"
            :right-text="('确认')"
            :title="('胎方位')"
            :show-bottom-border="false"
            @on-click-left="ShowTFW = false"
            @on-click-right="ShowTFW = false"></popup-header>
                <group gutter="0">
                    <radio :options="TFWList" v-model="TG.TFW"   @click.native="ShowTFW=false"     ></radio>
                    <!-- <checklist  :options="Spo2List" v-model="TG.Spo2"
                    :max="2"></checklist> -->
                </group>
            </popup></div>
       
       
       
        <flexbox>
                <flexbox-item :span="4/5">  <x-input title="胎心音次数" 
                :show-clear="false"  text-align="left"   v-model="TG.TXY" >

                </x-input> </flexbox-item>
                <flexbox-item>次</flexbox-item> 
        </flexbox>
        <popup-picker title="先露入盆" :data="[XLRPList]" show-name v-model="TG.XLRP" value-text-align="left"></popup-picker>
        <popup-picker title="宫口扩张&nbsp" :data="[GKKZList]" show-name v-model="TG.GKKZ" value-text-align="left"></popup-picker>
        <flexbox>
                <flexbox-item :span="4/5">  <x-input title="宫口扩张" 
                :show-clear="false"  text-align="left"   v-model="TG.GKCD" >

                </x-input> </flexbox-item>
                <flexbox-item>CM</flexbox-item> 
        </flexbox>

        <popup-picker title="胎膜破裂" :data="[TMPLList]" show-name v-model="TG.TMPL" value-text-align="left"></popup-picker>
       
        <x-input title="羊水颜色"  :show-clear="false"  text-align="left"   v-model="TG.YSYS" >
                <x-icon slot="right"  type="ios-plus" class="cell-x-icon"   @click.native="ShowYSYS=true"></x-icon>
          
        </x-input> 
            <div v-transfer-dom>
            <popup v-model="ShowYSYS" >
            <popup-header
            :left-text="('返回')"
            :right-text="('确认')"
            :title="('羊水颜色')"
            :show-bottom-border="false"
            @on-click-left="ShowYSYS = false"
            @on-click-right="ShowYSYS = false"></popup-header>
                <group gutter="0">
                    <radio :options="YSYSList" v-model="TG.YSYS"   @click.native="ShowYSYS=false"     ></radio>
                    <!-- <checklist  :options="Spo2List" v-model="TG.Spo2"
                    :max="2"></checklist> -->
                </group>
            </popup></div>
       
       
       
        <popup-picker title="阴道流血" :data="[YDLXList]" show-name v-model="TG.YDLX" value-text-align="left"></popup-picker>
        <flexbox>
                    <flexbox-item :span="4/5">  <x-input title="阴道流血量" 
                    :show-clear="false"  text-align="left"   v-model="TG.YDLXL" >

                    </x-input> </flexbox-item>
                    <flexbox-item>ml</flexbox-item> 
        </flexbox>


        <x-textarea :autosize="true"  title='其他' :max="200"   :rows="2"   v-model="TG.QT" ></x-textarea>


        </group>
        

</div>
        


    
</template>

<script>
    import CKCheck  from  "./js/CKCheck.js"
    
    export default CKCheck
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