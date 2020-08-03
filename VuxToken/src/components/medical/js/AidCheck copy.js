// import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
//     XNumber, XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
//     Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,Search,
//     FlexboxItem,PopupHeader,Radio } from 'vux'
   
// import {AidCheck} from "@/model/Patient.js";
// import { required } from "vuelidate/lib/validators";

// export default {

//     beforeRouteLeave(to, from, next) {
//         // 设置下一个路由的 meta
//     if (to.path === '/medical/Grid') {
//         console.log('将填写页面缓存关闭'+from.meta.keepAlive)
//         from.meta.keepAlive = false;  //当返回九宫格后不再缓存
//     } 
//     next()
//     },
//     created(){
//         //加载字典数据
//         console.log('created函数被调用')
//         this.loadDictionary();
//     },
//     mounted() {
        
//         this.$store.commit('UPDATE_PAGE_TITLE', '辅助检查')  
//     },
    
   

//     validations: {   
//     },
//     data () {
//         let data={
//             ...AidCheck(),
//             ECGT:'',
//             ECGTListtree:[],
//             GluTList:[],
//             Spo2List:[],
//             //弹出层开关
//             ShowECGT:false,
//             ShowSpo2:false, 
//             Showcancle:true,//用于选择框的选中与取消按钮显示
//             ShowGluT:false, 
//             ECGTNameserach:'',//用于模糊搜索
//         }
//         return data
//     },
//     computed: {
//         TGECGT() {
//           return this.TG.ECGT;
//         }
//       },
//     watch: {
//         ECGTNameserach(val) {
//             //对树节点进行筛选操作
//             this.$refs.tree.filter(val);
//         },
//         //监测对象时不能只用watch 需要computed计算属性来完成
//         TGECGT(val){
//             console.log('val');
//             console.log(val);
//             if(val.indexOf(",") != -1){
//                 var a =val.split(",");

//                 for(let i = 0; i < a.length; i++){
//                     if(i==0){
//                         this.ECGT='('+ (i+1) +')'+a[i];
//                     }else{
//                         this.ECGT=this.ECGT+',('+(i+1)+')'+a[i];
//                     }
                
//                 }

//             }else{
//                 this.ECGT='(1)'+val;
//                 console.log(this.ECGT)

//             }
           
//             console.log('split');
//             console.log(a);
//             //this.ECGT=

//         }
//         // this.ECGT=''
                   
//                     // var a =this.TG.ECGT.split(",");
//                     // for(let i = 0; i < a.length; i++){
//                     //     if(a[i]==this.$refs.tree.getCurrentNode().label ){
//                     //         a.splice(i,1);
                            
//                     //         this.ECGT='('+i+')'+a[i];
//                     //         console.log("删除"+this.$refs.tree.getCurrentNode().label)
//                     //     }}
        
//     },
//     methods: {

//         //将ECG平铺数据转化为树形
//         buildTree(list){
//             let temp = {};
//             let tree = {};
//             for(let i in list){
//                 // console.log(list[i]);
//             temp[list[i].编码] = list[i];
//             }

//             for(let i in temp){
//             if(temp[i].上级编码) {
//                 if(!temp[temp[i].上级编码].children) {
//                 temp[temp[i].上级编码].children = new Object();
//                 }
//                 temp[temp[i].上级编码].children[temp[i].编码] = temp[i];
//             } else {
//                 tree[temp[i].编码] =  temp[i];
//             }
//             }
//             // tree=JSON.stringify(tree)
//             // console.log("工具转化后"+tree)
//             console.log("工具转化后"+tree)
//             return tree;
//         },
        
//         handleNodeClick(obj,node,self){
//             //节点点击时回调
//            //传递给 obj 属性的数组中该节点所对应的对象、node 节点对应的 Node、self节点组件本身。
//             if(!node.disabled){
//                 if(node.checked===true){
//                     this.$refs.tree.setChecked(node.data,false);
//                     // this.ECGT=''
                   
//                     // var a =this.TG.ECGT.split(",");
//                     // for(let i = 0; i < a.length; i++){
//                     //     if(a[i]==this.$refs.tree.getCurrentNode().label ){
//                     //         a.splice(i,1);
                            
//                     //         this.ECGT='('+i+')'+a[i];
//                     //         console.log("删除"+this.$refs.tree.getCurrentNode().label)
//                     //     }}


//                 }else{
//                     this.$refs.tree.setChecked(node.data,true);
//                         // if(this.TG.ECGT==""){
//                         //     this.TG.ECGT=this.$refs.tree.getCurrentNode().label;
//                         // }else{
//                         //     this.TG.ECGT=this.TG.ECGT+','+this.$refs.tree.getCurrentNode().label;
//                         // }
//                 }
//                 // console.log(this.$refs.tree.getCheckedNodes(true));
//                 // console.log(this.$refs.tree.getHalfCheckedNodes());
//                 //将获取到的node对象遍历
//                 let res = this.$refs.tree.getCheckedNodes(true);
//                 let arr = [];
//                 res.forEach((item) => {
//                 arr.push(item.label)
//                 })
//                 this.TG.ECGT=arr.toString();
//                 console.log(this.TG.ECGT)
//             }
        
