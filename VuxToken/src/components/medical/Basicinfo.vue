<template>

  <div class="Basicinfo" id="parent">
    
    <div  class="vux-header-box" v-show="showhead" slot="header"><x-header   style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >基础信息
     <a slot="right" style="color:black "   @click="SaveBasicinfo()">保存</a> 
      </x-header>
      <!-- <x-button mini  slot="right" style="fill:#fff;position:relative;top:-6px;left:-3px;background-color:white; "   type="primary"  @click="SaveBasicinfo()" >保存</x-button>
      <x-button mini  slot="overwrite-left"  style="fill:#fff;position:relative;top:-6px;left:-3px;"   :class="'margin-top: -20px;'" type="primary"  @click="SaveBasicinfo()" >保存</x-button>
       -->
       </div>
    
    <div class="goods-area" >
      <group label-width="5.5em" label-margin-right="0em"  label-align="left"  style=" margin-top: 3em;" >
      <!-- <popup-picker title="任务类型" :data="TaskTypeList" show-name  v-model="MainData.TaskType"  value-text-align="center"></popup-picker> -->
      <!-- <cell title="获取任务类型key值" :value="$refs.pickerTaskType&&$refs.pickerTaskType.getNameValues()"  ></cell> -->
      <x-button   plain style="border-radius:99px;"  type="primary" action-type="submit"  @click.native="VuxGetAddPatient()">获取任务信息</x-button> 
      <!-- <toast v-model="ShowDeleteState" type="text" :time="1000" is-show-mask  :text="ToastMsg"  position="middle"></toast>
       -->

      <popup-picker @input="$v.MainData.PatientType.$touch()"   title="病历类型:" :data="[baseFun.localGetDictioninary('PatientType','value')]" :class="$v.MainData.PatientType.$error?'red':'black'"  v-model="MainData.PatientType"   value-text-align="center"></popup-picker>
      
      <popup-picker  @input="$v.MainData.ThreeNonePatient.$touch()"  v-if="ShowPatientTypeSwitch" title="三无病人:" :data="[ThreeNonePatientList]" show-name   :class="$v.MainData.ThreeNonePatient.$error?'red':'black'"   v-model="MainData.ThreeNonePatient" value-text-align="center"></popup-picker>

      <x-input  @input="$v.MainData.Name.$touch()"  :class="$v.MainData.Name.$error?'red':'black'"   title="姓&emsp;&emsp;名:" v-model="MainData.Name" text-align="center"></x-input>
      <popup-picker title="性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别:" :data="[Sexlist]" show-name   v-model="MainData.Sex" value-text-align="center"></popup-picker>
      <x-input   title="年&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp龄:" v-model="MainData.Age" @on-blur="NumRule"  @on-change="NumRule"  text-align="center"></x-input>
      <popup-picker @input="$v.MainData.AgeType.$touch()"   title="年龄类型:" :data="[baseFun.localGetDictioninary('AgeType','value')]"    :class="$v.MainData.AgeType.$error?'red':'black'"   v-model="MainData.AgeType" value-text-align="center"></popup-picker>
      
      <popup-picker v-if="ShowPatientTypeSwitch" title="职&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp业:" :data="[baseFun.localGetDictioninary('ZhiYe','value')]"  v-model="MainData.Vocation" value-text-align="center"></popup-picker>
      <popup-picker v-if="ShowPatientTypeSwitch" title="国&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp籍:" :data="[baseFun.localGetDictioninary('GuoJi','value')]"  :class="$v.MainData.Nationality.$error?'red':'black'"    v-model="MainData.Nationality" value-text-align="center"></popup-picker>
      <popup-picker  @input="$v.MainData.Nation.$touch()"  title="民&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp族:" :data="[baseFun.localGetDictioninary('MinZu','value')]"  :class="$v.MainData.Nation.$error?'red':'black'" v-model="MainData.Nation" value-text-align="center"></popup-picker>
      <popup-picker  @input="$v.MainData.TaskType.$touch()"  v-if="ShowPatientTypeSwitch" title="任务类型:" disabled :data="[TaskTypeList]" show-name   v-model="MainData.TaskType" :class="$v.MainData.TaskType.$error?'red':'black'"  value-text-align="center"></popup-picker>
      <popup-picker v-if="ShowPatientTypeSwitch" title="现场类型:" :data="[LocalAddTypelist]" show-name   v-model="MainData.LocalAddType" value-text-align="center"></popup-picker>
      
      
      <x-input  @input="$v.MainData.Kilometres.$touch()"  v-if="ShowPatientTypeSwitch"  :class="$v.MainData.Kilometres.$error?'red':'black'"   title="公里数:" v-model="MainData.Kilometres" text-align="center"></x-input>
      <Lsy-checkbox   @input="$v.MainData.Symptom.$touch()"  :Title="'症状关键词:'"  :Sign="'Symptom'"  :Maindata="MainData.Symptom"  :DictionaryList="baseFun.localGetDictioninary('Symptom','value')" 
            :Requiredcss="$v.MainData.Symptom.$error"
            @lsyonchange="data => { MainData.Symptom = data }"
            v-if="SymptomList.length != 0 && ShowPatientTypeSwitch"
            ></Lsy-checkbox>

      <!--   此处试图用折叠的下拉多选，使用后觉得用户使用更费劲  <cell
            v-model="MainData.Symptom"
            title="症状关键词下拉框"
            is-link
          
            :border-intent="false"
            :arrow-direction="showa? 'up' : 'down'"
            @click.native="showa = !showa"></cell>

            <p class="slide" :class="showa?'animate':''">
              <checklist :title="('Basic Usage')"  required :options="[ 'China', 'Japan', 'America' ]" v-model="MainData.Symptom" @on-change="change"></checklist>
            </p>
          -->




      <!--  <checker
                v-model="Model.Symptom"
                type="checkbox"
                default-item-class="demo5-item"
                selected-item-class="demo5-item-selected"
                >
                <checker-item :value="item"  v-for="(item, index) in SymptomList " :key="index">{{item.value}}</checker-item>
      </checker> -->
      <!--      <popup-radio title="职业" :options="Vocationlist"    value-align="left" v-model="MainData.Vocation" placeholder="">
      <p slot="popup-header" class="vux-1px-b demo3-slot">选择职业</p>
      </popup-radio> 默认绑定的是key值  -->
    
      <x-input title="现场地点:" v-model="MainData.LocalAdd" text-align="center" ></x-input>
      
      <x-input title="联系人:" v-model="MainData.LinkPerson"  v-if="$store.state.AddPatientPage==='AddPatientRecordSZ'"  text-align="center" ></x-input>
  
      <x-input   title="联系电话:" v-model="MainData.LinkPhone" text-align="center"></x-input>
  
      <!-- //广州用
      <popup-picker title="报警电话" :data="[IsHaveBeenTelList]" show-name v-model="MainData.IsHaveBeenTel" value-text-align="center"></popup-picker>
      
      <x-input   title="报警电话号" v-model="MainData.PolicePhone"></x-input> -->
        
      <!-- <popup-picker  title="出车分站" :data="[StationList]" show-name v-model="MainData.Station" value-text-align="center"></popup-picker> -->
      <!-- <popup-picker title="送往地点" :data="[SendAddOnlyList]" show-name v-model="MainData.SendAddOnly" :class="$v.MainData.SendAddOnly.$error || $v.TG.Temperatur.required==undefined?'red':'black'"  value-text-align="center"></popup-picker>
       -->
        <cell :title="('出车分站:')"  > 	


        <el-select v-model="MainData.Station" filterable size="large"  placeholder="请选择可模糊搜索">
          <el-option
            v-for="item in StationList"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
            <!-- <el-autocomplete
            class="inline-input"
            v-model="MainData.Station"
            :fetch-suggestions="QuerySearchStation"
            placeholder="请输入内容"
            @select="handleSelect"
            clearable
            size="large"
          ></el-autocomplete> -->
        
      </cell>
   
      <cell :title="('送往地点:')"  :class="$v.MainData.SendAddOnly.$error || $v.MainData.SendAddOnly.required==undefined?'red':'black'" > 	
        <el-select v-model="MainData.SendAddOnly" filterable size="large"  placeholder="请选择可模糊搜索">
          <el-option
            v-for="item in SendAddOnlyList"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
          
            <!-- <el-autocomplete
            class="inline-input"
            v-model="MainData.SendAddOnly"
            :fetch-suggestions="QuerySearchSendAddOnly"
            placeholder="请输入内容"
            @select="handleSelect"
            clearable
            size="large"
          ></el-autocomplete> -->
        
      </cell>



      <!-- <popup v-model="SendAddOnlyTree" height="500px" is-transparent>
        <div style="width: 95%;background-color:#fff;height:500px;margin:0 auto;border-radius:5px;padding-top:10px;">
          <group>
            <x-input   :title="('送往地点')"  v-model="SendAddOnlySerach"></x-input>
            



          </group>
          <div style="padding:20px 15px;">
            <x-button type="primary">确定</x-button>
            <x-button @click.native="SendAddOnlyTree = false ,MainData.SendAddOnly=[] ">取消</x-button>
          </div>
        </div>
      </popup> -->

      <x-textarea  v-if="ShowPatientTypeSwitch" :autosize="true" title='送往地点补充:' :max="100"  :readonly="SendAddSwitch"  :rows="3" name="description"  v-model="MainData.SendAdd" :placeholder="SendAddSwitch?('选择送往地点为其他可填写'):('')"></x-textarea>
      <!-- <x-textarea v-if="ShowPatientTypeSwitch"  :autosize="true" title='送往地点' :max="100"     :rows="3" name="description"  v-model="MainData.SendAdd" :placeholder="$v.MainData.SendAddOnly.$error?('填写送往地点补充说明'):('')"></x-textarea>
      -->
      <x-textarea  v-if="ShowPatientTypeSwitch" :autosize="true" title='身份证:' :max="18"   :rows="1" name="description"  v-model="MainData.IDCard" :placeholder="('身份证18位')"></x-textarea>
      <popup-picker v-if="ShowPatientTypeSwitch" title="送达科室:" :data="[baseFun.localGetDictioninary('SDKS','value')]" show-name v-model="MainData.SendDepartment" value-text-align="center"></popup-picker>
      <Lsy-checkbox  :Title="'病史提供人:'"   :Sign="'Provider'"   :Maindata="MainData.Provider"  :DictionaryList="[baseFun.localGetDictioninary('Provider','value')]" 
              
              :Requiredcss="$v.MainData.Provider.$error"
              @Validations="$v.MainData.Provider.$touch()" 
              @lsyonchange="data => { MainData.Provider = data }"
              v-if="SymptomList.length != 0 && ShowPatientTypeSwitch"
      ></Lsy-checkbox>
      
      <x-input title="急救医生:" v-model="MainData.Doctor"  text-align="center"></x-input>
      <x-input title="担架员:" v-model="MainData.StretcherBearersI"  text-align="center" ></x-input>
      <x-input title="护&emsp;&emsp;士:" v-model="MainData.Nurse"  text-align="center" ></x-input>
      <x-input v-if="false" title="急救员:" v-model="MainData.FirstAider"  text-align="center"></x-input>
      <x-input title="急救驾驶员:" v-model="MainData.Driver"  v-if="$store.state.AddPatientPage==='AddPatientRecordSZ'" text-align="center"></x-input> 
      <x-input v-if="ShowPatientTypeSwitch"    @input="$v.MainData.Complaints.$touch()"  title="主&emsp;&emsp;诉:"  :class="$v.MainData.Complaints.$error?'red':'black'" v-model="MainData.Complaints"  text-align="center"></x-input>
      <x-textarea  :class="$v.MainData.HistoryOfPresentIllness.$error?'red':'black'"  v-if="ShowPatientTypeSwitch" :autosize="true" title='现病史:' :max="200"   :rows="2" 
      
      name="description"  v-model="MainData.HistoryOfPresentIllness" :placeholder="('填写现病史')"></x-textarea>
    
      <!-- <x-input v-if="ShowPatientTypeSwitch"  
       @input="$v.MainData.HistoryOfPresentIllness.$touch()"   
       title="现病史" :max="200" :rows="3"  
       :class="$v.MainData.HistoryOfPresentIllness.$error?'red':'black'"  
         :autosize="true" v-model="MainData.HistoryOfPresentIllness" ></x-input> -->

      <x-input title="现病史模板:"  readonly  v-if="false"  v-model="TemplateName"  >
      <!-- <x-icon slot="right" type="ios-plus" class="cell-x-icon" @click.native="showPopupXBSTemplate=true"></x-icon> -->
      <img slot="right" src="../../assets/images/icons/Insert.png"    @click="showPopupXBSTemplate=true">
      </x-input>
      <div v-transfer-dom>
        <popup v-model="showPopupXBSTemplate" class="checker-popup">
          <div style="padding:10px 10px 40px 10px;">
            <p style="padding: 5px 5px 5px 2px;color:#888;" align="center">现病史模板</p>
                  <x-button    @click.native="showPopupXBSTemplate=false">取消</x-button> 
                  <!-- <cell v-for="List in XBSTemplate"  :link="'/xbs/'+List.key" :title="(List.name)"  :key="List.key"   ></cell>  -->
                  <group label-width="5.5em" label-margin-right="1em"  label-align="center" >
                  <cell v-for="List in XBSTemplate" @click.native="XBSPage(List.key,List.value)"  :title="(List.name)"  :key="List.key"   ></cell>
                  </group >
      
      </div>
        </popup>
      </div>

        <Lsy-checkbox :Title="'既往病史:'"   :Sign="'PastHistoryChoose'"   :Maindata="MainData.PastHistoryChoose"  :DictionaryList="PastHistoryChooseList" 
            :Requiredcss="$v.MainData.PastHistoryChoose.$error"
             @Validations="$v.MainData.PastHistoryChoose.$touch()" 
            @lsyonchange="data => { MainData.PastHistoryChoose = data }"
            v-if="PastHistoryChooseList.length != 0">
        </Lsy-checkbox>

      <!-- <x-input v-if="ShowPatientTypeSwitch" title="既往史其他" v-model="MainData.PastHistoryOther"></x-input> -->
      
      <x-textarea  :autosize="true" 
      title='既往史其他' :max="50"  
        :rows="2" name="description"  v-model="MainData.PastHistoryOther"
        ></x-textarea>
      
      
      <Lsy-checkbox  :Title="'药敏史:'"   :Sign="'AllergicHistoryChoose'"    :Maindata="MainData.AllergicHistoryChoose"  :DictionaryList="AllergicHistoryChooseList" 
            :Requiredcss="$v.MainData.AllergicHistoryChoose.$error"
          
             @Validations="$v.MainData.AllergicHistoryChoose.$touch()" 
            @lsyonchange="data => { MainData.AllergicHistoryChoose = data } "
            v-if="AllergicHistoryChooseList.length != 0">
      </Lsy-checkbox>
      <!-- <x-input  v-if="ShowPatientTypeSwitch" title="药敏史其他" v-model="MainData.AllergicHistoryOther"></x-input> -->
       <x-textarea  :autosize="true" 
      title='药敏史其他:' :max="50"  
        :rows="2" name="description"  v-model="MainData.AllergicHistoryOther"
        ></x-textarea>
      
      <cell :title="('呼救时间')"> 
      <el-date-picker v-model="MainData.FirstCallTime" @focus="forbid"  :disabled="MainData.FirstCallTime=='' || MainData.FirstCallTime==null ?false:true"  value-format="yyyy-MM-dd HH:mm:ss" size="large"  type="datetime"  placeholder="选择呼救时间"  default-time="12:00:00">
      </el-date-picker></cell>  <!-- editable="false" 不知道加这个有什么具体用处，故先保留在这  -->
      <cell :title="('出车时间')" @input="$v.MainData.DrivingTime.$touch()"  v-model="MainData.DrivingTime" :class="$v.MainData.DrivingTime.$error?'red':'black'"  > 
      <el-date-picker v-model="MainData.DrivingTime" @input="$v.MainData.DrivingTime.$touch()" :disabled="MainData.DrivingTime=='' || MainData.DrivingTime==null ?false:true"   :class="$v.MainData.DrivingTime.$error?'red':'black'"   @focus="forbid" size="large" value-format="yyyy-MM-dd HH:mm:ss"   type="datetime"  placeholder="选择出车时间"  default-time="12:00:00">
      </el-date-picker></cell>
      <cell :title="('到达现场')"  :class="$v.MainData.ArrivedTime.$error?'red':'black'"  > 
      <el-date-picker v-model="MainData.ArrivedTime" @focus="forbid" size="large" 
          :disabled="MainData.ArrivedTime=='' || MainData.ArrivedTime==null ?false:true" 
          @input="$v.MainData.ArrivedTime.$touch()"   value-format="yyyy-MM-dd HH:mm:ss"   type="datetime"  placeholder="选择到达现场时间"  default-time="12:00:00">
      </el-date-picker></cell>
      <!-- <cell :title="('到达患者')"> 
      <el-date-picker v-model="MainData.ArrivedPatientTime" size="large"  type="datetime"  placeholder="选择到达患者"  default-time="12:00:00">
      </el-date-picker></cell> -->

      <div  v-if="$store.state.AddPatientPage=='AddPatientRecordSZ'">
      <cell :title="('病人上车')" > 
      <el-date-picker v-model="MainData.LeaveTime" @focus="forbid" value-format="yyyy-MM-dd HH:mm:ss" 
        :disabled="MainData.LeaveTime=='' || MainData.LeaveTime==null ?false:true" 
        type="datetime"  placeholder="选择病人上车时间"  default-time="12:00:00">
      </el-date-picker></cell>
     

      </div>
      <div  v-if="$store.state.AddPatientPage=='AddPatientRecordQH'">
      <cell :title="('离开现场')" > 
      <el-date-picker v-model="MainData.LeaveTime" @focus="forbid" value-format="yyyy-MM-dd HH:mm:ss"
        
        type="datetime"  placeholder="选择离开现场时间"  default-time="12:00:00">
      </el-date-picker></cell>
    

      </div>

    
      <cell :title="('送达医院')"> 
      <el-date-picker v-model="MainData.DeliveredTime" @focus="forbid" size="large" value-format="yyyy-MM-dd HH:mm:ss"  
        :disabled="MainData.DeliveredTime=='' || MainData.DeliveredTime==null ?false:true" 
        type="datetime"  placeholder="选择日期时间"  default-time="12:00:00">
      </el-date-picker></cell>

      <x-textarea  v-if="!ShowPatientTypeSwitch" :autosize="true" title='处理记录' :max="100"   :rows="3" name="description"  v-model="MainData.SendAdd" :placeholder="'填写处理记录'"></x-textarea>

      
      <!-- <x-button  type="primary" action-type="submit"  @click.native="SaveBasicinfo()">保存</x-button> -->
      <div v-transfer-dom>
        <popup v-model="buttonshow" position="bottom">
          <div class="position-vertical-demo">
          保存成功.
          </div>
        </popup>
      </div>
        <toast v-model="showtoast" type="text" :time="1800" is-show-mask   position='middle' >{{ ('有'+errorCount+'条数据未满足不能提交') }}</toast>
        <!-- <toast v-model="$v.MainData.Age.numeric" @on-hide="ClearAge" type="text" :time="600" is-show-mask   position='middle' >{{ ('年龄必须为数字') }}</toast> -->
    </group>
    <br>
  </div>

  </div>
