<template>

        <group style="margin-top: 3em;">
         
       
        <x-header class="vux-header-box"  style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
          救治措施<a slot="right" style="color:black "   @click="Back()">完成</a></x-header>
            <div v-show="!ShowTentativeDiagnose">
              <popup-picker title="使用打包医嘱" :data="[DoctorOrderList]" show-name v-model="DoctorOrder"   @on-change='SaveDoctorOrders(DoctorOrder)'  value-text-align="left"></popup-picker>
              <x-input   :title="('救治措施')" readonly>
                <img slot="right" src="../../assets/images/icons/Insert.png"   @click="ShowTentativeDiagnose=true">
              </x-input>
            </div>
            <!-- <div v-transfer-dom>
                <popup v-model="ShowTentativeDiagnose"  height="86%" class="touch-action-none">
                    <div  class="navBarWrap"> -->

                      <div v-show="ShowTentativeDiagnose">
                            <group style="margin-top: -1em;">

                                <x-input  title="搜索"  placeholder="模糊搜索"  :id="'top'"  v-model="TentativeDiagnoseNameserach" ></x-input>
                                
                                <x-input required  title="救治措施" :id="'under'" v-model="PredefinedTreatmentName"></x-input> 
                                <!-- <x-input required  title="救治措施" :id="'under'" v-model="MaindataPTN"></x-input>  -->
                                <!-- <x-textarea  :title="('心电图诊断')"   readonly     autosize      v-model="MaindataPTN"></x-textarea>
             -->
                                
                                <x-button  type="primary"    @click.native="closetree()">确认</x-button> 
                            </group>
                          
                    <!-- </div> -->
                <el-tree
                            :data="PredefinedTreatmentListtree"
                            
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
                          
                        </span>
                </el-tree>
                
                 </div>
                <!-- </popup>
            </div> -->


        
          <!-- 
                  <flexbox>
                    <flexbox-item>  <cell v-for="List in PTList"    :title="(List.DoOrder)"  :key="List.DoOrder"    ></cell></flexbox-item> 
                    <flexbox-item :span="5/6">   
                    <cell v-for="List in PTList"    :title="(List.Name)"  :key="List"  @click.native="OpenRecord(List.Name)"    >
                  
                    <x-button  mini plain  type="warn"   @click.native="DeleteRecord(List)" >删除</x-button>

                    </cell>
                    </flexbox-item>
                  </flexbox> -->
            <div v-show="!ShowTentativeDiagnose">
            <el-table
              :data="PTLista"
              border
              stripe
              fit="true"
              style="width: 100%"
              max-height="500">
              <el-table-column   min-width="5%" type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    
                      <el-form-item label="救治地点">
                        <span>{{ props.row.Place }}</span>
                      </el-form-item>
                      <el-form-item label="救治说明">
                        <span>{{ props.row.Results }}</span>
                      </el-form-item>
                      <el-form-item label="失败原因">
                        <span>{{ props.row.SBReson }}</span>
                      </el-form-item>
                    
                  </el-form>
              </template>
              </el-table-column>


              <el-table-column
                min-width="10%" 
                header-align="center"
                align="center"
                prop="DoOrder"
                label="序号"
              >
              </el-table-column>
              <el-table-column
                prop="MeasureContent"
                label="检查项目"
                header-align="center"
                align="center"
                min-width="30%" >
              </el-table-column>

            <el-table-column  header-align="center"  align="center" min-width="10%"  label="编辑">
              <template slot-scope="scope">
                  <img slot="icon" src="../../assets/images/icons/Edit-small.png"  @click="handleEdit(scope.$index, scope.row)">
                
              </template>
            </el-table-column>
            <el-table-column    header-align="center"  align="center" min-width="10%" label="删除">
              <template slot-scope="scope">
                <!-- <img slot="icon" src="../../assets/images/icons/Delete.png"  @click="DeleteRecord(scope.$index, scope.row)">
                -->
                <!-- <img slot="icon" src="../../assets/images/icons/Delete.png"  @click="showDeleteMsg=true"> -->
                 <img slot="icon" src="../../assets/images/icons/Delete.png"   @click="DeleteRecordinfo(scope.$index, scope.row)">
                <!-- @click="handleDelete(scope.$index, scope.row)" -->

                <!-- <actionsheet v-model="showDeleteMsg" :menus="Menus"    @on-click-menu-delete="DeleteRecord( scope.row)" show-cancel></actionsheet> -->
              
              
              
              </template>
            </el-table-column>
            <el-table-column    header-align="center" align="center"   min-width="10%"  label="调整">
              <template slot-scope="scope">
                  <img slot="icon" src="../../assets/images/icons/Up-small.png"  @click="TreamentUp(scope.row)">
                
                  <!-- <img v-if="$store.state.AddPatientPage=='AddPatientRecordQH'" slot="icon" src="../../assets/images/icons/Down-small.png"  @click="TreamentDown( scope.row)">
                 -->
              </template>
            </el-table-column>
            </el-table>
            </div>
        <toast v-model="ShowDeleteState" type="text" :time="2000" is-show-mask  :text="ToastMsg"  position="middle"></toast>
      
      <div v-transfer-dom >
        <popup v-model="showDeleteMsg" height="13em" :hide-on-blur=false is-transparent   >
                  <div style="width: 95%;background-color:#fff;height:10em;margin:0 auto;border-radius:5px;padding-top:0px;" >
                    <div style="padding:20px 15px;"  >
                      <p align="center"  style="font-size:20px" >是否确认删除</p>
                      <x-button type="warn" @click.native="DeleteRecord()">删除</x-button>
                      <x-button @click.native="showDeleteMsg=false">取消</x-button>
                    </div>
                  </div>
        </popup>
      </div>


        </group>
        


        


    
</template>

<script>
    import Treaments  from  "./js/Treaments.js"
    
    export default Treaments
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