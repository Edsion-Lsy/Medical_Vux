<template>
  <div>
    <p>呕吐</p>
      <flexbox>
          
          <flexbox-item :span="2/5"> <x-input  title="病人于" v-model="XBSData.time" class="xinput"></x-input></flexbox-item>
          <flexbox-item  :span="2/5" > <x-input  title="呕吐" > </x-input></flexbox-item>
            <flexbox-item>次</flexbox-item>
      </flexbox>

      <group >
     
      <x-textarea :max="200" name="description"  v-model="XBSData.other" :placeholder="('填写其他说明')"></x-textarea>
    </group>
    
    <x-button    @click.native="back">取消</x-button> 
    <x-button     @click.native="sumbit()" >确定</x-button> 
  </div>
</template>
<script>
import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, 
          XAddress, XTextarea, XSwitch, Checker, CheckerItem, 
         Divider, Popup, TransferDom,XButton,PopupRadio, Flexbox,Checklist,
         FlexboxItem } from 'vux'
export default {

  created(){
     this.getBasicinfoData()
     
    },

    mounted() {
     
        //this.$store.commit('UPDATE_HEAD', false);//隐藏头部
        this.$store.commit('UPDATE_PAGE_TITLE', '呕吐病史模板')
           
        
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
    XButton
  },
  data() {
    return {
      name:'',//模板名英文
      value:'',//模板名汉字
      XBSData:{
        Complaints:'呕吐',//主诉
        time: '',
        other:'' //最后合并成病史

      }
      
      
    }
  },
    // beforeRouteLeave(to, from, next) {
    //          // 设置下一个路由的 meta
    //         to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
    //         next();
    //     },
    methods:{

    back(){
          this.$route.query.XBS='xbs';
          console.log('this.$route.query.XBS',this.$route.query.XBS)
          this.$router.go(-1);//返回上一层
        },
    getBasicinfoData() {
      var d  = new Date(this.$route.params.time);  
      this.XBSData.time =d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
      this.name=this.$route.params.name//模板名英文
      this.value=this.$route.params.value//模板名汉字
    },
      sumbit(){
      
          console.log('this.$route.query.XBS',this.$route.query.XBS)
          this.$router.replace({
          name: 'Basicinfo',
          params: {
            XBSData: this.XBSData
          
          },
          query:{XBS:'xbs'}

        })
      }
    }

}
</script>
