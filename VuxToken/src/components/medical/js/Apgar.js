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
            ApgarScore:'',//显示用分数说明
            SkinColorList:[],   //受伤部位
            HeartRateList:[],   //损伤类型
            BreathingList:[], //呼吸
            MuscleTensionAndExerciseList:[],   //循环
             socre:0,
             socre1:0,
             socre2:0,
             socre3:0,
             socre4:0,
             socre5:0,
            ReflexList:[], //意识
            //弹出层开关
        
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
            this.baseAjax({   //SkinColorList 皮肤颜色 
                url:'Medical/Medical/VuxGetXSE',showLoading:true,type:'post', 
                data:{TypeID:1}, success:function(data){
                    self.SkinColorList=  data.map(function(item) {
                    return { name: item.value, value: item.value,socre:item.key}
                    });
                }
            })
           
            this.baseAjax({   //SkinColorList 心搏速率 
                url:'Medical/Medical/VuxGetXSE',showLoading:true,type:'post', 
                data:{TypeID:2}, success:function(data){
                    self.HeartRateList=  data.map(function(item) {
                    return { name: item.value, value: item.value,socre:item.key}
                    });
                }
            })  
            this.baseAjax({   //Breathing 呼吸 
                url:'Medical/Medical/VuxGetXSE',showLoading:true,type:'post', 
                data:{TypeID:3}, success:function(data){
                    self.BreathingList=  data.map(function(item) {
                    return { name: item.value, value: item.value,socre:item.key}
                    });
                }
            })  
            this.baseAjax({   // 肌张力及运动 
                url:'Medical/Medical/VuxGetXSE',showLoading:true,type:'post', 
                data:{TypeID:4}, success:function(data){
                    self.MuscleTensionAndExerciseList=  data.map(function(item) {
                    return { name: item.value, value: item.value,socre:item.key}
                    });
                }
            })
            this.baseAjax({   //Reflex 反射 
                url:'Medical/Medical/VuxGetXSE',showLoading:true,type:'post', 
                data:{TypeID:5}, success:function(data){
                    self.ReflexList=  data.map(function(item) {
                    return { name: item.value, value: item.value,socre:item.key}
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
           let self =this;
            console.log('this.MainData.SkinColor',this.MainData.SkinColor)
            this.baseAjax({   
                url:'Medical/Medical/VuxGetXSEScore',showLoading:true,type:'post', 
                data:{Name:this.MainData.SkinColor.toString()}, success:function(data){
                    console.log('data',data)
                    self.socre1=parseInt(data)
                    self.sum()
                }
            })
            this.baseAjax({   
                url:'Medical/Medical/VuxGetXSEScore',showLoading:true,type:'post', 
                data:{Name:this.MainData.HeartRate.toString()}, success:function(data){
                    self.socre2=parseInt(data)
                    self.sum()
                }
            })
            this.baseAjax({   
                url:'Medical/Medical/VuxGetXSEScore',showLoading:true,type:'post', 
                data:{Name:this.MainData.Breathing.toString()}, success:function(data){
                    self.socre3=parseInt(data)
                    self.sum()
                }
            })
            this.baseAjax({   
                url:'Medical/Medical/VuxGetXSEScore',showLoading:true,type:'post', 
                data:{Name:this.MainData.MuscleTensionAndExercise.toString()}, success:function(data){
                    self.socre4=parseInt(data)
                    self.sum()
                }
            })
            this.baseAjax({  
                url:'Medical/Medical/VuxGetXSEScore',showLoading:true,type:'post', 
                data:{Name:this.MainData.Reflex.toString()}, success:function(data){
                    self.socre5=parseInt(data)
                    self.sum()
                }
            })

        },
        sum(){
            this.socre=this.socre1+this.socre2+this.socre3+this.socre4+this.socre5
            this.MainData.ApgarScore=this.socre
            if(this.socre<4 ){
                this.ApgarScore=this.socre.toString() +' 分,考虑患有重度窒息!'
            }
            else if(this.socre>=4 &&this.socre<7 ){
                        this.ApgarScore=this.socre.toString() +'分,考虑患有轻度窒息!'
            }else if(this.socre>=7 && this.socre<=10){
                        this.ApgarScore=this.socre.toString()  +'分,正常新生儿!'
            }
             //客户端需要解释说明故增加汉字描述
           
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