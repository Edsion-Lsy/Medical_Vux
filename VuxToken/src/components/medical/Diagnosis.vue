<template>
<div>
 <div  class="vux-header-box" slot="header"><x-header style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >诊断信息<a slot="right" style="color:black "   @click="SaveBasicinfo()">保存</a> </x-header></div>
    
        <group style="margin-top: 3em;">
          <div v-show="!ShowTentativeDiagnose">
            <x-input   :title="('初步诊断')"   :class="$v.MainData.TentativeDiagnoseName.required?'red':'black'"   readonly>

                <x-icon slot="right" type="ios-plus" class="cell-x-icon" @click.native="ShowTentativeDiagnose=true" ></x-icon>
            </x-input>
            <x-textarea   readonly  :rows="4"       :autosize="true" v-model="MainData.TentativeDiagnoseName" ></x-textarea>
          </div>

            
              
           
            <!-- <div v-transfer-dom> :placeholder="('点击进入选择')"
                <popup v-model="ShowTentativeDiagnose"  height="78%" class="touch-action-none">
                     <div  class="navBarWrap"> 
                            <group> -->
            <div v-show="ShowTentativeDiagnose">
                              <x-input  title="搜索"  placeholder="模糊搜索"  :id="'top'"  v-model="TentativeDiagnoseNameserach" ></x-input>
                              <x-textarea   :title="'初步诊断内容'"  readonly :max="200"  readonly    :autosize="true"    v-model="MainData.TentativeDiagnoseName" > </x-textarea>
                              <!-- <x-input required readonly  title="初步诊断" :id="'under'" v-model="MainData.TentativeDiagnoseName"></x-input>-->
                              <x-button type="primary"  @click.native="ShowTentativeDiagnose=false">确定</x-button>  
                            <!-- </group> -->
                    <!-- </div> -->
                <el-tree
                            :data="TentativeDiagnoseListtree"
                            node-key="id"
                            show-checkbox
                            ref="tree"
                            :expand-on-click-node="true"
                            accordion
                            :filter-node-method="filterNode"
                            
                            @node-click="handleNodeClick"
                            @check-change="boxhandleNodeClick"
                >
                            <!-- 两种方法@node-click和@check-change为了手机端点击勾选框或点击那列时都可以进行选择，
                            增加用户体验  @node-click：点击可选中的节点时就触发 @check-change：点击勾选框时触发  -->
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span >{{ node.label }} </span>
                            <!-- <span>
                                    <el-button
                                        type="text"
                                        size="mini"
                                        @click="() => setCheckedKeys()">
                                        添加问号
                                    </el-button>
                            </span> -->
                        </span>
                </el-tree>
               </div>
                <!-- </popup>
            </div> -->
            <div v-if="!ShowTentativeDiagnose">
                  <x-textarea   title="补充诊断" :max="200" :rows="2" :autosize="true" :placeholder="!$v.MainData.TentativeDiagnoseName.required?('未填初步诊断不可编辑补充诊断'):('')"    :readonly='!$v.MainData.TentativeDiagnoseName.required' v-model="MainData.AuxiliaryDiagnose" ></x-textarea>
                  <popup-picker title="病&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp因" :data="[CausesList]"     :class="!$v.MainData.Causes.required?'red':'black'"    v-model="MainData.Causes" value-text-align="center"></popup-picker>

                  <popup-picker title="病情分级" :data="[IllnessSortList]"     :class="!$v.MainData.IllnessSort.required?'red':'black'"   v-model="MainData.IllnessSort" value-text-align="center"></popup-picker>
                  <popup-picker title="急救效果" :data="[FirstAideEffectList]" :class="!$v.MainData.FirstAideEffect.required?'red':'black'"   v-model="MainData.FirstAideEffect" value-text-align="center"></popup-picker>

                  <!-- //触发条件 -->
                  <popup-picker v-if="showZ" title="跌落高度" :data="[DHeightList]"     v-model="MainData.DHeight" value-text-align="center"></popup-picker>
                  <popup-picker v-if="showJ" title="交通事故" :data="[TrafficAccidentList]"     v-model="MainData.TrafficAccident" value-text-align="center"></popup-picker>
                  <popup-picker v-if="showZ" title="是否为贯通伤" :data="[IsPenetratWoundList]"     v-model="MainData.IsPenetratWound" value-text-align="center"></popup-picker>

                  <popup-picker title="病情变化" :data="[IllnessChangeList]"      v-model="MainData.IllnessChange" value-text-align="center"></popup-picker>
                 
                 
                  <div v-if="ShowGiveUpReason" >
                  <popup-picker title="放弃原因" :data="[GiveUpReasonList]"      v-model="MainData.GiveUpReason" value-text-align="center"></popup-picker>
                  <popup-picker title="第一目击救治者" :data="[IsEyewitnessList]"      v-model="MainData.IsEyewitness" value-text-align="center"></popup-picker>
                  <popup-picker   title="胸外按压有无损伤" :data="[EyewitnessList]"      v-model="MainData.Eyewitness" value-text-align="center"></popup-picker>
 
                  </div>
                  <!-- <popup-picker title="死亡类型" :data="[DeathTypeList]"       v-model="MainData.DeathType" value-text-align="center"></popup-picker> -->
                 <!-- <x-textarea  v-if="showPoliceNo && $store.state.AddPatientPage=='AddPatientRecordGuangZ'"  title="警号" :max="200" :rows="2" autosize   autosize  v-model="MainData.PoliceNo" ></x-textarea> -->

                    <Lsy-checkbox  :Title="'出诊结果'"    :Sign="'VisitsType'"   :Maindata="MainData.VisitsType"  :DictionaryList="VisitsTypeList" 
                         :Requiredcss="!$v.MainData.VisitsType.required"
                        @lsyonchange="data => { MainData.VisitsType = data }"
                        v-if="VisitsTypeList.length != 0"
                    ></Lsy-checkbox>
                  <x-textarea  title="抢救记录" :max="200" :rows="3"   :autosize="true" v-model="MainData.IllChangeRecord" ></x-textarea>
                    
                  <!-- <x-input title="出诊结果"  readonly   v-model="MainData.VisitsType"   :class="!$v.MainData.VisitsType.required?'red':'black'"   >
                  <x-icon slot="right" type="ios-plus" class="cell-x-icon" @click.native="showPopupVisitsType=true"></x-icon>
                  </x-input>

                  <div v-transfer-dom>

                  <popup v-model="showPopupVisitsType" class="checker-popup">

                  <div style="padding:10px 10px 40px 10px;">
                    <p style="padding: 5px 5px 5px 2px;color:#888;" align="center">出诊结果</p>
                    <checker
                          v-model="MainData.VisitsType"
                          type="checkbox"
                          default-item-class="SendAdd-item"
                          selected-item-class="SendAdd-item-selected"
                        
                          >
                          <checker-item v-for="i in VisitsTypeList" :key="i.key" :value="i.value" >{{i.value}}</checker-item>
                      </checker>
                      </div>
                </popup>
                  </div> -->

                <!-- <x-textarea v-if="$store.state.AddPatientPage=='AddPatientRecordSZ'" title="抢救记录"  :max="200" :rows="5"   v-model="MainData.IllChangeRecord" ></x-textarea> -->
                <!-- <x-button  type="primary" action-type="submit"  @click.native="SaveBasicinfo()">保存</x-button> -->
            </div>
        
        </group>
        

</div>
        


    
</template>

<script>
    import Diagnosis  from  "./js/Diagnosis.js"
    
    export default Diagnosis
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