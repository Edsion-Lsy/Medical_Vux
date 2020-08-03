import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
    XNumber, XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
    Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
    FlexboxItem, Tab, TabItem,PopupHeader,Grid,GridItem,  } from 'vux'
   
import {Physical,Basicinfo} from "@/model/Patient.js";
import { required } from "vuelidate/lib/validators";
import Validations from "@/model/Validations.js";
import dsBridge from "dsbridge";
export default {
    beforeRouteEnter(to, from, next) {

        next(vm => {
            vm.Getinfo();
            vm.MEWSScore();         //自动计算MEWS值，第一次只取说明值
            vm.PopupDefaultCorrect(); //弹框是否默认阴性
      });
      },


    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
    if (to.path === '/medical/Grid') {
        console.log('将填写页面缓存关闭'+from.meta.keepAlive)
        from.meta.keepAlive = false;  //当返回九宫格后不再缓存
        
    } 
    next(vm => {
        vm.GetError()
            if (to.path === '/medical/Grid' ||to.path === '/medical/Grid/') {
                vm.GetError()
                //vm.SaveTGinfo()
            } 
                
        }
        )
    },
    created(){
        //加载字典数据
        console.log('created函数被调用')
        this.loadDictionary();
    },
    mounted() {
        //用于弹出软键盘后焦点保持居中
        window.addEventListener('resize', this.scrollIntoView)

        this.$store.commit('UPDATE_PAGE_TITLE', '体格检查')  
        window.addEventListener("scroll", this.handleScroll, true);  //监听页面滚动

 
        window.onresize = () => {
            document.activeElement.scrollIntoView(true);
        
        };
  

    },
    computed: {
        // MainDataTentativeDiagnoseName() {
        //   return this.MainData.TentativeDiagnoseName;
        // }
        TGGrowth  () {
           return this.TG.Growth;
        },
        TGProns(){

            return this.TG.Prons; 
        }

      
    },
    watch: {
        // GridSwitch(val){
        //     if(val==='Close'){

        //         this.HeaderTitle='体格检查'                
        //     }
        //     console.log(val,'GridSwitch')
        // },
        FoldSwitch(val){
            //每次关闭或打开折叠九宫格时，自动计算一次MEWS
            if(this.$store.state.AddPatientPage=='AddPatientRecordQH'){
                this.MEWSScore();     
            }
         
        },  

        TGProns(val){
            if(val=='阳性'){
                this.PronsSwitch=true
            }else{
                this.PronsSwitch=false
                
                this.TG.Babinski =[]
                this.TG.BabLeft  =[]
                this.TG.BabRight =[]
            }
            
         
        },
       
        TGGrowth(val){
            console.log(val,'TGGrowth')
           
        },
    },
    
    // validations: {   
        
    //     // TG:{
    //     //     Pupil: { required },
    //     //     Neck: { required },
    //     //     Chest: { required },
    //     //    // Heart: { required },
    //     //     Temperatur: { required },
    //     //     Pulse: { required },
    //     //     Respiratio: { required },
    //     //     BP1: { required },
    //     //     BP2: { required },
    //     //     //AVPU: { required },
    //     // }

    // },
    data () {
        let data={
            NegativeModel: {//需要默认阴性的查体部位 暂未使用但是是正常可用的
                Pupil: '',
                Neck: '',
                Chest: '',
                Heart: '',
            
        
            },
            MEWSContent:'',
            HeaderTitle:'体格检查',
            isCollapse: true,
            appleNumber:'', //锚点相关
            ...Physical(),
            ...Basicinfo(),
            errorCount:0,

            
            TList:[],
            PList:[],
            RespiratioList:[],
            BP1List:[],
            BP2List:[],

            GrowthList:[],  
            NutritionList:[],  
            LymphList:[],
            LymphTypeList:[],
            AuricleList:[],
            EaropenList:[],//外耳道
            EarRTList:[],//乳突
            HearingList:[],//听力
            NoseList:[],//鼻部
            OralCavityList:[],//口腔
            ThroatList:[],//喉
            KidneysList:[],//鼻部



            PupilList:[],
            MindList:[],
            RefleList:[],
            RefleLeftList:[],
            RefleRightList:[],
            SkinHumList: [],
            SkinElaList: [],
            SkinCloList: [],
            HeadList:[],
            CyanosisList:[],
            NeckList:[],
            TendernessList:[],
            ChestList:[],
            RCRList:[],
            ThoraxList:[],
            LungList:[],
            LungLeftList:[],
            LungRightList:[],
            HeartList:[],
            CardiovertList:[],
            HSList:[],
            HeartSoundList:[],
            BellyList:[],
            
            ListDeviatedMouth:[{name:"阴性",value:"阴性"},{name:"阳性",value:"阳性"}],
            ListWeakness:[{name:"阴性",value:"阴性"},{name:"阳性",value:"阳性"}],
            ListDarley:[{name:"阴性",value:"阴性"},{name:"阳性",value:"阳性"}],
            EyeScoreList:[],
            VerbalScoreList:[],
            MotorScoreList:[],
            List2:[],


            GridSwitch:true,  //宫格显示开关
            FoldSwitch:'close',

            ButtonOpen:false,//查体各部位默认阴性按钮
            //多选弹出层开
        
            //上车前
            showT:false,
            showRespiratio:false,
            showPulse:false,
            showBP1:false,
            showBP2:false,
            //转运途中
            showTZ:false,
            showRespiratioZ:false,
            showPulseZ:false,
            showBP1Z:false,
            showBP2Z:false,
            //交接点
            showTJ:false,
            showRespiratioJ:false,
            showPulseJ:false,
            showBP1J:false,
            showBP2J:false,

            showPopupGrowth:false,//发育
            showPopupLymphType:false,//淋巴结症状
            showPopupLymph:false,//淋巴结部位
            showPopupEaropen:false,//外耳道
            showPopupNose:false,//鼻部
            showPopupThroat:false,//喉
            showPopupKidneys:false,//双肾
            showPopupOralCavity:false,//口腔


            showPopupPupil:false,
            showPopupHead:false,
            showPopupNeck:false,
            showPopupChest:false,
            showPopupBelly:false,//腹部
            showPopupPosition:false,//部位
            showPopupSymptom:false,//部位
            showPopupLung:false,
            showPopupLungLeft:false,
            showPopupLungRight:false,
            showPopupLimbs:false,
            showPopupLimb:false,
            //折叠开关
            ShowJCJC:false, //基础检查上车前
            ShowJCJCZ:false, //基础检查转运途中
            ShowJCJCJ:false, //基础检查交接点
          
            ShowFY:false,  //发育
            ShowLBJ:false,  //淋巴结
            ShowEB:false,   //耳部
            ShowB:false,    //鼻
            ShowH:false,    //喉
            ShowKQ:false,  //口腔

            ShowSZ:false,  //神志
            ShowTW:false,
            ShowYB:false,
            ShowTB:false,
            ShowPFSD:false,
            ShowJB:false,
            ShowXB:false,
            ShowFZ:false,
            ShowXZ:false,
            ShowFB:false,
            ShowJZ:false,
            ShowSZ:false,
            ShowJL:false,
            ShowJZL:false,
            ShowSJXT:false,
            ShowXXNT:false,
            ShowGLSG:false,

            PronsSwitch:false, //神经病理反射阳性时可以填巴氏征
        }
        return data
    },
    validations() {
        return Validations(this.$store.state.AddPatientPage)
    },

 
    methods: {

        lsyonchange(data){

            console.log(data,'子组件返回值')
            this.TG.Growth=data
            
        },
        disabled(itema,Title1,callback){
            //用于多选子组件调用的选项互斥方法
            console.log('itema',itema,'Title1',Title1)
            console.log(this.TG.Growth,'this.TG.Growth')
            console.log('判断是否置灰',(this.TG.Growth.join('').indexOf('异常')!=-1 &&itema.value!='异常') 
            || (this.TG.Growth.join('').indexOf('正常')!=-1 &&itema.value=='正常'))

            console.log('this.TG.Growth现在值为什么',this.TG.Growth.join(''))
            
            console.log('this.TG.Growth是否是异常',this.TG.Growth.join('').indexOf('异常')!=-1)
            let disabledkey=false;
            if(Title1==='发育封装'){
                if ((this.TG.Growth.join('').indexOf('异常')!=-1 &&itema.value!='异常') 
                    || (this.TG.Growth.join('').indexOf('正常')!=-1 &&itema.value=='正常')
                )//!=-1则包含
                {
                    //||(this.TG.Growth.join('').indexOf('无效')==-1 && this.MainData.CRPEffect.join('')!='' && itema.value=='无效' )
                    //选了其他选项则禁用拒查
                    disabledkey=true
                    //return true //不可选
                }else{
                    disabledkey=false
                    //return false //可选
                }
                

            }
            //console.log(disabledkey,'disabledkey')
            callback(disabledkey) // 执行作为参数的函数，注意：callback(true)写法，eslint会报错，true或 false 要赋值给变量res
            
        },
        //是否需要将各查体部位默认无异常
        PopupDefaultCorrect(){
            if(this.$store.state.AddPatientPage=='AddPatientRecordGuangZ'){
                for (var m in this.NegativeModel) {
                    if (m in this.TG) {
                        console.log('this.TG[m]',this.TG[m])
                        if (this.TG[m].toString()==='') {
                            this.ButtonOpen=true;
                            console.log(m,'这个没有默认体征，加阴性')
                            break
                        }
                    }
                }

            }
        },


        //设置各查体为无异常阴性状态
        DefaultCorrect(){
            if(this.$store.state.AddPatientPage=='AddPatientRecordGuangZ'){
                this.TG.Growth=['无异常'];
                this.TG.Pupil=['等大、等圆'];
                this.TG.Neck=['软，无压痛，活动自如'];
                this.TG.Chest=['对称，无畸形，无压痛'];
                //this.TG.Heart=[无异常];
                
            }
            this.ButtonOpen=false
            
        },



        // 键盘弹出，页面重绘，将获得焦点的元素滚动至可视区域内
        scrollIntoView (time = 0) {
            // ios自带调整，所以不管
            if (/iphone/i.test(navigator.userAgent)) {
            // return
            }
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            setTimeout(() => {
                document.activeElement.scrollIntoViewIfNeeded(true)
            }, time)
            }
        },

        async loadDictionary(){
            let self=this;

            
            if(process.env.NODE_ENV === 'production' ?true:false){
                this.EyeScoreList= JSON.parse(dsBridge.call("dictionaryApi.queryDictionaryByType", "Glasgow-1")).map(v => {
                    return {
                            name: v.Name,
                            // value: v.Name
                            value: v.Score
                    }
                    })
                this.VerbalScoreList= JSON.parse(dsBridge.call("dictionaryApi.queryDictionaryByType", "Glasgow-2")).map(v => {
                    return {
                        name: v.Name,
                      // value: v.Name
                        value: v.Score
                    }
                })
                this.MotorScoreList= JSON.parse(dsBridge.call("dictionaryApi.queryDictionaryByType", "Glasgow-3")).map(v => {
                    return {
                        name: v.Name,
                      // value: v.Name
                        value: v.Score
                    }
                })
            
            }else{
            

                
            this.baseAjax({  //EyeScore   //睁眼反应 
                url:'Medical/Medical/VuxGetGlasgow',showLoading:true,type:'post',
                data:{ID:'1'},success:function(data){
                    self.EyeScoreList=  data.map(function(item) { return {name: item.Name, value: item.ID.toString()   }});
                }
            })
            this.baseAjax({  //VerbalScore   //语言反应 
                url:'Medical/Medical/VuxGetGlasgow',showLoading:true,type:'post',
                data:{ID:'2'},success:function(data){
                    self.VerbalScoreList=  data.map(function(item) { return {name: item.Name, value: item.ID.toString()   }});
                }
            })
            this.baseAjax({  //MotorScore   //肢体运动 
                url:'Medical/Medical/VuxGetGlasgow',showLoading:true,type:'post',
                data:{ID:'3'},success:function(data){
                    self.MotorScoreList=  data.map(function(item) { return {name: item.Name, value: item.ID.toString()   }});
                console.log(' self.MotorScoreList', self.MotorScoreList)
                
                }
            })


            }
            
       


            /* SkOther: "",
            Head: [],
            Cyanosis: "",
            HeadOther: "",
            Neck: [],
            Tenderness: "", */
            
        },

        forbid(){
            //禁止软键盘弹出
            document.activeElement.blur();
         },
        Getinfo() {
            console.log('初始化赋值方法')
            this.TaskCode=this.$store.state.TaskCode
            this.PatientOrder=this.$store.state.TaskCode.PatientOrder
            this.MainData=this.$store.state.Basicinfo.MainData
            this.TG=this.$store.state.Physical.TG
            this.Type=this.$store.state.Basicinfo.Type
        },
        SaveTGinfo(){

            console.log('进入保存方法 传值入宫格')  
            let show=this;
            //this.CommitMainDataUtil.SaveMainData('Physical',this.TG,this.errorContent)
            this.$store.commit('Physical', this.TG) 
            this.$store.commit('Basicinfo', this.MainData) 
            this.GetError()
            this.$router.push({name: 'Grid'})
        },

        GetError(){
            console.log("进入判断未填方法")
                this.errorCount=0;//先清空
                
                for (var m in this.$v.TG.$model) {
                   
                if (m in this.$v.TG) {
                    if (!this.$v.TG[m].required) {
                    this.errorCount++;
                    console.log("未填",m,this.errorCount)
                    }
                }
                }
                this.$store.commit('PhysicalError', this.errorCount) 
              
        },
        // handleScroll(el) {
        //     //锚点高亮效果
        //     let _pos = document.getElementById("apply3").getBoundingClientRect().top+50;
        //     console.log('top',_pos);
        //     if (-88 < _pos) {
        //     this.appleNumber = 1;
        //     }
        //     if (_pos < -150) {
        //     this.appleNumber = 2;
        //     }
        //     if (_pos < -300) {
        //     this.appleNumber = 3;
        //     }
        //     if (_pos < -460) {
        //     this.appleNumber = 4;
        //     }
        //     if (_pos < -780) {
        //     this.appleNumber = 5;
        //     }
        // },
        jump(index){
            document.getElementById("apply"+index).scrollIntoView();
        },

         //计算MEWS评分 
        MEWSScore() {
                
                var HeartRate =  this.TG.HeartRate
                var Temperatur = this.TG.Temperatur
                //var HeartRate = $('#TG-Pulse').combobox('getText'); //P 脉搏
                var Respiratio =  this.TG.Respiratio
                var BP1Val = this.TG.BP1; //BP1（收缩压）
                var Spo2 = this.TG.Spo2; //Spo2 脉氧
                var AVPU = this.TG.AVPU; //AVPU 意识

                if (Temperatur == "测不出") {
                    Temperatur = 0;
                } else {
                    Temperatur = parseFloat(Temperatur);
                }
                if (HeartRate == "测不出") {
                    HeartRate = 0;
                } else {
                    HeartRate = parseFloat(HeartRate);
                }
                if (Respiratio == "测不出") {
                    Respiratio = 0;
                } else {
                    Respiratio = parseFloat(Respiratio);
                }
                if (BP1Val == "测不出") {
                    BP1Val = 0;
                } else {
                    BP1Val = parseFloat(BP1Val);
                }
                if (Spo2 == "测不出") {
                    Spo2 = 0;
                } else {
                    Spo2 = parseFloat(Spo2);
                }
                var TScore = 0;
                var HScore = 0;
                var RScore = 0;
                var BPScore = 0;
                var Spo2Score = 0;
                var AVPUScore = 0;
                var SumScore = 0;
                //收缩压
                if ((BP1Val >= 101 && BP1Val <=199)) {
                    BPScore = 0;
                }
                if ((BP1Val >= 81 && BP1Val <=100)) {
                    BPScore = 1;
                }
                if (BP1Val >= 200 || (BP1Val >= 71 && BP1Val <= 80)) {
                    BPScore = 2;
                }
                if (BP1Val <=70) {
                    BPScore = 3;
                }
                //心率
                if ((HeartRate >= 51 && HeartRate <= 100)) {
                    HScore = 0;
                }
                if ((HeartRate >= 41 && HeartRate <= 50) || (HeartRate >= 101 && HeartRate <= 110)) {
                    HScore = 1;
                }
                if (HeartRate <= 40 || (HeartRate >= 111 && HeartRate <= 129)) {
                    HScore = 2;
                }
                if (HeartRate >= 130 ) {
                    HScore = 3;
                }
                //呼吸
                if ((Respiratio >= 9 && Respiratio <= 14)) {
                    RScore = 0;
                }
                if (Respiratio >= 15 && Respiratio <= 20) {
                    RScore = 1;
                }
                if (Respiratio <9 || (Respiratio >= 21 && Respiratio <= 29)) {
                    RScore = 2;
                }
                if (Respiratio >= 30) {
                    RScore = 3;
                }
                //体温
                if (Temperatur >= 35 || Temperatur<= 38.4) {
                    TScore = 0;
                }
                if (Temperatur < 35 || Temperatur >= 38.5) {
                    TScore = 2;
                }
                //意识状态
                if (AVPU.toString() == "A : 反应灵敏") {
                    AVPUScore = 0;
                }
                if (AVPU.toString() == "V : 对语言刺激有反应") {
                    AVPUScore = 1;
                }
                if (AVPU.toString() == "P : 对疼痛刺激有反应") {
                    AVPUScore = 2;
                }
                if (AVPU.toString() == "U : 对疼痛刺激无反应") {
                    AVPUScore = 3;
                }
                //氧饱和度
                if ((Spo2 >= 96 && Spo2 <= 100)) {
                    Spo2Score = 0;
                }
                if (Spo2 >= 91 && Spo2 <= 95) {
                    Spo2Score = 1;
                }
                if (Spo2 >= 81 && Spo2 <= 90) {
                    Spo2Score = 2;
                }
                if (Spo2 <= 80) {
                    Spo2Score = 3;
                }
                // if(type=='enter'){
                //     if(this.MainData.MEWSScore=='' ||  this.MainData.MEWSScore==null ){
                //         this.MainData.MEWSScore=0
                //     }else{
                //         SumScore = this.MainData.MEWSScore;
                //     }
                    
                //     if (SumScore == 0) {
                    
                
                //     this.MEWSContent='A（4级）：0 分 继续观察!'
                    
                //     }
                //     if (SumScore >= 1 && SumScore<=4) {
                     
                //         this.MEWSContent='B（4级）：1～ 4 分 提高监测频率!'
                    
                //     }
                //     if (TScore >= 2 || HScore >= 2 || RScore >= 2 || BPScore >= 2 || Spo2Score >= 2 || AVPUScore >= 2) {
                    
                //         this.MEWSContent='C（3级）：任何一个单变量达到 2 分严密监测单变量指标!'
                        
                //     }
                //     if (SumScore >= 4 && SumScore <= 6) {
                    
                //         this.MEWSContent='D（2级）：4～ 6分 协助医生采取相关急救措施!'
                    
                //     }
                //     if (SumScore >= 6 ) {
                    
                //         this.MEWSContent='E (1级）：≥6 分 紧急处置!'
                    
                //     }
                // }else{
                    SumScore = TScore + HScore + RScore + BPScore + Spo2Score + AVPUScore;
                    console.log(SumScore,'SumScore')
                    if (SumScore == 0) {
                        this.MainData.MEWS=SumScore.toString()
                    
                    this.MEWSContent='A（4级）：0 分 继续观察!'
                      
                    }
                    if (SumScore >= 1 && SumScore<=4) {
                        this.MainData.MEWS=SumScore.toString()
                        this.MEWSContent='B（4级）：1～ 4 分 提高监测频率!'
                     
                    }
                    if (TScore >= 2 || HScore >= 2 || RScore >= 2 || BPScore >= 2 || Spo2Score >= 2 || AVPUScore >= 2) {
                        this.MainData.MEWS=SumScore.toString()
                        this.MEWSContent='C（3级）：任何一个单变量达到 2 分严密监测单变量指标!'
                        
                    }
                    if (SumScore >= 4 && SumScore <= 6) {
                        this.MainData.MEWS=SumScore.toString()
                        this.MEWSContent='D（2级）：4～ 6分 协助医生采取相关急救措施!'
                        
                    }
                    if (SumScore >= 6 ) {
                        this.MainData.MEWS=SumScore.toString()
                        this.MEWSContent='E (1级）：≥6 分 紧急处置!'
                     
                    }
                
              
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
        Tab, 
        TabItem,
        PopupHeader,
        Grid,
        GridItem,
    },
}