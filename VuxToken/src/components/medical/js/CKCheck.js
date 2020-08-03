import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
    XNumber, XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
    Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
    FlexboxItem,PopupHeader,Radio,Sticky  } from 'vux'
   
import {Physical} from "@/model/Patient.js";
import { required } from "vuelidate/lib/validators";
import TransferUtil from '@/assets/js/transferUtil.js';
export default {

    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
    if (to.path === '/medical/Grid/') {
        console.log('将填写页面缓存关闭'+from.meta.keepAlive)
        from.meta.keepAlive = false;  //当返回九宫格后不再缓存
    } 
    next()
    },
    created(){
        this.loadDictionary();
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
        //路由进入后
            next(vm => {
            if(from.path==='/medical/Grid'){
                vm.Getinfo();
            }
        });
        },

    validations: {
        // MainData: {
        //     IsPTBook: { required },
        //     IsHandover: { required },
        // }
    },
    data () {
        let data={
            //...Diagnosis(),
            ...Physical(),//

            HospitalCareList:[],
            HospitalizationList:[],
            LapseToList:[],
            AbdominalSList:[],  //腹形             可填
            ContractList:[],    //宫缩          
            TFWList:[],        //胎方位             可填
            //TXY:'',         //胎心音次数
            XLRPList:[],       //先露入盆
            GKKZList:[],       //宫口扩张
            TMPLList:[],       //胎膜破裂
            YSYSList:[],       //羊水颜色           可填
            YDLXList:[],        //阴道流血
            //YDLXLYDLX:'',   //阴道流血量
            //QT:'',          //阴道其他
            
            //弹出层开关
            ShowAbdominalS:false,
            ShowYSYS:false,
            ShowTFW:false,
        }
        return data
    },
    computed: {
        // MainDataTentativeDiagnoseName() {
        //   return this.MainData.TentativeDiagnoseName;
        // }
      },
    watch: {
   

    },
    methods: {

    
        async loadDictionary(){
            let self=this;
            
            this.baseAjax({         //AbdominalS 腹形 
                url:'Medical/Medical/VuxGetCheckBoxModelTG',
                showLoading:true,
                type:'post',
                data:{TypeCode:'AbdominalS'},
                success:function(data){
                    self.AbdominalSList=  data.map(function(item) {
                        return {
                            key: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({         //TFW 胎方位 
                url:'Medical/Medical/VuxGetCheckBoxModelTG',
                showLoading:true,
                type:'post',
                data:{TypeCode:'TFW'},
                success:function(data){
                    self.TFWList=  data.map(function(item) {
                        return {
                            key: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({         //YSYS 羊水颜色 
                url:'Medical/Medical/VuxGetCheckBoxModelTG',
                showLoading:true,
                type:'post',
                data:{TypeCode:'YSYS'},
                success:function(data){
                    self.YSYSList=  data.map(function(item) {
                        return {
                            key: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({         //Contract 宫缩 
                url:'Medical/Medical/VuxGetCheckBoxModelTG',
                showLoading:true,
                type:'post',
                data:{TypeCode:'Contract'},
                success:function(data){
                    self.ContractList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({         //XLRP 先露入盆 
                url:'Medical/Medical/VuxGetCheckBoxModelTG',
                showLoading:true,
                type:'post',
                data:{TypeCode:'XLRP'},
                success:function(data){
                    self.XLRPList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({         //GKKZ 宫口扩张 
                url:'Medical/Medical/VuxGetCheckBoxModelTG',
                showLoading:true,
                type:'post',
                data:{TypeCode:'GKKZ'},
                success:function(data){
                    self.GKKZList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({         //TMPL 胎膜破裂 
                url:'Medical/Medical/VuxGetCheckBoxModelTG',
                showLoading:true,
                type:'post',
                data:{TypeCode:'TMPL'},
                success:function(data){
                    self.TMPLList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({         //YDLX 阴道流血 
                url:'Medical/Medical/VuxGetCheckBoxModelTG',
                showLoading:true,
                type:'post',
                data:{TypeCode:'YDLX'},
                success:function(data){
                    self.YDLXList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })

        },

        Getinfo() {//初始化赋值方法
            this.TaskCode=this.$store.state.TaskCode
            this.PatientOrder=this.$store.state.TaskCode.PatientOrder
            this.TG=this.$store.state.Physical.TG
            this.Type=this.$store.state.Type
      
        },

        SaveBasicinfo(){
         
            // this.errorContent='';
            // this.errorCount=0;//先清空
            // for (var m in this.$v.MainData.$model) {
            //     if (m in this.$v.MainData) {
            //         console.log('this.$v.MainData[m].required',this.$v.MainData[m].required);
            //         if (!this.$v.MainData[m].required) {
            //         this.errorCount++;
            //         }
            //     }
            // }
            // this.showtoast = true;
           // this.CommitMainDataUtil.SaveMainData('Basicinfo',this.MainData,this.errorContent)
            this.$store.commit('Physical', this.TG) 
           // this.$store.commit('PhysicalError', this.errorCount) 
            this.$router.push({name: 'Grid'})
        
        
        }
    },
    


    directives: {
        TransferDom
    },    
    components: {
        PopupRadio,
        Group,
        GroupTitle,
        Cell,
        XInput,
        Selector,
        PopupPicker,
        XAddress,
        Datetime,
        XNumber,
        XTextarea,
        XSwitch,
        Checker,
        CheckerItem,
        Divider,
        Cell,
        Popup,
        Flexbox,
        FlexboxItem,
        Checklist,
        Search, 
        XButton,
        PopupHeader,
        Radio,
        Sticky,

    },
}