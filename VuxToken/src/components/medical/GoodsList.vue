<template>
<group  style="margin-top: 3em;"  label-width="5.5em" label-margin-right="1em"  label-align="left"  >
   <x-header class="vux-header-box"  
    :left-options="{showBack: false}"
   style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
        
         消耗物品列表<a slot="right" style="color:black "   @click="submit()">保存</a>  
        
        </x-header>
       <!-- :data="HCList.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()) ||  data.Abbreviation.toLowerCase().includes(search.toLowerCase())  )" -->

    <!-- :data="HCList.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()) ||  data.Abbreviation.toLowerCase().includes(search.toLowerCase())  ).slice((currentPage-1)*pageSize,currentPage*pageSize)" -->
     <!-- :data="(HCList.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()) ||  data.Abbreviation.toLowerCase().includes(search.toLowerCase())  )
      .filter(data => !searchCategory || data.Category.toLowerCase().includes(searchCategory.toLowerCase())
      .slice((currentPage-1)*pageSize,currentPage*pageSize)) " -->
  <el-table
    
      ref="multipleTable"
      :select-on-indeterminate="false"
      :data="DataType==0?(interflag!=0?
      HCList.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()) ||  data.Abbreviation.toLowerCase().includes(search.toLowerCase())):HCList.filter(data => !'药品' || data.Category.toLowerCase().includes('药品'.toLowerCase()) ) 
      ):(
      HCListType.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()) ) 
      )
      "
      style="width: 100%"
      @selection-change="handleSelectionChange"
      max-height="680"
      @row-click="clickchange"
    >
       <el-table-column
      type="selection"
      width="30">
       </el-table-column>
      <el-table-column
       label="序号"
                type="index"
                width="50">
      </el-table-column>
  
    <el-table-column
      label="名称"
      width="160"
      prop="Name"
      align="center"
      >

      <template slot="header" slot-scope="scope">
        <el-input

          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        
        <p   >{{scope.row.Name}}</p>
      </template>

    </el-table-column>

    


    <el-table-column 
      prop="tag"
      label="类型"
      width="120"
      header-align="center"
      align="left"
    >
        <template slot="header" slot-scope="scope">


       <el-popover
        
            title="物品类别"
            
            placement="right"
            width="200"
            trigger="click"
          
                    
            >

              <div style="text-align: center; margin: 0">
                  <el-tree
                            default-expand-all
                            :data="GoodsTrees"
                            node-key="id"
                            show-checkbox
                            ref="tree"
                            :expand-on-click-node="true"
                            accordion
                            
                            @node-click="handleNodeClick"
                            @check-change="boxhandleNodeClick"
                >
                          
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span >{{ node.label }} </span>
                    </span>
              </el-tree>
              <!-- <el-button size="mini" type="text" @click="Treevisible = false">取消</el-button> -->
              <!-- <el-button type="primary" size="mini" @click="Treevisible = false">确定</el-button> -->
            </div>
    
            <el-button slot="reference" type="primary" icon="el-icon-zoom-in" circle  mini  ></el-button>
      
          </el-popover>
       
        </template>
        <template slot-scope="scope">
           <el-tag disable-transitions>{{scope.row.Category}}</el-tag>
         
        </template>
    </el-table-column>
  </el-table>

<!-- 
      <el-pagination
      :small="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[ 5, 10,]"
          :page-size="pageSize"
          :total="HCList.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()) ||  data.Abbreviation.toLowerCase().includes(search.toLowerCase())  ).length"
          layout=" sizes, prev, pager, next, jumper">
      </el-pagination> -->
      <!-- :total="HCList.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()) ||  data.Abbreviation.toLowerCase().includes(search.toLowerCase())  &&  data.Category.toLowerCase().includes(search.toLowerCase())  ).length"> -->

    <div v-transfer-dom>
      <loading :show="Loading" text='正在加载'></loading>
    </div>
  </group>
</template>

<script>
    import GoodsList  from  "./js/GoodsList.js"
    
    export default GoodsList
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