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
        next(vm => {
                if (to.path === '/medical/Grid') {
                    vm.GetError()
                }  
            }
            )
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
            IsPTBookList:[],
            IsHandoverList:[],
            //弹出层开关
            ShowTentativeDiagnose:false,
            showPopupVisitsType:false,
            TentativeDiagnoseNameserach:'',//用于模糊搜索
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
            // this.baseAjax({   //IsHandover 交接单 
            //     url:'Medical/Medical/VuxGetManagerDictioninary',
            //     showLoading:true,
            //     type:'post',
            //     data:{TypeCode:'IsHandover'},
            //     success:function(data){
            //         self.IsHandoverList=  data.map(function(item) {
            //             return {
            //                 name: item.value,
            //                 value: item.value
            //             }
            //         });
            //     }
            // })

            // this.baseAjax({   //IsPTBook 告知书 
            //     url:'Medical/Medical/VuxGetManagerDictioninary',
            //     showLoading:true,
            //     type:'post',
            //     data:{TypeCode:'IsPTBook'},
            //     success:function(data){
            //         self.IsPTBookList=  data.map(function(item) {
            //             return {
            //                 name: item.value,
            //                 value: item.value
            //             }
            //         });
            //     }
            // })
        },

        Getinfo() {//初始化赋值方法
            this.TaskCode=this.$store.state.TaskCode
            this.PatientOrder=this.$store.state.TaskCode.PatientOrder
            this.MainData=this.$store.state.Basicinfo.MainData
            this.Type=this.$store.state.Basicinfo.Type
      
        },

        SaveBasicinfo(){
            this.GetError();
            this.showtoast = true;
            this.$store.commit('Basicinfo', this.MainData) 
            this.$router.push({name: 'Grid'})
        },
        GetError(){
            this.errorContent='';
            this.errorCount=0;//先清空
            for (var m in this.$v.MainData.$model) {
                if (m in this.$v.MainData) {
                    console.log('this.$v.MainData[m].required',this.$v.MainData[m].required);
                    if (!this.$v.MainData[m].required) {
                    this.errorCount++;
                    }
                }
            }
            this.$store.commit('HandoverError', this.errorCount) 
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