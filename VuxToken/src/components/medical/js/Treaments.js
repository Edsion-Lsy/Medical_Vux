import { GroupTitle, Group, Cell, XInput, PopupPicker, Datetime, 
    XNumber, XTextarea, XSwitch, Checker, CheckerItem, 
    Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
    FlexboxItem,PopupHeader,Radio,Sticky,CellBox,FormPreview,CellFormPreview,Actionsheet,Toast   } from 'vux'
   
import {TreamentItemModel,GoodModel} from "@/model/Patient.js";
import { required } from "vuelidate/lib/validators";

export default {
    beforeRouteEnter(to, from, next) {
 
        console.log(to, 'to');
     
        next(vm => {
            console.log(from, 'from');
            console.log(from.path==='/medical/Grid')
            if(from.path==='/medical/Grid/' || from.path==='/medical/Grid'){
                console.log(vm, 'vm');
                vm.Getinfo();
              //  vm.DeleteNursingRecord();
            }

            if(from.path==='/medical/NursingRecord/'  || from.path==='/medical/NursingRecord'){
                vm.GetNursingRecordBack();
                vm.Getinfo();

            }
        });
      },
    beforeRouteLeave(to, from, next) {

         // 设置下一个路由的 meta
        if( to.path === '/medical/NursingRecord' ){
            console.log('to.path',to.path,'from.meta.keepAlive',from.meta.keepAlive)
           // from.meta.keepAlive = true;  //
            
        }else{
            from.meta.keepAlive = false;  //
            this.$destroy();
        }
        // 设置下一个路由的 meta
    // if (to.path === '/medical/Grid') {
    //     console.log('将填写页面缓存关闭'+from.meta.keepAlive)
    //     from.meta.keepAlive = false;  //当返回九宫格后不再缓存
    // } 

    
    next()
    },
    created(){
        //加载字典数据
        console.log('created函数被调用')
        this.loadDictionary();
       // this.DeleteNursingRecord();
    },
    mounted() {
        
        
        this.$store.commit('UPDATE_PAGE_TITLE', '诊断信息')  
        //this.GetMeasureRecord()//给救治措施列表赋值
    },
    

    validations: {
    },
    data () {
        let data={
            DeleteTrorder:'',//删除措施trorder标识
            DoctorOrderList:[],
            DoctorOrder:[],//打包医嘱号
            TaskCode:'',
            PatientOrder:'',
            Type:'add',//当前默认为新增 在病历有了入口传入的Type后直接初始化赋值就可以
            PredefinedTreatmentListtree:[],//救治措施

            TentativeDiagnoseName:'',
            MaindataPTN:'',
            PredefinedTreatmentName:'',
            TentativeDiagnoseNameserach:'',//用于模糊搜索
            //弹出层开关
            ShowTentativeDiagnose:false,
            showContent001:false,
        
            //弹窗开关
            showDeleteMsg:false,
            ShowDeleteState:false,//删除是否成功弹框
            ToastMsg:'',

            Menus:{
                'title.noop': '删除后无法撤消是否删除',
                delete: '<span style="color:red">删除</span>'
            },
            PTList:[],//使用救治措施列表
            PTLista:[],//使用救治措施列表
        }
        return data
    },
    computed: {
        
    },
    watch: {
        TentativeDiagnoseNameserach(val) {
            //对树节点进行筛选操作
            this.$refs.tree.filter(val);
        },
        // DoctorOrder(val) {
        //    //选择打包医嘱后直接新增相关打包内容
        //    console.log(val,'val')
        //    console.log(val.length(),'val.length()')
        // //    if(){

        // //    }
        //     this.SaveDoctorOrders(val.toString());
        // },

    },
    methods: {

        SaveDoctorOrders(val){
            let self=this
            val=val.toString()
            console.log('打包医嘱打开','val',val,'this,doctororder',this.DoctorOrder)
            if(val!=''){
                this.baseAjax({
                    url:'Medical/Medical/SaveDoctorOrders',
                    showLoading:true,
                    type:'post',
                    data:{  TaskCode:self.$store.state.TaskCode,
                            PatientOrder:self.$store.state.PatientOrder,
                            DoctorOrderID:val
                        },
                    success:function(data){    
                        console.log('data',data)
                        if(data.InfoMessage){
                                //self.GetMeasureRecord();
                                self.ToastMsg='打包医嘱新增成功';
                                self.ShowDeleteState=true;
                            
                                
                            }else{
                                //self.GetMeasureRecord();
                            
                                self.ToastMsg='打包医嘱新增失败，请检查网络问题';
                                self.ShowDeleteState=true;
                            }
                            self.GetMeasureRecord();
                    }
                })

            }
        
           // self.GetMeasureRecord();
            this.DoctorOrder=[]
            //清空单选窗口

        },
        handleNodeClick(obj,node,self){
            //节点点击时回调
            //传递给 obj 属性的数组中该节点所对应的对象、node 节点对应的 Node、self节点组件本身。
            if(!node.disabled){
                if(node.checked===true){
                    this.$refs.tree.setChecked(node.data,false);
                }else{
                    this.$refs.tree.setChecked(node.data,true);

                    
                }
            }
        },
        boxhandleNodeClick(obj,choose,other){
                //obj 传递给 data 属性的数组中该节点所对应的对象
                //choose 节点本身是否被选中 
                //other 节点的子树中是否有被选中的节点
              
                if(choose==false){
                    //删除
                    if(this.PredefinedTreatmentName.indexOf(",") == -1 ){
                        //只有一个选择
                        
                        if(this.PredefinedTreatmentName==obj.label){
                            this.PredefinedTreatmentName="";
                            
                        }
                      
                    }else{
                        console.log("obj.children") 
                        console.log(obj.children.length) 
                        console.log(obj.children) 
                        var b =this.PredefinedTreatmentName.split(",");
                
                        if(obj.children.length === 0){
                            for(let i = 0; i < b.length; i++){
                                if(b[i]==obj.label ){
                                    b.splice(i,1);
                                    console.log("删除"+obj.label)
                                    console.log("删除后"+b.toString())
                                    break; 
                                }
                            }  
                        }
                        this.PredefinedTreatmentName=b.toString();//将数组再转换为string否则后面拼接时会有问题
                    }      
                }else{ //添加
                    console.log( '添加前传入的选择',obj.label);//true
                    console.log( '添加前的列名',this.PredefinedTreatmentName);//true
                        if(this.PredefinedTreatmentName==""){
                        
                            if(obj.children.length === 0){
                                console.log("进了添加"); 
                                this.PredefinedTreatmentName=obj.label;
                            }
                        }else{
                            if(obj.children.length === 0){
                                this.PredefinedTreatmentName=this.PredefinedTreatmentName+','+obj.label;
                            }
                        }
                }
                console.log( 'this.PredefinedTreatmentName',this.PredefinedTreatmentName);//true
                // if(this.PredefinedTreatmentName==""){
                //     this.MaindataPTN="";
                // }else if(this.PredefinedTreatmentName.indexOf(",") != -1){
                //     var a =this.PredefinedTreatmentName.split(",");
                //     console.log('拆分后')
                //     console.log(a)
                // for(let i = 0; i < a.length; i++){
                //         if(i==0){
                //             this.MaindataPTN="";
                //             this.MaindataPTN='('+ (i+1) +')'+a[i];
                //             console.log('追加第一次')
                //             console.log(this.MaindataPTN)
                //         }else{
                //             this.MaindataPTN=this.MaindataPTN+',('+(i+1)+')'+a[i];
                //             console.log('追加第二次')
                //             console.log(this.MaindataPTN)
                //         }
                //     }
                // }else{
                //     this.MaindataPTN='(1)'+this.PredefinedTreatmentName;
                //     console.log(this.MaindataPTN)
                // }

        },
        PinjieTree(data) {
            let resData = data;
            let tree = [];

            let attributes = {    //定义数据属性名称
                id: 'id',
                parentId: 'parentId',
                label: 'label',
               
                rootId: '0'
                };
            for(let i = 0; i < resData.length; i++) {
                if(resData[i][attributes.parentId] ===attributes.rootId) {
                    let obj = {
                        id: resData[i][attributes.id],
                        label: resData[i][attributes.label],
                        children: [],
                        disabled:true
                    };
                    tree.push(obj);
                    resData.splice(i, 1);
                    i--;
                }
            }
            run(tree);
            function run(chiArr) {
                if(resData.length !== 0) {
                    for(let i = 0; i < chiArr.length; i++) {
                        for(let j = 0; j < resData.length; j++) {
                            if(chiArr[i].id == resData[j][attributes.parentId]) {
                                let obj = {
                                    id: resData[j][attributes.id],
                                    label: resData[j][attributes.label],
                                    children: [],
                                    disabled:false
                                };
                                chiArr[i].children.push(obj);
                                chiArr[i].disabled=true;
                                resData.splice(j, 1);
                                j--;
                            }
                        }
                        run(chiArr[i].children);
                    }
                }
            }
            console.log("tree");
            console.log(tree);
            return tree;
        },
        filterNode(value, data) {
            //筛选过滤
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        async loadDictionary(){
          
            let self=this;
            this.baseAjax({
            url:'Medical/Medical/VuxGetAllPredefinedTreatment',
            showLoading:true,
            type:'post',
            
            success:function(data){    
                console.log('data',data)
                self.PredefinedTreatmentListtree= self.PinjieTree(data);  
                console.log(self.PredefinedTreatmentListtree);
            }
            })
            this.baseAjax({         //Contract 打包医嘱 
                url:'Medical/Medical/VuxGetDoctorOrder',
                showLoading:true,
                type:'post',
                
                data:{ID:this.$store.state.ID},
                success:function(data){
                    self.DoctorOrderList=  data.map(function(item) {
                        return {
                            name: item.Name,
                            value: item.ID
                        }
                    });
                }
            })
        },
        
        change (val, label) {
            console.log('change', val, label)
        },

        closetree(){
            console.log('this.MaindataPTN',this.MaindataPTN),
            console.log('this.PredefinedTreatmentName',this.PredefinedTreatmentName)
            if(this.PredefinedTreatmentName!==''){
                if(this.MaindataPTN!=""){
                    this.MaindataPTN=this.MaindataPTN+','+this.PredefinedTreatmentName;
                }else{
                    this.MaindataPTN=this.PredefinedTreatmentName;
                }
                if(this.PTList.length == 0 ){
                    if(this.PredefinedTreatmentName.indexOf(",") != -1){
                        var arr = this.PredefinedTreatmentName.split(',');
                        for(let i = 0; i < arr.length; i++) {
                            //console.log('DoOrder',i+1)
                            let obj = {
                                Name: arr[i],   // 检查项目
                                // TROrder:i+1,    //页面顺序号
                                // DoOrder:i+1,    //序号
                                // Place: '',      //救治地点
                                // DoTime: '',     //执行时刻
                                // GoodNames:'',   //药品耗材
                                // Results:'',     //救治说明
                                // PatientRecordID:'',     //病历ID
                                // AssociateID:'',         //关联项目
                                // ProjectID:'',           //检查项目id
                                // MeasureContent:'',      //措施内容
                                // IsDoctorAdvice:'',      //是否医嘱
                                // ResponsClassify:'',     //责任分类
                                // Valuation:'',           //单价
                                // Units:'',               //单位
                                // Number:'',              //数量
                                // SBReson:'',             //失败原因
                                // Suffix:'',              //计量单位
                                // JZResults:'',           //救治结果
                                // BreathingPattern:'',    //呼吸模式
                                // TidalVolume:'',         //潮气量
                                // BreathingRate:'',       //呼吸频率
                                // PEEP:'',                //PEEP
                                // Order:'',               //最小值
                            };
                            this.PTList.push(obj);
                        }
    
                    }else{
                        //只增一个措施
                        let obj = {
                            Name: this.PredefinedTreatmentName,
                            // TROrder:1,    //页面顺序号
                            // DoOrder:1,
                            // Place: '',
                            // DoTime: '',   
                            // GoodNames:'',  //药品耗材
                            // Results:'',    //救治说明
                            // PatientRecordID:'',     //病历ID
                            // AssociateID:'',         //关联项目
                            // ProjectID:'',           //检查项目id
                            // MeasureContent:'',      //措施内容
                            // IsDoctorAdvice:'',      //是否医嘱
                            // ResponsClassify:'',     //责任分类
                            // Valuation:'',           //单价
                            // Units:'',               //单位
                            // Number:'',              //数量
                            // SBReson:'',             //失败原因
                            // Suffix:'',              //计量单位
                            // JZResults:'',           //救治结果
                            // BreathingPattern:'',    //呼吸模式
                            // TidalVolume:'',         //潮气量
                            // BreathingRate:'',       //呼吸频率
                            // PEEP:'',                //PEEP
                            // Order:'',               //最小值
                        };
                        this.PTList.push(obj);
                    }
                }else{
                    var arr = this.PredefinedTreatmentName.split(',');
                    for(let i = 0; i < arr.length; i++) {
                        let obj = {
                            Name: arr[i],
                            // DoOrder:arr.length+i+1,
                            // TROrder:arr.length+i+1,    //页面顺序号
                            // Place: '',
                            // DoTime: '',   
                            // GoodNames:'',  //药品耗材
                            // Results:'',    //救治说明
                            // PatientRecordID:'',     //病历ID
                            // AssociateID:'',         //关联项目
                            // ProjectID:'',           //检查项目id
                            // MeasureContent:'',      //措施内容
                            // IsDoctorAdvice:'',      //是否医嘱
                            // ResponsClassify:'',     //责任分类
                            // Valuation:'',           //单价
                            // Units:'',               //单位
                            // Number:'',              //数量
                            // SBReson:'',             //失败原因
                            // Suffix:'',              //计量单位
                            // JZResults:'',           //救治结果
                            // BreathingPattern:'',    //呼吸模式
                            // TidalVolume:'',         //潮气量
                            // BreathingRate:'',       //呼吸频率
                            // PEEP:'',                //PEEP
                            // Order:'',               //最小值
                        };
                        this.PTList.push(obj);
                    }
    
                }
                let self=this;
                var data1 =  {Measure:this.PTList,Edit:'add',
                Type:'JZ',TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder,PersonID:this.$store.state.FillPersonCode};
                // {Measure:this.PTList,Edit:'add',
                // Type:'JZ',TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder,PersonID:1},
                this.baseAjax({
                    url:'Medical/Medical/VuxSavePatientJzcs',
                    showLoading:true,
                    type:'post',
                    data:"msg=" + encodeURIComponent(JSON.stringify(data1)),
                    success:function(data){
                        console.log('是否成功',data.InfoMessage)
                        if(data.InfoMessage){
                            if(data.InfoMessage=='保存信息失败!'){
                                self.PTList=[]
                                self.ToastMsg='新增措施失败，请检查网络问题';
                                self.ShowDeleteState=true;

                            }else{
                                self.GetMeasureRecord();
                                self.ToastMsg='新增措施成功';
                                self.ShowDeleteState=true;
                                self.PTList=[]
                            }
                         
                            
                        }else{
                            self.GetMeasureRecord();
                            self.PTList=[]
                            self.ToastMsg='新增措施失败，请检查网络问题';
                            self.ShowDeleteState=true;
                        }
                    },
                    error:function (err) {
                        console.log('报错',err)
                       // self.ToastMsg='新增措施失败，请检查网络问题'+err;
                    
                        switch (err.response.status) {
                            case 404:
                                self.$store.commit('ErrorMsg', `新增措施失败，请求出错(${err.response.status})!`)
                            
                                self.$store.commit('ErrorSwitch', true)
                                // error.message = '请求出错(404)'
                               // self.ToastMsg='新增措施失败，请求出错(404)';
                               // self.ShowDeleteState=true;
                                break;
                            case 500:
                                self.$store.commit('ErrorMsg', '新增措施失败，服务器错误(500)')
                                self.$store.commit('ErrorSwitch', true)
                                // self.ToastMsg='新增措施失败，服务器错误(500)';
                                // self.ShowDeleteState=true;
                                //  error.message = '服务器错误(500)';
                                break;
                            default: 
                                self.$store.commit('ErrorMsg', `连接出错(${err.response.status})!`)
                                self.$store.commit('ErrorSwitch', true)
                        }
                        throw err
                    }
                })
            
            
            }else{

                    console.log('this.PredefinedTreatmentName',this.PredefinedTreatmentName)
            }
            
            
            this.ShowTentativeDiagnose=false; 
            this.PredefinedTreatmentName=''; //清空树形菜单获取的措施名
            this.$refs.tree.setCheckedKeys([]);//清空树形菜单
       
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
        GetMeasureRecord(){
            let self=this;
            this.baseAjax({
                url:'Medical/Medical/VuxGetMeasureRecord',
                showLoading:true,
                type:'post',
                data:{
                TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder,GroupID:'2000'},
                success:function(data){
                    console.log('getmeasureRecord',data)
                    self.PTLista=data.rows;
                }
            })
        },
        // DeleteRecord(List){
        //     console.log('进入delete')
        //     for(let i = 0; i < this.PTList.length; i++){
        //         console.log(this.PTList[i].Name==List.Name &&this.PTList[i].DoOrder==List.DoOrder)
        //         console.log(this.PTList[i].Name,List.Name ,this.PTList[i].DoOrder,List.DoOrder)
        //         if(this.PTList[i].Name==List.Name && this.PTList[i].DoOrder==List.DoOrder ){
        //             this.PTList.splice(i,1);
        //             console.log('this.PTList'+this.PTList)
        //             console.log('this.PTList[i].Name',this.PTList[i].Name)
        //             console.log('this.PTList[i].DoOrder',this.PTList[i].DoOrder)
        //             break; 
        //         }
        //     }  
        //     console.log('this.PTList'+this.PTList)
        // },
        TreamentUp(row){
            let self=this;
            this.baseAjax({
                url:'Medical/Medical/VuxUpAndDown',
                showLoading:true,
                type:'post',
                data:{TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder, DoOrder:row.DoOrder, TROrder:row.TROrder, Type1:'Up'},
                success:function(data){    
                    console.log('data',data)
                    self.GetMeasureRecord();
                    self.ToastMsg=data;
                    self.ShowDeleteState = true;
                }
                })
        },
        TreamentDown(row){
            let self=this;
            this.baseAjax({
                url:'Medical/Medical/VuxUpAndDown',
                showLoading:true,
                type:'post',
                data:{TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder, DoOrder:row.DoOrder, TROrder:row.TROrder, Type1:'Down'},
                success:function(data){    
                        self.GetMeasureRecord();
                        self.ToastMsg=data;
                        self.ShowDeleteState = true;

                }
                })
        },

        DeleteRecordinfo(index,row){
            console.log('row.TROrder',row.TROrder)
            this.DeleteTrorder=row.TROrder
            this.showDeleteMsg=true;

        },

        DeleteRecord(){
            console.log('DeleteTrorder',this.DeleteTrorder)
            let self=this;
            this.baseAjax({
                url:'Medical/Medical/VuxDeleteSingleNursingRecord',
                showLoading:true,
                type:'post',
                data:{TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder, TROrder :this.DeleteTrorder, Type:this.$store.state.Type},
                success:function(data){    
                    console.log('data',data)
                    if(data.InfoMessage=true){
                        self.GetMeasureRecord();
                        self.ToastMsg='删除措施成功';
                        self.showDeleteMsg =false;//关闭确认删除提示框
                        self.ShowDeleteState = true;

                    }else{
                        self.GetMeasureRecord();
                        self.showDeleteMsg =false;//关闭确认删除提示框
                        self.ToastMsg='删除措施失败，请检查网络问题';
                        self.ShowDeleteState=true;
                       
                    }
                }
                })

        },
        handleEdit(index, row) {
            console.log('row',row)
            console.log('row.TROrder',row.TROrder)
              this.$store.commit('UpdateTROrder',row.TROrder)
            if(row.DoTime!=null && row.DoTime!=""){
                row.DoTime = this.jsonDateFormat(row.DoTime,"yyyy-MM-dd hh:mm:ss");
            }

            console.log('typeof JZResults ',typeof row.JZResults) 
            if(typeof row.JZResults ==='boolean'){
                row.JZResults=row.JZResults==true?"失败":"成功"

            }
            console.log('row.Results',row.Results)
            console.log('row.DoTime',row.DoTime)
            console.log(index, row);
            this.$router.replace({
                name: 'NursingRecord', //救治记录明细
                params: {
                    Record:row,
                    PatientRecordID:this.TaskCode+this.PatientOrder,
                    Type:this.Type

                },
                replace:true  //此处可使路由history不记录本次历史 或直接将push改为replace应该就可以
            })
            
        },
        handleDelete(index, row) {
            for(let i = 0; i < this.PTList.length; i++){
                if(this.PTList[i].Name==row.Name && this.PTList[i].DoOrder==row.DoOrder ){
                    this.PTList.splice(i,1);
                    //调整顺序
                    console.log('调整顺序',i<=this.PTList.length+1)
                    console.log('this.PTList',this.PTList)
                    this.showDeleteMsg=false;
                    if(i<=this.PTList.length+1){
                        for(let a = i; a <= this.PTList.length; a++){
                            console.log(this.PTList[a])
                            console.log('this.PTList[a].TROrder',this.PTList[a].TROrder)
                            this.PTList[a].TROrder=this.PTList[a].TROrder-1;
                        }                    
                    }
                    console.log(' this.showDeleteMsg=false;', this.showDeleteMsg=false)
                    break; 
                }
            }
            console.log(' this.showDeleteMsg=false;', this.showDeleteMsg=false)
        },
        DeleteNursingRecord(){//并未用到应该放入宫格页面了
       
            console.log('走到删除这步1')
            let self=this;
            this.baseAjax({
            url:'Medical/Medical/VuxDeleteNursingRecord',
            showLoading:true,
            type:'post',
            params:{ TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder  },
            success:function(data){    
                self.GetMeasureRecord();
                console.log('走到删除这步2')
            }
            })

        },


        //获取基础数据
        Getinfo() {
            console.log('初始化赋值方法')
            this.TaskCode=this.$store.state.TaskCode
            this.PatientOrder=this.$store.state.PatientOrder
            this.Type=this.$store.state.Type
            this.GetMeasureRecord()
            // console.log('this.$route.params.PrModel',this.$route.params.PrModel)
            // this.MainData=this.$route.params.PrModel
        },

        GetNursingRecordBack(){
            //救治记录保存成功后在救治措施页面弹窗提示
            if(this.$route.params.ShowDeleteState){
                this.ToastMsg=this.$route.params.ToastMsg
                this.ShowDeleteState=this.$route.params.ShowDeleteState
            }
           
        },

        Back(){
            this.$router.push({name: 'Grid'})
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
        PopupPicker,
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
        CellBox,
        FormPreview,
        CellFormPreview,
        Actionsheet,
        Toast
    },
}