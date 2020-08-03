import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
    XNumber, XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
    Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
    FlexboxItem,PopupHeader,Radio,Sticky  } from 'vux'
   
import {Basicinfo} from "@/model/Patient.js";
import { required } from "vuelidate/lib/validators";

export default {
    beforeRouteEnter(to, from, next) {
        //路由进入后
            next(vm => {
                vm.Getinfo();
            if(from.path==='/medical/Grid'){
                vm.Getinfo();
            }
        });
    },
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
    

    validations: {
        MainData: {
            TentativeDiagnoseName: { required },
        
        }
    },
    data () {
        let data={
            //...Diagnosis(),
            ...Basicinfo(),//
            InjuredPartList:[],   //受伤部位
            DamagTypesList:[],   //损伤类型
            CirculationList:[],   //循环
            BreathingsList:[],    //呼吸
            ConsciousnessList:[], //意识
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
            this.baseAjax({   //InjuredPartList 受伤部位 
                url:'Medical/Medical/VuxGetManagerDictioninary',showLoading:true,type:'post', 
                data:{TypeCode:'InjuredPart'}, success:function(data){
                    self.InjuredPartList=  data.map(function(item) {
                    return { name: item.value, value: item.value}
                    });
                }
            })
            this.baseAjax({   //DamagTypesList 损伤类型 
                url:'Medical/Medical/VuxGetManagerDictioninary',showLoading:true,type:'post', 
                data:{TypeCode:'DamagTypes'}, success:function(data){
                    self.DamagTypesList=  data.map(function(item) {
                    return { name: item.value, value: item.value}
                    });
                }
            })
            this.baseAjax({   //CirculationList 循环 
                url:'Medical/Medical/VuxGetManagerDictioninary',showLoading:true,type:'post', 
                data:{TypeCode:'Circulation'}, success:function(data){
                    self.CirculationList=  data.map(function(item) {
                    return { name: item.value, value: item.value}
                    });
                }
            })
            this.baseAjax({   //BreathingsList 呼吸 
                url:'Medical/Medical/VuxGetManagerDictioninary',showLoading:true,type:'post', 
                data:{TypeCode:'Breathings'}, success:function(data){
                    self.BreathingsList=  data.map(function(item) {
                    return { name: item.value, value: item.value}
                    });
                }
            })
            this.baseAjax({   //ConsciousnessList 意识 
                url:'Medical/Medical/VuxGetManagerDictioninary',showLoading:true,type:'post', 
                data:{TypeCode:'Consciousness'}, success:function(data){
                    self.ConsciousnessList=  data.map(function(item) {
                    return { name: item.value, value: item.value}
                    });
                }
            })
        },
        containsNumber(str) {
            //判断是否包含数字的工具
            var reg=/\d/;
            return reg.test(str);
        },
        SumTIScore(){
            console.log('this.InjuredPart',this.MainData.InjuredPart.join(''))

            console.log('containsNumber',this.containsNumber(this.MainData.InjuredPart))

            console.log('containsNumber',this.containsNumber(this.MainData.InjuredPart)?this.MainData.InjuredPart.join('').replace(/[^0-9]/ig,""):0)

            var InjuredPart= this.containsNumber(this.MainData.InjuredPart)?this.MainData.InjuredPart.join('').replace(/[^0-9]/ig,""):'0';
            var DamagTypes=this.containsNumber(this.MainData.DamagTypes)?this.MainData.DamagTypes.join('').replace(/[^0-9]/ig,""):'0' ;
            var Circulation=this.containsNumber(this.MainData.Circulation)?this.MainData.Circulation.join('').replace(/[^0-9]/ig,""):'0' ;
            var Breathings=this.containsNumber(this.MainData.Breathings)?this.MainData.Breathings.join('').replace(/[^0-9]/ig,""):'0' ;
            var Consciousness=this.containsNumber(this.MainData.Consciousness)?this.MainData.Consciousness.join('').replace(/[^0-9]/ig,""):'0' ;

            console.log('InjuredPart+DamagTypes+Circulation+Breathings+Consciousness',InjuredPart,DamagTypes,parseInt(Circulation.substring(0,1)),Breathings,Consciousness)

        //数据库中只存数字
           // this.MainData.TIScore=parseInt(InjuredPart)+parseInt(DamagTypes)+parseInt(Circulation)+parseInt(Breathings)+parseInt(Consciousness);
            this.MainData.TIScore=parseInt(InjuredPart.substring(0,1))+parseInt(DamagTypes.substring(0,1))+parseInt(Circulation.substring(0,1))+parseInt(Breathings.substring(0,1))+parseInt(Consciousness.substring(0,1));

            if(this.MainData.TIScore>=1 &&this.MainData.TIScore<=9 ){
                this.TIScoreContent='分,轻伤!'
            }else if(this.MainData.TIScore>=10 &&this.MainData.TIScore<=16){
                this.TIScoreContent='分,中度伤!'
            }else if(this.MainData.TIScore>=17){
                this.TIScoreContent='分,重伤!!'
            }
            //客户端需要解释说明故增加汉字描述
            this.TIScore=this.MainData.TIScore.toString()
            +this.TIScoreContent;


        },
            SaveBasicinfo(){
                  // InjuredPart  受伤部位
            // DamagTypes   损伤类型
            // Circulation  循环
            // Breathings   呼吸
            // Consciousness 意识

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
            console.log('创伤评分提交this.MainData',this.MainData)
            //this.CommitMainDataUtil.SaveMainData('Basicinfo',this.MainData,this.errorContent)
            this.$store.commit('Basicinfo', this.MainData) 
            //this.$store.commit('BasicinfoError', this.errorCount) 
            this.$router.push({name: 'Grid'})

            },
            Getinfo() {//初始化赋值方法
                this.TaskCode=this.$store.state.TaskCode
                this.PatientOrder=this.$store.state.TaskCode.PatientOrder
                this.MainData=this.$store.state.Basicinfo.MainData
                this.Type=this.$store.state.Basicinfo.Type
           
            },

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