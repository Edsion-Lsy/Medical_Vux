<template>
  <div>
    <group>
      <p>获取电子病历信息错误，请返回</p>
      <x-button  type="primary" action-type="submit"  @click.native="Close()">返回</x-button> 

    </group>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell,XButton } from 'vux'



export default {

  data () {
    badge:'3'

  },
  Close(){
    dsBridge.call("nativeApi.backNative")
  },
    
  
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    XButton
  }
}
</script>