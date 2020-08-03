import Vue from 'vue'
import Router from 'vue-router'

//import Basicinfo from '@/components/medical/Basicinfo'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/Home', component: Home },
    { path: '*', redirect: '/Home', component: Home  }, 
    
    {
      path: '/Home',
      name: 'Home',
      component: ()=>import('@/components/Home'),
      children:[
        {
          path: '/medical/Grid',
          name: 'Grid',
          component: ()=>import('@/components/Grid')
        },
        {
          path: '/medical/Error',
          name: 'Error',
          component: ()=>import('@/components/Error')
        },
        {
          path: '/Tabbar',
          name: 'Tabbar',
          component: ()=>import('@/components/Tabbar')
        },
        {
          path: '/medical/Basicinfo',
          name: 'Basicinfo',
          component: ()=>import('@/components/medical/Basicinfo'),
        },
        {
          path: '/medical/Physical',
          name: 'Physical',
          component: ()=>import('@/components/medical/Physical'),
        },
        {
          path: '/medical/AidCheck',
          name: 'AidCheck',
          component: ()=>import('@/components/medical/AidCheck'),
        },
        {
          path: '/medical/Diagnosis',
          name: 'Diagnosis',
          component: ()=>import('@/components/medical/Diagnosis'),
        },
        {
          path: '/medical/Treaments',
          name: 'Treaments',
          component: ()=>import('@/components/medical/Treaments'),
        },
        {
          path: '/medical/NursingRecord',
          name: 'NursingRecord',
          component: ()=>import('@/components/medical/NursingRecord'),
          meta:{
            KeepAlive:true
          }
        },
        {
          path: '/medical/GoodsList',
          name: 'GoodsList',
          component: ()=>import('@/components/medical/GoodsList'),
        },
        {
          path: '/medical/Trauma', //急性创伤评分
          name: 'Trauma',
          component: ()=>import('@/components/medical/Trauma'),
        },
        {
          path: '/medical/Apgar', //新生儿评分
          name: 'Apgar',
          component: ()=>import('@/components/medical/Apgar'),
        },
        
        {
          path: '/medical/WSCheck',//外科检查
          name: 'WSCheck',
          component: ()=>import('@/components/medical/WSCheck'),
        },
        {         
          path: '/medical/FKCheck',//妇科检查
          name: 'FKCheck',
          component: ()=>import('@/components/medical/FKCheck'),
        },
        {
          path: '/medical/CKCheck',//产科检查
          name: 'CKCheck',
          component: ()=>import('@/components/medical/CKCheck'),
        },
        {
          path: '/medical/CPRCheck', //心肺复苏登记
          name: 'CPRCheck',
          component: ()=>import('@/components/medical/CPRCheck'),
        },
        {
          path: '/medical/Handover',//告知书与交接单
          name: 'Handover',
          component: ()=>import('@/components/medical/Handover'),
        },
        {
          path: '/medical/HospitalBack',//院内反馈
          name: 'HospitalBack',
          component: ()=>import('@/components/medical/HospitalBack'),
        },
        
        {
        path: '/xbs/XBS_1',
        name: 'XBS_1',
        component: ()=>import('@/components/xbs/XBS_1'),
      }
      ]
    }
    
  ]
})
