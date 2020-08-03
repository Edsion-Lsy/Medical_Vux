import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
    XNumber, XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
    Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
    FlexboxItem,PopupHeader,Radio,Sticky  } from 'vux'
   
import {Basicinfo} from "@/model/Patient.js";
import { required } from "vuelidate/lib/validators";

export default {
    beforeRouteEnter(to, from, next) {
        //路由进入后
        
            next(vm => {
                vm.Getinfo();
            if(from.path==='/medical/Grid/'){
                //vm.Getinfo();
            }
        });
        },

    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
    if (to.path === '/medical/Grid') {
        console.log('将填写页面缓存关闭'+from.meta.keepAlive)
        from.meta.keepAlive = false;  //当返回九宫格后不再缓存
    } 
    next()
    },
    created(){
        this.loadDictionary();
    },
    mounted() {
        window.addEventListener('resize', this.scrollIntoView)
    },
    

    validations: {
        MainData: {
            //TentativeDiagnoseName: { required },
        
        }
    },
    data () {
        let data={
            //...Diagnosis(),
            ...Basicinfo(),//
            CRPList:[{name:"是",value:'1'},{name:"否",value:'0'}],
      
            //弹出层开关
            showContent:false,  //当选择是采用心肺复苏后再将其他内容显示
            showPopupCRPContent:false,
            showPopupCRPEffect:false,

            showPopupCRPEffect1:false,
            showPopupVisitsType:false,
            TentativeDiagnoseNameserach:'',//用于模糊搜索
        }
        return data
    },
    computed: {
        // MainDataTentativeDiagnoseName() {
        //   return this.MainData.TentativeDiagnoseName;
        // }
        MainDataCRPEffect() {
           return this.MainData.CRPEffect;
        },
        MainDataCRP() {
            return this.MainData.CRP;
         },
    },
    watch: {
        //监测对象时不能只用watch 需要computed计算属性来完成
        //拼接序号工具
        MainDataCRPEffect(val){
            console.log("MainData.CRPEffect.indexOf('有效')",this.MainData.CRPEffect.indexOf('有效')==0)
            console.log("MainData.CRPEffect.indexOf('无效')",this.MainData.CRPEffect.indexOf('无效')==0)
        },
        MainDataCRP(val){
            console.log('tostring',this.MainData.CRP.toString())
            console.log("MainData.CRP.indexOf('1')",this.MainData.CRP.indexOf('1')==0,this.MainData.CRP)
            if(this.MainData.CRP.toString()=='1'){
                console.log("打开")
                this.showContent=true
                
            }else{
                console.log("不打开")
                this.showContent=false
            }
        }

    },
    methods: {

        
        // 键盘弹出，页面重绘，将获得焦点的元素滚动至可视区域内
        scrollIntoView (time = 0) {
            // ios自带调整，所以不管
            if (/iphone/i.test(navigator.userAgent)) {
            // return
            }
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            setTimeout(() => {
                document.activeElement.scrollIntoViewIfNeeded(true)
            }, time)
            }
        },


        disabled(itema){
            if (
                (this.MainData.CRPEffect.join('').indexOf('无效')!=-1 &&itema.value!='无效') 
            || (this.MainData.CRPEffect.join('').indexOf('有效')!=-1 &&itema.value=='无效')
            ||(this.MainData.CRPEffect.join('').indexOf('无效')==-1 && this.MainData.CRPEffect.join('')!='' && itema.value=='无效' )
            )//!=-1则包含
            {
                return true //不可选
            }else{
                return false //可选
            }
        },

        forbid(){
            //禁止软键盘弹出
            document.activeElement.blur();
        },
    
        async loadDictionary(){
            let self=this;

            this.baseAjax({   //CRPEffect 复苏效果 
                url:'Medical/Medical/VuxGetManagerDictioninary',
                showLoading:true,
                type:'post',
                data:{TypeCode:'FSXG'},
                success:function(data){
                    self.CRPEffectList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({   //CRPContent 复苏内容 
                url:'Medical/Medical/VuxGetManagerDictioninary',
                showLoading:true,
                type:'post',
                data:{TypeCode:'XFFS'},
                success:function(data){
                    self.CRPContentList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })
            

        },
        Getinfo() {//初始化赋值方法
            this.TaskCode=this.$store.state.TaskCode
            this.PatientOrder=this.$store.state.TaskCode.PatientOrder
            this.MainData=this.$store.state.Basicinfo.MainData
            this.Type=this.$store.state.Basicinfo.Type
            console.log('this.$store.state.Basicinfo.MainData.CRP.toString()',this.$store.state.Basicinfo.MainData.CRP.toString())
            // if(this.$store.state.Basicinfo.MainData.CRP.toString()=='true'){
            //     this.MainData.CRP='1'.split()
            //     console.log('this.MainData.CRP',this.MainData.CRP)
            // }else {
            //     this.MainData.CRP='0'.split()
            //     console.log('this.MainData.CRP',this.MainData.CRP)
            // }
            
            console.log('this.TaskCode',this.TaskCode)
            console.log('this.MainData',this.MainData)
        },
        SaveBasicinfo(){
         
            // this.errorContent='';
            // this.errorCount=0;//先清空
            // for (var m in this.$v.MainData.$model) {
            //     if (m in this.$v.MainData) {
            //         console.log('this.$v.MainData[m].required',this.$v.MainData[m].required);
            //         if (!this.$v.MainData[m].required) {
            //         this.errorCount++;
            //         }
            //     }
            // }
            this.showtoast = true;
            this.$store.commit('Basicinfo', this.MainData) 
            this.$router.push({name: 'Grid'})
            // this.CommitMainDataUtil.SaveMainData('Basicinfo',this.MainData,this.errorContent)
            // this.$router.push({name: 'Grid'})
        
        
        }
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
        XButton,
        PopupHeader,
        Radio,
        Sticky,

    },
}