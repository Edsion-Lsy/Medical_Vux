//中转站 用于将其他页面方法在目标页面调用
import Vue from 'vue'
export default new Vue

// 分别在两个页面引入该文件（注意路径）

// import TransferUtil from '../../assets/js/transferUtil.js';


// 调用方代码

// methods: {
//     functionA() {
//         Utils.$emit('demo','msg');
//     }
// }

// 被调用方代码

// mounted(){
//     var that = this;
//     Utils.$on('demo', function (msg) {
//         console.log(msg);
//         that.functionB();
//     })
// },
// methods: {
//     functionB() {
//         ...
//     }
// }