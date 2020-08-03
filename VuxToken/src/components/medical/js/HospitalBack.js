import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
    XNumber, XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
    Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
    FlexboxItem,PopupHeader,Radio,Sticky  } from 'vux'
   
import {Basicinfo} from "@/model/Patient.js";
import { required } from "vuelidate/lib/validators";
import TransferUtil from '@/assets/js/transferUtil.js';
export default {

    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
    if (to.path === '/medical/Grid') {
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
                vm.Getinfo();
            if(from.path==='/medical/Grid'){
                vm.Getinfo();
            }
        });
        },

    validations: {
        MainData: {
            IsPTBook: { required },
            IsHandover: { required },
        }
    },
    data () {
        let data={
            //...Diagnosis(),
            ...Basicinfo(),//

            HospitalCareList:[],
            HospitalizationList:[],
            LapseToList:[],
          
            //弹出层开关
        
            showPopupHospitalCare:false,
        
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
            this.baseAjax({   //HospitalCare 院内救治情况 
                url:'Medical/Medical/VuxGetManagerDictioninary',
                showLoading:true,
                type:'post',
                data:{TypeCode:'HospitalCare'},
                success:function(data){
                    self.HospitalCareList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({ //Hospitalization 收住院
                url:'Medical/Medical/VuxGetSendAddr',
                showLoading:true,
                type:'post',
                success:function(data){
                    self.HospitalizationList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                    }
                })
                this.baseAjax({   //LapseTo 入院转归 
                    url:'Medical/Medical/VuxGetManagerDictioninary',
                    showLoading:true,
                    type:'post',
                    data:{TypeCode:'LapseTo'},
                    success:function(data){
                        self.LapseToList=  data.map(function(item) {
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
            this.MainData=this.$store.state.Basicinfo.MainData
            this.Type=this.$store.state.Basicinfo.Type
      
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
            //this.CommitMainDataUtil.SaveMainData('Basicinfo',this.MainData,this.errorContent)
            this.$store.commit('Basicinfo', this.MainData) 
            //this.$store.commit('BasicinfoError', this.errorCount) 
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