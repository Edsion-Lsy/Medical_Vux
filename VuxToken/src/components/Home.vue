<template>
  <div class="memberHome" style="height: 100%" onresize="document.activeElement.scrollIntoView(true);">
   <view-box ref="viewbox" >
     <div class="vux-header-box" slot="header"></div>
        <!-- <x-header :left-options="{backText: ''}" v-show="headShow">{{pageTitle}}</x-header> -->
      
    <!--   <flow  orientation="vertical" style="height:300px;">
      <flow-state state="1" :title="('基础信息')" is-done></flow-state>
      <flow-line is-done></flow-line>

      <flow-state state="2" is-done>
        <span slot="title">{{ ('体格检查') }}</span>
      </flow-state>
      <flow-line :tip="('已完成')"></flow-line>

      <flow-state state="3" :title="('辅助检查')"></flow-state>
      <flow-line></flow-line>

      <flow-state state="4" :title="('诊断信息')"></flow-state>
      <flow-state state="5" :title="('救治措施')"></flow-state>
      <flow-state state="6" :title="('心肺复苏登记')"></flow-state>
    </flow> -->

      <toast v-model="this.$store.state.ErrorSwitch" type="text" :time="30000" is-show-mask  :text="this.$store.state.ErrorMsg" 
      
       position="middle"></toast>

     <div v-transfer-dom class="loading-box">
          <popup v-show="loading"  :hide-on-blur=false is-transparent >
          <loading :show="loading"  text=""></loading>
          </popup>
    </div>
        <router-view></router-view>
     <tabbar v-show="footerShow" style="position:fixed">
         <tabbar-item  link="/medical/Grid">
        <img slot="icon" src="../assets/images/icons/Tabbar-icon.png">
        <span slot="label">九宫格</span>
      </tabbar-item>
      <tabbar-item  link="/test" >
        <img slot="icon" src="../assets/images/icons/Tabbar-icon.png">
        <span slot="label">test</span>
      </tabbar-item>

      <tabbar-item  link="/medical/basicinfo" >
        <img slot="icon" src="../assets/images/icons/Tabbar-icon.png">
        <span slot="label">a</span>
      </tabbar-item>
      <tabbar-item link="/medical/a">
        <img slot="icon" src="../assets/images/icons/Tabbar-icon.png">
        <span slot="label">b</span>
      </tabbar-item>
      <tabbar-item  link="/personal/personalTask">
        <img slot="icon" src="../assets/images/icons/Tabbar-icon.png">
        <span slot="label">c</span>
      </tabbar-item>
      <tabbar-item link="/memberHome/mine">
        <img  slot="icon" src="../assets/images/icons/Tabbar-icon.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    </view-box>
  </div>
</template>


<script>
  import { Tabbar,Icon,TabbarItem ,XHeader,Loading,ViewBox,Flow, FlowState, FlowLine, Grid, GridItem,Toast,Popup } from 'vux'
  import { TransferDomDirective as TransferDom } from 'vux'


  import {mapGetters} from 'vuex'
 
  export default {



    computed:mapGetters([

      'headShow',
      'loading',
      'footerShow',
      'pageTitle',
      'ErrorSWitch',
      'ErrorMsg',

    
    ]),
    //   computed: {
    //         loading:{

    //                 // getter
    //                 get: function () {
    //                     return  this.$store.modules.loading
    //                 },
    //                 // setter
    //                 set: function (newValue) {
    //                    this.$store.modules.loading= newValue;
    //                 }
    //             },
    //          ErrorSWitch:{

    //                 // getter
    //                 get: function () {
    //                     return  this.$store.modules.ErrorSWitch
    //                 },
    //                 // setter
    //                 set: function (newValue) {
    //                    this.$store.modules.ErrorSWitch= newValue;
    //                 }
    //             },
    //          ErrorMsg:{

    //                 // getter
    //                 loading: function () {
    //                     return  this.$store.modules.ErrorMsg
    //                 },
    //                 // setter
    //                 set: function (newValue) {
    //                    this.$store.modules.ErrorMsg= newValue;
    //                 }
    //             },

    // },

    data(){
      let data={
        bad:'3'
      }
      return data
    },
    mounted() {
      
    },
    directives: {
        TransferDom
      },
    components: {
      Tabbar,
      TabbarItem,
      XHeader,
      Loading,
      ViewBox,
      Icon,
      Flow,
      FlowState,
      FlowLine,
      Grid,
      GridItem,
      Toast,
      Popup
    },

 
  }
</script>
<style scoped>

.memberHome .vux-header-box {
  z-index: 100;
  /* position: absolute; */
   position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}

/* .memberHome .weui-tabbar__icon img{
      width: auto;
      height: 90%;
}*/
  .memberHome .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color: rgb(228, 8, 8)
} 
</style>

