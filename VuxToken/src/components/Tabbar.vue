<template>
  <div>
    <group>
      <cell is-link title="Simple" link="/component/tabbar-simple"></cell>
      <cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>
    </group>
    <!-- <tabbar>
      <tabbar-item badge=badge>
        <img slot="icon" src="">
        <span slot="label">基础信息</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon" src="">
        <span slot="label">体格检查</span>
      </tabbar-item>
      <tabbar-item selected link="/component/demo">
        <img slot="icon" src="">
        <span slot="label">Explore</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img slot="icon" src="">
        <span slot="label">News</span>
      </tabbar-item>
    </tabbar> -->
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'



export default {

  data () {
     badge:'3'

  },

    
  
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
}
</script>