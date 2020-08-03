<template>
<group  style="margin-top: 3em;"  label-width="5.5em" label-margin-right="1em"  label-align="left"  >
   <x-header class="vux-header-box"  style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
        
         消耗物品列表<a slot="right" style="color:black "   @click="submit()">保存</a>  
        
        </x-header>
       <!-- :data="HCList.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()) ||  data.Abbreviation.toLowerCase().includes(search.toLowerCase())  )" -->

    <!-- :data="HCList.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()) ||  data.Abbreviation.toLowerCase().includes(search.toLowerCase())  ).slice((currentPage-1)*pageSize,currentPage*pageSize)" -->
     <!-- :data="(HCList.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()) ||  data.Abbreviation.toLowerCase().includes(search.toLowerCase())  )
      .filter(data => !searchCategory || data.Category.toLowerCase().includes(searchCategory.toLowerCase())
      .slice((currentPage-1)*pageSize,currentPage*pageSize)) " -->
 
 
  <div style="height: 100%;width: 100%;overflow: auto">
    <p style="color: red">我是Y轴虚拟</p>
    <div style="height: 400px;width: 100%">
 
  <pl-table
    
    ref="multipleTable"

      :datas="HCList.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()) ||  data.Abbreviation.toLowerCase().includes(search.toLowerCase())  )"
      
      @selection-change="handleSelectionChange"
     

      use-virtual
      big-data-checkbox
      fixed-columns-roll
      
      @row-click="clickchange"
    >
       <pl-table-column
      type="selection"
      width="30">
       </pl-table-column>
      <pl-table-column
       label="序号"
                type="index"
                width="50">
      </pl-table-column>
  
    <pl-table-column
      label="名称"
      width="160"
      prop="Name"
      
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

    </pl-table-column>

    


    <pl-table-column 
      prop="tag"
      label="类型"
      width="100"
      :filters="[{ text: '药品', value: '药品' }, { text: '材料', value: '材料' },
      { text: '其他', value: '其他' }, { text: '车身底盘配件', value: '车身底盘配件' },
      { text: '电器类', value: '电器类' }, { text: '发动机配件', value: '发动机配件' },
      { text: '滤芯类', value: '滤芯类' }, { text: '油类', value: '油类' },
      { text: '低值易耗品', value: '低值易耗品' }, { text: '劳保用品', value: '劳保用品' },
      { text: '工具三材', value: '工具三材' }, { text: '办公用品', value: '办公用品' },
      { text: '备用备件', value: '备用备件' }, { text: '医疗器材', value: '医疗器材' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        
        <el-tag disable-transitions>{{scope.row.Category}}</el-tag>
      </template>
    </pl-table-column>
  </pl-table>

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
      <loading :show="Loading" text='Loading'></loading>
    
    </div>
    </div>
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
      margin-right: 6px;
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