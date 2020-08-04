// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'

import router from './router'


import axios from 'axios'
import VueAxios from 'vue-axios'
import { AlertPlugin, ToastPlugin } from 'vux'
import { Tabbar,TabbarItem,Group,Cell,XHeader} from 'vux'
import stores from './store/store'                //---------自定义的全局变量
import Base from './assets/js/baseFun.js'         //---------自定义的公共函数和公共请求方法
import './assets/css/base.css'                    //---------引入的全局公共css
import dsBridge from "dsbridge";     //获取原生接口
import CommitMainDataUtil from './assets/js/CommitMainDataUtil.js' 




import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuelidate from 'vuelidate';
import  './components/index.js';    //将二次封装的组件的字典注册
//import Navigation from 'vue-navigation'  //用于多页面回退返回  应该不用
// import ErrorPlugin from './assets/js/errorPlugin'  //全局异常处理插件
import Qs from 'qs'
// Vue.use(ErrorPlugin)
Vue.use(Vuelidate)

Vue.use(ElementUI);
Vue.component("Tabbar",Tabbar)
Vue.component("TabbarItem",TabbarItem)
Vue.component("Group",Group)
Vue.component("Cell",Cell)
Vue.component("XHeader",XHeader)

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(VueRouter)
Vue.use(VueAxios,axios);


//Vue.use(Navigation, {router})

/* const routes = [{
  path: '/',
  component: Home
}]

const router = new VueRouter({
  routes
}) */

FastClick.attach(document.body)
Vue.config.devtools = true
Vue.config.productionTip = false
//axios.defaults.baseURL = 'http://localhost:8021/'//https://api.douban.com/v2/movie 改成/api才能用proxyTable跨域

axios.defaults.withCredentials = true;//前端Vue，设置axios允许跨域带cookie(默认不带cookie)
Vue.prototype.$axios = axios;




//注册全局函数和全局常量
Vue.prototype.baseFun=Base.baseFun;  //-----注册到vue的全局，方便各个组件和页面js调用公共函数
Vue.prototype.baseAjax=Base.baseAjax;//-----将封装的ajax请求函数注册到vue的全局 

Vue.prototype.CommitMainDataUtil=CommitMainDataUtil.SaveMainDataUtil;//-----将封装的工具类注册到vue的全局 



  router.beforeEach((to, from, next) => {
    　　//console.log(store.state.token)
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    　　const route = ['Basicinfo', 'Physical', 'AidCheck', 'Diagnosis', 'Treaments'];
    //stores.commit('ErrorMsg', `请求出错(${error.response.status})!,自动退出病历编辑`)
    // 未登录状态；当路由到route指定页时，跳转至login
    　　if (route.indexOf(to.name) >= 0) {
    　　　　if (!stores.state.IsLogin) {
    　　　　　　router.push({ path: '/medical/Error', });
    　　　　}
    　　}
    // 已登录状态；当路由到login时，跳转至home 
    // 　　console.log(to.name)
    // 　　localStorage.setItem('routerName', to.name)
    // 　　if (to.name === 'login') {
    // 　　　　if (isLogin != null) {
    // 　　　　　　router.push({ path: '/HomeMain', });;
    // 　　　　}
    // 　　}
    　　next();
    });


/* eslint-disable no-new */

//axios.defaults.baseURL = '/api'//https://api.douban.com/v2/movie 改成/api才能用proxyTable跨域
//axios.defaults.baseURL = 'http://192.168.31.133:8094/'
//axios.defaults.baseURL = 'http://183.238.127.220:8081/'
//let Base64 = require('js-base64').Base64
axios.defaults.crossDomain = true;
// axios.interceptors.request.use(function (config) {
//   config.headers['Content-Type']  = 'application/x-www-form-urlencoded; charset=UTF-8'
// }, function (error) {
//   //    // Do something with request error
//      return Promise.reject(error);
//    });

axios.interceptors.request.use(function (config) {
    // Do something before request is sent

  　　//这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
  config.headers.common['IMEI'] ="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
              var r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
              return v.toString(16);
      })
  //let login =JSON.parse(dsBridge.call("userApi.getLoginedUser"));
      // if(stores.state.Token !==null && stores.state.Token !==''){
      //   config.headers.common['Token'] = stores.state.Token;
      // }
      // if(stores.state.ID !==null  && stores.state.ID !=='' ){
      //   config.headers.common['ID'] = stores.state.ID;
      // }
      config.headers['AppId'] = 'com.anke.fa.pr.v4';
      // if (config.method === 'post') {
      //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      // }
      if(process.env.NODE_ENV === 'production'){
        config.headers['Token'] = JSON.stringify(JSON.parse(dsBridge.call("userApi.getLoginedUser")).padUser).toUpperCase().replace('\"',"").replace('\"',"");
        config.headers['ID'] = JSON.stringify(JSON.parse(dsBridge.call("userApi.getLoginedUser")).UserInfo.W.ID);
      
      }else{
        config.headers['Token'] = "309209D0-2C10-406D-881D-925DB12635EC";//调试可用此
        config.headers['ID'] = "102727";
      }

       //config.headers['Token'] = "C60E403F-00E6-4EB3-8DCA-52A751FEA968";//调试可用此
       
    
    return config;
}, function (error) {
   // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // 系统报错
  if (response.data && response.data.err !== 0) {
   // console.log('断网了',response.data.err,response)
  }

  return response
}, error => {
  if (!error.response) {
    // 断网了  
   
    console.log('断网了error.response',error.response)
    
    stores.commit('ErrorMsg', `网络断开!`+error.response)
    stores.commit('ErrorSwitch', true)

    // setTimeout(function(){
    // dsBridge.call("nativeApi.backNative")   
    // },4000);

  }else if (error.response.status === 404) {
    console.log('404')
    stores.commit('ErrorMsg', `请求出错(${error.response.status})!,自动退出病历编辑`)
    stores.commit('ErrorSwitch', true)
    // setTimeout(function(){
    // dsBridge.call("nativeApi.backNative")   
    // },4000);

  }else if (error.response.status === 401) {
    stores.commit('ErrorMsg', `未授权，请登录(${error.response.status})!,自动退出病历编辑`)
    stores.commit('ErrorSwitch', true)
    // setTimeout(function(){
    // dsBridge.call("nativeApi.backNative")   
    // },4000);
  }else if (error.response.status === 500) {
    stores.commit('ErrorMsg', `服务器内部错误(${error.response.status})!,自动退出病历编辑`)
    stores.commit('ErrorSwitch', true)
    // setTimeout(function(){
    // dsBridge.call("nativeApi.backNative")   
    // },4000);
  }else{
    stores.commit('ErrorMsg', `(${error.response.status})!,自动退出病历编辑`)
    stores.commit('ErrorSwitch', true)
    // setTimeout(function(){
    // dsBridge.call("nativeApi.backNative")   
    // },4000);
  }

  return Promise.resolve(error.response)
})




// axios.interceptors.response.use(function (response) { //响应拦截器
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });


new Vue({
  router,
  store:stores,          //-----全局变量
  
  render: h => h(App)
}).$mount('#app-box')
