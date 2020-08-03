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
        // MainData: {
        //     IsPTBook: { required },
        //     IsHandover: { required },
        // }
    },
    data () {
        let data={
            //...Diagnosis(),
            ...Physical(),//
 
            FKWYList:[],
            FKYDList:[],
            FKFJList:[],
          
            //弹出层开关
            FKWY:false,
            FKYD:false,
            FKFJ:false,
           
        
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

            this.baseAjax({         //FKWY 妇科外阴 
                url:'Medical/Medical/VuxGetCheckBoxModelTG',
                showLoading:true,
                type:'post',
                data:{TypeCode:'FKWY'},
                success:function(data){
                    self.FKWYList=  data.map(function(item) {
                        return {
                            key: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({         //FKYD 妇科阴道
                url:'Medical/Medical/VuxGetCheckBoxModelTG',
                showLoading:true,
                type:'post',
                data:{TypeCode:'FKYD'},
                success:function(data){
                    self.FKYDList=  data.map(function(item) {
                        return {
                            key: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({         //FKFJ 妇科附件
                url:'Medical/Medical/VuxGetCheckBoxModelTG',
                showLoading:true,
                type:'post',
                data:{TypeCode:'FKFJ'},
                success:function(data){
                    self.FKFJList=  data.map(function(item) {
                        return {
                            key: item.value,
                            value: item.value
                        }
                    });
                }
            })
                

           
        },
        clear(a){
                console.log(' this.MainData[a]', this.MainData[a])
                this.MainData[a]='';
                this.a = false
            
        },
        Getinfo() {//初始化赋值方法
            this.TaskCode=this.$store.state.TaskCode
            this.PatientOrder=this.$store.state.TaskCode.PatientOrder
            this.TG=this.$store.state.Physical.TG
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
            //this.CommitMainDataUtil.SaveMainData('Physical',this.TG,this.errorContent)
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