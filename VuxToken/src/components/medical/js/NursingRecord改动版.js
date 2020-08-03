import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
    XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
   Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,
   FlexboxItem,Toast,Actionsheet } from 'vux'
import {TreamentItemModel,GoodModel} from "@/model/Patient.js";
export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            console.log(from, 'from');
            if(from.path==='/medical/Treaments'  || from.path==='/medical/Treaments/'){
                console.log('vm.getBasicinfoData()')
                vm.getBasicinfoData();
            }
            if(from.path==='/medical/GoodsList' || from.path==='/medical/GoodsList/'){
              //  to.meta.keepAlive =true
                vm.GoodsListBack();
            }
        });
    },
    beforeRouteLeave(to, from, next) {

       // if(to.name=="Treaments" ||to.name=="GoodsList" ){
        if(to.name=="GoodsList" ){
            if(!from.meta.keepAlive){
               // from.meta.keepAlive =true
            }
        }else{
            to.meta.keepAlive =false;
            from.meta.keepAlive =false;
            this.$destroy();
        }
       
      
        next()
    },
        created(){
        
        this.loadBasicDictionary();
        console.log('created')
        },

        mounted() {
        window.addEventListener('resize', this.scrollIntoView)
        //this.$store.commit('UPDATE_HEAD', false);//隐藏头部
        this.$store.commit('UPDATE_HEAD', true);
        this.$store.commit('UPDATE_PAGE_TITLE', '救治记录')
            
        
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
            Datetime,
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
            XButton,
            Toast,
            Actionsheet,
            XButton 
        },
        data() {
        return {
        TaskCode:'',
        PatientOrder:'',
        TROrder:'',
        PatientRecordID:'',
        DataModel: TreamentItemModel(),

        GoodModel:GoodModel(),
        Record:[],
        ProjectIDName:'',

        JZDDlist:[],
        SBResonlist:[],
        HCList:[],
        ResponsClassifylist:[{name:'医生',value:'医生'},{name:'护士',value:'护士'},{name:'医生和护士',value:'医生和护士'}],
        JZResultslist:[{name:'失败',value:'失败'},{name:'成功',value:'成功'}],
        showPopupPlace:false,
        showPopupJZResults:false,
        showPopupSBReson:false,
        ShowHC:false,
        ShowEditGoods:false,

         //弹窗开关

         ShowDeleteState:false,
         
         showDeleteMsg:false,
         ShowDeleteState:false,//删除是否成功
         Issuccess:'',
         ToastMsg:'',

         Menus:{
            'title.noop': '是否确定删除?<br/><span style="color:#666;font-size:12px;">删除后无法撤消</span>',
            delete: '<span style="color:red">删除</span>'
            
          },
        
        //     let TreamentItemModel = () => {
        //   return {
        //     //来自字典的 相关数据
        //     fromFromDic: {
        //       Prefixes: "",
        //     },
        //     //与数据库表内同名的数据
        //     form: {
        //       TROrder: 0,//主键相关
        //       ProjectID: "",
        //       MeasureContent: "",//默认=Prefixes
        //       DoTime: "",
        //       Place: [],
        //       JZResults: "",
        //       SBReson: [],
        //       Results: "",
        //       ResponsClassify: "",
        //       DoOrder: 1,//顺序号
        //       // 数据库表其余字段要么暂时没有使用 要么 保存时关联M_PredefinedTreatmentRecord等字典得到
        //     },
        //     // //与数据库保存相关的字段
        //     // OtherForm:{
        //     // },
        //     // 这里隐含一个 放 GoodModel Ls
        //     Detail: []
        //   }
        // }


        }
        },
        // beforeRouteLeave(to, from, next) {
        //          // 设置下一个路由的 meta
        //         to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
        //         next();
        //     },
        methods:{


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

        async loadBasicDictionary(){
        let self=this;
        this.baseAjax({
                url:'Medical/Medical/VuxGetManagerDictioninary',
                showLoading:true,
                type:'post',
                data:{TypeCode:'JZDD'},
                success:function(data){
                self.JZDDlist=  data.map(function(item) {
                    return {
                        name: item.value,
                        value: item.value
                    }
                });
                
                }
            })
        this.baseAjax({
                url:'Medical/Medical/VuxGetManagerDictioninary',
                showLoading:true,
                type:'post',
                data:{TypeCode:'SBYY'},
                success:function(data){
                self.SBResonlist=  data.map(function(item) {
                    return {
                        name: item.value,
                        value: item.value
                    }
                });
                
                }
            })

        
        },

        back(){
            this.$router.go(-1);//返回上一层
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
            };

　　　　　　　//因为年份是4位数，所以单独拿出来处理
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
　　　　　　　
　　　　　　  //遍历dtObj
            for (var k in dtObj) {
　　　　　　　　　 //dtObj的属性名作为正则进行匹配
                if (new RegExp("(" + k + ")").test(format)) {
　　　　　　　　　　　 //月，日，时，分，秒 小于10时前面补 0
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? dtObj[k] : ("00" + dtObj[k]).substr(("" + dtObj[k]).length));
                }
            }

            return format;
        },

        
        getBasicinfoData() {
        console.log('获取救治记录明细方法')
      
        console.log('this.$route.params.Record',this.$route.params.Record)
        console.log('this.$route.params.Record.JZResults',this.$route.params.Record.JZResults)
        
        this.DataModel.form.PatientRecordID=this.$route.params.Record.PatientRecordID
        this.DataModel.form.TROrder=this.$route.params.Record.TROrder
        this.DataModel.form.DoOrder=this.$route.params.Record.DoOrder
        this.DataModel.form.MeasureContent=this.$route.params.Record.MeasureContent
        this.DataModel.form.JZResults=this.$route.params.Record.JZResults
        this.ProjectIDName=this.$route.params.Record.MeasureContent
        if(this.$route.params.Record.JZResults!=null){
            if(this.DataModel.form.JZResults===1||this.DataModel.form.JZResults==='成功'||this.DataModel.form.JZResults==='1'){
                this.DataModel.form.JZResults='成功'.split(',')
            }else if(this.DataModel.form.JZResults===0||this.DataModel.form.JZResults==='失败'||this.DataModel.form.JZResults==='0'){
                this.DataModel.form.JZResults='失败'.split(',')

            }else{
                this.DataModel.form.JZResults=[]
            }
        }else{
            this.DataModel.form.JZResults=[]
        }
       // this.DataModel.form.JZResults=this.$route.params.Record.JZResults!=null?this.$route.params.Record.JZResults.split(','):this.$route.params.Record.JZResults=''.split(',')
        this.DataModel.form.Results=this.$route.params.Record.Results
        this.DataModel.form.ResponsClassify=this.DataModel.form.ResponsClassify!=null?this.$route.params.Record.ResponsClassify.split(','):this.$route.params.Record.ResponsClassify=[]
        if(this.$route.params.Record.DoTime!=null){
            this.DataModel.form.DoTime =this.$route.params.Record.DoTime
        }

        this.DataModel.form.SBReson=this.$route.params.Record.SBReson!=null?this.$route.params.Record.SBReson.split(','):this.DataModel.form.SBReson=[]
        this.DataModel.form.Place=this.$route.params.Record.Place!=null?this.$route.params.Record.Place.split(','):this.DataModel.form.Place='现场'.split(',')
        
        let self=this;
        this.baseAjax({
            url:'Medical/Medical/VuxGetGoodsName',
            showLoading:true,
            type:'post',
            data:{PatientRecordID:this.$store.state.TaskCode+this.$store.state.PatientOrder,TROrder:this.$store.state.TROrder},
            success:function(data){
             //   self.HCList=data
                console.log(self.HCList)
                self.HCList=data
            
            }
        })
        },



        forbid(){
            //禁止软键盘弹出
            document.activeElement.blur();
         },
        
        GoodsListBack(){
            // console.log('GoodsListBack')
            // this.Issuccess=this.$route.params.Issuccess
            // this.PatientRecordID=this.$route.params.PatientRecordID
            // this.TROrder=this.$route.params.TROrder


            this.ProjectIDName=this.$route.params.ProjectIDName
            console.log('获取GOODlistform参数',this.$route.params.form)
            this.DataModel.form=this.$route.params.form
            let self=this;
            this.baseAjax({
                url:'Medical/Medical/VuxGetGoodsName',
                showLoading:true,
                type:'post',
                data:{PatientRecordID:this.$store.state.TaskCode+this.$store.state.PatientOrder,TROrder:this.$store.state.TROrder},
                success:function(data){
                    self.HCList=data
                    console.log('self.HCList',self.HCList)
                }
            })
        },


        handleEdit(index, row) {
            // this.$router.push({
            //     name: 'NursingRecord', //救治记录明细
            //     params: {
            //         Record:row,
            //         PatientRecordID:'201909231506200101011'
            //     },
            //     replace:true  //此处可使路由history不记录本次历史 或直接将push改为replace应该就可以
            // })
            console.log(index, row);
        },
        EditHC(row){

            console.log(row, 'row');
            this.ShowEditGoods = true
            this.GoodModel.form.GoodsName=row.GoodsName         // 物品名称
            this.GoodModel.form.Spec=row.Spec                   //物品规格
            this.GoodModel.form.Num=row.Num                     //数量
            this.GoodModel.form.UseNum=row.UseNum               //使用剂量
            this.GoodModel.form.LossVal=row.LossVal             //意外消耗
            this.GoodModel.OtherForm.ID=row.ID
            this.GoodModel.OtherForm.TableName=row.TableName
            this.GoodModel.OtherForm.CategoryID = row.CategoryID
            this.GoodModel.fromFromDic.MinNum=row.MinNum
            this.GoodModel.fromFromDic.MinSpec=row.MinSpec
        },
        CancleEditGoods()
        {

            console.log(' this.GoodModel', this.GoodModel)
            this.ShowEditGoods = false
            // this.GoodModel.form.GoodsName=row.GoodsName         // 物品名称
            // this.GoodModel.form.Spec=row.Spec                   //物品规格
            // this.GoodModel.form.Num=row.Num                     //数量
            // this.GoodModel.form.UseNum=row.UseNum               //使用剂量
            // this.GoodModel.form.LossVal=row.LossVal             //意外消耗
            // this.GoodModel.OtherForm.ID=row.ID
            // this.GoodModel.OtherForm.TableName=row.TableName
            // this.GoodModel.OtherForm.CategoryID = row.CategoryID
            // this.GoodModel.fromFromDic.MinNum=row.MinNum
            // this.GoodModel.fromFromDic.MinSpec=row.MinSpec
        },
       
        ChangeUseNum(){
            console.log('this.GoodModel.OtherForm.CategoryID',this.GoodModel.OtherForm.CategoryID)
       

            if(this.GoodModel.OtherForm.CategoryID=="3"){
                this.GoodModel.form.UseNum = this.GoodModel.form.Num*1.00*this.GoodModel.fromFromDic.MinNum+this.GoodModel.fromFromDic.MinSpec
            }else{
                
                console.log(this.GoodModel.form.Spec,'this.GoodModel.form.Spec')
                this.GoodModel.form.UseNum = this.GoodModel.form.Num+this.GoodModel.form.Spec
                console.log( this.GoodModel.form.UseNum,' this.GoodModel.form.UseNum')
            }
            
        },
        EditGoods(){
            let self=this;
            this.baseAjax({
                url:'Medical/Medical/VuxEditGoods',
                showLoading:true,
                type:'post',
                data:{PatientRecordID:this.$store.state.TaskCode+this.$store.state.PatientOrder,
                    Name:this.GoodModel.form.GoodsName,
                    Num:this.GoodModel.form.Num,
                    UseNum:this.GoodModel.form.UseNum,
                    ID:this.GoodModel.OtherForm.ID,
                    TableName:this.GoodModel.OtherForm.TableName,
                    LossVal:this.GoodModel.form.LossVal,
                    },
                success:function(data){
                    console.log('data',data)
                    if(data){
                        self.ToastMsg='修改耗材成功';
                        self.ShowDeleteState=true;
                    //reload
                    self.baseAjax({
                        url:'Medical/Medical/VuxGetGoodsName',
                        showLoading:true,
                        type:'post',
                        data:{PatientRecordID:self.$store.state.TaskCode+self.$store.state.PatientOrder,TROrder:self.$store.state.TROrder},
                        success:function(data){
                            self.HCList=data
                            console.log('self.HCList',self.HCList)
                        }
                    })
                    self.ShowEditGoods = false
                    }else{
                        self.ToastMsg='修改耗材有问题';
                        self.ShowDeleteState=true;
                         //reload
                        self.baseAjax({
                                    url:'Medical/Medical/VuxGetGoodsName',
                                    showLoading:true,
                                    type:'post',
                                    data:{PatientRecordID:self.$store.state.TaskCode+self.$store.state.PatientOrder,TROrder:self.$store.state.TROrder},
                                    success:function(data){
                                        self.HCList=data
                                        console.log('self.HCList',self.HCList)
                                    }
                                })
                        self.ShowEditGoods = false
                    }
                    console.log('self.HCList',self.HCList)
                }
            })
        },
        DeleteHC(row){
            let self=this;
            this.baseAjax({
                url:'Medical/Medical/VuxdeleteGoods',
                showLoading:true,
                type:'post',
                data:{PatientRecordID:this.$store.state.TaskCode+this.$store.state.PatientOrder,
                    ID:row.ID,
                    TableName:row.TableName,

                },
                success:function(data){    
                    console.log('data',data)
                    if(data.InfoMessage=true){
                   //reload
                    self.baseAjax({
                        url:'Medical/Medical/VuxGetGoodsName',
                        showLoading:true,
                        type:'post',
                        data:{PatientRecordID:self.$store.state.TaskCode+self.$store.state.PatientOrder,TROrder:self.$store.state.TROrder},
                        success:function(data){
                            self.HCList=data
                            console.log('self.HCList',self.HCList)
                        }
                    })
                        self.ToastMsg='删除耗材成功';
                        self.ShowDeleteState = true;

                    }else{
                        self.ToastMsg='删除耗材失败，后台错误';
                        self.ShowDeleteState=true;
                        
                    }
                }
                })

        },
        OpenGoodsList() {
            this.$router.push({
                name: 'GoodsList', 
                params:{
                    ProjectIDName:this.ProjectIDName,
                    from:this.DataModel.form
                },
                replace:true  //此处可使路由history不记录本次历史 
            })
        },
        sumbit(){
            console.log('this.DataModel.form',this.DataModel.form)
            //替换修改
                var list=this.$store.state.Treaments.MainData.TreamentsList
                 //将对象转化为字符串再存入
                 for(var prop in this.DataModel.form){   
                    if(typeof  this.DataModel.form[prop]==='object' && this.DataModel.form[prop]!==null  ){
                        this.DataModel.form[prop]=this.DataModel.form[prop].toString()
                    }
                }
                console.log(list,'前')
                var index = list.findIndex(item =>{
                    if(item.TROrder ==this.DataModel.form.TROrder){
                        return true;
                    }
                })
                list.splice(index,1, this.DataModel.form)
                
               
                

                console.log(list,'list后')
                this.$store.commit('Treaments', list) 
                this.$router.replace({
                        name: 'Treaments',
                        params: {
                            ToastMsg: '保存成功',
                            ShowDeleteState:true
                        },
                    replace:true  //此处可使路由history不记录本次历史 
                })
            // let self=this
            // this.baseAjax({
            //     url:'Medical/Medical/VuxSaveNursingRecord',
            //     showLoading:true,
            //     type:'post',
            //     params:{
            //     Type:'edit'
            //     ,Edit:'edit' //Edit和Type是一个参数 均默认给了‘edit’
            //     ,TaskCode:this.$store.state.TaskCode
            //     ,PatientOrder:this.$store.state.PatientOrder
            //     ,TROrder:this.$store.state.TROrder
            //     ,MeasureContent:this.DataModel.form.MeasureContent
            //     ,DoTime:this.DataModel.form.DoTime
            //     ,Results:this.DataModel.form.Results
            //     ,ResponsClassify:this.DataModel.form.ResponsClassify
            //     //有个number为计费数量，还有很多参数暂时没有用到
            //     ,Place:this.DataModel.form.Place
            //     ,JZResults:this.DataModel.form.JZResults
            //     ,SBReson:this.DataModel.form.SBReson
            //     },
            //     success:function(data){
            //         console.log('VuxSaveNursingRecord--data  ',data)
                    
            //         if(data){  

            //             self.$router.replace({
            //                 name: 'Treaments',
            //                 params: {
            //                     ToastMsg: '保存成功',
            //                     ShowDeleteState:true
                                
            //                 },
            //                 replace:true  //此处可使路由history不记录本次历史 
            //             })
                    
            //         }else{
            //             self.ToastMsg='保存失败，请检查网络';
            //             self.ShowDeleteState=true;

            //         }


            //     }
            // })


      
        },
    },


}