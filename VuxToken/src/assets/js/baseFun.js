
import Vue from 'vue'
import stores from '../../store/store'
import { AjaxPlugin,AlertPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(AjaxPlugin)

// 用于全局的ajax请求

const baseAjax=function(param){

    if(process.env.NODE_ENV === 'production'){
       // param.baseURL='http://192.168.1.108:8094/'  //深圳本机发布
      //  param.baseURL='http://192.168.1.119:8094/'  //深圳本机发布
          param.baseURL='http://183.238.127.218:18081/'  //深圳本机发布
        //param.baseURL='http://183.238.127.218:8089/'  //深圳
       // param.baseURL='http://110.167.224.77:8081/'//西宁
        //param.baseURL='http://localhost:8094/'//西宁
        //param.baseURL='http://60.173.0.128:8089/'//铜陵
        //param.baseURL='http://192.168.23.1:1337/'//铜陵
        
        //param.baseURL='http://172.18.6.9:8081/'//新疆
    }else{

        param.baseURL=param.baseURL || 'api/'  //调试模式时只在login时用到fa/ ，其余均用的api/
    }

    let defaultParam={
        baseURL:param.baseURL,
        data:param.data || {}, //没有值 默认给空
        params:param.params||{},
        url:param.url,
       // type:param.type || 'get',
        type:param.type ,
        timeout: param.timeout || 500000, //调试打断点5000根本不够看
        showLoading:true,
        headers:param.headers||{},
    
    }

    if(param.showLoading){
        stores.commit('UPDATE_LOADING', true)
    }
    
    return AjaxPlugin.$http.request({
        
        baseURL: defaultParam.baseURL,
        method:defaultParam.type,
        url:defaultParam.url,
        data:defaultParam.data,
        params:defaultParam.params,
        timeout:defaultParam.timeout,
        
        headers:defaultParam.headers,

    }).then(function(response) {
        stores.commit('UPDATE_LOADING', false)
        
        param.success(response.data)
    }).catch(function(erro){
        console.log(erro)
        stores.commit('UPDATE_LOADING', false)
        param.error(erro)
            
    })

}

// 用于全局的公共函数
const baseFun={
	   // 本地存储
        localSet(obj,key){
            var newObj = obj;
            var str = JSON.stringify(newObj);
            localStorage.setItem(key,str);
        },
        localGet(key){
            var str = localStorage.getItem(key);
            return JSON.parse(str);
        },
        localGetType(key){
                //适用于单选弹框的data格式要求
                console.log(this.localGet("TGDictionary"),'localGet(key)')
                var str = this.localGet("TGDictionary").filter(v => v["upperid"] == key).map(function(list) {
                    return {
                        name: list.value,
                        value: list.value,
                    }
                });
            
            console.log(str,'str')
            return str;
        },
        localGetDictioninary(key,value){
                //适用于单选弹框的data格式要求
                console.log(this.localGet("MDictioninary"),'localGet(key)')
                if(value=='value'){
                    var str = this.localGet("MDictioninary").filter(v => v["type"] == key).map(function(list) {
                        return {
                            name: list.value,
                            value: list.value,
                        }
                    });
                    }else if(value=='key'){
                    var str = this.localGet("MDictioninary").filter(v => v["type"] == key).map(function(list) {
                        return {
                                name: item.value,
                                key: item.key
                            }
                        });
                }
            console.log(str,'str')
            return str;
        },



        localClear(key){
            localStorage.removeItem(key);
        },
   
        getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        }
}


//导出模块
export default {
	baseFun,
	baseAjax
}


