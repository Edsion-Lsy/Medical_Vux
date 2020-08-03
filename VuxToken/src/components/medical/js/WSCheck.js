import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
    XNumber, XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
    Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
    FlexboxItem,PopupHeader,Radio,Sticky  } from 'vux'
   
import {WSJC} from "@/model/Patient.js";
import { required } from "vuelidate/lib/validators";

export default {

    
    beforeRouteEnter(to, from, next) {
        next(vm => {
                vm.GetWsjc();
        });
    },
    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
    if (to.path === '/medical/Grid' || to.path === '/medical/Grid/') {
        console.log('将填写页面缓存关闭'+from.meta.keepAlive)
        from.meta.keepAlive = false;  //当返回九宫格后不再缓存
    } 
    next(
        vm => {
            vm.SaveBasicinfo();
    }
    )
    },
    created(){
        this.loadDictionary();
    },
    mounted() {
        window.addEventListener('resize', this.scrollIntoView)
    },
    

    validations: {
        MainData: {
            TentativeDiagnoseName: { required },
        
        }
    },
    data () {
        let data={
            //...Diagnosis(),
            
            ...WSJC(),
           // wstype:['开放性', '闭合性', '烧伤'],
            WSJCList:[],
            //弹出层开关
            ShowTentativeDiagnose:false,
            showPopupVisitsType:false,
            TentativeDiagnoseNameserach:'',//用于模糊搜索
        }
        return data
    },
    computed: {
        // MainDataTentativeDiagnoseName() {
        //   return this.MainData.TentativeDiagnoseName;
        // }
      },
    watch: {
   

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
        indexMethod(index) {
            return index + 1;
          },
        async loadDictionary(){
            let self=this;

            // this.baseAjax({
            //     url:'Medical/Medical/VuxGetPatientRecordWsjc',
            //     showLoading:true,
            //     type:'post',
            //     data:{
            //     TaskCode:this.$store.state.TaskCode,OrderCode:this.$store.state.PatientOrder,type:'add'},
            //     success:function(data){
            //         console.log('getmeasureRecord',data)
                    
            //         self.MainData.List=data.rows;
            //         console.log('self.MainData.List',self.MainData.List)
            //     }
            // })


            // this.baseAjax({ //WaiShangBuWei 外伤检查 
            //     url:'Medical/Medical/VuxGetManagerDictioninary',
            //     showLoading:true,
            //     type:'post',
            //     data:{TypeCode:'WaiShangBuWei'},
            //     success:function(data){
            //         self.WSJCList=  data.map(function(item) {
            //             return {
            //                 Name: item.value,
            //             }
            //         });
            //         }
            //     })

        },
        GetWsjc(){
            let self=this;
            self.MainData.List=this.$store.state.WSJC.MainData.List;
            for(let i = 0; i <this.$store.state.WSJC.MainData.List.length; i++) {
                if(this.MainData.List[i].WSType.toString()!=='' ||  this.MainData.List[i].WSType.toString()!==null){
                    this.MainData.List[i].WSType= this.$store.state.WSJC.MainData.List[i].WSType.toString().split(',')
                }else{
                    this.MainData.List[i].WSType=[]
                }
                
            }
        },


        SaveBasicinfo(){
            let show=this;
            console.log(this.MainData.List,'this.MainData.List')
            for(let i = 0; i <this.MainData.List.length; i++) {
                if(this.MainData.List[i].WSType.toString()==='' ||  this.MainData.List[i].WSType.toString()===null){
                    this.MainData.List[i].WSType= ''
                }else{
                    this.MainData.List[i].WSType= this.MainData.List[i].WSType.toString()
                }
               
            }
            console.log(this.MainData.List,'this.MainData.List')
            this.CommitMainDataUtil.SaveMainData('WSJC',this.MainData,this.errorContent)
           
            this.$router.push({name: 'Grid'})

            // this.baseAjax({
            //     url:'Medical/Medical/VuxSavePatientRecordWsjc',
            //     showLoading:true,
            //     type:'post',
            //     data:{Wsjc:this.MainData.List,Type:'add',
            //     TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder},
            //     success:function(data){
            //         console.log('是否成功',data.InfoMessage)
            //         if(data.InfoMessage){
            //             console.log('新增措施成功')
            //         }else{
            //             console.log('失败')
            //         }
            //     }
            // })
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
        XButton,
        PopupHeader,
        Radio,
        Sticky,

    },
}