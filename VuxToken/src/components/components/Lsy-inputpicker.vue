<template>
 
    <group  label-width="5.5em" label-margin-right="0em"  label-align="left"  style=" margin-top: -20px;;" >
        <!-- group组件默认上部有空隙 此处向上移动 -->
        <!-- @input="$emit('input', $event.target.value)" -->
        <x-input :title='Title1' :show-clear="false"  :readonly="Isinput1"  v-model="Maindata1"    @on-change="$emit('lsyonchange', Maindata1)"   
         
        @input="$emit('Validations', Maindata1)"  
        :class="Requiredcss1?'red':'black'"
         text-align="center"
        >
        <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="Clearother"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="ShowPopup" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="Title1" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="Maindata1=[],ShowPopup = false "
            @on-click-right="ShowPopup = false"></popup-header>    
            <checker v-model="Maindata1" type="radio" default-item-class="default-item" selected-item-class="item-selected" disabled-item-class="item-disabled" >
                <checker-item v-for="item in DictionaryList1" 
                v-bind:disabled="disabled(item,Title1)"
                @on-item-click="Clearother"
                :key="item.key" :value="item.value" >{{item.value}}</checker-item>
            </checker></div></popup>
            <!-- v-bind:disabled="disabled(item,Title1)"  v-show="false" -->
        </div>
        <!-- <input
           
            ref="input"
            :value="Maindata1"
            @input="$emit('input', $event.target.value)"
        > -->
    </group>
    
</template>

<script>
 import { XInput, PopupPicker,  Checker, CheckerItem, Group,
    Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
    FlexboxItem, Tab, TabItem,PopupHeader,Grid  } from 'vux'
export default {

   
 name: 'Lsy-inputpicker', // 单选可选可填
    props: {  //接收 接收的值不能直接修改，需要再新写一个data中的变量承接做数据的再处理。
        value:Array,
        Title:String,
        Maindata:Array,        //传入填写数据
        DictionaryList:Array,   //传入数据字典
        Isinput:Boolean,
        //Requiredcss:Boolean,
        
        Requiredcss: {
            type: Boolean,
            // default: () => {
            //     return false
            // }
        },
        //switch: true,   //bool类型
    
    },
    mounted() { //使用
        this.Title1=this.Title,
        this.Maindata1=this.Maindata,
        console.log(this.Maindata1,'this.Maindata1')
        this.Requiredcss1=this.Requiredcss,
        this.Isinput1=!this.Isinput,
        
        this.Sign1=this.Sign
       
   
    },
    watch:{   // 使用监听的方式，监听数据的变化
        DictionaryList(val){
            this.DictionaryList1 = val;
        },
        Requiredcss(val){
            this.Requiredcss1 = val;
        
        }
    },
    data () {
        return { 
            ShowPopup: false, 
            Title1:'',
            Maindata1:[],        //传入填写数据
            DictionaryList1:this.DictionaryList,   //传入数据字典
            Requiredcss1:false,  //必填校验样式选择
            Sign1:'',            //用于互斥校验标记 以字段名传入
            Isinput1:true,     //是否可选可填 不传值默认为false故不可选不加这个参数即可
        }
    },

    methods:{
        Clearother(){
                    let a=true;
                    this.ShowPopup=true
                    console.log('isinput',this.Isinput)
                    if(this.Isinput){

                            if(this.Maindata1!='' && this.Maindata1!=undefined && this.Maindata1!=[]){
                                for(let i = 0; i < this.DictionaryList1.length; i++) {
                                    console.log("this.Maindata1.split(',')[0]",this.Maindata1.split(',')[0])
                                if(this.Maindata1.split(',')[0]==this.DictionaryList1[i].value){
                                    a=false
                                    }
                                }
                        }
                        if(a){  //如果填写内容不包含在字典中则清空内容
                        this.Maindata1=""
                        }
                    }
                    

                
            
        },


        disabled(item,Title1){//互斥校验
            if(this.$store.state.AddPatientPage=='AddPatientRecordSZ'){
                if(this.Sign1==='Growth'){
                    if ((this.Maindata1.join('').indexOf('异常')!=-1 &&item.value!='异常') 
                        || (this.Maindata1.join('').indexOf('正常')!=-1 &&item.value!='正常')
                        )//!=-1则包含
                    {
                            return true //不可选
                    }else{
                            return false //可选
                    }
                }else{
                    return false //可选
                }
            
            }
        }
    },
    directives: {
        TransferDom
    },    
    components: {
    XInput, PopupPicker,  Checker, CheckerItem, Group,
    Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
    FlexboxItem, Tab, TabItem,PopupHeader,Grid
        
    },
    
    
}
</script>
<style   lang="less">
//lang="less" scss scoped
    .item-disabled {
        //互斥禁用时的css
        background: #cccaca    no-repeat right bottom;
        border-color:  #808080;
    }
    .cell-x-icon {
        display: block;
        fill: gray;
    }
    
    .item-selected  {
        background: #ffffff  url(../../assets/images/active.png)  no-repeat right bottom;
        border-color: #ff4a00;
    }
    .default-item {
        font-size: 9px;
        width: 130px;
        height: 30px;
        line-height: 26px;
        text-align: center;
        border-radius: 3px;
        border-width: 1px;
        border-style: solid;        
        //border-color:  #808080; //启用后不能覆盖
       // border: 1px solid ;
        //border-color: #ccc;
        //background-color: #fff;
        margin-right: 12px;
        margin-left: 12px;
        margin-top: 1px;
        margin-bottom: 1px;
    }
    .red{
        color:red;

    }
    .black{
        color:black;

    }
</style>