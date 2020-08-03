<template>
<group style="margin-top: 3em;" label-width="5.5em" label-margin-right="1em"  label-align="left"  >
      <x-header class="vux-header-box"  style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
          救治措施<a slot="right" style="color:black "   @click="sumbit()">保存</a> 
          <!-- <a slot="right" style="color:black "   @click="sumbit()">保存</a> -->
          <!-- <el-button  slot="right" type="primary" size="mini" round  @click="sumbit()">保存</el-button> -->
            <!-- <x-button mini slot="right" @click.native="sumbit()">submit</x-button> -->
          </x-header>
  
  <div>
    <x-input  readonly  title="检查项目" v-model="ProjectIDName"></x-input>


 
    <x-input title="救治地点" :show-clear="false"  readonly  v-model="DataModel.form.Place" >
        <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupPlace=true"></x-icon></x-input>
    <div v-transfer-dom>
        <popup v-model="showPopupPlace" class="checker-popup"><div style="padding:10px 10px 40px 10px;">
        <p style="padding: 5px 5px 5px 2px;color:#888;" align="center">救治地点</p>
        <checker v-model="DataModel.form.Place" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in JZDDlist" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
        </checker></div></popup></div>
 
    <!-- <x-input title="救治结果" :show-clear="false" showname  readonly  v-model="DataModel.form.JZResults" >
        <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupJZResults=true"></x-icon></x-input>
    <div v-transfer-dom>
        <popup v-model="showPopupJZResults" class="checker-popup"><div style="padding:10px 10px 40px 10px;">
        <p style="padding: 5px 5px 5px 2px;color:#888;" align="center">救治结果</p>
        <checker v-model="DataModel.form.JZResults" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in JZResultslist" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
        </checker></div></popup></div> -->
    <popup-picker title="救治结果" :data="[JZResultslist]"  v-model="DataModel.form.JZResults" value-text-align="left"></popup-picker>

    <x-input title="失败原因" :show-clear="false"  readonly  v-model="DataModel.form.SBReson" >
    <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupSBReson=true"></x-icon></x-input>
    <div v-transfer-dom>
        <popup v-model="showPopupSBReson" class="checker-popup"><div style="padding:10px 10px 40px 10px;">
        <p style="padding: 5px 5px 5px 2px;color:#888;" align="center">失败原因</p>
        <checker v-model="DataModel.form.SBReson" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in SBResonlist" :key="itema.key" :value="itema.value">{{itema.value}}</checker-item>
        </checker></div></popup></div>


    <popup-picker title="责任分类" :data="[ResponsClassifylist]"  v-model="DataModel.form.ResponsClassify" value-text-align="left"></popup-picker>
 
    <x-textarea  :autosize="true" title="措施描述" :max="20" :rows="3"   :placeholder="('填写措施描述')"       v-model="DataModel.form.MeasureContent" ></x-textarea>

    <x-textarea  :autosize="true" title="救治说明" :max="200" :rows="5"   :placeholder="('填写救治说明')"       v-model="DataModel.form.Results" ></x-textarea>
   <cell :title="('执行时刻')"> 
      <el-date-picker v-model="DataModel.form.DoTime" @focus="forbid" size="large" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime"  placeholder="选择执行时刻"  default-time="12:00:00">
      </el-date-picker></cell>
    <x-input   title="耗材新增" readonly>
            
        <img slot="right" src="../../assets/images/icons/Insert.png"   @click="OpenGoodsList">
    </x-input>


  <div v-transfer-dom>
      <popup v-model="ShowEditGoods" height="28em" :hide-on-blur=false is-transparent >
        <div style="width: 95%;background-color:#fff;height:26em;margin:0 auto;border-radius:5px;padding-top:0.5px;">
        
        <group>
          <divider >编辑药品耗材</divider>
          <cell title="物品名称" :value="GoodModel.form.GoodsName"></cell>
          <cell title="物品规格" :value="GoodModel.form.Spec"></cell>
           <x-input   title="数量"      v-model="GoodModel.form.Num" text-align="right"  @on-change="ChangeUseNum()"  ></x-input>
           <x-input   title="使用剂量"  v-model="GoodModel.form.UseNum" text-align="right"></x-input>
           <x-input   title="意外消耗"  v-model="GoodModel.form.LossVal" text-align="right"></x-input>
         </group>
         <div style="padding:20px 15px;">
          <x-button type="primary" @click.native="EditGoods()" >保存</x-button>
          <x-button @click.native="CancleEditGoods()">取消</x-button>
         </div>
        </div>
      </popup>
    </div>
    <el-table
              :data="HCList"
              border
              stripe
              style="width: 100%"
              max-height="400">
              <el-table-column
                label="序号"
                type="index"
                width="50">
                </el-table-column>
              <el-table-column
                prop="GoodsName"
                label="物品名称"
                width="120">
              </el-table-column>
                <el-table-column
                prop="UseNum"
                label="使用剂量"
                width="60">
              </el-table-column>
                <el-table-column
                prop="Num"
                label="数量"
                width="40">
              </el-table-column>
              <el-table-column    width="40" label="编辑">
                  <template slot-scope="scope">
                      <img slot="icon" src="../../assets/images/icons/Edit-small.png"  @click="EditHC(scope.row)">
                    
                  </template>
              </el-table-column>
            <el-table-column    width="40" label="删除">
              <template slot-scope="scope">
                <!-- <img slot="icon" src="../../assets/images/icons/Delete.png"  @click="showDeleteMsg=true"> -->
                <img slot="icon" src="../../assets/images/icons/Delete.png"  @click="showDeleteMsg=true">
                <actionsheet v-model="showDeleteMsg" :menus="Menus" 
                
                @on-click-menu-delete="DeleteHC( scope.row)"
                
                 show-cancel></actionsheet>
              </template>
            </el-table-column>  
      </el-table>

      <toast v-model="ShowDeleteState" type="text" :time="2000" is-show-mask  :text="ToastMsg"  position="middle"></toast>
      <!-- 是否成功状态弹框 -->
     
    
    <!-- <x-button    @click.native="back">取消</x-button> 
    <x-button     @click.native="sumbit()" >确定</x-button>  -->
  </div>
  </group>
</template>

<script>
    import NursingRecord  from  "./js/NursingRecord.js"
    
    export default NursingRecord
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
			
    .red{
      color:red;
    }
    .black{
      color:black;
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
    .navBarWrap { //吸顶效果
    position: fixed;
    top: 1rem;
    z-index: 999;
    width:100%;
  }
  //表格展开行
   .demo-table-expand {
    font-size: 1;
  }
  .demo-table-expand label {
    width: 150px;
    color: hsl(240, 8%, 3%);
    font-weight:bold;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>