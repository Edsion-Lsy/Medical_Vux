import Patient, {
    main, taskmsg, WSJC, MedicalHistory, Physical, AidCheck, Treaments, CPR
    , TreamentItemModel, GoodModel,Basicinfo,Error
  } from "./PatientModel.js";
  
  
  // obj1
  function ObjFromObj(obj1, obj2, key) {
    // console.log("ObjFromObj")
    // if (key in obj2) {
    if (Array.isArray(obj1[key])) {
      obj1[key] = getArrayValue(obj2[key]);
    } else {
      obj1[key] = obj2[key];
    }
    // }
  }
  
  function getArrayValue(oldV) {
    if (oldV == null || oldV == "") {
      return [];
    }
    // if (!oldV) {
    //   return [];
    // }
    var ar = oldV.split(',')
    if (oldV.endsWith(',')) ar.pop();
    return ar;
  }
  export {
    main, taskmsg, WSJC, MedicalHistory, Physical, AidCheck, Treaments, CPR
    , TreamentItemModel, GoodModel,Basicinfo,Error
    , ObjFromObj, getArrayValue
  }
  export default Patient;
  
  
  