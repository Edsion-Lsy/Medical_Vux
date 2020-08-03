<template>
   
        <group style="margin-top: 3em;">
        <x-header class="vux-header-box"  style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
        
        辅助检查<a slot="right" style="color:black "   @click="SaveBasicinfo()">保存</a>
        </x-button>
        
        </x-header>
            <x-input   :title="('心电图/心电监护')" readonly>
              <x-icon slot="right" type="ios-plus" class="cell-x-icon" @click.native="ShowECGT=true" ></x-icon>
      
            </x-input>

            <x-textarea    :rows="4"  readonly    :autosize="true"   v-model="TG.ECGT"></x-textarea>
            <!-- <div v-transfer-dom>
                <popup v-model="ShowECGT" height="86%" class="touch-action-none"> -->
                    <!-- <div  class="navBarWrap"> -->
            <div v-show="ShowECGT">
                            <!-- <group > -->
                                <x-input  title="搜索"  placeholder="模糊搜索"  v-model="ECGTNameserach" ></x-input>
                                <!-- <x-input required readonly  title="心电图诊断" v-model="TG.ECGT"></x-input> -->
                                <x-button  type="primary"   @click.native="ShowECGT=false">确认</x-button> 
                            <!-- </group> -->
                    <!-- </div> -->
                <el-tree
                            :data="ECGTListtree"
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
                            <span>
                                    <!-- <el-button
                                        type="text"
                                        size="mini"
                                        @click="() => setCheckedKeys()">
                                        添加问号
                                    </el-button> -->
                            </span>
                        </span>
                </el-tree>
              </div>
                <!-- </popup>
            </div> -->

            <div v-if="!ShowECGT">

                <x-textarea   title="心电补充诊断" :max="200" :rows="3"      :readonly='!$v.MainData.FirstECGDiagID.required'  :autosize="true"  v-model="TG.ECGDiag" ></x-textarea>

                <flexbox>
                    <flexbox-item :span="4/5">  <x-input title="血糖"  :show-clear="false"  text-align="center"   v-model="TG.GluT" >
                    <x-icon slot="right" title="c" type="ios-arrow-forward"  class="cell-x-icon"  @click.native="ShowGluT=true"></x-icon>
                    </x-input> </flexbox-item>
                    <flexbox-item>mmol/l</flexbox-item> 
                </flexbox>



                <div v-transfer-dom>
                <popup v-model="ShowGluT" >
                <popup-header
                :left-text="('清空')"
                :right-text="('确认')"
                :title="('血糖')"
                :show-bottom-border="false"
                @on-click-left="clear('血糖')"
                @on-click-right="ShowGluT = false"></popup-header>
                    <group gutter="0">
                        <radio :options="GluTList" v-model="TG.GluT"  @click.native="ShowGluT=false" ></radio>
                    </group>
                </popup></div>

            

                <flexbox>
                    <flexbox-item :span="4/5">  <x-input title="Spo2"  :show-clear="false"  text-align="center"   v-model="TG.Spo2" >
                    <x-icon slot="right" title="c" type="ios-arrow-forward"  class="cell-x-icon"  @click.native="ShowSpo2=true"></x-icon>
                    </x-input> </flexbox-item>
                    <flexbox-item>%</flexbox-item> 
                </flexbox>
                <div v-transfer-dom>
                <popup v-model="ShowSpo2" >
                <popup-header
                :left-text="('清空')"
                :right-text="('确认')"
                :title="('spo2')"
                :show-bottom-border="false"
                @on-click-left="clear('Spo2')"
                @on-click-right="ShowSpo2 = false"></popup-header>
                    <group gutter="0">
                        <radio :options="Spo2List" v-model="TG.Spo2"   @click.native="ShowSpo2=false"     ></radio>
                        <!-- <checklist  :options="Spo2List" v-model="TG.Spo2"
                        :max="2"></checklist> -->
                    </group>
                </popup></div>
                <div  v-if="$store.state.AddPatientPage=='AddPatientRecordQH'">
                    <flexbox>
                        <flexbox-item :span="4/5">  <x-input title="肌钙蛋白"  :show-clear="false"  text-align="center"   v-model="TG.JGDB" >
                        <x-icon slot="right" title="c" type="ios-arrow-forward"  class="cell-x-icon"  @click.native="ShowJGDB=true"></x-icon>
                        </x-input> </flexbox-item>
                        <flexbox-item> μg/L	</flexbox-item> 
                    </flexbox>



                    <div v-transfer-dom>
                    <popup v-model="ShowJGDB" >
                    <popup-header
                    :left-text="('清空')"
                    :right-text="('确认')"
                    :title="('肌钙蛋白')"
                    :show-bottom-border="false"
                    @on-click-left="clear('肌钙蛋白')"
                    @on-click-right="ShowJGDB = false"></popup-header>
                        <group gutter="0">
                            <radio :options="JGDBList" v-model="TG.JGDB"  @click.native="ShowJGDB=false" ></radio>
                        </group>
                    </popup></div>
                </div>
                <x-textarea   title="其他" :max="200" :rows="3"   v-if="$store.state.AddPatientPage=='AddPatientRecordSZ'"      :autosize="true"  v-model="TG.FZOther" ></x-textarea>


                <x-input title="自救"  v-if="$store.state.AddPatientPage=='AddPatientRecordQH' || $store.state.AddPatientPage=='AddPatientRecordTL'||  $store.state.AddPatientPage=='AddPatientRecordWLMQ'" :show-clear="false"       readonly  v-model="MainData.SaveOneself"     >
                    <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupSaveOneself=true"></x-icon></x-input>
                    <div v-transfer-dom>
                        <popup v-model="showPopupSaveOneself" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
                        <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('自救')" :show-bottom-border="true"
                            align="center"  style="background-color: #fff;"
                            @on-click-left="MainData.SaveOneself=[],showPopupSaveOneself = false "
                            @on-click-right="showPopupSaveOneself = false"></popup-header>    
                        <checker v-model="MainData.SaveOneself" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                            <checker-item v-for="itema in SaveOneselfList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
                        </checker></div></popup>
                </div>

            </div>
        </group>
        


        


    
</template>

<script>
    import AidCheck  from  "./js/AidCheck.js"
    
    export default AidCheck
</script>


<style lang="less">
.demo4-item-disabled {
    color: #999;
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
    //CSS 属性 touch-action 用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作（比如浏览器自带的划动、缩放等）。

}
// .SendAdd-item {
//     font-size: 9px;
//     width: 130px;
//     height: 30px;
//     line-height: 26px;
//     text-align: center;
//     border-radius: 3px;
//     border: 1px solid #ccc;
//     background-color: #fff;
//     margin-right: 6px;
// }
// .SendAdd-item-selected {
//     background: #ffffff  url(../../assets/images/active.png)  no-repeat right bottom;
//     border-color: #ff4a00;
// }

//用于吸顶效果
 .navBarWrap {
    position: fixed;
    top: 2rem;
    z-index: 999;
    width:100%;
  }
</style>