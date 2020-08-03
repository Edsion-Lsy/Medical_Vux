<template>
<div>
 <div  class="vux-header-box" slot="header"><x-header style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >外科检查<a slot="right" style="color:black "   @click="SaveBasicinfo()">保存</a> </x-header></div>
    
        <group style="margin-top: 3em;">

            <el-table
              :data="MainData.List"
              border
              stripe
              style="width: 100%"
              max-height="800">
              <el-table-column
              label="序号"
              width="35" 
              type="index"
              :index="indexMethod">
              </el-table-column>
              <el-table-column
                width="50" 
                align="center"
                prop="Name"
                label="部位"
              >
              </el-table-column>
              <el-table-column
                prop="JBSQ"
                label="局部伤情"
                 align="center"
                width="170">
                <!-- <template slot-scope="scope">
                <el-input
                  type="text"
                  placeholder="请输入内容"
                  v-model="MainData.List[scope.$index].JBSQ" 
                  maxlength="100"
                  show-word-limit
                >
                </el-input>
                 </template> -->
              <template slot-scope="scope">
                <x-textarea  :rows="3" 
                autosize  v-model="MainData.List[scope.$index].JBSQ" ></x-textarea>
                
                </template>
              </el-table-column>
            <el-table-column    width="100" label="部位"  align="center">
                <template slot-scope="scope">
                  <!-- <el-checkbox-group 
                    v-model="WSJCList[scope.$index].WSType"
                   >
                    <el-checkbox v-for="type in wstype" :label="type" :key="type">{{type}}</el-checkbox>
                 
                 
                  </el-checkbox-group> -->
                    <checker
                      type="checkbox"
                      default-item-class="SendAdd-item"
                      selected-item-class="SendAdd-item-selected"
                      v-model="MainData.List[scope.$index].WSType"
                    >
                      <checker-item v-for="i in ['开放性', '闭合性', '烧伤']" :key="i" :value="i">{{i}}</checker-item>
                    </checker>
                </template>
            </el-table-column>

      
            </el-table>

        </group>
        

</div>
        


    
</template>

<script>
    import WSCheck  from  "./js/WSCheck.js"
    
    export default WSCheck
</script>


<style lang="less" scoped>
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
  width: 40px;
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