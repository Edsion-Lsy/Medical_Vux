<template>
<group>

 <!-- <x-header class="vux-header-box"  style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
        <a slot="overwrite-left" size="35" @click="showClose=true">关闭</a>

        病历编辑111<!--<a slot="right" style="color:black "   @click="SaveTGinfo()">保存</a>  -->  
       <!-- </x-header> -->

   
    <x-header class="vux-header-box"  style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
        
        病历编辑<a slot="overwrite-left" size="35" @click="showClose=true">关闭</a>
    </x-header>
    
    <group style=" margin-top: 2em;">
      
      <div>
        


          <grid>
          <grid-item    @click.native="Push('Basicinfo')"  >
            <img slot="icon" src="../assets/images/icons/基础信息.png">
            <span slot="label":class="this.$store.state.Basicinfo.BasicinfoError!=0?'red':'black'">{{ ('基础信息') }}
            </span> <badge  v-if="this.$store.state.Basicinfo.BasicinfoError!=0"  slot="label" :text="this.$store.state.Basicinfo.BasicinfoError"  ></badge>

            
          </grid-item>
          <grid-item  v-if="ShowGrid.Physical"     :link="{ path: '/medical/Physical'}">
            
            <img slot="icon" src="../assets/images/icons/体格检查.png">
            <span slot="label":class="this.$store.state.Basicinfo.PhysicalError!=0?'red':'black'" >{{ ('体格检查') }}</span>
            <badge  v-if="this.$store.state.Basicinfo.PhysicalError!=0"  slot="label" :text="this.$store.state.Basicinfo.PhysicalError"  ></badge>
        
          </grid-item>

          
        </grid>
        <grid>
          <grid-item v-if="ShowGrid.AidCheck" :label="('辅助检查')"  :link="{ path: '/medical/AidCheck'}">
            <img slot="icon" src="../assets/images/icons/心电.png">
            <!-- <span slot="label":class="this.$store.state.Basicinfo.AidCheckError!=0?'red':'black'">{{ ('基础信息') }}
            </span> <badge  v-if="this.$store.state.Basicinfo.AidCheckError!=0"  slot="label" :text="this.$store.state.Basicinfo.AidCheckError"  >123</badge>
            <badge   text="13"></badge> -->
          </grid-item>
          <grid-item  v-if="ShowGrid.Diagnosis"  :label="('诊断信息')"  :link="{ path: '/medical/Diagnosis'}">
            <img slot="icon" src="../assets/images/icons/诊断信息.png">
            <span slot="label":class="this.$store.state.Basicinfo.DiagnosisError!=0?'red':'black'">{{ ('诊断信息') }}
            </span> 
            <badge  v-if="this.$store.state.Basicinfo.DiagnosisError!=0"  slot="label" :text="this.$store.state.Basicinfo.DiagnosisError"  ></badge>
 
          </grid-item>
        </grid>


        <grid>
            <grid-item   v-if="ShowGrid.Handover"  :label="('告知书与交接单')"   @click.native="Push('Handover') ">
            <img slot="icon" src="../assets/images/icons/单据.png">
            <span slot="label":class="this.$store.state.Basicinfo.HandoverError!=0?'red':'black'">{{ ('告知书与交接单') }}
            </span> 
            <badge  v-if="this.$store.state.Basicinfo.HandoverError!=0"  slot="label" :text="this.$store.state.Basicinfo.HandoverError"  ></badge>
          </grid-item>
        
         
        <grid-item  v-if="ShowGrid.CPRCheck" :label="('心肺复苏登记')"   @click.native="Push('CPRCheck') ">
            <img slot="icon" src="../assets/images/icons/CPR.png">
            </grid-item>
           
        </grid>
        <grid>
            
              <!-- <grid-item   v-if="ShowGrid.Treaments"  :label="('救治措施')"   @click.native="Push('Treaments') ">
            <img slot="icon" src="../assets/images/icons/急救箱.png">
          </grid-item> -->
          
           <grid-item v-if="WSJCSwitch"  :label="('外科检查')"   @click.native="Push('WSCheck') ">
            <img slot="icon" src="../assets/images/icons/外伤检查.png">
          </grid-item>
         
        </grid>
        <grid>
          <grid-item  v-if="TiSwitch" :label="('急性创伤(Ti)评分')"   @click.native="Push('Trauma') ">
            <img slot="icon" src="../assets/images/icons/评估报告.png">
            </grid-item>
            <grid-item v-if="ApgarSwitch" :label="('新生儿(Apgar)评分')"   @click.native="Push('Apgar') ">
            <img slot="icon" src="../assets/images/icons/评估报告.png">
            </grid-item>
          <grid-item  v-if="this.$store.state.Basicinfo.MainData.PatientType.toString()==='心肺复苏'" :label="('院内反馈')"   @click.native="Push('HospitalBack') ">
            <img slot="icon" src="../assets/images/icons/CPR.png">
          </grid-item>
        
          </grid>
          <grid>
            <grid-item  v-if="FKJCSwitch" :label="('妇科检查')"   @click.native="Push('FKCheck') ">
              <img slot="icon" src="../assets/images/icons/妇科.png">
            </grid-item>
            <grid-item v-if="CKJCSwitch" :label="('产科检查')"   @click.native="Push('CKCheck') ">
              <img slot="icon" src="../assets/images/icons/产科.png">
            </grid-item>
        </grid>
  
   
        <!-- <div v-if="$store.state.AddPatientPage=='AddPatientRecordQH'  " >
           <x-button   plain style="border-radius:99px;"  type="primary" action-type="submit"  @click.native="ShowPatientType()">保存</x-button> 
        
        </div> -->
        <div v-if="$store.state.AddPatientPage!=='AddPatientRecordQH'" >
          <x-button   plain style="border-radius:99px;"  type="primary" action-type="submit"  @click.native="showSaveMsg=true">保存</x-button> 
        </div>

        <!-- <div v-if="$store.state.AddPatientPage!=='AddPatientRecordQH' && $store.state.AddPatientPage!=='AddPatientRecordSZ' " >
          <x-button   plain style="border-radius:99px;"  type="primary" action-type="submit"     @click.native="showSubmitMsg=true">提交</x-button>
  
        </div>
           -->
      </div>
        <!-- <x-button  type="primary" action-type="submit"  @click.native="SubmitInfo()">保存</x-button> -->
        <toast v-if="showtoast" type="text" :time="1800" is-show-mask   position='middle' >{{ (ToastMsg) }}</toast> 
        <div v-transfer-dom>
                <popup v-model="showSaveMsg" height="17em" :hide-on-blur=false is-transparent >
                  <div style="width: 95%;background-color:#fff;height:15em;margin:0 auto;border-radius:5px;padding-top:0px;">
                
                  <div style="padding:25px 15px;">
                    
                    <p align="center" v-if="showyanzheng"  style="font-size:20px" >{{ ('有'+(
                      this.$store.state.Basicinfo.BasicinfoError
                      +this.$store.state.Basicinfo.PhysicalError
                      +this.$store.state.Basicinfo.AidCheckError
                      +this.$store.state.Basicinfo.DiagnosisError
                      +this.$store.state.Basicinfo.CPRCheckrror
                      +this.$store.state.Basicinfo.HandoverError)+'条必填项未填写，是否确认保存') }}</p>
                    <p align="center" v-if="!showyanzheng"  style="font-size:20px" >{{ ('是否确认保存') }}</p>
                    <!-- <p align="center"  style="font-size:20px" >{{ ('有'+this.$store.state.Basicinfo.errorCount.toString()+'条必填项未填写，是否确认保存') }}</p> -->
                    <x-button type="primary" @click.native="SubmitInfo('Save')">保存</x-button>
                    <x-button @click.native="showSaveMsg=false">取消</x-button>
                  </div>
                  </div>
                </popup>
        </div>
        <div v-transfer-dom>
                <popup v-model="showSubmitMsg" height="17em" :hide-on-blur=false is-transparent >
                  <div style="width: 95%;background-color:#fff;height:15em;margin:0 auto;border-radius:5px;padding-top:0px;">
                
                  <div v-if="this.$store.state.Basicinfo.BasicinfoError
                      +this.$store.state.Basicinfo.PhysicalError
                      +this.$store.state.Basicinfo.AidCheckError
                      +this.$store.state.Basicinfo.DiagnosisError
                      +this.$store.state.Basicinfo.CPRCheckrror
                      +this.$store.state.Basicinfo.HandoverError>0" style="padding:25px 15px;">
                    
                    <p align="center"  style="font-size:20px" >{{ ('有'+(
                      this.$store.state.Basicinfo.BasicinfoError
                      +this.$store.state.Basicinfo.PhysicalError
                      +this.$store.state.Basicinfo.AidCheckError
                      +this.$store.state.Basicinfo.DiagnosisError
                      +this.$store.state.Basicinfo.CPRCheckrror
                      +this.$store.state.Basicinfo.HandoverError)+'条必填项未填写，不能提交病历') }}</p>

                    <!-- <p align="center"  style="font-size:20px" >{{ ('有'+this.$store.state.Basicinfo.errorCount.toString()+'条必填项未填写，是否确认保存') }}</p> -->
                    <!-- <x-button type="primary" @click.native="SubmitInfo('Submit')">保存</x-button> -->
                    <x-button @click.native="showSubmitMsg=false">确认</x-button>
                  </div>


                  <div v-if="this.$store.state.Basicinfo.BasicinfoError
                      +this.$store.state.Basicinfo.PhysicalError
                      +this.$store.state.Basicinfo.AidCheckError
                      +this.$store.state.Basicinfo.DiagnosisError
                      +this.$store.state.Basicinfo.CPRCheckrror
                      +this.$store.state.Basicinfo.HandoverError===0" style="padding:25px 15px;">
                    
                    <p align="center"  style="font-size:20px" >{{ ('病历提交后不能修改，是否确认保存') }}</p>

                    <!-- <p align="center"  style="font-size:20px" >{{ ('有'+this.$store.state.Basicinfo.errorCount.toString()+'条必填项未填写，是否确认保存') }}</p> -->
                    <x-button type="primary" @click.native="SubmitInfo('Submit')">提交</x-button>
                    <x-button @click.native="showSubmitMsg=false">确认</x-button>
                  </div>

                  </div>
                </popup>
        </div>

          <div v-transfer-dom>
                <popup v-model="showClose" height="17em" :hide-on-blur=false is-transparent >
                  <div style="width: 95%;background-color:#fff;height:15em;margin:0 auto;border-radius:5px;padding-top:0px;">
                
                  <div style="padding:25px 15px;">
                    
                    <p align="center"  style="font-size:20px" >{{ ('未保存所填写内容,是否确认关闭?') }}</p>

                    <!-- <p align="center"  style="font-size:20px" >{{ ('有'+this.$store.state.Basicinfo.errorCount.toString()+'条必填项未填写，是否确认保存') }}</p> -->
                    <x-button type="primary" @click.native="CloseWeb()">关闭</x-button>
                    <x-button @click.native="showClose=false">取消</x-button>
                  </div>
                  </div>
                </popup>
        </div>

        <div v-transfer-dom>
                <popup v-model="showMsg" height="17em" :hide-on-blur=false is-transparent >
                  <div style="width: 95%;background-color:#fff;height:15em;margin:0 auto;border-radius:5px;padding-top:0px;">
                
                  <div style="padding:25px 15px;">
                    <p align="center"  style="font-size:20px" >{{ ('补充病历登录未成功,5秒后关闭') }}</p>
                  </div>
                  </div>
                </popup>
        </div>

    
    </group>
     <div v-transfer-dom>
      <loading :show="Loading" text='正在加载'></loading>
    </div>
