import Patient, {
    ObjFromObj,
    TreamentItemModel,
    GoodModel
  } from "@/model/Patient.js";
  import stores from '../../store/store'
const SaveMainDataUtil = {
    /**
    * 创建配置 yml configMap 操作
    */
    getContent: Patient(),
    SaveMainData(Name,MainData,errorCount){
        //this.getContent[Name].errorCount=errorCount;
       // console.log(this.getContent[Name].errorCount,'this.getContent[a].errorCount')
        // for(var prop1 in MainData){    
        // //此处将页面填写的值传回,赋值时需将未填的项目排除
        // if(MainData[prop1]!==null && MainData[prop1]!=="" && MainData[prop1]!==undefined){
        //     //console.log(MainData[prop1],'MainData[prop1]')
        //     this.getContent[Name].MainData[prop1]=MainData[prop1]
        // }
        // }   
        stores.commit(Name,  MainData,errorCount)      
      //  stores.commit(Name, MainData) 
      console.log(MainData,errorCount,'MainData,errorCount')
        console.log(this.getContent[Name],'在提交工具方法中')
    },

    SaveTG(Name,MainData,errorCount){
        this.getContent[Name].errorCount=errorCount;
        console.log(this.getContent[Name].errorCount,'this.getContent[a].errorCount')
        for(var prop1 in MainData){    
        //此处将页面填写的值传回,赋值时需将未填的项目排除
        if(MainData[prop1]!==null && MainData[prop1]!=="" && MainData[prop1]!==undefined){
            //console.log(MainData[prop1],'MainData[prop1]')
            this.getContent[Name].TG[prop1]=MainData[prop1]
        }
        }   
        stores.commit(Name, this.getContent[Name].errorCount)      
        stores.commit(Name, this.getContent[Name].TG) 
    },
}


export default {SaveMainDataUtil}