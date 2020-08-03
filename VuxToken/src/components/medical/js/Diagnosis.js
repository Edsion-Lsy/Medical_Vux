import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
    XNumber, XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
    Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
    FlexboxItem,PopupHeader,Radio,Sticky  } from 'vux'
   
import {Basicinfo} from "@/model/Patient.js";
import { required } from "vuelidate/lib/validators";

export default {
    beforeRouteEnter(to, from, next) {
        //现病史的页面过多需要遍历url才能进行路由判断 故取巧不为grid中过来时调用方法
      
  
        
        next(vm => {
          if(from.path==='/medical/Grid/' || from.path==='/medical/Grid'){
            vm.Getinfo();
          }
        
      });
      },
    beforeRouteLeave(to, from, next) {

        // 设置下一个路由的 meta
        
   
    next(vm => {

        // 设置下一个路由的 meta  
        
           if (to.path === '/medical/Grid' ||to.path === '/medical/Grid/') {
             console.log('将填写页面缓存关闭'+from.meta.keepAlive)
             vm.GetError()
             //vm.SaveBasicinfo()
             from.meta.keepAlive = false;  //当返回九宫格后不再缓存
           } 
           });
    },
    created(){
        //加载字典数据
        console.log('created函数被调用')
        this.loadDictionary();

        if(this.$store.state.AddPatientPage=='AddPatientRecordSZ'){
            this.SZSendVisitsType();
        }
       
    },
    mounted() {
        
        
        this.$store.commit('UPDATE_PAGE_TITLE', '诊断信息')  
    },
    

    validations: {
        MainData: {
            TentativeDiagnoseName: { required },
            Causes: { required },//病因
            IllnessSort: { required }, //病情分级
            FirstAideEffect: { required }, //急救效果
            VisitsType: { required }, //出诊结果
            

        }
    },
    data () {
        let data={
            //...Diagnosis(),
            ...Basicinfo(),//


            TentativeDiagnoseListtree:[],//初步诊断
            IllnessSortList:[],//病情分级
            FirstAideEffectList:[],//急救效果
            IsPenetratWoundList:[{ "value": "是", "name": "是" },{ "value": "否", "name": "否" }],//是否为贯通伤
            DHeightList:[],//跌落高度
            CausesList:[],//病因
            GiveUpReasonList:[],//放弃原因
            TrafficAccidentList:[],//交通事故
            DeathTypeList:[],//死亡类型
            IllnessChangeList: [{ "value": "有效", "name": "有效" },{ "value": "无变化", "name": "无变化" },{ "value": "恶化", "name": "恶化" }],
            IsEyewitnessList:[{ "value": "有", "name": "有" },{ "value": "无", "name": "无" }],
            EyewitnessList:[{ "value": "有", "name": "有" },{ "value": "无", "name": "无" }],
            VisitsTypeList:[],
            TentativeDiagnoseName:'',
            TentativeDiagnoseID:'',
            //弹出层开关
            ShowTentativeDiagnose:false,
            showPopupVisitsType:false,
            TentativeDiagnoseNameserach:'',//用于模糊搜索
            ShowGiveUpReason:false,//病情分级为死亡相关时显示放弃原因,第一目击救治者,第一目击者胸外按压有无损伤

        
            //特定条件触发的选择框
            showZ:false,
            showJ:false
        }
        return data
    },
    computed: {
        MainDataCauses() {
            return this.MainData.Causes;
        },
    

        MainDataIllnessSort(){  //病情分级
            return this.MainData.IllnessSort.toString();
        }

    },
    watch: {
    
        MainDataIllnessSort(val){ //病情分级
        

            console.log('val',val.indexOf('死亡'));  
        if(val.indexOf('死亡')!=-1   ){
            this.ShowGiveUpReason=true
            
        }else {
            this.ShowGiveUpReason=false
        
        
        }
        },


        TentativeDiagnoseNameserach(val) {
            //对树节点进行筛选操作
            this.$refs.tree.filter(val);
        },
        MainDataCauses(val){
            console.log('val',val);   
            if(this.$store.state.AddPatientPage=='AddPatientRecordSZ'){
                if(val=='交通事故'){
                    this.showJ=true
                    this.showZ=false
                }else if(val=='坠落伤'){
                    this.showJ=false
                    this.showZ=true
                }

            }else if(this.$store.state.AddPatientPage=='AddPatientRecordQH'){
                if(val=='交通事故'){
                    this.showJ=true
                    this.showZ=true
                }else if(val=='坠落伤'){
                    this.showJ=true
                    this.showZ=true
                }

            }
        
        }
        
    },
    methods: {

        SZSendVisitsType(){ 
            // if(this.MainData.VisitsType=='' || this.MainData.VisitsType==null  || this.MainData.VisitsType==undefined ){
            //     this.MainData.VisitsType=

            // } 
        },

        //将ECG平铺数据转化为树形
        buildTree(list){
            let temp = {};
            let tree = {};
            for(let i in list){
                // console.log(list[i]);
            temp[list[i].编码] = list[i];
            }

            for(let i in temp){
            if(temp[i].上级编码) {
                if(!temp[temp[i].上级编码].children) {
                temp[temp[i].上级编码].children = new Object();
                }
                temp[temp[i].上级编码].children[temp[i].编码] = temp[i];
            } else {
                tree[temp[i].编码] =  temp[i];
            }
            }
            // tree=JSON.stringify(tree)
            // console.log("工具转化后"+tree)
            console.log("工具转化后"+tree)
            return tree;
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
                console.log('obj    ',obj)
                if(choose==false){
                    //删除
                    if(this.TentativeDiagnoseName.indexOf(",") == -1){
                        //只有一个选择
                        this.TentativeDiagnoseName="";
                    }else{
                        console.log("obj.children") 
                        console.log(obj.children.length) 
                        console.log(obj.children) 
                        var b =this.TentativeDiagnoseName.split(",");
                        //父子节点名称不能相同,否则在去除父节点时会一并删除字节点的诊断,故在此需判断传入的是否为父节点
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
                        this.TentativeDiagnoseName=b.toString();//将数组再转换为string否则后面拼接时会有问题
                    }      


                    if(this.TentativeDiagnoseID.indexOf(",") == -1){
                        //只有一个选择
                        this.TentativeDiagnoseID="";
                    }else{
                        
                        var b =this.TentativeDiagnoseID.split(",");
                        //父子节点名称不能相同,否则在去除父节点时会一并删除字节点的诊断,故在此需判断传入的是否为父节点
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
                        this.TentativeDiagnoseID=b.toString();//将数组再转换为string否则后面拼接时会有问题
                    }      



                }else{ //添加
                        if(this.TentativeDiagnoseName==""){
                        
                            if(obj.children.length === 0){
                                console.log("进了添加"); 
                                this.TentativeDiagnoseName=obj.label;
                            }
                        }else{
                            if(obj.children.length === 0){
                                this.TentativeDiagnoseName=this.TentativeDiagnoseName+','+obj.label;
                            }
                        }


                        if(this.TentativeDiagnoseID==""){
                        
                            if(obj.children.length === 0){
                                console.log("进了添加"); 
                                this.TentativeDiagnoseID=obj.id;
                            }
                        }else{
                            if(obj.children.length === 0){
                                this.TentativeDiagnoseID=this.TentativeDiagnoseID+','+obj.id;
                            }
                        }
                }
                console.log("TentativeDiagnoseID"); 
                console.log(this.TentativeDiagnoseID); 
                console.log("TentativeDiagnoseName"); 
                console.log(this.TentativeDiagnoseName); 
                //拼接括号及序号
                if(this.TentativeDiagnoseName==""){
                    this.MainData.TentativeDiagnoseName="";
                }else if(this.TentativeDiagnoseName.indexOf(",") != -1){
                    var a =this.TentativeDiagnoseName.split(",");
                    console.log('拆分后')
                    console.log(a)
                for(let i = 0; i < a.length; i++){
                        if(i==0){
                            this.MainData.TentativeDiagnoseName="";
                            this.MainData.TentativeDiagnoseName='('+ (i+1) +')'+a[i];
                            console.log('追加第一次')
                            console.log(this.MainData.TentativeDiagnoseName)
                        }else{
                            this.MainData.TentativeDiagnoseName=this.MainData.TentativeDiagnoseName+',('+(i+1)+')'+a[i];
                            console.log('追加第二次')
                            console.log(this.MainData.TentativeDiagnoseName)
                        }
                    }
                }else{
                    this.MainData.TentativeDiagnoseName='(1)'+this.TentativeDiagnoseName;
                    console.log(this.MainData.TentativeDiagnoseName)
                }
                this.MainData.TentativeDiagnoseID=this.TentativeDiagnoseID

        },
        PinjieTree(data) {
            let resData = data;
            let tree = [];

            let attributes = {    //定义数据属性名称
                id: 'id',
                parentId: 'parentId',
                label: 'label',
                pinyin:'pinyin',
                rootId: 0
                };
            for(let i = 0; i < resData.length; i++) {
                if(resData[i][attributes.parentId] ===attributes.rootId) {
                    let obj = {
                        id: resData[i][attributes.id],
                        label: resData[i][attributes.label],
                        pinyin:resData[i][attributes.pinyin],
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
                                    pinyin:resData[j][attributes.pinyin],
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
            var a=data.label.indexOf(value) !== -1 || data.pinyin.indexOf(value) !== -1
            console.log( '筛选情况',a,data.label,data.pinyin)
            return a;
        },
      

        
        async loadDictionary(){
            let self=this;
            // GetECGDiagnoseTree

            
            // this.baseAjax({
            //     url:'Medical/Medical/ECGDiagnoseTree',
            //     showLoading:true,
            //     type:'post',
            //     data:{id:'1'},
            //     success:function(data){    
            //     console.log(JSON.stringify(data));
            //     //self.ECGTListtree=self.buildTree(data);
            //     self.ECGTListtree=data;
            //     console.log("tree");
            //     console.log(self.ECGTListtree);
            //     console.log(JSON.stringify(self.ECGTListtree));
            //     }
            // })
            this.baseAjax({
            url:'Medical/Medical/VuxGetAllTentativeDiagnose',
            showLoading:true,
            type:'post',
            
            success:function(data){    
             console.log('data',data);
            self.TentativeDiagnoseListtree= self.PinjieTree(data);  
            console.log(self.TentativeDiagnoseListtree);

        
                }
            })


            
            this.baseAjax({   //IllnessSort 病情分级 
                url:'Medical/Medical/IllStateLoad',
                showLoading:true,
                type:'post',
                data:{TypeCode:'IllnessSort'},
                success:function(data){
                    self.IllnessSortList=  data.map(function(item) {
                        return {
                            name: item.Name,
                            value: item.Name
                        }
                    });
                }
            })

            
            this.baseAjax({   //GiveUpReason 放弃原因 
                url:'Medical/Medical/VuxGetManagerDictioninary',
                showLoading:true,
                type:'post',
                data:{TypeCode:'GiveUpReason'},
                success:function(data){
                    self.GiveUpReasonList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })

            this.baseAjax({   //DHeight 跌落高度 
                url:'Medical/Medical/VuxGetManagerDictioninary',
                showLoading:true,
                type:'post',
                data:{TypeCode:'DHeight'},
                success:function(data){
                    self.DHeightList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({   //TrafficAccident 交通事故 
                url:'Medical/Medical/VuxGetManagerDictioninary',
                showLoading:true,
                type:'post',
                data:{TypeCode:'TrafficAccident'},
                success:function(data){
                    self.TrafficAccidentList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })
            this.baseAjax({   //Causes 病因 
                url:'Medical/Medical/VuxGetManagerDictioninary',
                showLoading:true,
                type:'post',
                data:{TypeCode:'Causes'},
                success:function(data){
                    self.CausesList=  data.map(function(item) {
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
                data:{TypeCode:'CureResult'},
                success:function(data){
                    self.VisitsTypeList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })

            
            this.baseAjax({ //急救效果
                url:'Medical/Medical/VuxGetManagerDictioninary',
                showLoading:true,
                type:'post',
                data:{TypeCode:'Effect'},
                success:function(data){
                    self.FirstAideEffectList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })
            
            this.baseAjax({ //死亡类型
                url:'Medical/Medical/VuxGetManagerDictioninary',
                showLoading:true,
                type:'post',
                data:{TypeCode:'DeadCE'},
                success:function(data){
                    self.DeathTypeList=  data.map(function(item) {
                        return {
                            name: item.value,
                            value: item.value
                        }
                    });
                }
            })

        },
        
        change (val, label) {
            console.log('change', val, label)
        },
        Getinfo() {
            console.log('赋值方法')
            this.TaskCode=this.$store.state.TaskCode
            this.PatientOrder=this.$store.state.TaskCode.PatientOrder
            this.MainData=this.$store.state.Basicinfo.MainData
            this.Type=this.$store.state.Basicinfo.Type
            if(this.MainData.IllnessSort.indexOf('死亡')!=-1  ){
            
                this.ShowGiveUpReason=true
                
            }else {
                this.ShowGiveUpReason=false
            
            
            }
        },
        
        SaveBasicinfo(){

            this.GetError();

            this.showtoast = true;
            this.$store.commit('Basicinfo', this.MainData) 

            console.log('传值内容',this.MainData,this.errorCount);
            this.TentativeDiagnoseName=''
            this.TentativeDiagnoseID=''
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
            this.$store.commit('DiagnosisError', this.errorCount) 
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