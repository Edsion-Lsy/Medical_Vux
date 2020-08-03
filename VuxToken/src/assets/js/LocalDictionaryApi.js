import Base from './baseFun'

let LocalDictionaryApi = (ljqFun) => {
    function SetTGDictionary() { //此方法进行修改
        Base.baseAjax({ //Temperatur
            url:'Medical/Medical/VuxGetOptionAll',
            showLoading:true,
            type:'post',
            success:function(data){
                list=  data.map(function(item) {
                    return {
                        name: item.value,
                        value: item.value,
                        group: item.upperid
                    }
                });
                localStorage.setItem('TGDictionary', (JSON.stringify(list))),
                console.log(list,'list')
            }
        })
    
    
    }

    function GetM_PredefinedTreatmentRecord_GroupID (groupid) {
        // 病历保存的是名称，所以
     
        return JSON.parse(localStorage.getItem('TGDictionary') || '{}').filter(v => v[group] == groupid).map(v => {
          return {
            name: item.value,
            value: item.value,
            // value: v.编码
          }
        })
      }
    
}
export default LocalDictionaryApi()