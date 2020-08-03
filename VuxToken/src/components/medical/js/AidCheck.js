import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
    XNumber, XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
    Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
    FlexboxItem,PopupHeader,Radio } from 'vux'
   
import {Physical,Basicinfo} from "@/model/Patient.js";
import { required } from "vuelidate/lib/validators";

export default {
    beforeRouteEnter(to, from, next) {
        //现病史的页面过多需要遍历url才能进行路由判断 故取巧不为grid中过来时调用方法
      
  
        
        next(vm => {
            vm.Getinfo();
          if(from.path==='/medical/Grid'){
            vm.Getinfo();
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
        //加载字典数据
        console.log('created函数被调用')
        this.loadDictionary();
    },
    mounted() {
        
        this.$store.commit('UPDATE_PAGE_TITLE', '辅助检查')  
       
    },
    
   

    validations: {   
        MainData: {
            FirstECGDiagID: { required }, //第一心电诊断id
         
        }

    },
    data () {
        let data={
            ...Physical(),
            ...Basicinfo(),
            ECGT:'',
            FirstECGDiagID:'',
            ECGTListtree:[],
            GluTList:[],
            Spo2List:[],
            JGDBList:[],
            SaveOneselfList :[],
            //弹出层开关
            ShowJGDB:false,
            showPopupSaveOneself:false,
            ShowECGT:false,
            ShowSpo2:false, 
            Showcancle:true,//用于选择框的选中与取消按钮显示
            ShowGluT:false, 
            ECGTNameserach:'',//用于模糊搜索
           
            navBarFixed:false //用于吸顶效果
        }
        return data
    },
    computed: {
        // TGECGT() {
        //   return this.TG.ECGT;
        // }
        },
    watch: {
        ECGTNameserach(val) {
            //对树节点进行筛选操作
            this.$refs.tree.filter(val);
        },
        //监听一个对象中的属性时不能只用watch 需要computed计算属性来完成 TGECGT(), TGECGT(val)
        // TGECGT(val){
        //     this.k++;
        //   }
    },
    methods: {
        SaveBasicinfo(){
            console.log('进入保存方法 传值入宫格')  
            let show=this;
           
            this.showtoast = true;
            this.CommitMainDataUtil.SaveMainData('Basicinfo',this.MainData,this.errorContent)
            this.CommitMainDataUtil.SaveMainData('Physical',this.TG,this.errorContent)
         
            this.$router.push({name: 'Grid'})
        },

        Getinfo(){
           
            this.TaskCode=this.$store.state.TaskCode
            this.PatientOrder=this.$store.state.TaskCode.PatientOrder
            this.MainData=this.$store.state.Basicinfo.MainData
            this.TG=this.$store.state.Physical.TG
            this.Type=this.$store.state.Basicinfo.Type

            console.log('Aidcheck this.MainData',this.MainData)
        },
        // //将ECG平铺数据转化为树形
        // buildTree(list){
        //     let temp = {};
        //     let tree = {};
        //     for(let i in list){
        //         // console.log(list[i]);
        //     temp[list[i].编码] = list[i];
        //     }
        //     for(let i in temp){
        //     if(temp[i].上级编码) {
        //         if(!temp[temp[i].上级编码].children) {
        //         temp[temp[i].上级编码].children = new Object();
        //         }
        //         temp[temp[i].上级编码].children[temp[i].编码] = temp[i];
        //     } else {
        //         tree[temp[i].编码] =  temp[i];
        //     }
        //     }
        //     // tree=JSON.stringify(tree)
        //     // console.log("工具转化后"+tree)
        //     console.log("工具转化后"+tree)
        //     return tree;
        // },
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
                console.log('boxhandleNodeClick勾选后传入的值对象',obj)
                if(choose==false){
                    //删除
                    if(this.ECGT.indexOf(",") == -1){
                        //只有一个选择
                        this.ECGT="";
                    }else{
                        console.log("obj.children") 
                        console.log(obj.children.length) 
                        console.log(obj.children) 
                        var b =this.ECGT.split(",");
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
                        this.ECGT=b.toString();//将数组再转换为string否则后面拼接时会有问题

                        console.log('FirstECGDiagID',this.FirstECGDiagID)
                        if(this.FirstECGDiagID.toString().indexOf(",") == -1){
                            //只有一个选择
                            this.FirstECGDiagID="";
                        }else{
                        
                            var b =this.FirstECGDiagID.split(",");
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
                            this.FirstECGDiagID=b.toString();//将数组再转换为string否则后面拼接时会有问题
                        }   




                    }      
                }else{ //添加
                        if(this.ECGT==""){
                        
                            if(obj.children.length === 0){
                                console.log("进了添加"); 
                                this.ECGT=obj.label;
                            }
                            // else{
                            //     this.ECGT=obj.label;
                            // }
                           // this.TG.ECGT=this.$refs.tree.getCurrentNode().label;
                        }else{
                            if(obj.children.length === 0){
                                this.ECGT=this.ECGT+','+obj.label;
                            }
                            // else{
                            //     this.ECGT=this.ECGT+','+obj.label.children.label
                            // }
                        }


                        if(this.FirstECGDiagID==""){
                        
                            if(obj.children.length === 0){
                                console.log("进了添加"); 
                                console.log('添加id前',this.FirstECGDiagID)
                                this.FirstECGDiagID=obj.id;
                                console.log('添加id后',this.FirstECGDiagID)
                            }
                        }else{
                            if(obj.children.length === 0){
                                console.log('拼接id前',this.FirstECGDiagID)
                                this.MainData.FirstECGDiagID=this.FirstECGDiagID+','+obj.id;
                                console.log('拼接id后',this.FirstECGDiagID)
                            }
                        }
                }
                console.log("ECGT"); 
                console.log(this.ECGT); 
                if(this.ECGT==""){
                    this.TG.ECGT="";
                }else if(this.ECGT.indexOf(",") != -1){
                    var a =this.ECGT.split(",");
                    console.log('拆分后')
                    console.log(a)
                for(let i = 0; i < a.length; i++){
                        if(i==0){
                            this.TG.ECGT="";
                            this.TG.ECGT='('+ (i+1) +')'+a[i];
                            console.log('追加第一次')
                            console.log(this.TG.ECGT)
                        }else{
                            this.TG.ECGT=this.TG.ECGT+',('+(i+1)+')'+a[i];
                            console.log('追加第二次')
                            console.log(this.TG.ECGT)
                        }
                    }
                }else{
                    this.TG.ECGT='(1)'+this.ECGT;
                    console.log(this.TG.ECGT)
                }

                //此处获取第一心电诊断id(只有一个诊断或无诊断时不判断，有一个以上诊断时取第一个)
                console.log('this.FirstECGDiagID',this.FirstECGDiagID)
                if(this.FirstECGDiagID.toString().indexOf(",") != -1){
                
                    var a =this.FirstECGDiagID.split(",");
                    console.log('拆分后')
                    console.log(a)
                    this.FirstECGDiagID=a[0];
                    console.log(' this.MainData.FirstECGDiagID=a[0];', this.FirstECGDiagID=a[0])
                }
                this.MainData.FirstECGDiagID=this.FirstECGDiagID
        },
        clear(a){
            if(a=='血糖'){
                this.MainData.GluT='';
                this.ShowGluT = false
            }
            if(a=='Spo2'){
                this.MainData.Spo2='';
                this.ShowSpo2 = false
            }
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
            return data.label.indexOf(value) !== -1 || data.pinyin.indexOf(value) !== -1;
        },
        async loadDictionary(){
            let self=this;
            this.baseAjax({
            url:'Medical/Medical/VuxGetAllECGDiagnose',
            showLoading:true,
            type:'post',
            
            success:function(data){    
            
            self.ECGTListtree= self.PinjieTree(data);  
            console.log(self.ECGTListtree);

        
            }
        })
        this.baseAjax({
            url:'Medical/Medical/VuxGetCheckBoxModelTG',
            showLoading:true,
            type:'post',
            data:{TypeCode:'GluT'},
            success:function(data){
                self.GluTList=  data.map(function(item) {
                    return {
                        key: item.value,
                        value: item.value
                    }
                });
            }
        })
        this.baseAjax({ //肌钙蛋白
            url:'Medical/Medical/VuxGetCheckBoxModelTG',
            showLoading:true,
            type:'post',
            data:{TypeCode:'JGDB'},
            success:function(data){
                self.JGDBList=  data.map(function(item) {
                    return {
                        key: item.value,
                        value: item.value
                    }
                });
            }
        })
        this.baseAjax({
            url:'Medical/Medical/VuxGetCheckBoxModelTG',
            showLoading:true,
            type:'post',
            data:{TypeCode:'Spo2'},
            success:function(data){
                self.Spo2List=  data.map(function(item) {
                    return {
                        key: item.value,
                        value: item.value
                    }
                });

            }
        }),
    
          this.baseAjax({ //SaveOneself 自救
            url:'Medical/Medical/VuxGetCheckBoxModel',
            showLoading:true,
            type:'post',
            data:{Code:'SaveOneself'},
            success:function(data){
                self.SaveOneselfList=data;
            }
        })


        


        },

        // Submit(){

        //     //this.CommitMainDataUtil.SaveMainData('Basicinfo',this.MainData,this.errorContent)
        //     this.$store.commit('Basicinfo', this.MainData) 
        //     this.$router.push({name: 'Grid'})
        // }

      

        
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
        
    },
}