<template>
  <div id="app">
    
    <!-- <router-view >
    <router-link to="/VuxDemo"  > <a href="/VuxDemo">基础信息</a>  </router-link>
      
    <li>1111111111111</li>
    </router-view> -->

    <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
        </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如 page3 -->
    </router-view>

    
  </div>
</template>

<script>


export default {
  name: 'app',
  mounted: function () {
         //此方法刷新页面时也会执行 将localStorage数据清除
         window.addEventListener('beforeunload',()=>{
            localStorage.removeItem('TGDictionary');
        });
    },
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
