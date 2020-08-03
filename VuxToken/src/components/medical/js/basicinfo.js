import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
         XNumber, XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
         Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
         FlexboxItem,Popover,Toast,Badge    } from 'vux'
    
import qs from 'qs';
import {Basicinfo} from "@/model/Patient.js";
import TransferUtil from '@/assets/js/transferUtil.js';
import Validations from "@/model/Validations.js";
import { required,minLength, maxLength,numeric } from "vuelidate/lib/validators";
export default {
  // beforeRouteLeave(to, from, next) {
  //   // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
  //     // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
  //     // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
  //     // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
  //    if (from.path === '/xbs/XBS_1'){
  //      //判断是从哪个路由过来的，
  //        //如果是B页面即detail页面过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
  //      to.meta.isBack = true;
  //    }else{
  //      to.meta.isBack = false;
  //    }
  //    next();
  //  },
    beforeRouteEnter(to, from, next) {
      //现病史的页面过多需要遍历url才能进行路由判断 故取巧不为grid中过来时调用方法
    

      console.log('进入from.path',from.path)
      next(vm => {
        //vm.Getinfo();
        vm.Getinfo();
        
        if(from.path==='/medical/Grid/' ){
          vm.Getinfo();
        }else{
          vm.getXBSData();
        }
      
    });
    },
        beforeRouteLeave(to, from, next) {
          console.log('1')
       
          // console.log('this.$route.query.XBS'+this.$route.query.XBS)
          
          // if(this.$route.query.XBS ==='xbs' && to.path !== '/medical/Grid' ){
          //   console.log('2')
          //   this.$route.query.XBS ='';
          //   next('/medical/Grid')
          // }
          next(vm => {

       // 设置下一个路由的 meta  
          //接收现病史模板页面传过来的跳转标示如果为‘xbs’则改为回退至Grid
          if (to.path === '/medical/Grid' || to.path === '/medical/Grid/' ) {
            console.log('将填写页面缓存关闭'+from.meta.keepAlive)
            vm.GetError()
            //vm.SaveBasicinfo()
            from.meta.keepAlive = false;  //当返回九宫格后不再缓存
          } 
            if( to.path !== '/medical/Grid' ){
              
              from.meta.keepAlive = true;  //
          }
          });
      },

      computed: {
        // MainDataTentativeDiagnoseName() {
        //   return this.MainData.TentativeDiagnoseName;
        // }
        MainDataPatientType(){
            return this.MainData.PatientType;
        },
        MainDataSendAddOnly(){
          return this.MainData.SendAddOnly;
      },
      
    },

      watch: {
        MainDataPatientType(val){
          console.log(val.toString(),'MainDataSendAddOnly')
          if(this.$store.state.AddPatientPage=='AddPatientRecordQH'  
          && val.toString() =='医疗保障' 
          &&  this.$store.state.ISUrumqiPatientType==true
          ){
            this.ShowPatientTypeSwitch=false//将不需要的隐藏
          }else{
            this.ShowPatientTypeSwitch=true
          }

      },
      MainDataSendAddOnly(val){
          console.log(val.toString(),'MainDataPatientType','val.toString().indexOf(其他)!=-1 ',val.toString().indexOf('qqi')!=-1 )
          if( val.toString().indexOf('其他')!=-1 
        
          ){
            
            this.SendAddSwitch=false
          

          }else{
            this.SendAddSwitch=true
        
          }

      },
        
        
      },
    created(){
      //created ：做一些数据初始化，实现函数自执行
      //加载字典数据
      console.log('created函数被调用')
      this.loadBasicDictionary();
     
      window.addEventListener("touchmove",this.myTouchMove)  //touchmove事件监听，滑动时，输入框失去焦点，隐藏软键盘。
        // this.isFirstEnter=true;
      //   // 只有第一次进入或者刷新页面后才会执行此钩子函数
      //   // 使用keep-alive后（2+次）进入不会再执行此钩子函数
      //   this.$nextTick(() => {
      //    this.getLists();
      //  });
    },
    mounted() {
      //mounted： 调用后台接口进行网络请求，拿回数据，网络请求和重新赋值,配合路由钩子做一些事情.
      
     // this.getXBSData()
     window.addEventListener('scroll', this.handleScroll, true);  
    // window.addEventListener('resize', this.scrollIntoView)
      this.$store.commit('UPDATE_PAGE_TITLE', '基础信息') 


      var that = this;
     
      TransferUtil.$on('Basicinfo', function(msg) {
        console.log('进入transfer方法')
            console.log(msg);  //只是使用方法举例
            that.Count();
        })
        
      },
 
    activated() {
          console.log('activated函数被调用')
          this.$store.commit('UPDATE_PAGE_TITLE', '基础信息') 
         
          // if(this.$route.meta.isBack || !this.isFirstEnter){
          //   // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
          // // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
          //   this.tradeList=[]
          //   this.AjaxList = []     //把数据清空，可以稍微避免让用户看到之前缓存的数据
          //   this.pageNum = 1;
          //   this.$nextTick(() => {
          //     this.getLists();
          //   });
          // }else{
          //   this.$route.meta.isBack=false
          //   this.isFirstEnter=false;
          // }
      },
 



    props: {
        title:{
          type: String
        },
        form:{  //用于编辑病历时初始化值赋值
          type:Object
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
    Popover,
    XButton,
    Toast,
    Badge
    
  },

 
  
  data () {
    
    /*   let self=this;
      let data={} */
  
  let data={
    
   
   
        ...Basicinfo(),//

        VuxGetAddPatientBool:false,
        ToastMsg:'',
        showhead:true,
        PatientTypeList:[],
        MainDataOld:[],
        isFirstEnter:false,
        showPopupXBSTemplate:false,
        XBSTemplate:[],
        AgeTypeList:[],
        DrivingTime:'',
        IsHaveBeenTelList:[],//是否经过120
        Sexlist:[{name:"男",value:'男'},{name:"女",value:'女'},{name:"不详",value:'不详'}],
        //Sexlist: ['男', '女', '不详'],
        TemplateName:'',//模板名称
        LocalAddTypelist:[],//现场类型字典 
        ThreeNonePatientList:[{name:"是",value:'1'},{name:"否",value:'0'}],
        Vocationlist:[],//职业字典
        TaskTypeList:[],
        SendDepartmentList:[],//送达科室
        SymptomList:[],   //症状关键词
        NationalityList:[],//国籍
        NationList:[],
        SendAddOnlyList:[],
        StationList:[],
        AllergicHistoryChooseList:[],
        PastHistoryChooseList:[],
        buttonshow:false,//保存按钮

        SendAddOnlySerach:'',  //送往地点搜索
        //多选弹出层开关
        SendAddOnlyTree:false,  //树形搜索弹窗
        showSendAdd:false,
        showPopup: false,
        showPopupProvider: false,
        showPopupSymptom:false,
        showPopupAllergicHistoryChoose:false,
        showPopupPastHistoryChoose:false,
        showa:false,
        showtoast:false,//展示校验有问题数的弹窗
        //不符合规则内容
        SendAddSwitch:false,//展示校
        errorContent:'',

        //
        ShowPatientTypeSwitch:true //病历类型控制的隐藏
      }
      return data
    },

    validations() {

      return Validations(this.$store.state.AddPatientPage)
    // if (this.$store.state.AddPatientPage=='AddPatientRecordQH' 
    // && this.$store.state.Basicinfo.MainData.PatientType.toString() =='医疗保障' && this.$store.state.Basicinfo.MainData.IllnessSort.indexOf('死亡')!=-1 ){
    //   return {
    //     MainData: {
        
    //     }
    //   }
  
    // }else if(this.$store.state.AddPatientPage=='AddPatientRecordQH' ){
    //   console.log(this.$store.state.AddPatientPage=='AddPatientRecordQH','this.$store.state.AddPatientPage==AddPatientRecordQH')
    //   return {
    //     MainData: {
    //       PatientType: { required },
    //       Provider: { required },  //病史提供人
    //       Name:{required},
    //       //Age:{numeric},
    //       AgeType: { required },
    //       Nationality: { required },   //国籍
    //       Nation: { required },         //民族
    //       TaskType: { required },
    //       Kilometres: {  },
    //       Symptom: { required },        //症状关键词
    //       Complaints: { required },     //主诉
    //       HistoryOfPresentIllness: { required },    //现病史
    //       PastHistoryChoose: { required },          //既往史
    //       AllergicHistoryChoose: { required },      //药敏史
    //       SendAddOnly: { required },
    //       ThreeNonePatient:{required},
    //       DrivingTime:{required},
    //       ArrivedTime:{required},
    //     }
    //   }
    // }
  
  },
    
  
  methods: {
    disabledtime(){
      console.log("enter disabledtime")
      return false;
    },
    NumRule(val){
      console.log(val)
      console.log(val.replace(/[^\d]/g,''))
          if(val.replace(/[^\d]/g,'')==''){
            this.MainData.Age=''
          }else{
            this.MainData.Age=val.replace(/[^\d]/g,'')
          }
      
      },

    QuerySearchStation(queryString, cb) {
      var StationList = this.StationList;
      var results = queryString ? StationList.filter(this.CreateFilterStation(queryString)) : StationList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    CreateFilterStation(queryString) {
      return (StationList) => {
        return (StationList.value.toLowerCase().indexOf(queryString.toLowerCase().trim()) !== -1 );
      };
    },

    QuerySearchSendAddOnly(queryString, cb) {
      var SendAddOnlyList = this.SendAddOnlyList;
      var results = queryString ? SendAddOnlyList.filter(this.CreateFilterSendAddOnly(queryString)) : SendAddOnlyList;
      console.log(results,'results')
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    CreateFilterSendAddOnly(queryString) {
      return (SendAddOnlyList) => {
        console.log(queryString,'queryString')
        return (SendAddOnlyList.value.toLowerCase().indexOf(queryString.toLowerCase().trim()) !== -1 );
      };
    },



    // 列表滑动时，隐藏软键盘
   myTouchMove: function (evt) {
    if(document.hasFocus){
      const inputId = document.activeElement  // 获取ID
      inputId.blur()  // input失焦
    }
  },
    handleScroll(){
        // 页面滚动距顶部距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                  document.body.scrollTop
        var scroll = scrollTop - this.i;
        this.i = scrollTop;
        if(scroll<0){
          this.showhead=true
          window.addEventListener('scroll', this.scrollIntoView, true);  
          //this.scrollIntoView() //当向上滚动且焦点在input框时，自动将焦点置于可视范围顶且header隐藏header
        }else{
          this.showhead=false
        }
    },

     
    scrollIntoView (time = 0) {// 键盘弹出，页面重绘，将获得焦点的元素滚动至可视区域内
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        setTimeout(() => {
          document.activeElement.scrollIntoViewIfNeeded(true)
          this.showhead=false
        }, time)
      }
    },
    Touch(){
      for (var m in this.$v.MainData) {
        this.$v.MainData[m].$touch()
        console.log('touch',m)
      }
  
    },
    
    ClearAge(){
      this.MainData.Age=''

    },
    Getinfo() {
      console.log('初始化赋值方法')
      this.TaskCode=this.$store.state.TaskCode
      this.PatientOrder=this.$store.state.TaskCode.PatientOrder
      this.MainData=this.$store.state.Basicinfo.MainData
      this.Type=this.$store.state.Basicinfo.Type
      console.log('this.TaskCode',this.TaskCode)
      console.log('this.MainData',this.MainData)
      // //新疆特有转运病历
      // if(this.$store.state.AddPatientPage=='AddPatientRecordQH'  
      // && this.$store.state.Basicinfo.MainData.PatientType.toString() =='医疗保障' 
      // &&  this.$store.state.ISUrumqiPatientType==true
      // ){
      //   this.ShowPatientTypeSwitch=false//将不需要的隐藏
    
      // }
     
      this.Touch();
    },
    
  

    XBSPage(a,value){
        this.$router.push({
        name: key,
        params: {
          time: this.MainData.ArrivedPatientTime,
          name: key,
          value: value,
        },
        replace:true  //此处可使路由history不记录本次历史 或直接将push改为replace应该就可以
      })

    },
    onItemClick (value, disabled) {
        console.log(value, disabled)
        if (!this.disabled) {
        this.showPopup = false
        }
    },
    show(){
      this.showPopup=true
    },
    change (value) {//此处为日历控件触发事件
      console.log('change', value)
    },
    //获取各种字典
    //使用await不使用async会报错
    async loadBasicDictionary(){
      let self=this;

      // this.baseAjax({ //IsHaveBeenTel -是否经过120
      //   url:'Medical/Medical/VuxGetManagerDictioninary',
      //   showLoading:true,
      //   type:'post',
      
      //   success:function(data){
      //   console.log('进入了获取time是否编辑方法')
      //   }
      // })

      this.baseAjax({ //IsHaveBeenTel -是否经过120
        url:'Medical/Medical/VuxGetManagerDictioninary',
        showLoading:true,
        type:'post',
        data:{TypeCode:'IsHaveBeenTel'},
        success:function(data){
          self.IsHaveBeenTelList=  data.map(function(item) {
              return {
                  name: item.value,
                  value: item.value
              }
          });
        }
      })

      // this.baseAjax({ //PatientType 病历类型 
      //   url:'Medical/Medical/VuxGetManagerDictioninary',
      //   showLoading:true,
      //   type:'post',
      //   data:{TypeCode:'PatientType'},
      //   success:function(data){
      //       self.PatientTypeList=  data.map(function(item) {
      //           return {
      //               name: item.value,
      //               value: item.value
      //           }
      //       });
      //       }
      //   })
      this.baseAjax({
        url:'Medical/Medical/VuxTZLocalAddrTypeLoad',
        showLoading:true,
        type:'post',
        success:function(data){    
         
          self.LocalAddTypelist=data.map(function(item) {
            return {
                name: item.value,
                value: item.key
            }
        });
      
        }
      })
      // this.baseAjax({
      //   url:'Medical/Medical/VuxGetManagerDictioninary',
      //   showLoading:true,
      //   type:'post',
      //   data:{TypeCode:'Symptom'},
      //   success:function(data){
      //       self.SymptomList=data;
      //       console.log(self.SymptomList,'self.SymptomList')
            
      //   }
      // })

      this.baseAjax({
        url:'Medical/Medical/VuxGetStation',
        showLoading:true,
        type:'post',
        success:function(data){

          self.StationList=  data.map(function(item) {
            return {
                //name: item.value,
                value: item.value
            }
        });
           // self.StationList=data;
        }
      })
      // this.baseAjax({
      //   url:'Medical/Medical/VuxGetManagerDictioninary',
      //   showLoading:true,
      //   type:'post',
      //   data:{TypeCode:'MinZu'},
      //   success:function(data){
      //     self.NationList=  data.map(function(item) {
      //         return {
      //             name: item.value,
      //             value: item.value
      //         }
      //     });
      //   }
      // })
      // this.baseAjax({
      //   url:'Medical/Medical/VuxGetManagerDictioninary',
      //   showLoading:true,
      //   type:'post',
      //   data:{TypeCode:'ZhiYe'},
      //   success:function(data){
      //     self.Vocationlist=  data.map(function(item) {
      //         return {
      //             name: item.value,
      //             value: item.value
      //         }
      //     });
      //   }
      // })
      this.baseAjax({
        url:'Medical/Medical/VuxGetManagerDictioninary',
        showLoading:true,
        type:'post',
        data:{TypeCode:'XBS'},
        success:function(data){
          self.XBSTemplate=  data.map(function(item) {
              return {
                  name: item.value,
                  key: item.key
              }
          });
        }
      })
      
      // this.baseAjax({
      //   url:'Medical/Medical/VuxGetManagerDictioninary',
      //   showLoading:true,
      //   type:'post',
      //   data:{TypeCode:'GuoJi'},
      //   success:function(data){
      //     self.NationalityList=  data.map(function(item) {
      //         return {
      //             name: item.value,
      //             value: item.value
      //         }
      //     });
      //   }
      // })
      // this.baseAjax({
      //   url:'Medical/Medical/VuxGetManagerDictioninary',
      //   showLoading:true,
      //   type:'post',
      //   data:{TypeCode:'AgeType'},
      //   success:function(data){
      //     self.AgeTypeList=  data.map(function(item) {
      //         return {
      //             name: item.value,
      //             value: item.value
      //         }
      //     });
      //   }
      // })
      // this.baseAjax({ //送达科室
      //   url:'Medical/Medical/VuxGetManagerDictioninary',
      //   showLoading:true,
      //   type:'post',
      //   data:{TypeCode:'SDKS'},
      //   success:function(data){
      //     self.SendDepartmentList=  data.map(function(item) {
      //         return {
      //             name: item.value,
      //             value: item.value
      //         }
      //     });
      //   }
      // })
      this.baseAjax({ //送往地点
        url:'Medical/Medical/VuxGetSendAddr',
        showLoading:true,
        type:'post',
        success:function(data){
            self.SendAddOnlyList=  data.map(function(item) {
              return {
                  //name: item.value,
                  value: item.value
              }
          });
        }
      })
      this.baseAjax({
        url:'Medical/Medical/VuxGetAlarmEventType',
        showLoading:true,
        type:'post',
        success:function(data){
            self.TaskTypeList=data.map(function(item) {
              return {
                  name: item.name,
                  value: item.name
              }
          });
        }
      })
      this.baseAjax({
        url:'Medical/Medical/VuxGetCheckBoxModel',
        showLoading:true,
        type:'post',
        data:{Code:'MedicalBingShi'},
        success:function(data){
            self.AllergicHistoryChooseList=data;
        }
      })
      this.baseAjax({
        url:'Medical/Medical/VuxGetCheckBoxModel',
        showLoading:true,
        type:'post',
        data:{Code:'HistoryBingShi'},
        success:function(data){
            self.PastHistoryChooseList=data;
        }
      })
  },

      VuxGetAddPatient(){
        //获取任务信息
        let self=this;
        // data:{TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder},
        this.baseAjax({ 
          url:'Medical/Medical/VuxGetAddPatient',
          showLoading:true,
          type:'post',
          data:{TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder},
          success:function(data){
            console.log(data.success,'data.success')
            console.log(data,'data')
            if(!data.success){
            
              self.VuxGetAddPatientBool=true
              self.ToastMsg='获取任务信息错误'
            }else if(data.success){
              self.VuxGetAddPatientBool=true
              self.ToastMsg='获取任务信息成功'
              console.table(data.result)
              for(var prop in data.result){
                for(var prop1 in self.MainData){    
                    if(data.result[prop]!==null && data.result[prop]!=="" && prop1===prop){
                    
                    
                      if( prop==='SendAdd' ){
                        //不将值赋给sendadd  因为调度任务信息中TAcceptEvent 放入了sendadd 应放在send
                        self.MainData['SendAddOnly']=data.result[prop].toString().trim().split(',');
                        console.log( self.MainData['SendAddOnly'],' self.MainData[SendAddOnly]')
                      }  else if(prop==='FirstCallTime' || prop==='DrivingTime' 
                      ||prop==='ArrivedTime' || prop==='ArrivedPatientTime' 
                      ||prop==='LeaveTime' || prop==='DeliveredTime' 
                      ||prop==='TaskCompleteTime' || prop==='FirstCallTime' 
                      ||prop==='CPRStartTime' || prop==='CPREndTime' || prop==='TaskCompleteTime' 
                      
                      ){
                        
                        self.MainData[prop1]
                          =self.jsonDateFormat(data.result[prop],"yyyy-MM-dd hh:mm:ss");
                        
                      }else if(typeof self.MainData[prop1]==='object'){
                          if(prop=='ThreeNonePatient'){
                            
                            self.MainData[prop1] =data.result[prop].toString()=='true'?'1':'0'
                            
                            self.MainData[prop1] =self.MainData[prop1].split(',');
                        
                            }else if(prop=='IsHaveBeenTel'){

                                  self.MainData[prop1] =data.result[prop].toString()=='true'?'经120':'非120'
                            
                                  self.MainData[prop1] =self.MainData[prop1].split(',');
                            
                  
                            } else{
                                self.MainData[prop1]= data.result[prop].toString().split(',');
                                console.log(prop1,self.MainData[prop1])
                            }
                      
                      }
                      else{
                          self.MainData[prop1]=data.result[prop]
                      }
                    }
                }
            }
            console.log( self.MainData,'self.MainData')
            self.$store.commit('Basicinfo', self.MainData) 
            }
          }
        })


      },

      jsonDateFormat (jsonDt, format) {
        //时间戳处理工具
        var date, timestamp, dtObj;

        timestamp = jsonDt.replace(/\/Date\((\d+)\)\//, "$1");
        date = new Date(Number(timestamp));
        dtObj = {
              "M+": date.getMonth() + 1,   //月
              "d+": date.getDate(),        //日
              "h+": date.getHours(),       //时
              "m+": date.getMinutes(),     //分
              "s+": date.getSeconds(),     //秒
          };//因为年份是4位数，所以单独拿出来处理
          if (/(y+)/.test(format)) {
              format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          }//遍历dtObj
        for (var k in dtObj) {
    　　　　　　 //dtObj的属性名作为正则进行匹配
                    if (new RegExp("(" + k + ")").test(format)){
    　　　　　　　//月，日，时，分，秒 小于10时前面补 0
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? dtObj[k] : ("00" + dtObj[k]).substr(("" + dtObj[k]).length));
            }
        }

        return format;
    },
  SaveBasicinfo(){
    let show=this;
    this.showtoast = true;
   
     this.$store.commit('Basicinfo', this.MainData) 
     this.GetError();
    this.$router.push({name: 'Grid'})
  },
  GetError(){
    this.errorContent='';
    this.errorCount=0;//先清空
    for (var m in this.$v.MainData.$model) {
       //console.log(m);
       //console.log(m in this.$v.MainData);
      if (m in this.$v.MainData) {
        console.log('this.$v.MainData[m].required',this.$v.MainData[m].required);
        if (!this.$v.MainData[m].required) {
          this.errorCount++;
         // this.errorContent=this.errorContent+m;
        }
      }
    }
    this.$store.commit('BasicinfoError', this.errorCount) 

  },

  getXBSData(){
    console.log('getxbsdata'+this.$route.params.XBSData.other);
    if( this.$route.params.XBSData.other!==undefined ){
      
      this.MainData.HistoryOfPresentIllness=  this.$route.params.XBSData.other;
      this.MainData.Complaints=this.$route.params.XBSData.Complaints;
      this.TemplateName=this.$route.params.XBSData.Complaints;
    }
    
    
    
  },
  Count(){ //
    //this.Getinfo() //先把从后台拿到的数据初始化到本页面
    console.log('进入调用子页面方法','this.errorCount',this.errorCount)
    this.errorContent='';
    this.errorCount=0;//先清空
    
    for (var m in this.$v.MainData.$model) {
      
      if (m in this.$v.MainData) {
        if (!this.$v.MainData[m].required) {
          this.errorCount++;
        }
      }
    }
    
    console.log('进入调用子页面方法','this.errorCount',this.errorCount)
    this.$store.commit('BasicinfoError', this.errorCount) 
  },
  hide() {
      this.$emit("update:toggle", false);
  },
  forbid(){
    //禁止软键盘弹出
    document.activeElement.blur();
 }

  },
}






