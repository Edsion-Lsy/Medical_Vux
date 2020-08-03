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
  function Diagnosis() {
    return {
      errorCount: 0,
      MainData: {
        TentativeDiagnoseName: "",
        TentativeDiagnoseID: "",
        FirstDiagnoseName: "",
        FirstDiagnoseID: "",
        AuxiliaryDiagnose: "",
        InjuredReason: "",
        DHeight: "",
        TrafficAccident: "",
        IllnessSort: "",
        FirstAideEffect: "",
        IllnessChange: "",
        DeathType: "",
        IsEyewitness: "",
        Eyewitness: "",
        // FillPersonCode: "",//可能没用 填报人 这个是int32类型
        VisitsType: [],
        GiveUpReason: "",
        IllChangeRecord: ""//病情变化记录 新增的
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
      MainData: {
        TJTime: "",
        IsPenetratWound: "",
        DeviatedMouth: "",
        Weakness: "",
        Darley: "",
        // GCS评分 key 与 value
        EyeScore: "",
        VerbalScore: "",
        MotorScore: "",
        EyeContent: "",
        VerbalContent: "",
        MotorContent: ""
      },
      TG: {
        Temperatur: "",
        Pulse: "",
        HeartRate: "",
        Respiratio: "",
        BP1: "",
        BP2: "",
        Mind: "",
        TWOther: "",
        Pupil: "",
        PupilLeft: "",
        PupilRight: "",
        PupilOther: "",
        Refle: "",
        RefleLeft: "",
        RefleRight: "",
        RefleOther: "",
        SkinHum: "",
        SkinEla: "",
        SkinClo: "",
        SkOther: "",
        Head: [],
        Cyanosis: "",
        HeadOther: "",
        Neck: [],
        Tenderness: "",
        NeckOther: "",
        Chest: [],
        MotionD: "",
        RCR: "",
        ChestOther: "",
        Lung: [],
        LungLeft: [],
        LungRight: [],
        LungOther: "",
        Heart: "",
        // HeartRate:"",//心率 新加的
        Cardiovert: "",
        HS: "",
        HeartSound: "",
        HeartOther: "",
        Belly: [],
        BellyOther: "",
        Limbs: [],
        LimbsOther: "",
        Limb: [],
        LimbOther: "",
        Pelvis: "",
        MuscleLU: "",
        MuscleLD: "",
        MuscleRU: "",
        MuscleRD: "",
        MusclOther: "",
        PROMLU: "",
        PROMLD: "",
        PROMRU: "",
        PROMRD: "",
        PROMOther: "",
        Prons: "",
        Babinski: "",
        BabLeft: "",
        BabRight: "",
        NerOther: "",
        Kernig: "",
        Brudzinski: "",
        // IsPenetratWound:"",//是否为贯通伤
        Other: "",
  
  
  
        Thorax: "",//胸廓挤压试验
        // 辅助检查
        // ECGT,//心电图/心电监护
        // GluT,//血糖
        // Spo2,//Spo2
  
  
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
  function AidCheck() {
    return {
      errorCount: 0,
      // MainData: {
      // },
      TG: {
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
      ModelList: [],
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
      Diagnosis: Diagnosis(),
      MedicalHistory: MedicalHistory(),
      Physical: Physical(),
      AidCheck: AidCheck(),
      Treaments: Treaments(),
      CPR: CPR()
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
        TROrder: 0,//主键相关
        ProjectID: "",
        MeasureContent: "",//默认=Prefixes
        DoTime: "",
        Place: [],
        JZResults: "",
        SBReson: [],
        Results: "",
        ResponsClassify: "",
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
      }
    }
  }
  
  
  
  // export const Patient
  // 这里不能这么写
  // export {...Patient}
  // const { main, taskmsg, Diagnosis, MedicalHistory, Physical, Treaments } = Patient()
  export { main, taskmsg, Diagnosis, MedicalHistory, Physical, AidCheck, Treaments, CPR
    , TreamentItemModel, GoodModel }
  // export const { main, taskmsg, Diagnosis, MedicalHistory, Physical, Treaments, ObjFromObj } = { ...Patient, ObjFromObj }
  
  export default Patient;
  
  
  