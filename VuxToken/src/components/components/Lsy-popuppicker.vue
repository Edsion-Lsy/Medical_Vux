<template>
 
    <group  label-width="5.5em" label-margin-right="0em"  label-align="left"  style=" margin-top: -20px;;" >
        <!-- group组件默认上部有空隙 此处向上移动 -->
        <!-- @input="$emit('input', $event.target.value)" -->
        
        <popup-picker :title='Title1' :data="[DictionaryList]"  cancel-text="清空"  v-model="Maindata1" value-text-align="center"
        @on-change="$emit('lsyonchange', Maindata1)"
        @input="$emit('Validations', Maindata1)"  
        :class="Requiredcss1?'red':'black'"
         @on-hide="onHide"
        ></popup-picker>

    </group>
    

    <!-- <Lsy-checkbox   @input="$v.MainData.Symptom.$touch()"  :Title="'症状关键词'"  
    :Sign="'Symptom'"  :Maindata="MainData.Symptom"  :DictionaryList="SymptomList" 
            :Requiredcss="$v.MainData.Symptom.$error"
            @lsyonchange="data => { MainData.Symptom = data }"
            v-if="SymptomList.length != 0 && ShowPatientTypeSwitch"
    ></Lsy-checkbox> -->

</template>

  

<script>
 import {  PopupPicker,  TransferDom, Group
    } from 'vux'
export default {

   
 name: 'Lsy-popuppicker', // 注意这里的name命名，就是你以后封装好后使用的组件名
    props: {  //接收 接收的值不能直接修改，需要再新写一个data中的变量承接做数据的再处理。
        value:Array,
        Title:String,
        Maindata:Array,        //传入填写数据
        DictionaryList:Array,   //传入数据字典
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
        this.Requiredcss1=this.Requiredcss,
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
           
            Title1:'',
            Maindata1:[],        //传入填写数据
            DictionaryList1:this.DictionaryList,   //传入数据字典
            Requiredcss1:false,  //必填校验样式选择
            Sign1:'',            //用于互斥校验标记 以字段名传入
        }
    },

    methods:{

        onHide (type) {
                 console.log('type',type)
            if(!type){
                console.log('触发了关闭时间')
                this.Maindata1=[]
            }
            
        },

       
    },
    directives: {
        TransferDom
    },    
    components: {
   PopupPicker,  TransferDom,Group
    
        
    },
    
    
}
</script>
<style   lang="less">

    .red{
        color:red;

    }
    .black{
        color:black;

    }
</style>