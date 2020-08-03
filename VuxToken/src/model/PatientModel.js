// 为了每次使用得到一个干净的Model还是使用函数吧 使用函数可以得到干净的值
function main() {
    return {
      MainData: {
        PatientType: "",
      }
    }
  }
  function taskmsg() {
    return {
      errorCount: 0,
      checkBox: {
        Name: { chk: true, v: "" },
        Sex: { chk: true, v: "" },
        Age: { chk: true, v: "" },
        AgeType: { chk: true, v: "" },
        Nationality: { chk: true, v: "" },
        Nation: { chk: true, v: "" },
        TaskType: { chk: true, v: "" },
        Contact: { chk: true, v: "" },
        LocalAddType: { chk: true, v: -1 },
        LocalAdd: { chk: true, v: "" },
        SendAddType: { chk: true, v: -1 },
        SendAdd: { chk: true, v: "" },
        DrivingTime: { chk: true, v: "" },
        ArrivedTime: { chk: true, v: "" },
        ArrivedPatientTime: { chk: true, v: "" },
        LeaveTime: { chk: true, v: "" },
        DeliveredTime: { chk: true, v: "" },
        TaskCompleteTime: { chk: true, v: "" },
        FirstCallTime: { chk: true, v: "" },
        TaskCode: { chk: true, v: "" },
        LinkPhone: { chk: true, v: "" },
        Station: { chk: true, v: "" },
        Driver: { chk: true, v: "" },
        Doctor: { chk: true, v: "" },
        Nurse: { chk: true, v: "" },
        //暂时不用
        // FirstAider: { chk: true, v: "" },
        StretcherBearersI: { chk: true, v: "" },
      },
      //任务结果 是否正常结束
      Chuche: "",
      MainData: {
        ThreeNonePatient: false,
        Vocation: "",
        SendDepartment: "急诊科",
        AccidentType: ""
      },
    }
  }
  
  function Error(){
    return{
      BasicinfoError:0,
      PhysicalError:0,
      AidCheckError:0,
      DiagnosisError:0,
      CPRCheckrror:0,
      HandoverError:0,
      
    }
  }
  function Basicinfo(){
    return{
      BasicinfoError:0,
      PhysicalError:0,
      AidCheckError:0,
      DiagnosisError:0,
      CPRCheckrror:0,
      HandoverError:0,
        errorCount:0,
        MainData:{
            IsSubmit:[], //是否是提交病历
            PadType:'',
            PatientType:[],//病历类型
            Type:"",
            TaskCode: '',
            PatientOrder: '',
            ThreeNonePatient: [],
            SendDepartment: [],  //送达科室
            AccidentType: "",
            LocalAddType:[],//现场类型
            Vocation:[],//职业
            Symptom:[],//症状关键词
            Provider:[],//病史提供人
            Name: '',
            Sex: [],
            Age: '',
            AgeType: [],
            Nationality: [],
            Nation: [],
            TaskType: [],
            Contact: '',
            LocalAdd: '',
            SendAdd: '',
            SendAddOnly:[],
            IDCard:'',
            FirstCallTime:'',//呼救时间
            DrivingTime: '',
            ArrivedTime: '',
            ArrivedPatientTime: '',
            LeaveTime: '',
            DeliveredTime: '',
            TaskCompleteTime: '',
            Kilometres: '',
            LinkPerson: '',
            LinkPhone: '',
            Station: [],
            Driver: '',
            Doctor: '',
            Nurse: '',
            Complaints: "",
            HistoryOfPresentIllness: "",
            PastHistoryChoose: [],
            PastHistoryOther: "",
            AllergicHistoryChoose: [],
            AllergicHistoryOther: "",
            StretcherBearersI:'',//担架员

            //广州新增字段
            IsHaveBeenTel:[],//是否经过120 --tellog 普通ACD呼入  有接听时刻的
            PolicePhone:'',//报警电话
            SaveOneself:[],//自救
            PoliceNo:'',//警号

            //体查部分存入基础信息中
            DeviatedMouth:[],  //口角歪斜
            Weakness:[],       //上肢无力
            Darley:[],         // 言语异常
            EyeScore:0,   //睁眼反应
            HiddenEyeScore:[],
            VerbalScore:0,    //语言反应
            HiddenVerbalScore:[],
            MotorScore:0,        //肢体运动
            HiddenMotorScore:[],
            
          //诊断信息
            Causes:[],    //病因
            IsPenetratWound:[],//是否贯通伤
            DHeight: [],    //跌落高度
            TrafficAccident: [],  //交通事故
           

            TentativeDiagnoseName: "",
            TentativeDiagnoseID: "",
            FirstDiagnoseName: "",
            FirstDiagnoseID: "",
            AuxiliaryDiagnose: "", //补充诊断
            InjuredReason: "",
           
            IllnessSort: [],
            FirstAideEffect: [],
            IllnessChange: [],
            DeathType: [],
            IsEyewitness: [],
            Eyewitness: [],
            FillPersonCode: "",//可能没用 填报人 这个是int32类型此处通过编辑方法直接获取且不必修改
            LastModifyPerson:"",//此处用填写人的id
            VisitsType: [],
            GiveUpReason: [],
            IllChangeRecord: "",  //病情变化记录 新增的
            
          //心肺复苏登记
          
          CRP:[], //心肺复苏登记按钮
          CRPContent:[],    //复苏内容
          CRPEffect:[],     //复苏效果
          CPRStartTime: "",   //心肺复苏开始时间
          CPREndTime: "",     //终止复苏时间



          //告知书和交接单
          IsPTBook:[],   //告知书
          IsHandover:[],   //交接单

          // 急性创伤评分
          InjuredPart:[],   //受伤部位
          DamagTypes:[],    //损伤类型
          Circulation:[],   //循环
          Breathings:[],    //呼吸
          Consciousness:[],  //意识
          TIScore: "",      //创伤指数得分
          //新生儿评分
            ApgarScore :0, //新生儿评分 
            SkinColor :[], //皮肤颜色
            HeartRate :[], //心搏速率
            Breathing :[], //呼吸
            MuscleTensionAndExercise :[], //肌张力及运动
            Reflex:[], //反射

          //院内反馈
          Hospitalization:[], //收住院
          HospitalCare:[], //院内救治情况
          HospitalDepartments:'', //收住科室
          HospitalDiagnosis:'', //收住诊断
          LapseTo:[], //入院转归
          HospitalMeasures:'', //院内主要救治措施
          //心电图诊断第一诊断ID
          FirstECGDiagID:'', //心电图诊断第一诊断ID
          //MEWS评分
          MEWS:'',
        }

    }

  }
  function WSJC() {
    return {
      errorCount: 0,
      MainData: {
        List:[],
        Name:"",
        TaskCode:"",
        Order:"",
        WSType:[],
        JBSQ:"",
        
       
      },
    }
  }
  function MedicalHistory() {
    return {
      errorCount: 0,
      MainData: {
        Provider: [],
        Symptom: [],
        Complaints: "",
        HistoryOfPresentIllness: "",
        PastHistoryChoose: [],
        PastHistoryOther: "",
        AllergicHistoryChoose: [],
        AllergicHistoryOther: ""
      },
      // 干脆数据部分都叫 data
    }
  }
  function Physical() {
    return {
      errorCount: 0,
      // MainData: {
      //   TJTime: "",
      //   IsPenetratWound: "",
      //   DeviatedMouth: "",
      //   Weakness: "",
      //   Darley: "",
      //   // GCS评分 key 与 value
      //   EyeScore: "",
      //   VerbalScore: "",
      //   MotorScore: "",
      //   EyeContent: "",
      //   VerbalContent: "",
      //   MotorContent: ""
      // },
      TG: {


       
       // IsPenetratWound: "",
       
        // GCS评分 key 与 value
        // EyeScore: "",
        // VerbalScore: "",
        // MotorScore: "",
        // EyeContent: "",
        // VerbalContent: "",
        // MotorContent: "",
        FZOther: "", //辅助检查其他

        JGDB: [], //肌钙蛋白
        HeartRate: "",
       
        Temperatur: [],
        Pulse: [],
        Respiratio: [],
        BP1: [],
        BP2: [],
        AVPU:[],


        TemperatuZ: [],
        PulseZ: [],
        RespiratiZ: [],
        BP1Z: [],
        BP2Z: [],
        AVPUZ: [],

        TemperatuJ: [],
        PulseJ: [],
        RespiratiJ: [],
        BP1J: [],
        BP2J: [],
        AVPUJ: [],

        Growth: [], //发育
        GrowthQT: "",

        Lymph:[],//淋巴
        LymphType:[],//淋巴结症状
        LymphQT:"",//淋巴结其他
     

        Auricle: [],//耳廓
        Earopen: [],//外耳道
        EarRT: [],//乳突
        Hearing: [],//听力
        EaropenQT:'',//耳部其他


        Nose: [],//鼻部
        NoseQT: '',//鼻部其他

        OralCavity: [],//口腔
        OralCQT: '',//口腔其他


        Throat: [],//喉
        ThroatQT: '',//喉部其他

        Kidneys: [],//双肾
        KidneyQT: '',//双肾



        Mind: [],
        Postural:[],
        TWOther: "",
        Pupil: [],
        PupilLeft: [],
        PupilRight: [],
        PupilOther: "",
        Refle: [],
        RefleLeft: [],
        RefleRight: [],
        RefleOther: "",
        SkinHum: [],
        SkinEla: [],
        SkinClo: [],
        SkOther: "",
        Head: [],
        Cyanosis: [],
        HeadOther: "",
        Neck: [],
        Tenderness: [], //颈椎压痛
        NeckOther: "",
        Chest: [],       //胸部
        MotionD: [],   //运动度
        RCR: [],        //呼吸节律
        ChestOther: "",
        Lung: [],
        LungLeft: [],
        LungRight: [],
        LungOther: "",
        Heart: [],        //心脏
        HeartRate:"",     //心率 
        Cardiovert: [],   //心律
        HS: [],           //心音
        HeartSound: [],   //杂音
        HeartOther: "",
        Belly: [],         //腹部
        Symptom: [],       //腹部症状
        Position: [],      //腹部症状
        BellyOther: "",
        Limbs: [],
        LimbsOther: "",
        Limb: [],
        LimbOther: "",
        Pelvis: [],
        Muscle:[],     //原本没有 是后台没存吗?
        MuscleLU: [],
        MuscleLD: [],
        MuscleRU: [],
        MuscleRD: [],
        MusclOther: "",
        PROM:[],
        PROMLU: [],
        PROMLD: [],
        PROMRU: [],
        PROMRD: [],
        PROMOther: "",
        Prons: [],    //神经系统病理反射
        Babinski: [],
        BabLeft:  [],
        BabRight: [],
        NerOther: "",


        Kernig: [],
        Brudzinski: [],
       
        // IsPenetratWound:"",//是否为贯通伤
        Other: "",
        Thorax: [],//胸廓挤压试验
        // 辅助检查
        ECGT: "",//心电图/心电监护
        GluT: "",//血糖
        Spo2: "",//Spo2
        // ECGT,//心电图/心电监护
        // GluT,//血糖
        // Spo2,//Spo2
        //妇科检查
        FKWY:'',//妇科外阴
        FKYD:'',//妇科阴道
        FKFJ:'',//妇科附件
        //产科检查
        AbdominalS:"",  //腹形
        Contract:[],    //宫缩
        TFW :[],        //胎方位
        TXY:'',         //胎心音次数
        XLRP :[],       //先露入盆
        GKKZ :[],       //宫口扩张
        GKCD:'',        //宫口扩张cm
        TMPL :[],       //胎膜破裂
        YSYS :[],       //羊水颜色
        YDLX:[],        //阴道流血
        YDLXLYDLX:'',   //阴道流血量
        QT:'',          //阴道其他
  //以下部分应存入MainData中
       
      }
    }
  }
  function AidCheck() {
    return {
      errorCount: 0,
      // MainData: {
      // },
      MainData: {
        // Thorax,//胸廓挤压试验
        // 辅助检查
        ECGT: "",//心电图/心电监护
        GluT: "",//血糖
        Spo2: "",//Spo2
      

  
  
        // DeviatedMouth:"",
        // Weakness:"",
        // Darley:"",
        // EyeScore:"",
        // HiddenEyeScore:"",
        // VerbalScore:"",
        // HiddenVerbalScore:"",
        // MotorScore:"",
        // HiddenMotorScore:"",
      }
    }
  }
  function Treaments() {
    return {
      errorCount: 0,
      MainData:{

        TreamentsList: [],

      //   TreamentsList:{
      //     PatientRecordID: "",
      //   //暂时用不到但是拼接对象数组需要有的列
      //   IsDoctorAdvice: "",
      //   Valuation: "",
      //   Units: "",
      //   Number: "",
      //   BreathingPattern: "",
      //   TidalVolume: "",
      //   BreathingRate: "",
      //   PEEP: "",
      //   RespiratoryRatio: "",
      //   Other: "",
      //   //救治记录明细目前使用到的值
      //   TROrder: 0,//主键相关
      //   ProjectID: "",
      //   MeasureContent: "",//默认=Prefixes
      //   DoTime: "",
      //   Place:[],
      //   JZResults:[],
      //   SBReson:[],
      //   Results: "",
      //   ResponsClassify:[],
      //   DoOrder: 1,//顺序号
      // }
      },
      
    }
  }
  function CPR() {
    return {
      errorCount: 0,
      MainData: {
        CRP: false,
        CRPContent: [],
        CRPEffect: [],
      }
    }
  }
  let Patient = () => {
    return {
      main: main(),
      taskmsg: taskmsg(),
      WSJC: WSJC(),
      MedicalHistory: MedicalHistory(),
      Physical: Physical(),
      AidCheck: AidCheck(),
      Treaments: Treaments(),
      CPR: CPR(),
      Basicinfo:Basicinfo()
    }
  }
  let TreamentItemModel = () => {
    return {
      //来自字典的 相关数据
      fromFromDic: {
        Prefixes: "",
      },
      //与数据库表内同名的数据
      form: {
        PatientRecordID: "",
        //暂时用不到但是拼接对象数组需要有的列
        IsDoctorAdvice: "",
        Valuation: "",
        Units: "",
        Number: "",
        BreathingPattern: "",
        TidalVolume: "",
        BreathingRate: "",
        PEEP: "",
        RespiratoryRatio: "",
        Other: "",
        //救治记录明细目前使用到的值
        TROrder: 0,//主键相关
        ProjectID: "",
        MeasureContent: "",//默认=Prefixes
        DoTime: "",
        Place:[],
        JZResults:[],
        SBReson:[],
        Results: "",
        ResponsClassify:[],
        DoOrder: 1,//顺序号
        // 数据库表其余字段要么暂时没有使用 要么 保存时关联M_PredefinedTreatmentRecord等字典得到
      },
      // //与数据库保存相关的字段
      // OtherForm:{
      // },
      // 这里隐含一个 放 GoodModel Ls
      Detail: []
    }
  }
  
  
  
  
  
  let GoodModel = () => {
    return {
      //来自字典的 相关数据
      fromFromDic: {
        MinSpec: "",//剂量单位 或 单位
        MinNum: 1,//最小剂量 比如250ml
        UseNumNum: 1,//使用剂量 默认=Num*MinNum
      },
      //与数据库表内同名的数据
      form: {
        Num: 1,//数量
        Price: 0.0,
        // UseStyle,这个好像没有用
        GoodsName: "",
        // Loss,这个好像没有用
        Spec: "",
        LossVal: 0.0,
        UseNum: "1"//这个=UseNumNum+MinSpec
      },
      //与数据库保存相关的字段
      OtherForm: {
        ID: 0,
        // M_DrugUseRecord M_ConsumableRecord
        TableName: "",
        ResID: "",
        CategoryID:"",//用于判断该药品耗材所在的库是否应在改变数量是触发事件自动更改
      }
    }
  }
  
  
  

  export { main, taskmsg, WSJC, MedicalHistory, Physical, AidCheck, Treaments, CPR
    , TreamentItemModel, GoodModel,Basicinfo,Error }

  export default Patient;
  
  
  