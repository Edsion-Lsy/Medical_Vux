import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
    XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
   Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Loading ,
   FlexboxItem } from 'vux'
import {TreamentItemModel} from "@/model/Patient.js";

export default {

   
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if(from.path==='/medical/NursingRecord'|| from.path==='/medical/NursingRecord/' ){
                vm.GetInfo()
                vm.showLoading()
                
            }
        });
    },
    beforeRouteLeave(to, from, next) {
        // if( to.path !== '/medical/GoodsList' ){
        // }

        if(to.name=="NursingRecord"){
            
            if(!from.meta.keepAlive){
            
               // from.meta.keepAlive =true
              //  to.meta.keepAlive =true
            }
        }else{
            to.meta.keepAlive =false;
            from.meta.keepAlive =false;
            this.$destroy();
        }
        next(vm => {
            if(to.name=="NursingRecord" ){
                console.log('后退使用提交方法')
                //vm.submit()
            
                
            }
        });
    },
        created(){
       // this.getBasicinfoData()
        this.loadBasicDictionary();
        console.log('created')
        },

        mounted() {

        this.$store.commit('UPDATE_HEAD', false);//隐藏头部
        
      //  this.$store.commit('UPDATE_PAGE_TITLE', '消耗物品列表')
            
        
        },


       
        watch: {
            //用于提高第一次加载时速度，默认第一次只筛选耗材中的药品
            search(val){
                console.log('进入监控器')
                if(val!==''){
                    console.log('进入监控器0')
                    this.interflag=1

                }else{
                    console.log('进入监控器1')
                    this.interflag=0
                }

            },
        },
        directives: {
            TransferDom,
            loadmore : {
                bind(el, binding) {
                    const selectWrap = el.querySelector('.el-table__body-wrapper')
                    selectWrap.addEventListener('scroll', function() {
                        let sign = 0
                        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
                        if (scrollDistance <= sign) {
                        binding.value()
                        }
                    })
                }
            }
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
            Loading 
        },
        data() {
        return {

            interflag:0,


            page:1,


            handleList: [],
            // 当前页
            currentPage: 1,
            // 每页多少条
            pageSize: 10,

            PatientRecordID:'',
            TROrder:'',
            DataModel: TreamentItemModel(),
            ProjectIDName:'',
            Record:[],
            search:'',        //物品名称搜索框
            SearchType:'',        //物品类型树形菜单
            searchCategory:'', // 物品资料搜索框
            JZDDlist:[],
            SBResonlist:[],
            HCList:[],
            ResponsClassifylist:[{name:'医生',value:'医生'},{name:'护士',value:'护士'},{name:'医生和护士',value:'医生和护士'}],
            JZResultslist:[{name:'失败',value:'失败'}],
            showPopupPlace:false,
            showPopupJZResults:false,
            showPopupSBReson:false,
            ShowHC:false,
            multipleSelection: [],
            Treevisible:false,  //树形菜单开关
            GoodsTrees:[],//物品树形菜单列
            GoodsTypeId:"",//筛选的物品类型
            HCListType:[],//用物品类型树形菜单筛选的数据
            DataType:0,//控制表格使用哪个数据源  0为HCList（只过滤名字）1HCListType（过滤过物品类型的数据）
            Loading:false,
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
                        if(this.GoodsTypeId.indexOf(",") == -1){
                            //只有一个选择
                            this.GoodsTypeId="";
                            console.log("this.GoodsTypeId",this.GoodsTypeId) 
                        }else{
                            console.log("obj.children") 
                            console.log(obj.children.length) 
                            console.log(obj.children) 
                            var b =this.GoodsTypeId.split(",");
                    
                            if(obj.children.length === 0){
                                for(let i = 0; i < b.length; i++){
                                    if(b[i]==obj.id ){
                                        b.splice(i,1);
                                        console.log("删除"+obj.id)
                                        console.log("删除后"+b.toString())
                                        break; 
                                    }
                                }  
                            }
                            this.GoodsTypeId=b.toString();//将数组再转换为string否则后面拼接时会有问题
                            console.log("this.GoodsTypeId",this.GoodsTypeId) 
                        }      
                    }else{ //添加
                            if(this.GoodsTypeId==""){
                            
                                if(obj.children.length === 0){
                                    console.log("进了添加"); 
                                    this.GoodsTypeId=obj.id;
                                }
                            }else{
                                if(obj.children.length === 0){
                                    this.GoodsTypeId=this.GoodsTypeId+','+obj.id;
                                }
                            }
                    }
                    console.log( 'this.GoodsTypeId',this.GoodsTypeId);//true

                    if(this.GoodsTypeId.indexOf(",") != -1){
                        this.DataType=1
                        var arr = this.GoodsTypeId.split(',');
                    
                        for(let i = 0; i < arr.length; i++) {
                        
                            if(i==0){
                                this.HCListType= this.HCList.filter(data => !arr[i] || data.CategoryID.toString().includes(arr[i]))
                            
                            }else{
                                this.HCListType= this.HCListType.concat(this.HCList.filter(data => !arr[i] || data.CategoryID.toString().includes(arr[i])))   
                        
                            }
                        
                        }
                    }else if(this.GoodsTypeId.indexOf(",") == -1 && this.GoodsTypeId!=''){
                        this.DataType=1
                        this.HCListType= this.HCList.filter(data => !this.GoodsTypeId || data.CategoryID==parseInt(this.GoodsTypeId)      )
                    console.log(this.HCListType,'this.HCListType')
                    }else{
                        this.DataType=0
                    }
                    


    
            },

        async loadBasicDictionary(){
        let self=this;
        //this.LoginName=JSON.stringify(JSON.parse(dsBridge.call("userApi.getLoginedUser")).UserInfo.W.LoginName);
        let LoginName="超级管理员"
        this.baseAjax({
            url:'Medical/Medical/VuxGoodsLoad',
            showLoading:true,
            type:'post',
            data:{Name:LoginName},
            //参数Name是当（救治措施取药方法增加直接从总库获取实时库存(0:所有物品,1:总库实时库存,2:医生实时库存)）
            //配置不为0,1时取自己的个人库存用的 
            success:function(data){    
                console.log('data',data)
                self.HCList=data;
    
            }
            })

        this.baseAjax({ //获取物品类型树
                url:'Medical/Medical/VuxGetGoodsType',
                showLoading:true,
                type:'post',
                
                success:function(data){    
                    console.log('data',data)
                    self.GoodsTrees= self.PinjieTree(data);  
                    console.log(self.GoodsTrees);
                }
        })
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
                console.log(tree,'tree')
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
            return tree;
        },

        
        
        filterTag(value, row) {
            this.interflag=1,
            console.log('value',value,'row',row)
            // console.log(value,'value',this.search,'searchCategory')
            // this.search= value
            // console.log(value,'value',this.search,'searchCategory')
            // return row.Category ;
            return row.CategoryID === value;
        },
      
        handleSelectionChange(val) {
            console.log('this.multipleSelection',this.multipleSelection) 
            console.log('val',val)
            this.multipleSelection = val;
            console.log('this.multipleSelection',this.multipleSelection) 
        },
        clickchange(row, column, event){
            console.log('column',column)
            this.$refs.multipleTable.toggleRowSelection(row);

        },


        GetInfo(){
            this.ProjectIDName=this.$route.params.ProjectIDName
            this.DataModel.form=this.$route.params.from
            console.log('this.DataModel.form',this.DataModel.form)
        },

        loadMore () {
            console.log("进入loadMore方法")
            this.page++
        },

        back(){

            this.$router.go(-1);//返回上一层
        },
        submit(){
            let self =this
            console.log(this.multipleSelection.length,'this.multipleSelection.length')
            if(this.multipleSelection.length!=0){
                for(let i = 0; i < this.multipleSelection.length; i++) {
                    // if (AddPatientPage == "AddPatientRecordTJ" || AddPatientPage == "AddPatientRecordJN" || AddPatientPage == "AddPatientRecordYX"
                    // || AddPatientPage == "AddPatientRecordJY" || AddPatientPage == "AddPatientRecordXM" || AddPatientPage == "AddPatientRecordNX"
                    // || AddPatientPage == "AddPatientRecordHLD" || AddPatientPage == "AddPatientRecordLF" || AddPatientPage == "AddPatientRecordFY"
                    // || AddPatientPage == "AddPatientRecordGZ" || AddPatientPage == "AddPatientRecordQZ" || AddPatientPage == "AddPatientRecordYANC"
                    // || AddPatientPage == "AddPatientRecordJJ" || AddPatientPage == "AddPatientRecordZJ") {
                    //     if (tempCategoryID == "2") {
                    //         $('#NUseNum').val(parseFloat(tempNum).toFixed(3) * parseFloat(tempMinNum).toFixed(3) + tempMinSpec); //使用剂量
                    //     } else {
                    //         $('#NUseNum').val(tempNum + tempMinSpec); //使用剂量
                    //     }
                    // }
                    // if (AddPatientPage == "AddPatientRecordHK") {
                    //     if (tempCategoryID == "2" || tempCategoryID == "4" || tempCategoryID == "5") {
                    //         tempValue = parseFloat(tempNum).toFixed(3) * parseFloat(tempMinNum).toFixed(3) + tempMinSpec; //使用剂量
                    //     } else {
                    //         tempValue = tempNum + tempSpec; //使用剂量
                    //     }
                    // }
                    // if (AddPatientPage == "AddPatientRecordXM") {
                    //     if (tempCategoryID == "7") {
                    //         $('#NUseNum').val(parseFloat(tempNum).toFixed(3) * parseFloat(tempMinNum).toFixed(3) + tempMinSpec); //使用剂量
                    //     } else {
                    //         $('#NUseNum').val(tempNum + tempMinSpec); //使用剂量
                    //     }
                    // }
                    // if (AddPatientPage == "AddPatientRecordWX" || AddPatientPage == "AddPatientRecordNH" || AddPatientPage == "AddPatientRecordCD" || AddPatientPage == "AddPatientRecordWH" || AddPatientPage == "AddPatientRecordHZ"
                    // || AddPatientPage == "AddPatientRecordNC" || AddPatientPage == "AddPatientRecordXS" || AddPatientPage == "AddPatientRecordCS" || AddPatientPage == "AddPatientRecordRA" || AddPatientPage == "AddPatientRecordLZ"
                    // || AddPatientPage == "AddPatientRecordXA" || AddPatientPage == "AddPatientRecordZH" || AddPatientPage == "AddPatientRecordDL"
                    // || AddPatientPage == "AddPatientRecordHN" || AddPatientPage == "AddPatientRecordQH" || AddPatientPage == "AddPatientRecordLF" || AddPatientPage == "AddPatientRecordDL"
                    // || AddPatientPage == "AddPatientRecordSMX") {
                    //     if (tempCategoryID == "3") {
                    //         $('#NUseNum').val(parseFloat(tempNum).toFixed(3) * parseFloat(tempMinNum).toFixed(3) + tempMinSpec); //使用剂量
                    //     } else {
                    //         $('#NUseNum').val(tempNum + tempSpec); //使用剂量
                    //     }
                    // }
                    

                    if(this.multipleSelection[i].CategoryID=="3"){
                        this.multipleSelection[i].UseNum = 1.000*this.multipleSelection[i].MinNum+this.multipleSelection[i].MinSpec
                    }else{
                        this.multipleSelection[i].UseNum = 1+this.multipleSelection[i].Spec
                    }
                    let data2={
                        Type:'Edit',
                        TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder
                        ,Category:this.multipleSelection[i].Category
                        ,GoodsID:this.multipleSelection[i].GoodsID
                        ,GoodsName:this.multipleSelection[i].Name
                        ,Price:this.multipleSelection[i].Price
                        ,Spec:this.multipleSelection[i].Spec
                        ,Num:'1' //此处未编辑数量故默认给1
                        ,UseNum:this.multipleSelection[i].UseNum
                        ,LossVal:'0'  //此处为编辑故默认给0
                        ,TROrder:this.$store.state.TROrder
                        ,Edit:'edit' //Edit和Type是一个参数 均默认给了‘edit’
                    }

                        // params:{Type:'edit',TaskCode:this.$store.state.TaskCode,PatientOrder:this.$store.state.PatientOrder
                        // ,Category:this.multipleSelection[i].Category
                        // ,GoodsID:this.multipleSelection[i].GoodsID
                        // ,GoodsName:this.multipleSelection[i].Name
                        // ,Price:this.multipleSelection[i].Price
                        // ,Spec:this.multipleSelection[i].Spec
                        // ,Num:'1' //此处未编辑数量故默认给1
                        // ,UseNum:this.multipleSelection[i].UseNum
                        // ,LossVal:'0'  //此处为编辑故默认给0
                        // ,TROrder:this.$store.state.TROrder
                        // ,Edit:'edit' //Edit和Type是一个参数 均默认给了‘edit’
                        // },
                    this.baseAjax({
                        url:'Medical/Medical/VuxSaveDetailRecord',
                        showLoading:true,
                        type:'post',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        },
                        data:"msg=" + encodeURIComponent(JSON.stringify(data2)),
                        
                        success:function(data){
                            console.log('data',data)
                            // self.$router.replace({
                            //     name: 'NursingRecord',
                            //     params: {
                            //         Issuccess:data.InfoMessage,
                            //         ProjectIDName:self.ProjectIDName,
                            //         form:self.DataModel.form
                                    
                            //     },
                            //     replace:true  //此处可使路由history不记录本次历史 
                            // })
    
    
                        }
                    })
                }
                this.$router.replace({
                    name: 'NursingRecord',
                    params: {
                        Issuccess:'false',
                        ProjectIDName:self.ProjectIDName,
                        form:self.DataModel.form
                    },
                    replace:true  //此处可使路由history不记录本次历史 
                })
            }else{
                this.$router.replace({
                    name: 'NursingRecord',
                    params: {
                        Issuccess:'false',
                        ProjectIDName:self.ProjectIDName,
                        form:self.DataModel.form
                    },
                    replace:true  //此处可使路由history不记录本次历史 
                })

            }

            this.$store.commit('UPDATE_HEAD', true);//隐藏头部
        },
        showLoading () {
            //此处显示loading是因为前台给列表赋值时会有一定时延
            this.Loading=true
          
            setTimeout(() => {
              this.Loading=false
            }, 1000)
          },


    }

}