//         },
//         clear(a){
//             if(a=='血糖'){
//                 this.TG.GluT='';
//                 this.GluT = false
//             }
//             if(a=='Spo2'){
//                 this.TG.Spo2='';
//                 this.ShowSpo2 = false
//             }
           
//         },

//         boxhandleNodeClick(obj,choose,other){
//                 //obj 传递给 data 属性的数组中该节点所对应的对象
//                 //choose 节点本身是否被选中
//                 //other 节点的子树中是否有被选中的节点
                
//                     let res = this.$refs.tree.getCheckedNodes(true);
//                     let arr = []
//                     res.forEach((item) => {
//                     arr.push(item.label)
//                     })
//                     this.TG.ECGT=arr.toString();
                
                


//         },

//         PinjieTree(data) {
//             let resData = data;
//             let tree = [];

//             let attributes = {    //定义数据属性名称
//                 id: 'id',
//                 parentId: 'parentId',
//                 label: 'label',
//                 rootId: 0
//                 };
          
//             for(let i = 0; i < resData.length; i++) {
//                 if(resData[i][attributes.parentId] ===attributes.rootId) {
//                     let obj = {
//                         id: resData[i][attributes.id],
//                         label: resData[i][attributes.label],
//                         children: [],
//                         disabled:true
//                     };
//                     tree.push(obj);
//                     resData.splice(i, 1);
//                     i--;
//                 }
//             }
//             run(tree);
         
//             function run(chiArr) {
//                 if(resData.length !== 0) {
//                     for(let i = 0; i < chiArr.length; i++) {
//                         for(let j = 0; j < resData.length; j++) {
//                             if(chiArr[i].id == resData[j][attributes.parentId]) {
//                                 let obj = {
//                                     id: resData[j][attributes.id],
//                                     label: resData[j][attributes.label],
//                                     children: []
//                                 };
//                                 chiArr[i].children.push(obj);
//                                 resData.splice(j, 1);
//                                 j--;
//                             }
//                         }
//                         run(chiArr[i].children);
//                     }
//                 }
//             }
//             console.log("tree");
//             console.log(tree);
//             return tree;
         
//         },
//         filterNode(value, data) {
//             //筛选过滤
//             if (!value) return true;
//             return data.label.indexOf(value) !== -1;
//           },
//         async loadDictionary(){
//             let self=this;
//             // GetECGDiagnoseTree

            
//             // this.baseAjax({
//             //     url:'api/Medical/Medical/ECGDiagnoseTree',
//             //     showLoading:true,
//             //     type:'post',
//             //     data:{id:'1'},
//             //     success:function(data){    
//             //     console.log(JSON.stringify(data));
//             //     //self.ECGTListtree=self.buildTree(data);
//             //     self.ECGTListtree=data;
//             //     console.log("tree");
//             //     console.log(self.ECGTListtree);
//             //     console.log(JSON.stringify(self.ECGTListtree));
//             //     }
//             // })
//             this.baseAjax({
//             url:'api/Medical/Medical/VuxGetAllECGDiagnose',
//             showLoading:true,
//             type:'post',
            
//             success:function(data){    
            
//             self.ECGTListtree= self.PinjieTree(data);  
//             console.log(self.ECGTListtree);

        
//             }
//         })
//         this.baseAjax({
//             url:'api/Medical/Medical/VuxGetCheckBoxModelTG',
//             showLoading:true,
//             type:'post',
//             data:{TypeCode:'GluT'},
//             success:function(data){
//                 self.GluTList=  data.map(function(item) {
//                     return {
//                         key: item.value,
//                         value: item.value
//                     }
//                 });
//             }
//         })
//         this.baseAjax({
//             url:'api/Medical/Medical/VuxGetCheckBoxModelTG',
//             showLoading:true,
//             type:'post',
//             data:{TypeCode:'Spo2'},
//             success:function(data){
//                 self.Spo2List=  data.map(function(item) {
//                     return {
//                         key: item.value,
//                         value: item.value
//                     }
//                 });

//             }
//         })

        


//         },
        

       


      
//     },
    


//     directives: {
//         TransferDom
//     },    
//     components: {
//         PopupRadio,
//         Group,
//         GroupTitle,
//         Cell,
//         XInput,
//         Selector,
//         PopupPicker,
//         XAddress,
//         Datetime,
//         XNumber,
//         XTextarea,
//         XSwitch,
//         Checker,
//         CheckerItem,
//         Divider,
//         Cell,
//         Popup,
//         Flexbox,
//         FlexboxItem,
//         Checklist,
//         Search, 
//         XButton,
//         PopupHeader,
//         Radio,
//      
//     },
// }