
import LocalDictionaryApiDsbridge from 'myLocalDictionaryApiDsbridge'
import LocalDictionaryApi from 'LocalDictionaryApi'

// var LocalValue
// if(process.env.USED_IN=="pad"){
//   LocalValue= LocalDictionaryApiDsbridge;
// }else{
//   LocalValue= LocalDictionaryApiLocalStorage;
// }

var LocalValue= LocalDictionaryApi;
//var LocalValue= LocalDictionaryApiDsbridge;
export default ({ Vue }) => {
  Vue.prototype.$LocalDictionaryApi = LocalValue;
}
// 在js引用中和vue对象中使用同一个对象；
export const LocalDictionaryApi = LocalValue;