</template>
<script>
  import basicinfo  from  "./js/basicinfo.js"
  
  export default basicinfo
</script>
<style>
    .el-picker-panel .el-popper{
        width: 150px;
    }
</style>


<style lang="less">

goods-area{
  height:5rem;
  overflow-x: hidden;       /* 解决左右可以滑动的问题 */
  overflow-y: auto;       /* 解决左右可以滑动的问题 */
  //overflow-scrolling: touch;   /*兼容性 ios5+、android4+ */  
}


// @charset "utf-8";html{background-color:#fff;color:#000;font-size:12px}
// body,ul,ol,dl,dd,h1,h2,h3,h4,h5,h6,figure,form,fieldset,legend,input,textarea,button,p,blockquote,th,td,pre,xmp{margin:0;padding:0}
// body,input,textarea,button,select,pre,xmp,tt,code,kbd,samp{line-height:1.5;font-family:tahoma,arial,"Hiragino Sans GB",simsun,sans-serif}
// h1,h2,h3,h4,h5,h6,small,big,input,textarea,button,select{font-size:100%}
// h1,h2,h3,h4,h5,h6{font-family:tahoma,arial,"Hiragino Sans GB","微软雅黑",simsun,sans-serif}
// h1,h2,h3,h4,h5,h6,b,strong{font-weight:normal}
// address,cite,dfn,em,i,optgroup,var{font-style:normal}
// table{border-collapse:collapse;border-spacing:0;text-align:left}
// caption,th{text-align:inherit}
// ul,ol,menu{list-style:none}
// fieldset,img{border:0}
// img,object,input,textarea,button,select{vertical-align:middle}
// article,aside,footer,header,section,nav,figure,figcaption,hgroup,details,menu{display:block}
// audio,canvas,video{display:inline-block;*display:inline;*zoom:1}
// blockquote:before,blockquote:after,q:before,q:after{content:"\0020"}
// textarea{overflow:auto;resize:vertical}
// input,textarea,button,select,a{outline:0 none;border: none;}
// button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}
// mark{background-color:transparent}
// a,ins,s,u,del{text-decoration:none}
// sup,sub{vertical-align:baseline}
// html {overflow-x: hidden;height: 100%;font-size: 50px;-webkit-tap-highlight-color: transparent;}
// body {font-family: Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica, sans-serif;color: #333;font-size: .28em;line-height: 1;-webkit-text-size-adjust: none;}
// hr {height: .02rem;margin: .1rem 0;border: medium none;border-top: .02rem solid #cacaca;}
// a {color: #25a4bb;text-decoration: none;}

.vux-header-box {
  z-index: 100;
  /* position: absolute; */
   position: fixed;
  width: 100%;
  left: 0;
  top: 0;
}

.demo5-item {
  font-size: 8px;
  width: 110px;
  height: 30px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 12px;
  margin-left: 12px;
  margin-top: 1px;
  margin-bottom: 1px;
}
.demo5-item-selected {
  background: #ffffff  url(../../assets/images/active.png)  no-repeat right bottom;
  border-color: #ff4a00;
}

.SendAdd-item {
  font-size: 9px;
  width: 130px;
  height: 30px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 12px;
  margin-left: 12px;
  margin-top: 1px;
  margin-bottom: 1px;
}
.SendAdd-item-selected {
  background: #ffffff  url(../../assets/images/active.png)  no-repeat right bottom;
  border-color: #ff4a00;
}

.weui-label.style{
   width: 5.5em;
}
.button-Provider{
  width: 20px;
}

.position-vertical-demo {
  background-color: #ffe26d;
  color: #000;
  text-align: center;
  padding: 15px;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.cell-x-icon {
  display: block;
  fill: gray;
}
.red{
 color:red;

}
.black{
  color:black;

}
.headerbutton{
  margin-top: -20px;

}
</style>