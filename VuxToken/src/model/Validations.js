import { required,minLength, maxLength,numeric } from "vuelidate/lib/validators";
import stores from '../store/store';



    let Validations = (page,a,b,c,d) => {
        
        if(stores.state.AddPatientPage=='AddPatientRecordWLMQ'){
            console.log(stores.state.Basicinfo.MainData.IllnessSort.toString().indexOf('死亡')!=-1 ,'stores.state.Basicinfo.MainData.IllnessSort.toString().indexOf(死亡)!=-1 ')
            if(stores.state.Basicinfo.MainData.IllnessSort.toString().indexOf('死亡')==-1 ){
                return { 
                    MainData: {
                        PatientType: { required },
                        Provider: { required },  //病史提供人
                        Name:{required},
                        //Age:{numeric},
                        AgeType: { required },
                        Nationality: { required },   //国籍
                        Nation: { required },         //民族
                        TaskType: { required },
                        Kilometres: {  },
                        Symptom: { required },        //症状关键词
                        Complaints: { required },     //主诉
                        HistoryOfPresentIllness: { required },    //现病史
                        PastHistoryChoose: { required },          //既往史
                        AllergicHistoryChoose: { required },      //药敏史
                        SendAddOnly: { required },
                        ThreeNonePatient:{required},
                        DrivingTime:{required},
                        ArrivedTime:{required},
                    },
                    BasicinfoError: {
                        PatientType: { required },
                        Provider: { required },  //病史提供人
                        Name:{required},
                        //Age:{numeric},
                        AgeType: { required },
                        Nationality: { required },   //国籍
                        Nation: { required },         //民族
                        TaskType: { required },
                        Kilometres: {  },
                        Symptom: { required },        //症状关键词
                        Complaints: { required },     //主诉
                        HistoryOfPresentIllness: { required },    //现病史
                        PastHistoryChoose: { required },          //既往史
                        AllergicHistoryChoose: { required },      //药敏史
                        SendAddOnly: { required },
                        ThreeNonePatient:{required},
                        DrivingTime:{required},
                        ArrivedTime:{required},
                    },
                    DiagnosisError: {
                        TentativeDiagnoseName: { required },
                        Causes: { required },//病因
                        IllnessSort: { required }, //病情分级
                        FirstAideEffect: { required }, //急救效果
                        // FillPersonCode: { required },//可能没用 填报人 这个是int32类型
                        VisitsType: { required }, //出诊结果
                        //TentativeDiagnoseID: { required },
                        //FirstDiagnoseName: { required },
                        //FirstDiagnoseID: { required },
                        // AuxiliaryDiagnose: { required }, //补充诊断
                        // InjuredReason: { required },
                        // DHeight: { required },
                        // TrafficAccident: { required },
                        // IllnessChange: { required }, 
                      // DeathType: { required },
                      // IsEyewitness: { required },
                        //Eyewitness: { required },
                      // GiveUpReason: { required },
                      // IllChangeRecord: { required }//病情变化记录 新增的
                        
                    },
                    PhysicalError:{
                        Pupil: { required },
                        Neck: { required },
                        Chest: { required },
                       // Heart: { required }, //目前心脏只有一个拒查选项故先不做校验
                        Temperatur: { required },
                        Pulse: { required },
                        Respiratio: { required },
                        BP1: { required },
                        BP2: { required },
                        //AVPU: { required },
                    },

                }
               
            }else{
                return{
                    MainData: {
                        PatientType: { required },
                        Provider: { required },  //病史提供人
                        Name:{required},
                        //Age:{numeric},
                        AgeType: { required },
                        Nationality: { required },   //国籍
                        Nation: { required },         //民族
                        TaskType: { required },
                        Kilometres: {  },
                        Symptom: { required },        //症状关键词
                        Complaints: { required },     //主诉
                        HistoryOfPresentIllness: { required },    //现病史
                        PastHistoryChoose: { required },          //既往史
                        AllergicHistoryChoose: { required },      //药敏史
                        SendAddOnly: { required },
                        ThreeNonePatient:{required},
                        DrivingTime:{required},
                        ArrivedTime:{required},
                    },
                    BasicinfoError: {
                        PatientType: { required },
                        Provider: { required },  //病史提供人
                        Name:{required},
                        //Age:{numeric},
                        AgeType: { required },
                        Nationality: { required },   //国籍
                        Nation: { required },         //民族
                        TaskType: { required },
                        Kilometres: {  },
                        Symptom: { required },        //症状关键词
                        Complaints: { required },     //主诉
                        HistoryOfPresentIllness: { required },    //现病史
                        PastHistoryChoose: { required },          //既往史
                        AllergicHistoryChoose: { required },      //药敏史
                        SendAddOnly: { required },
                        ThreeNonePatient:{required},
                        DrivingTime:{required},
                        ArrivedTime:{required},
                    },
                    DiagnosisError: {
                        TentativeDiagnoseName: { required },
                        Causes: { required },//病因
                        IllnessSort: { required }, //病情分级
                        FirstAideEffect: { required }, //急救效果
                        // FillPersonCode: { required },//可能没用 填报人 这个是int32类型
                        VisitsType: { required }, //出诊结果
                        //TentativeDiagnoseID: { required },
                        //FirstDiagnoseName: { required },
                        //FirstDiagnoseID: { required },
                        // AuxiliaryDiagnose: { required }, //补充诊断
                        // InjuredReason: { required },
                        // DHeight: { required },
                        // TrafficAccident: { required },
                        // IllnessChange: { required }, 
                      // DeathType: { required },
                      // IsEyewitness: { required },
                        //Eyewitness: { required },
                      // GiveUpReason: { required },
                      // IllChangeRecord: { required }//病情变化记录 新增的
                        
                    },
                    PhysicalError:{
                        Pupil: {  },
                        Neck: {  },
                        Chest: {  },
                       // Heart: {  }, //目前心脏只有一个拒查选项故先不做校验
                        Temperatur: {  },
                        Pulse: {  },
                        Respiratio: {  },
                        BP1: {  },
                        BP2: {  },
                        //AVPU: {  },
                    },
                 
                }
            }
       

        }else if(page=='AddPatientRecordWLMQ'){
            return{
                MainData: {
                    PatientType: { required },
                    Provider: { required },  //病史提供人
                    Name:{required},
                    //Age:{numeric},
                    AgeType: { required },
                    Nationality: { required },   //国籍
                    Nation: { required },         //民族
                    TaskType: { required },
                    Kilometres: {  },
                    Symptom: { required },        //症状关键词
                    Complaints: { required },     //主诉
                    HistoryOfPresentIllness: { required },    //现病史
                    PastHistoryChoose: { required },          //既往史
                    AllergicHistoryChoose: { required },      //药敏史
                    SendAddOnly: { required },
                    ThreeNonePatient:{required},
                    DrivingTime:{required},
                    ArrivedTime:{required},
                },
                BasicinfoError: {
                    PatientType: { required },
                    Provider: { required },  //病史提供人
                    Name:{required},
                    //Age:{numeric},
                    AgeType: { required },
                    Nationality: { required },   //国籍
                    Nation: { required },         //民族
                    TaskType: { required },
                    Kilometres: {  },
                    Symptom: { required },        //症状关键词
                    Complaints: { required },     //主诉
                    HistoryOfPresentIllness: { required },    //现病史
                    PastHistoryChoose: { required },          //既往史
                    AllergicHistoryChoose: { required },      //药敏史
                    SendAddOnly: { required },
                    ThreeNonePatient:{required},
                    DrivingTime:{required},
                    ArrivedTime:{required},
                },
                DiagnosisError: {
                    TentativeDiagnoseName: { required },
                    Causes: { required },//病因
                    IllnessSort: { required }, //病情分级
                    FirstAideEffect: { required }, //急救效果
                    // FillPersonCode: { required },//可能没用 填报人 这个是int32类型
                    VisitsType: { required }, //出诊结果
                    //TentativeDiagnoseID: { required },
                    //FirstDiagnoseName: { required },
                    //FirstDiagnoseID: { required },
                    // AuxiliaryDiagnose: { required }, //补充诊断
                    // InjuredReason: { required },
                    // DHeight: { required },
                    // TrafficAccident: { required },
                    // IllnessChange: { required }, 
                  // DeathType: { required },
                  // IsEyewitness: { required },
                    //Eyewitness: { required },
                  // GiveUpReason: { required },
                  // IllChangeRecord: { required }//病情变化记录 新增的
                    
                },
              PhysicalError:{
                    Pupil: { required },
                    Neck: { required },
                    Chest: { required },
                   // Heart: { required }, //目前心脏只有一个拒查选项故先不做校验
                    Temperatur: { required },
                    Pulse: { required },
                    Respiratio: { required },
                    BP1: { required },
                    BP2: { required },
                    //AVPU: { required },
              },
            }
        }else if(page=='AddPatientRecordTL'){
            return{
                MainData: {
                    PatientType: { required },
                    Provider: { required },  //病史提供人
                    Name:{required},
                    //Age:{numeric},
                    AgeType: { required },
                    Nationality: { required },   //国籍
                    Nation: { required },         //民族
                    TaskType: { required },
                    Kilometres: {  },
                    Symptom: { required },        //症状关键词
                    Complaints: { required },     //主诉
                    HistoryOfPresentIllness: { required },    //现病史
                    PastHistoryChoose: { required },          //既往史
                    AllergicHistoryChoose: { required },      //药敏史
                    SendAddOnly: { required },
                    ThreeNonePatient:{required},
                    DrivingTime:{required},
                    ArrivedTime:{required},
                },
                BasicinfoError: {
                    PatientType: { required },
                    Provider: { required },  //病史提供人
                    Name:{required},
                    //Age:{numeric},
                    AgeType: { required },
                    Nationality: { required },   //国籍
                    Nation: { required },         //民族
                    TaskType: { required },
                    Kilometres: {  },
                    Symptom: { required },        //症状关键词
                    Complaints: { required },     //主诉
                    HistoryOfPresentIllness: { required },    //现病史
                    PastHistoryChoose: { required },          //既往史
                    AllergicHistoryChoose: { required },      //药敏史
                    SendAddOnly: { required },
                    ThreeNonePatient:{required},
                    DrivingTime:{required},
                    ArrivedTime:{required},
                },
                DiagnosisError: {
                    TentativeDiagnoseName: { required },
                    Causes: { required },//病因
                    IllnessSort: { required }, //病情分级
                    FirstAideEffect: { required }, //急救效果
                    // FillPersonCode: { required },//可能没用 填报人 这个是int32类型
                    VisitsType: { required }, //出诊结果
                    //TentativeDiagnoseID: { required },
                    //FirstDiagnoseName: { required },
                    //FirstDiagnoseID: { required },
                    // AuxiliaryDiagnose: { required }, //补充诊断
                    // InjuredReason: { required },
                    // DHeight: { required },
                    // TrafficAccident: { required },
                    // IllnessChange: { required }, 
                  // DeathType: { required },
                  // IsEyewitness: { required },
                    //Eyewitness: { required },
                  // GiveUpReason: { required },
                  // IllChangeRecord: { required }//病情变化记录 新增的
                    
                },
              PhysicalError:{
                    Pupil: { required },
                    Neck: { required },
                    Chest: { required },
                   // Heart: { required }, //目前心脏只有一个拒查选项故先不做校验
                    Temperatur: { required },
                    Pulse: { required },
                    Respiratio: { required },
                    BP1: { required },
                    BP2: { required },
                    //AVPU: { required },
              },
            }
        }else if(page=='AddPatientRecordSZ'){
            return{
                MainData: {
                    PatientType: { required },
                    Provider: { required },  //病史提供人
                    Name:{required},
                    //Age:{numeric},
                    AgeType: { required },
                    Nationality: { required },   //国籍
                    Nation: { required },         //民族
                    TaskType: { required },
                    Kilometres: {  },
                    Symptom: { required },        //症状关键词
                    Complaints: { required },     //主诉
                    HistoryOfPresentIllness: { required },    //现病史
                    PastHistoryChoose: { required },          //既往史
                    AllergicHistoryChoose: { required },      //药敏史
                    SendAddOnly: { required },
                    ThreeNonePatient:{required},
                    DrivingTime:{required},
                    ArrivedTime:{required},
                },
                BasicinfoError: {
                    PatientType: { required },
                    Provider: { required },  //病史提供人
                    Name:{required},
                    //Age:{numeric},
                    AgeType: { required },
                    Nationality: { required },   //国籍
                    Nation: { required },         //民族
                    TaskType: { required },
                    Kilometres: {  },
                    Symptom: { required },        //症状关键词
                    Complaints: { required },     //主诉
                    HistoryOfPresentIllness: { required },    //现病史
                    PastHistoryChoose: { required },          //既往史
                    AllergicHistoryChoose: { required },      //药敏史
                    SendAddOnly: { required },
                    ThreeNonePatient:{required},
                    DrivingTime:{required},
                    ArrivedTime:{required},
                },
                DiagnosisError: {
                    TentativeDiagnoseName: { required },
                    Causes: { required },//病因
                    IllnessSort: { required }, //病情分级
                    FirstAideEffect: { required }, //急救效果
                    // FillPersonCode: { required },//可能没用 填报人 这个是int32类型
                    VisitsType: { required }, //出诊结果
                    //TentativeDiagnoseID: { required },
                    //FirstDiagnoseName: { required },
                    //FirstDiagnoseID: { required },
                    // AuxiliaryDiagnose: { required }, //补充诊断
                    // InjuredReason: { required },
                    // DHeight: { required },
                    // TrafficAccident: { required },
                    // IllnessChange: { required }, 
                  // DeathType: { required },
                  // IsEyewitness: { required },
                    //Eyewitness: { required },
                  // GiveUpReason: { required },
                  // IllChangeRecord: { required }//病情变化记录 新增的
                    
                },
              PhysicalError:{
                    Pupil: { required },
                    Neck: { required },
                    Chest: { required },
                   // Heart: { required }, //目前心脏只有一个拒查选项故先不做校验
                  //  Temperatur: { required },
                    Pulse: { required },
                    Respiratio: { required },
                    BP1: { required },
                    BP2: { required },
                    AVPU: { required },
              },
              TG:{
                  Pupil: { required },
                  Neck: { required },
                  Chest: { required },
                // Heart: { required },
                 // Temperatur: { required },
                  Pulse: { required },
                  Respiratio: { required },
                  BP1: { required },
                  BP2: { required },
                  AVPU: { required },
              },
            }
        }else if(page=='AddPatientRecordQH'){
          return{
              MainData: {
                  PatientType: { required },
                  Provider: { required },  //病史提供人
                  Name:{required},
                  //Age:{numeric},
                  AgeType: { required },
                  Nationality: { required },   //国籍
                  Nation: { required },         //民族
                  TaskType: { required },
                  Kilometres: {  },
                  Symptom: { required },        //症状关键词
                  Complaints: { required },     //主诉
                  HistoryOfPresentIllness: { required },    //现病史
                  PastHistoryChoose: { required },          //既往史
                  AllergicHistoryChoose: { required },      //药敏史
                  SendAddOnly: { required },
                  ThreeNonePatient:{required},
                  DrivingTime:{required},
                  ArrivedTime:{required},
              },
              BasicinfoError: {
                  PatientType: { required },
                  Provider: { required },  //病史提供人
                  Name:{required},
                  //Age:{numeric},
                  AgeType: { required },
                  Nationality: { required },   //国籍
                  Nation: { required },         //民族
                  TaskType: { required },
                  Kilometres: {  },
                  Symptom: { required },        //症状关键词
                  Complaints: { required },     //主诉
                  HistoryOfPresentIllness: { required },    //现病史
                  PastHistoryChoose: { required },          //既往史
                  AllergicHistoryChoose: { required },      //药敏史
                  SendAddOnly: { required },
                  ThreeNonePatient:{required},
                  DrivingTime:{required},
                  ArrivedTime:{required},
              },
              DiagnosisError: {
                  TentativeDiagnoseName: { required },
                  Causes: { required },//病因
                  IllnessSort: { required }, //病情分级
                  FirstAideEffect: { required }, //急救效果
                  // FillPersonCode: { required },//可能没用 填报人 这个是int32类型
                  VisitsType: { required }, //出诊结果
                  //TentativeDiagnoseID: { required },
                  //FirstDiagnoseName: { required },
                  //FirstDiagnoseID: { required },
                  // AuxiliaryDiagnose: { required }, //补充诊断
                  // InjuredReason: { required },
                  // DHeight: { required },
                  // TrafficAccident: { required },
                  // IllnessChange: { required }, 
                // DeathType: { required },
                // IsEyewitness: { required },
                  //Eyewitness: { required },
                // GiveUpReason: { required },
                // IllChangeRecord: { required }//病情变化记录 新增的
                  
              },
            PhysicalError:{
                  Pupil: { required },
                  Neck: { required },
                  Chest: { required },
                 // Heart: { required }, //目前心脏只有一个拒查选项故先不做校验
                  Temperatur: { required },
                  Pulse: { required },
                  Respiratio: { required },
                  BP1: { required },
                  BP2: { required },
                  //AVPU: { required },
            },
          }
      }
      
        
        
        else{
            return{
                MainData: {}
            }
        }
  
  }
  
  
  

//   export { main, taskmsg, WSJC, MedicalHistory, Physical, AidCheck, Treaments, CPR
//     , TreamentItemModel, GoodModel,Basicinfo,Error }

  export default Validations;
  
  
  