</group>

</template>


<script>
import { Grid, GridItem, GroupTitle,Flexbox, FlexboxItem,XInput,XButton,PopupPicker,Toast,TransferDom,Popup,Badge,XTextarea,Loading  } from 'vux'
import Basicinfo from "./medical/Basicinfo.vue";
import TransferUtil from '@/assets/js/transferUtil.js';
import dsBridge from "dsbridge";
import Validations from "@/model/Validations.js";
import { required,minLength, maxLength } from "vuelidate/lib/validators";
import Qs from 'qs'
import Patient, {
  ObjFromObj,
  TreamentItemModel,
  GoodModel
} from "@/model/Patient.js";
export default {
  //路由守卫

  beforeRouteEnter(to, from, next) {
      next(vm => {
      console.log('from.path',from.path)  ;
    //判断是否需要各种评分模块 (根据初步诊断来判断)
      


      // if(from.path !== '/medical/Basicinfo/' && from.path !== '/medical/Physical/'  && from.path !== '/medical/NursingRecord/' 
      //   && from.path !== '/medical/AidCheck/' && from.path !== '/medical/Diagnosis/' && from.path !== '/medical/GoodsList/' 
      //   && from.path !== '/medical/Treaments/' && from.path !== '/medical/WSCheck/' 
      //   && from.path !== '/medical/CPRCheck/' && from.path !== '/medical/Trauma/' 
      //   && from.path !== '/medical/Handover/' && from.path !== '/medical/HospitalBack/'  && from.path !== '/medical/Apgar/'  
      //  && from.path !== '/medical/CKCheck/' && from.path !== '/medical/FKCheck/'
      // ){
      if (from.path === '/'){
      //  console.log(this.ChildComponents().getBasicinfo())  ;
        vm.Login()
        vm.GetDictioninary()
        //vm.DeleteNursingRecord()//删除完之前未保存的病历的残留数据后再加载新数据vm.Getinfo();
         
        
      }else if (from.path === '/medical/Basicinfo'){
              vm.GetMainData('Basicinfo');   //GetMainData()方法用于在后退的时候将公共变量存在本页面 但是似乎不怎么需要这么做
              vm.ErrorCount('MainData')
              vm.GetScoreModel();
              console.log(vm.getContent.Basicinfo.MainData.PatientType,'vm.getContent.Basicinfo.MainData.PatientType')  
          
        }else{
            
            vm.ErrorCount('All')
            vm.GetScoreModel();
            console.log(from.name,'from.name') 
            
            //暂时用不到 这个方法用来取errorCount 现在放到公共变量里  vm.GetMainData(from.Name);  

        }
        
        });


    },
  beforeRouteLeave(to, from, next) {
             // 设置下一个路由的 meta
            if (to.path === '/medical/Basicinfo') {
             // to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
              //  console.log('将填写页面缓存打开'+to.meta.keepAlive )
            } 
            if (to.path === '/medical/Physical') {
             // from.meta.keepAlive = true;  // 让 A 缓存，即不刷新
              //  console.log('将填写页面缓存打开'+to.meta.keepAlive )
            } 
          next(vm => {

          console.log('to.path'+to.path)
          if (to.path === '/') {
          vm.showSubmitInfo=true
          
          }
          })
            
    },

  
    mounted() {
      // if(this.$route.params.MainData!==""){
      this.$store.commit('UPDATE_PAGE_TITLE', '病历编辑')
          console.log("mounted")
         
          //this.DeleteNursingRecord()
     // this.MainData.HistoryOfPresentIllness=  this.$route.params.XBSData.other;
      
    //}

    },
  
  data() {
        return {
          Loading:false,
          
          ShowGrid: {
    
            Basicinfo: true,
            Diagnosis: true,
         
            Physical: true,
            AidCheck: true,
            CPRCheck: true,
            Treaments: true,
            Handover: true,
            WSJCSwitch: true,
            TiSwitch: true,
            ApgarSwitch: true,
            XFFSSwitch:true,
            FKJCSwitch: true,
            CKJCSwitch: true,
          },
          PassWord:'',
          FillPersonCode:'',
          error:'',
          Padinterface:'',
          ID:'',
          Token:'',
          errorCount:0,
          BasicinfoerrorCount:0,
          //弹框提示文字开关
          showMsg:false,
          showClose:false,
          showSubmitInfo:false,
          showSubmitMsg:false,
          showSaveMsg:false,
          showyanzheng:true,//保存时是否提示有几个未填
          showtoast:false,
          ToastMsg:'',
          //各模块开关
          TiSwitch:'',
          ApgarSwitch:'',
          FKJCSwitch:'',//妇科检查
          CKJCSwitch:'',//产科检查
          WSJCSwitch:'',//外伤检查
          //
          // TaskCode:'20200113040633070101',
          // PatientOrder:'1',
          // Type:'edit',
          TaskCode:'',
          PatientOrder:'',
          Type:'',
          
          BasicinfoError:[],
          getContent:Patient(),
          DiagnosisError:[],
          PhysicalError:[],
          PatientTypeList:[],
          load: {
            taskmsg: false,
            Basicinfo: false,
            MedicalHistory: false,
            Physical: false,
            AidCheck: false,
            Treaments: false,
            CPR:false,
          }
        }

    },
  directives: {
        TransferDom
      },
  components: {
    Basicinfo,
    Grid,
    GridItem,
    GroupTitle,
    Flexbox,
    FlexboxItem,
    XInput,
    XButton,
    PopupPicker,
    Toast,
    Popup,
    Badge,
    XTextarea,
    Loading
   
  },
    validations() {
      return Validations(this.$store.state.AddPatientPage)
    },

  methods: {
   
      OpenMessage() {
        const h = this.$createElement;

        this.$notify.info({
          title: '任务编码',
          message: h('i', { style: 'color: teal'},this.$store.state.TaskCode+this.$store.state.PatientOrder ),
          position: 'bottom-right',
          
        });
    
        
      },
      OpenMessageName() {
        // const h = this.$createElement;

        //   this.$notify.info({
        //   title: '患者姓名',
        //   message: h('i', { style: 'color: teal'},this.getContent.Basicinfo.MainData[Name] ),
          
           
        // });
        
      },
    GetRequest() {
        //获取原生请求参数方法
          var url = window.document.location.href.toString(); //获取的完整url
        //  var u = url.split("?");
         //   var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
              var a=url.indexOf("?")+1;
              console.log('a',a)

                var str = url.substr(a);
                console.log('str',str)
                var strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
                }
            }console.log('theRequest',theRequest)
            return theRequest;
        },
    async GetDictioninary(){
        let self=this 
        this.baseAjax({ 
            url:'Medical/Medical/VuxGetOptionAll',
            showLoading:false,
            type:'post',
            success:function(data){
                let list=  data.map(function(item) {
                    return {
                        name: item.value,
                        value: item.value,
                        upperid: item.upperid
                    }
                });
                self.baseFun.localSet(list,'TGDictionary')
        
            }
        })
        this.baseAjax({ 
            url:'Medical/Medical/VuxGetManagerDictioninaryAll', 
            //M_Dictioninary
            showLoading:false,
            type:'post',
            success:function(data){
                let list=  data.map(function(item) {
                    return {
                        key: item.key,
                        value: item.value,
                        type: item.type
                    }
                });
                self.baseFun.localSet(list,'MDictioninary')
        
            }
        })
    },

    async Login(){
          let self=this
      //  this.baseFun.localClear('TGDictionary')
       // localStorage.removeItem('TGDictionary');   
        //好像清不掉 除app.vue中监听刷新关闭游览器时间清localStorage外再初始化时再清一次
              var Request = new Object();
              Request = this.GetRequest();
              this.Type = Request['type'];
              this.TaskCode = Request['TaskCode'];
              this.PatientOrder=Request['PatientOrder'];
              var test=Request['test'];
              if(test=='1'){
                    this.ID="02516"    //深圳试用
                    this.FillPersonCode='102727'
                    this.PassWord="a"
              }else{

                  if(process.env.NODE_ENV === 'production' ?true:false){
                  //是生产模式则获取接口的用户信息
                  this.PassWord= JSON.stringify(JSON.parse(dsBridge.call("userApi.getLoginUserInfo")).passWord);  
                  this.PassWord=this.PassWord.replace(/\"/g,"");
                  this.ID=JSON.stringify(JSON.parse(dsBridge.call("userApi.getLoginedUser")).UserInfo.PersonCode);
                  this.ID=this.ID.replace("[","");
                  this.ID=this.ID.replace("]","");
                  this.ID=this.ID.replace(/\"/g,"");
                  this.FillPersonCode=JSON.stringify(JSON.parse(dsBridge.call("userApi.getLoginedUser")).UserInfo.W.ID);
                  
                }else{
                    //this.FillPersonCode='102727'
                    //this.PassWord="anchor" //深圳
                    // this.ID="99999"
                    // this.FillPersonCode='1'
                    // this.PassWord="a" //广州

                      this.ID="02516"    //深圳试用
                      this.FillPersonCode='102727'
                      this.PassWord="a"
                    //新疆
                    // this.PassWord= 'a';
                    // this.ID='00062';
                    // this.FillPersonCode='54'
                }
              }

                //  this.ID="02516"    //深圳试用
                //     this.FillPersonCode='102727'
                //     this.PassWord="a"
                    // this.ID="02516"    //深圳试用
                    // this.FillPersonCode='102727'
                    // this.PassWord="a"

                    // this.ID="02516"    //深圳试用
                    // this.FillPersonCode='102727'
                    // this.PassWord="a"
                    // this.ID="02516"    //深圳试用
                    // this.FillPersonCode='00000010'
                    // this.PassWord="a"
                    // this.FillPersonCode='102727'
                    //  //this.FillPersonCode='00000010'
                    // this.PassWord="a" //深圳
                    // this.ID="02516"

                  //  this.ID="02101"    //青海试用
                  //   this.FillPersonCode='9'
                  //   this.PassWord="a"
              // //新疆
                  //   this.PassWord= 'a';
                  //    this.ID='00062';
                  //   //this.ID='99999';
                  //  this.FillPersonCode='54'
               //铜陵
                    // this.PassWord= '120';
                    // this.ID='30001';
                    // this.FillPersonCode='78'

              
              this.$store.commit('UpdateFillPersonCode',this.FillPersonCode)
              this.$store.commit('ID',this.ID)
              this.DeleteNursingRecord()
              this.$store.commit('IsLogin', true)
            //   if(login.IsSuccess && login.UserInfo && login.UserInfo.W && login.UserInfo.W.ID){
            //     this.ID= login.UserInfo.W.ID.toString()
            //   }else{
            //   this.ID= '反正我进去了'
            //   }
            // this.PassWord= login.UserInfo.W.passWord
            // console.log('与原生交互js获取到的数据',login.UserInfo)
            // let login =JSON.parse(dsBridge.call("userApi.getLoginedUser"));
            //    this.ID=JSON.stringify(login.UserInfo.W.PersonCode)
            //    this.PassWord=JSON.stringify(login.UserInfo.W.PassWord)

              
              //  if(JSON.stringify(login.IsSuccess)==="false"){
              //   this.showMsg=true
              //    setTimeout(this.CloseWeb(),10000) 
              //  }else{ 'Content-Type': 'application/json',
                    
                    //  this.baseAjax({
                    //       url:'Account/PadLogin',
                    //       showLoading:false,
                    //       baseURL:'fa/',
                    //       type:'post',
                    //       headers: {
                                    
                    //         AppId: "cn.net.anke.fa.medical.vue"
                    //       },
                    //       data:{ Name: this.ID, passWord:this.PassWord
                              
                    //       },
                    //       success:function(data){
                    //         console.log(data)
                    //         console.log('data.IsSuccess',data.IsSuccess)


                    //         if(data.IsSuccess==true){

                    //             self.$store.commit('IsLogin', true)
                    //             self.DeleteNursingRecord()
                    //         }else if(data.IsSuccess==false){
                    //           //  self.showMsg=true
                    //           // setTimeout(self.CloseWeb(),10000)  
                    //           // dsBridge.call("nativeApi.backNative")
                    //           self.$store.commit('ErrorMsg', `密码或工号有误!,自动退出病历编辑`)
                    //           self.$store.commit('ErrorSwitch', true)
                    //           self.Timeout();
                    //         // self.$router.push({
                    //         //       name: 'Error', 
                    //         // })

                    //         }else{
                    //           self.$store.commit('ErrorMsg', `网络不通或地址错误，自动退出病历编辑`)
                    //           self.$store.commit('ErrorSwitch', true)
                    //           self.Timeout();


                    //         }
                            
                    //       },erro:function (err) {
                    //             console.log('报错',err)
                    //             switch (err.response.status) {
                    //                 case 404:
                    //                     self.$store.commit('ErrorMsg', `登录失败，请求出错(${err.response.status})!,自动退出病历编辑`)
                                      
                    //                     self.$store.commit('ErrorSwitch', true)
                    //                     self.Timeout();
                    //                     // error.message = '请求出错(404)'
                    //                   // self.ToastMsg='新增措施失败，请求出错(404)';
                    //                   // self.ShowDeleteState=true;
                    //                     break;
                    //                 case 500:
                    //                     self.$store.commit('ErrorMsg', '登录失败，服务器错误(500),自动退出病历编辑')
                      
                    //                     self.$store.commit('ErrorSwitch', true)
                    //                     self.Timeout();
                    //                     // self.ToastMsg='新增措施失败，服务器错误(500)';
                    //                     // self.ShowDeleteState=true;
                    //                     //  error.message = '服务器错误(500)';
                    //                     break;
                                    
                    //                 default: 
                    //                     self.$store.commit('ErrorMsg', `连接出错(${err.response.status})!,自动退出病历编辑`)
                        
                    //                     self.$store.commit('ErrorSwitch', true)
                    //                     self.Timeout();
                    //             }
                    //             throw err
                                
                        
                    //         }									
                    //   })

      },
    GetScoreModel(){
      //判断是否开启各评分模块 apgar ti 等
        let self=this;
    
        if(this.$store.state.AddPatientPage=='AddPatientRecordQH'  
          
            ){ 
              //此处判断是否需要根据不同的选择隐藏宫格
              //判断是否隐藏转运中不需要的内容
            console.log('进入隐藏',this.$store.state.AddPatientPage=='AddPatientRecordWLMQ'  
            && this.$store.state.Basicinfo.MainData.PatientType.toString() =='医疗保障' 
            &&  this.$store.state.ISUrumqiPatientType==true)
            // this.ShowGrid.Basicinfo= true,
            // this.ShowGrid.Diagnosis= true,
            
            // this.ShowGrid.Physical= false,
            // this.ShowGrid.AidCheck= false,
            // this.ShowGrid.CPRCheck= false,
            this.ShowGrid.Treaments= false
            // this.ShowGrid.Handover= false,
            // this.ShowGrid.WSJCSwitch= false,
            // this.ShowGrid.TiSwitch= false,
            // this.ShowGrid.ApgarSwitch= false,
            // this.ShowGrid.XFFSSwitch=false,
            // this.ShowGrid.FKJCSwitch= false,
            // this.ShowGrid.CKJCSwitch= false
            }
              
          this.baseAjax({    //是否显示Ti评分
                url:'Medical/Medical/VuxGetScoreModel',
                showLoading:false,
                type:'post',
                data:{TaskCode:self.$store.state.TaskCode,
                PatientOrder:self.$store.state.PatientOrder,
                ID:self.$store.state.Basicinfo.MainData.TentativeDiagnoseID,
                Name:self.$store.state.Basicinfo.MainData.TentativeDiagnoseName,
                Type:'Ti'
                },
                success:function(data){
                  if(data=="False"){
                      self.TiSwitch=false
                      self.WSJCSwitch=false
                    }else{
                    　self.TiSwitch=true
                      self.WSJCSwitch=true
                    }

                }
            })
          this.baseAjax({    //是否显示apgar评分
                url:'Medical/Medical/VuxGetScoreModel',
                showLoading:false,
                type:'post',
                data:{TaskCode:self.$store.state.TaskCode,
                PatientOrder:self.$store.state.PatientOrder,
                ID:self.$store.state.Basicinfo.MainData.TentativeDiagnoseID,
                Name:self.$store.state.Basicinfo.MainData.TentativeDiagnoseName,
                Type:'Apgar'
                },
                success:function(data){
                  if(data=="False"){
                  self.ApgarSwitch=false
                  }else{
                  　self.ApgarSwitch=true
                  }
                  console.log('判断是否满足显示条件',data, self.TiSwitch,'判断结果')  
                }
            })
          this.baseAjax({   //是否显示妇科检查
                url:'Medical/Medical/ISGynecologicalDiseases',
                showLoading:false,
                type:'post',
                data:{
                TemplateName:self.$store.state.Basicinfo.MainData.TentativeDiagnoseID,
                },
                success:function(data){
                  if(data=="False"){
                  self.FKJCSwitch=false
                  }else{
                  　self.FKJCSwitch=true
                  }
                  console.log('判断是否满足显示条件',data, self.FKJCSwitch,'妇科检查判断结果')  
                }
            })
          this.baseAjax({   //是否显示产科检查
                  url:'Medical/Medical/ISObstetricExamination',
                  showLoading:false,
                  type:'post',
                  data:{
                  TemplateName:self.$store.state.Basicinfo.MainData.TentativeDiagnoseID,
                  },
                  success:function(data){
                    if(data=="False"){
                    self.CKJCSwitch=false
                    }else{
                    　self.CKJCSwitch=true
                    }
                    console.log('判断是否满足显示条件',data, self.CKJCSwitch,'产科检查判断结果')  
                  }
              }).catch(function(erro){

                console.log(erro,'wahhhhhhhhhhhhhhhhh')
            })

            


    },
    Push(key) {
      this.$router.push({
          name: key, 
      })
    },
    async Getinfo(){
      console.log('getinfo')
  
        this.Loading=true
          

        this.$store.commit('ClearData');
        this.$store.commit('UPDATE_HEAD', true);
        this.$store.commit('UPDATE_PAGE_TITLE', '病历模块编辑')

        //以下部分在上线后需注释
        this.$store.commit('UpdateTaskCode', this.TaskCode)
        this.$store.commit('UpdatePatientOrder',this.PatientOrder)
        this.$store.commit('UpdateType',this.Type)


      
        
        //重置信息
        this.getContent=Patient()
        //this.$store.commit('AidCheck',this.getContent.AidCheck.MainData)
        //this.$store.commit('Basicinfo',this.getContent.Basicinfo.MainData)
 
        
      
        let self=this;

         this.baseAjax({ 
            url:'Medical/Medical/VuxGetOptionAll',
            showLoading:false,
            type:'post',
            success:function(data){
                let list=  data.map(function(item) {
                    return {
                        name: item.value,
                        value: item.value,
                        upperid: item.upperid
                    }
                });
                self.baseFun.localSet(list,'TGDictionary')
        
            }
        })
        this.baseAjax({ 
            url:'Medical/Medical/VuxGetManagerDictioninaryAll',
            showLoading:false,
            type:'post',
            success:function(data){
                let list=  data.map(function(item) {
                    return {
                        key: item.key,
                        value: item.value,
                        type: item.type
                    }
                });
                self.baseFun.localSet(list,'MDictioninary')
        
            }
        })
         this.baseAjax({
            url:'Medical/Medical/AddPatientRecordDM',
            //url:'api/Medical/Medical/AddPatientRecordDM',
            showLoading:false,
            type:'POST',
            params:{TaskCode:this.$store.state.TaskCode,Type:this.$store.state.Type,PatientOrder:this.$store.state.PatientOrder,ActionId:5001 },
            success:function(data){    
              console.log('获取新增病历的任务信息',data)
            
              self.$store.commit('UpdateTaskCode', data.TaskCode)
              self.$store.commit('UpdatePatientOrder',data.PatientOrder)
              self.$store.commit('UpdateType',data.Type)  
              if(process.env.NODE_ENV === 'production' ?true:false){
                  //是生产模式则获取数据库的AddPatientPage
                   self.$store.commit('UpdateAddPatientPage','AddPatientRecordSZ')//暂时
                 // self.$store.commit('UpdateAddPatientPage',data.AddPatientPage)
              }else{
                  self.$store.commit('UpdateAddPatientPage','AddPatientRecordSZ')
              }
              
              if(data.result['IsSubmit']==true ){
                    self.$store.commit('ErrorMsg', `病历已提交不能编辑`)
                    self.$store.commit('ErrorSwitch', true)
                    self.Timeout();
              }

              //新增时从任务信息中取值需要对某些值做处理，如送往地点sendadd其实是关联绑定sendaddonly
              for(var prop in data.result){
                  for(var prop1 in self.getContent.Basicinfo.MainData){    
                      if(data.result[prop]!==null && data.result[prop]!=="" && prop1===prop){
                        console.log(prop, 'prop获取的种类', typeof data.result[prop] )
                      
                        // if( prop==='SendAdd' ){  //不明白为什么这么做
                        //   //不将值赋给sendadd 
                        //   self.getContent.Basicinfo.MainData['SendAddOnly']=data.result[prop].split(',');
                        // }   else 
                        
                        if(prop==='FirstCallTime' || prop==='DrivingTime' 
                        ||prop==='ArrivedTime' || prop==='ArrivedPatientTime' 
                        ||prop==='LeaveTime' || prop==='DeliveredTime' 
                        ||prop==='TaskCompleteTime' || prop==='FirstCallTime' 
                        ||prop==='CPRStartTime' || prop==='CPREndTime' || prop==='TaskCompleteTime' 
                        
                        ){
                          // console.log('data[prop]',data[prop])
                          // let time=new Date(data[prop])
                          // console.log('time',time)
                            self.getContent.Basicinfo.MainData[prop1]
                            =self.jsonDateFormat(data.result[prop],"yyyy-MM-dd hh:mm:ss");
                            
                            //new Date(parseInt(data[prop].substr(2, 18))).toLocaleDateString()
                            //self.getLocalTime(data[prop])
                            //new Date(parseInt(data[prop].replace("/Date(", "").replace(")/", ""), 10)).toLocaleString()
                            
                            //new Date(parseInt(data[prop].substr(6, 13))).toLocaleDateString()
                        }else if(typeof self.getContent.Basicinfo.MainData[prop1]==='object'){
                          if(prop=='ThreeNonePatient'){
                              
                              self.getContent.Basicinfo.MainData[prop1] =data.result[prop].toString()=='true'?'1':'0'
                              console.log( self.getContent.Basicinfo.MainData[prop1], 'ThreeNonePatient')
                              self.getContent.Basicinfo.MainData[prop1] =self.getContent.Basicinfo.MainData[prop1].split(',');
                              console.log( self.getContent.Basicinfo.MainData[prop1], 'ThreeNonePatient11')
                        }else if(prop=='IsHaveBeenTel'){

                              self.getContent.Basicinfo.MainData[prop1] =data.result[prop].toString()=='true'?'经120':'非120'
                              console.log( self.getContent.Basicinfo.MainData[prop1], 'IsHaveBeenTel')
                              self.getContent.Basicinfo.MainData[prop1] =self.getContent.Basicinfo.MainData[prop1].split(',');
                              console.log( self.getContent.Basicinfo.MainData[prop1], 'IsHaveBeenTel11')
        
                        }else if(prop=='CRP'){

                              self.getContent.Basicinfo.MainData[prop1] =data.result[prop].toString()=='true'?'1':'0'
                              console.log( self.getContent.Basicinfo.MainData[prop1], 'CRP')
                              self.getContent.Basicinfo.MainData[prop1] =self.getContent.Basicinfo.MainData[prop1].split(',');
                              console.log( self.getContent.Basicinfo.MainData[prop1], 'CRP')
               
                        }
                        
                        else{
                            self.getContent.Basicinfo.MainData[prop1]= data.result[prop].toString().split(',');
                            console.log(prop1,self.getContent.Basicinfo.MainData[prop1])
                        }
                        
                        }
                        else{
                            self.getContent.Basicinfo.MainData[prop1]=data.result[prop]
                        }
                      }
                  }
              }
              console.log('正确遍历方式MainData',self.getContent.Basicinfo.MainData)
              console.log('正确遍历方式MainData',self.getContent.Basicinfo.errorCount)
              self.$store.commit('Basicinfo', self.getContent.Basicinfo.MainData) 
              //self.$store.commit('BasicinfoError', self.getContent.Basicinfo.MainData) 

              self.getContent=Patient()
              self.BasicinfoError=self.$store.state.Basicinfo.MainData
              self.DiagnosisError=self.$store.state.Basicinfo.MainData
              self.ErrorCount('MainData') //使用此方法将子页面的计算未填数方法调用
              self.GetScoreModel()
              
            }
        })
         //  this.$stores.commit('UPDATE_LOADING', true)
           this.$store.commit('UPDATE_LOADING', true)
            this.baseAjax({
              url:'Medical/Medical/VuxGetM_TreatmentRecordForTG',
              //url:'api/Medical/Medical/AddPatientRecordDM',
              showLoading:false,
              type:'POST',
              params:{TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder },
                success:function(data){    
                  console.log('获取已保存的体格检查信息',data)
                  let a=data.rows
                  data=data.result
                    self.$store.commit('UPDATE_LOADING', true)
                  if(a>0){
                    for(let i = 0; i < a; i++) {
                        for (var m in self.getContent.Physical.TG) {
                          
                          if(m=data[i].ProjectID){
                            if(typeof self.getContent.Physical.TG[m]==='object'){
                                if(data[i].MeasureContent!=null && data[i].MeasureContent!=''  ){
                                  
                                  self.getContent.Physical.TG[m]= data[i].MeasureContent.toString().split(',');
                                }
                            }else{
                                self.getContent.Physical.TG[m]=data[i].MeasureContent
                            }
                          }
                      }
                    }
                      self.$store.commit('Physical', self.getContent.Physical.TG) 
                  }
                  self.PhysicalError=self.$store.state.Physical.TG
                  //self.ErrorCount() //使用此方法将子页面的计算未填数方法调用
                  self.errorCount=0;//先清空
                    for (var m in self.$store.state.Physical.TG) {
                      if (m in self.$v.PhysicalError) {
                        if (!self.$v.PhysicalError[m].required) {
                          self.errorCount++;
                        }
                      }
                    }
                  //  self.$stores.commit('UPDATE_LOADING', true)
                  self.$store.commit('PhysicalError', self.errorCount) 
                  self.ErrorCount('TG') //使用此方法将子页面的计算未填数方法调用
                self.Loading=false

              },error:function (err) {
                                console.log('报错',err)
                                switch (err.response.status) {
                                    case 404:
                                        self.$store.commit('ErrorMsg', `获取体格检查失败，请求出错(${err.response.status})!,自动退出病历编辑`)

                                        self.$store.commit('ErrorSwitch', true)
                                        self.Timeout();
                                        break;
                                    case 500:
                                        self.$store.commit('ErrorMsg', '获取体格检查失败，服务器错误(500),自动退出病历编辑')
                      
                                        self.$store.commit('ErrorSwitch', true)
                                        self.Timeout();
                                        break;
                                    
                                    default: 
                                        self.$store.commit('ErrorMsg', `连接出错(${err.response.status})!,自动退出病历编辑`)
                        
                                        self.$store.commit('ErrorSwitch', true)
                                        self.Timeout();
                                }
                                throw err
                                
                        
                            }
            })
            
            // .catch(function (error) {
            //   self.error= JSON.stringify(JSON.parse(error))
            // })





            this.baseAjax({  //获取外科检查数据
                url:'Medical/Medical/VuxGetPatientRecordWsjc',
                showLoading:false,
                type:'post',
                data:{
                TaskCode:this.$store.state.TaskCode,OrderCode:this.$store.state.PatientOrder,type:this.$store.state.Type},
                success:function(data){
                   // console.log('getmeasureRecord',data)
                    
                  for(let i = 0; i < data.rows.length; i++) {
                      data.rows[i].WSType= data.rows[i].WSType.split(',')
                  }
                  self.$store.commit('WSJCList', data.rows) 
                    console.log('data.rows',data.rows)
                }
            })
            this.GetScoreModel()
            this.OpenMessage()
           // this.OpenMessageName()
    },
      async loadBasicDictionary(){
        let self=this;
      
        this.baseAjax({
            url:'api/Medical/Medical/VuxLoadPatient',
            showLoading:false,
            type:'post',
            params:{TaskCode:this.TaskCode,Type:'add',PatientOrder:this.PatientOrder,ActionId:8002 },
            success:function(data){    
                console.log('data',data)
               // self.HCList=data;
    
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

    showDialog(key) {
      if (this.load[key]) {
       // this.toggle[key] = true;
      } else {
        // 使用 v-if 提高第一次加载速度
        this.load[key] = true;
       // this.toggle[key] = true;
      }
    },
    GetMainData(Name){
        //通过路由将填写信息传入
      // this.getContent[Name].errorCount=this.$route.params.errorCount;
      // console.log(this.getContent[Name].errorCount,'this.getContent[a].errorCount')
      // //this.getContent.Basicinfo.errorCount=this.$route.params.errorCount;
      // for(var prop1 in this.$route.params.MainData){    
      //   //此处将页面填写的值传回,赋值时需将未填的项目排除
      //   if(this.$route.params.MainData[prop1]!==null && this.$route.params.MainData[prop1]!=="" ){
      //       console.log(this.$route.params.MainData[prop1],'this.$route.params.MainData[prop1]')
      //       this.getContent[Name].MainData[prop1]=this.$route.params.MainData[prop1]
      //   }
      // }        
      //  this.$store.commit(Name, this.getContent[Name].MainData) 
      console.log(this.$store.state[Name],'self.$store.state.Basicinfo')
      this.getContent[Name].MainData =this.$store.state[Name].MainData
      this.getContent[Name].errorCount=this.$store.state[Name].errorCount
      console.log(this.getContent[Name].MainData,'this.getContent.Basicinfo.MainData')
      console.log(this.getContent[Name].errorCount,'this.getContent.Basicinfo.errorCount');
    },
    // ChildComponents() {
    //   // console.log("ChildComponents");
    //     return {
    //       getBasicinfo: v => {
    //         console.log("getBasicinfo");
    //         console.log(v);
    //         this.getContent.Basicinfo = v;
    //       },

    //     }
      
    //   },
    DeleteNursingRecord(){
            //壳子过来全是edit 没有add状态 故没用到
            let self=this;
            if(self.Type==='add'){
              this.baseAjax({
                  url:'Medical/Medical/VuxDeleteNursingRecord',
                  showLoading:false,
                  type:'post',
                  params:{ TaskCode:self.TaskCode,PatientOrder:self.PatientOrder  },
                  success:function(data){    
                      //self.GetMeasureRecord();
                      console.log('走到删除这步2')
                      self.Getinfo();
                  }
              })
            }else{
                self.Getinfo();
            }
    },
   
    SavePatientRecord(SubmitType){
       var submit=this.$store.state.Basicinfo.MainData
        
        console.log('submit',submit)
        for(var prop1 in this.$store.state.Basicinfo.MainData){   
          if(prop1=='Type'){
            submit[prop1]=this.$store.state.Type

          } 
          if(typeof submit[prop1]==='object') {
            submit[prop1]=submit[prop1].toString()
              
              //此处将所有单选返回bool的数据在保存时从object转换为bool
              if((prop1==='ThreeNonePatient' || prop1==='CRP' )   && submit[prop1]==''){
                  submit[prop1]=false
              }else if((prop1==='ThreeNonePatient' || prop1==='CRP')  && submit[prop1]=='1'){
                  submit[prop1]=true
              }else if((prop1==='ThreeNonePatient' || prop1==='CRP')  && submit[prop1]=='0'){
                  submit[prop1]=false
              }
              if(prop1==='IsHaveBeenTel'    && submit[prop1]==''   ){ //广州目前先这么做 千万不能删
                  submit[prop1]=false
              }else if(prop1==='IsHaveBeenTel'   && submit[prop1]=='经120'){
                  submit[prop1]=true
              }else if(prop1==='IsHaveBeenTel'  && submit[prop1]=='非120'){
                  submit[prop1]=false
              }
          }
          if(prop1==='FirstCallTime' || prop1==='DrivingTime' 
            ||prop1==='ArrivedTime' || prop1==='ArrivedPatientTime' 
            ||prop1==='LeaveTime' || prop1==='DeliveredTime' 
            ||prop1==='TaskCompleteTime' || prop1==='FirstCallTime' 
            ||prop1==='CPRStartTime' || prop1==='CPREndTime' || prop1==='TaskCompleteTime' ){
             // console.log(typeof this.$store.state.Basicinfo.MainData[prop1],prop1,'typeof this.$store.state.Basicinfo.MainData[prop1]')
          
          }
        }
        this.$store.state.Basicinfo.MainData['TaskCode']=this.$store.state.TaskCode
        this.$store.state.Basicinfo.MainData['PatientOrder']=this.$store.state.PatientOrder
        submit['TaskCode']=this.$store.state.TaskCode
        submit['PatientOrder']=this.$store.state.PatientOrder

        submit['FillPersonCode']=this.$store.state.FillPersonCode
        
        submit['LastModifyPerson']=this.$store.state.FillPersonCode
        console.log(SubmitType,'SubmitType')
        if(SubmitType==='Submit'){
            submit['IsSubmit']=true
             submit.PadType='补充病历已提交'
        }else{
            submit['IsSubmit']=null
            submit.PadType='补充病历已保存'// 保存时赋值为Padvue保存 后面提交时用Padvue提交

        }
        //submit['IsSubmit']=SubmitType
        console.log('submit',submit)
        console.log('this.$store.state.Basicinfo.MainData',this.$store.state.Basicinfo.MainData)
        this.getContent.WSJC.MainData.List=this.$store.state.WSJC.MainData.List
        for(let i = 0; i <this.getContent.WSJC.MainData.List.length; i++) {
                this.getContent.WSJC.MainData.List[i].WSType= this.getContent.WSJC.MainData.List[i].WSType.toString()
        }
        console.log('this.getContent.WSJC.MainData.List',this.getContent.WSJC.MainData.List)
        console.log('this.$store.state.WSJC.MainData.List',this.$store.state.WSJC.MainData.List)
        console.log('this.$store.state.Basicinfo.MainData 看看提交前是什么状况',this.$store.state.Basicinfo.MainData)
        let self=this
        let data2={model: submit,
                    rows:self.getContent.WSJC.MainData.List, }
                          self.baseAjax({
                            url:'Medical/Medical/VuxSavePatient',
                            showLoading:true,
                            type:'post',
                            headers: {
                              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                            },
                            data:"msg=" + encodeURIComponent(JSON.stringify(data2)),
                            success:function(data){
                              console.log('进入保存成功',data)
                              if(data){
                                self.showSubmitInfo=false
                                self.showtoast=false
                                
                            
                                self.$store.commit('ErrorMsg', `保存病历成功，两秒后返回病历列表`)
                                
                                self.$store.commit('ErrorSwitch', true)
                                self.Timeout();
                               // self.$store.commit('ErrorSwitch', false)
                               // dsBridge.call("nativeApi.backNative")
                               // self.$store.commit('Basicinfo', self.getContent.Basicinfo.MainData) 
                              }else{
                                // self.showSubmitInfo=false
                                // self.showtoast=true
                                // self.ToastMsg='保存病历失败'
                                self.$store.commit('ErrorMsg', `保存病历主表失败`)
                                self.$store.commit('ErrorSwitch', true)
                                self.ChangeBasicinfo()
                               // self.$store.commit('ErrorSwitch', false)
                                //self.Timeout();
                                
                                //self.$store.commit('Basicinfo', self.getContent.Basicinfo.MainData) 
                              }
                            },
                            
                          })
    },
    ChangeBasicinfo(){
      //此处将保存时修改的类型改回
      var data=Patient()
      console.log('data.Basicinfo.MainData',data.Basicinfo.MainData)
      for(var prop in this.$store.state.Basicinfo.MainData){
                  for(var prop1 in data.Basicinfo.MainData){    
                      if(this.$store.state.Basicinfo.MainData[prop]!==null && this.$store.state.Basicinfo.MainData[prop]!=="" && prop1===prop){
                        console.log(prop, 'prop获取的种类', typeof this.$store.state.Basicinfo.MainData[prop] )

                        // if( prop==='SendAdd' ){  //不明白为什么这么做
                        //   //不将值赋给sendadd 
                        //    data.Basicinfo.MainData['SendAddOnly']=this.$store.state.Basicinfo.MainData[prop].split(',');
                        // }   else 
                        
                        if(prop==='FirstCallTime' || prop==='DrivingTime' 
                        ||prop==='ArrivedTime' || prop==='ArrivedPatientTime' 
                        ||prop==='LeaveTime' || prop==='DeliveredTime' 
                        ||prop==='TaskCompleteTime' || prop==='FirstCallTime' 
                        ||prop==='CPRStartTime' || prop==='CPREndTime' || prop==='TaskCompleteTime' 
                        
                        ){
                          // console.log('data[prop]',data[prop])
                          // let time=new Date(data[prop])
                          // console.log('time',time)

                            //  data.Basicinfo.MainData[prop1]
                            // =this.jsonDateFormat(this.$store.state.Basicinfo.MainData[prop],"yyyy-MM-dd hh:mm:ss");
                            
                            //new Date(parseInt(data[prop].substr(2, 18))).toLocaleDateString()
                            //self.getLocalTime(data[prop])
                            //new Date(parseInt(data[prop].replace("/Date(", "").replace(")/", ""), 10)).toLocaleString()
                            
                            //new Date(parseInt(data[prop].substr(6, 13))).toLocaleDateString()
                        }else if(typeof  data.Basicinfo.MainData[prop1]==='object'){
                           if(prop=='ThreeNonePatient'){
                              
                               data.Basicinfo.MainData[prop1] =this.$store.state.Basicinfo.MainData[prop].toString()=='true'?'1':'0'
                              console.log(  data.Basicinfo.MainData[prop1], 'ThreeNonePatient')
                               data.Basicinfo.MainData[prop1] = data.Basicinfo.MainData[prop1].split(',');
                              console.log(  data.Basicinfo.MainData[prop1], 'ThreeNonePatient11')
                        }else if(prop=='IsHaveBeenTel'){

                               data.Basicinfo.MainData[prop1] =this.$store.state.Basicinfo.MainData[prop].toString()=='true'?'经120':'非120'
                              console.log(  data.Basicinfo.MainData[prop1], 'IsHaveBeenTel')
                               data.Basicinfo.MainData[prop1] = data.Basicinfo.MainData[prop1].split(',');
                              console.log(  data.Basicinfo.MainData[prop1], 'IsHaveBeenTel11')
               
                        }else if(prop=='CRP'){

                               data.Basicinfo.MainData[prop1] =this.$store.state.Basicinfo.MainData[prop].toString()=='true'?'1':'0'
                              console.log(  data.Basicinfo.MainData[prop1], 'CRP')
                               data.Basicinfo.MainData[prop1] = data.Basicinfo.MainData[prop1].split(',');
                              console.log(  data.Basicinfo.MainData[prop1], 'CRP')
               
                        }
                        
                        else{
                             data.Basicinfo.MainData[prop1]= this.$store.state.Basicinfo.MainData[prop].toString().split(',');
                            console.log(prop1, data.Basicinfo.MainData[prop1])
                        }
                        
                        }
                        else{
                             data.Basicinfo.MainData[prop1]=this.$store.state.Basicinfo.MainData[prop]
                        }
                      }
                  }
      }
      this.$store.commit('Basicinfo', data.Basicinfo.MainData) 
      console.log('data.Basicinfo.MainData',data.Basicinfo.MainData)
    
    },
    SavePatientTGJC(SubmitType){
        let self=this;
        let data1 = {TG: this.$store.state.Physical.TG,
                      TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder,
                      Edit:this.$store.state.Type,Type:'TG',
                    }
              
            this.baseAjax({
                url:'Medical/Medical/VuxSavePatientTgjc',
                showLoading:true,
                type:'post',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
                data:"TG=" + encodeURIComponent(JSON.stringify(data1))  ,
                success:function(data){
                  console.log(data,'VuxSavePatientTgjc')
                  if(data.save){
                    self.SavePatientRecord(SubmitType)
                    // {model: JSON.stringify(self.getContent.Basicinfo.MainData),
                    // rows:JSON.stringify(self.getContent.WSJC.MainData.List), },
                    // headers: {
                    //           'Content-Type': 'application/json'
                    //         },
                    // let data2={model: self.getContent.Basicinfo.MainData,
                    // rows:self.getContent.WSJC.MainData.List, }
                    //       self.baseAjax({
                    //         url:'Medical/Medical/VuxSavePatient',
                    //         showLoading:false,
                    //         type:'post',
                    //         headers: {
                    //           'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    //         },
                    //         data:"msg=" + encodeURIComponent(JSON.stringify(data2)),
                    //         success:function(data){
                    //           console.log('进入保存成功',data)
                    //           if(data){
                    //             self.showSubmitInfo=false
                    //             // self.showtoast=true
                    //             // self.ToastMsg='保存病历成功，下一步调用原生接口返回app'
                    //             self.$store.commit('ErrorMsg', `保存病历成功，两秒后返回病历列表`)
                                
                    //             self.$store.commit('ErrorSwitch', true)
                    //              self.Timeout();
                    //            // dsBridge.call("nativeApi.backNative")
                    //            // self.$store.commit('Basicinfo', self.getContent.Basicinfo.MainData) 
                    //           }else{
                    //             // self.showSubmitInfo=false
                    //             // self.showtoast=true
                    //             // self.ToastMsg='保存病历失败'
                    //             self.$store.commit('ErrorMsg', `保存病历主表失败，两秒后返回病历列表`)
                    //             self.$store.commit('ErrorSwitch', true)
                    //             self.Timeout();
                                
                    //             //self.$store.commit('Basicinfo', self.getContent.Basicinfo.MainData) 
                    //           }
                    //         },
                    //          error:function (err) {
                    //             console.log('报错',err)
                    //           // self.ToastMsg='新增措施失败，请检查网络问题'+err;
                    //             switch (err.response.status) {
                    //                 case 404:
                    //                     self.$store.commit('ErrorMsg', `保存病历主表失败，请求出错(${err.response.status})!，两秒后返回病历列表`)
                    //                     self.$store.commit('ErrorSwitch', true)
                    //                     self.Timeout();
                    //                     // error.message = '请求出错(404)'
                    //                   // self.ToastMsg='新增措施失败，请求出错(404)';
                    //                   // self.ShowDeleteState=true;
                    //                     break;
                    //                 case 500:
                    //                     self.$store.commit('ErrorMsg', '保存病历主表失败，服务器错误(500)，两秒后返回病历列表')
                    //                     self.$store.commit('ErrorSwitch', true)
                    //                     self.Timeout();
                    //                     // self.ToastMsg='新增措施失败，服务器错误(500)';
                    //                     // self.ShowDeleteState=true;
                    //                     //  error.message = '服务器错误(500)';
                    //                     break;
                    //                 default: 
                    //                     self.$store.commit('ErrorMsg', `连接出错(${err.response.status})!，两秒后返回病历列表`)
                        
                    //                     self.$store.commit('ErrorSwitch', true)
                    //                     self.Timeout();
                    //             }
                    //             throw err
                                
                    //         }							
                    //       })
                  }else{
                    //若保存失败则弹框提示出现问题
                    self.showSubmitInfo=false
                    // self.showtoast=true
                    // self.ToastMsg='保存体格检查数据出现问题'
                    self.$store.commit('ErrorMsg', `保存体格检查数据失败`)
                    self.$store.commit('ErrorSwitch', true)
                    //self.Timeout();
                  //  self.$store.commit('Basicinfo', self.getContent.Basicinfo.MainData) 
                  }
                }
					
              })
    },

    SavePatientJZCS(SubmitType){
      let self=this
      var list =this.$store.state.Treaments.MainData.TreamentsList

      for(let i = 0; i <list.length; i++) {
                                
          // if(list[i].DoTime !=null && list[i].DoTime !==""){
          //   list[i].DoTime= this.jsonDateFormat(list[i].DoTime,"yyyy-MM-dd hh:mm:ss");
          //   console.log('list[i].DoTime',list[i].DoTime)
          // }  
          if(list[i].JZResults ==='成功'){
            list[i].JZResults= true
            console.log('JZResults',list[i].JZResults)
          }else if(list[i].JZResults ==='失败'){
              list[i].JZResults= false
              console.log('JZResults',list[i].JZResults)
          }else{
                list[i].JZResults= null
          }
                                
      }

        // for(var prop in list){
        //         if(prop==='DoTime'&& list[prop]!==null && list[prop]!=="" ){
        //                   console.log('data[DoTime]',data[prop])
        //                   list[prop]=this.jsonDateFormat(data.result[prop],"yyyy-MM-dd hh:mm:ss");
        //                   console.log('data[DoTime]new',data[prop])
        //         }
        //       if(prop==='JZResults'    && list[prop]==''   ){ 
        //           list[prop]=null
        //       }else if(prop==='JZResults'   && list[prop]=='成功'){
        //           list[prop]=true
        //       }else if(prop==='JZResults'  && list[prop]=='失败'){
        //           list[prop]=false
        //       }
            
        // }
       // this.$store.commit('Treaments', list) 

        
        
        
        let data2={Measure:list,Edit:'add',
                Type:'JZ',TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder,PersonID:this.$store.state.FillPersonCode,
                DeleteTROrder:this.$store.state.DeleteTROrder
                };
                          self.baseAjax({
                            url:'Medical/Medical/VuxSavePatientJzcsTrue',
                            showLoading:true,
                            type:'post',
                            headers: {
                              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                            },
                            data:"msg=" + encodeURIComponent(JSON.stringify(data2)),
                            success:function(data){
                            
                              console.log('进入保存成功',data.InfoMessage)
                              if(data.InfoMessage){
                                self.SavePatientTGJC(SubmitType)
                            
                              }else{
                              
                                self.$store.commit('ErrorMsg', `保存救治措施失败`)
                                self.$store.commit('ErrorSwitch', true)
                                //self.Timeout();
                                
                                //self.$store.commit('Basicinfo', self.getContent.Basicinfo.MainData) 
                              }
                            }
                          
                          })

    },
    SubmitInfo(SubmitType){
      if(this.$store.state.JZCSSubmitType==='lsy'){
        this.SavePatientJZCS(SubmitType)

      }else{
        this.SavePatientTGJC(SubmitType)
      }
      
        
    },
    ErrorCount(type){
      this.BasicinfoError=this.$store.state.Basicinfo.MainData
      this.DiagnosisError=this.$store.state.Basicinfo.MainData
      this.PhysicalError=this.$store.state.Physical.TG
        //this.errorContent='';
        if(type=='MainData' || type=='All'){
          this.errorCount=0;//先清空
          this.$store.commit('UPDATE_LOADING', true)

          for (var m in this.$store.state.Basicinfo.MainData) {
            if (m in this.$v.BasicinfoError) {
              if (!this.$v.BasicinfoError[m].required &&  this.$v.BasicinfoError[m].required !=undefined) {
                console.log(m,'这个没填',this.$v.BasicinfoError[m].required)
                
                this.errorCount++;
              }
            }
          }
          this.$store.commit('BasicinfoError', this.errorCount) 
            this.errorCount=0;//先清空
            for (var m in this.$store.state.Basicinfo.MainData) {
              if (m in this.$v.DiagnosisError ) {
                if (!this.$v.DiagnosisError[m].required  &&  this.$v.DiagnosisError[m].required !=undefined) {
                  this.errorCount++;
                }
              }
            }
        this.$store.commit('DiagnosisError', this.errorCount) 
        this.errorCount=0;//先清空
        for (var m in this.$store.state.Basicinfo.MainData) {
          if( (m ==='IsPTBook' || m ==='IsHandover') &&  (this.$store.state.Basicinfo.MainData[m].toString()===''
          ||  this.$store.state.Basicinfo.MainData[m].toString()===null)
          ){
            this.errorCount++;
          }
        }
        this.$store.commit('HandoverError', this.errorCount) 
        }
        if(type=='TG' || type=='All'){
          this.errorCount=0;//先清空
          this.PhysicalError=this.$store.state.Physical.TG
          
              this.errorCount=0;//先清空
              for (var m in this.$store.state.Physical.TG) {
                    if (m in this.$v.PhysicalError) {
                        if (!this.$v.PhysicalError[m].required &&  this.$v.PhysicalError[m].required !=undefined)  {
                                this.errorCount++;
                            }
                        }
                  }
              this.$store.commit('PhysicalError', this.errorCount) 
        }
        this.$store.commit('UPDATE_LOADING', false)
        //Diagnosis
        //目前不用这种方法
        //此处通过中转站获取其他页面中的方法
        //console.log('此处通过中转站获取其他页面中的方法')
        // TransferUtil.$emit('Basicinfo','msg');
    },
    ShowPatientType(){
        if(this.$store.state.AddPatientPage=='AddPatientRecordQH'  && this.$store.state.Basicinfo.MainData.PatientType.toString() =='医疗保障' ){
          this.showSaveMsg=true
          this.showyanzheng=false//打开无校验的（不弹出未填数量弹框）
      
        }else{
          this.showSaveMsg=true
        }
    },
    
    Timeout:function(){
            setTimeout(function(){
              //延时执行
              console.log('进入延时方法！')
            dsBridge.call("nativeApi.backNative")   
            },2000);
    },
    CloseWeb(){
      dsBridge.call("nativeApi.backNative")
    },
  },
 




  }
</script>

<style scoped>
.vux-header-box {
  z-index: 100;
  /* position: absolute; */
   position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.weui-grids {
  background-color: #fff;
}
.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
}
.red{
 color:red;

}
.black{
  color:black;

}

</style>