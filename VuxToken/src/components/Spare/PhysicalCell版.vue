<template>

<group  label-width="5.5em" label-margin-right="0em"  label-align="left" style=" margin-top: 35px;"  >

    <x-header class="vux-header-box"  style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
        
         体格检查<!--<a slot="right" style="color:black "   @click="SaveTGinfo()">保存</a>  -->
          
        <a slot="right" style="color:black "   @click="SaveTGinfo()">保存</a>
        </x-header>
<!-- 
<div style=" width: 100%; margin-top: 10px;  position: fixed;
    top: 2rem;
    z-index: 999;
    width:100%;">
<tab bar-active-color="#10aeff">
<tab-item :selected="1==appleNumber">
<a @click="jump(1)">基础检查</a>
</tab-item>
<tab-item :selected="2==appleNumber">
<a @click="jump(2)">基础检查(转运途中)</a>
</tab-item>
<tab-item :selected="3==appleNumber">
<a @click="jump(3)">基础检查(交接中)</a>
</tab-item>
<tab-item :selected="4==appleNumber">
<a @click="jump(4)">体位</a>
</tab-item>
<tab-item :selected="5==appleNumber">
<a @click="jump(5)">锚点定位五</a>
</tab-item>
<tab-item :selected="6==appleNumber">
<a @click="jump(6)">锚点定位六</a>
</tab-item>
<tab-item :selected="7==appleNumber">
<a @click="jump(7)">锚点定位七</a>
</tab-item>
<tab-item :selected="8==appleNumber">
<a @click="jump(8)">锚点定位八</a>
</tab-item>
</tab>
</div> -->


    <cell  id="loadmore" :title="('查体时间')"   style=" margin-top: 10px;" > 
        <el-date-picker required v-model="MainData.DrivingTime" @focus="forbid" size="large" value-format="yyyy-MM-dd HH:mm:ss"   type="datetime"  placeholder="选择出车时间"  default-time="12:00:00">
    </el-date-picker></cell>

       <grid>
            <grid-item    @click.native="FoldSwitch='JCJC'"  >
                <img slot="icon" src="../../assets/images/icons/Gridicon-note.png">
                <span slot="label":class="$v.TG.Temperatur.required&&$v.TG.Pulse.required&&$v.TG.Respiratio.required&&$v.TG.BP1.required&&$v.TG.BP2.required&&$v.TG.AVPU.required?'red':'black'">{{ ('基础检查(上车前)') }}
                </span> 
                
            </grid-item>
            <grid-item    @click.native="FoldSwitch='JCJCZ'"  >
                <img slot="icon" src="../../assets/images/icons/Gridicon-note.png">
                <span slot="label">{{ ('基础检查(转运途中)') }}
                </span> 
                
            </grid-item>
            <grid-item    @click.native="FoldSwitch='JCJCJ'"  >
                <img slot="icon" src="../../assets/images/icons/Gridicon-note.png">
                <span slot="label">{{ ('基础检查(交接点)') }}
                </span> 
                
            </grid-item>

        </grid>



    <group  label-width="14em" label-margin-right="0em"  label-align="left" style=" margin-top: -20px;"  >
    <cell  id="apply1"  :class="$v.TG.Temperatur.required&&$v.TG.Pulse.required&&$v.TG.Respiratio.required&&$v.TG.BP1.required&&$v.TG.BP2.required&&$v.TG.AVPU.required?'green1':'red'"
        :title="'基础检查    (上车前)'"
        is-link
        :border-intent="false"
        :arrow-direction="ShowJCJC ? 'up' : 'down'"
        @click.native="ShowJCJC = !ShowJCJC"
        >
    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
    </cell>
    </group>
    <template   v-if="ShowJCJC">
    <divider>上车前</divider>
    <flexbox>
        <flexbox-item :span="4/5">  <x-input title="T    "  :show-clear="false"  :class="!$v.TG.Temperatur.required?'red':'black'"  value-text-align="right"  v-model="TG.Temperatur" >
        <x-icon slot="right" title="c" type="ios-plus"  class="cell-x-icon"  @click.native="showT=true"></x-icon>
        </x-input> </flexbox-item>
        <flexbox-item>℃</flexbox-item> 
    </flexbox>
        <div v-transfer-dom>
        <popup v-model="showT" class="checker-popup">
        <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('体温')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Temperatur=[],showT = false "
            @on-click-right="showT = false"></popup-header>
        <div style="padding:10px 10px 40px 10px;background-color: #fff;  ">
            <checker v-model="TG.Temperatur" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
                <checker-item v-for="itema in TList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup></div>
        <flexbox>
            <flexbox-item  :span="4/5" >
            <x-input title="P    "  :show-clear="false"  :class="!$v.TG.Pulse.required?'red':'black'"   v-model="TG.Pulse" >
            <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showPulse=true"></x-icon></x-input></flexbox-item>
            <flexbox-item >次/分</flexbox-item>    
        </flexbox>

        <div v-transfer-dom>
        <popup v-model="showPulse" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
        
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('P')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Pulse=[],showPulse = false "
            @on-click-right="showPulse = false"></popup-header>
        
        <checker v-model="TG.Pulse" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in PList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
        </checker></div></popup></div>

        <flexbox>
            <flexbox-item :span="4/5"> 
            <x-input title="R    "   :show-clear="false"  :class="!$v.TG.Respiratio.required?'red':'black'"  v-model="TG.Respiratio" >
            <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showRespiratio=true"></x-icon></x-input></flexbox-item>
            <flexbox-item >次/分</flexbox-item> 
        </flexbox>

        <div v-transfer-dom>
        <popup v-model="showRespiratio" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
        <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('R')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Respiratio=[],showRespiratio = false "
            @on-click-right="showRespiratio = false"></popup-header>
        
        <checker v-model="TG.Respiratio" type="radio"   default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in RespiratioList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
        </checker></div></popup></div>


    <flexbox>
        <flexbox-item :span="4/5"  >
        <x-input title="BP1   " :show-clear="false" :class="!$v.TG.BP1.required?'red':'black'"  v-model="TG.BP1"  >
        <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showBP1=true"></x-icon></x-input>
        </flexbox-item>
        <p>/</p>
    </flexbox>

    <flexbox>
        <flexbox-item  :span="4/5" >
            <x-input title="BP2   " :show-clear="false"  :class="!$v.TG.BP2.required?'red':'black'"   v-model="TG.BP2" >
            <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showBP2=true"></x-icon></x-input>
        </flexbox-item>
        <p>mmHG</p>
    </flexbox>
        <div v-transfer-dom>
        <popup v-model="showBP1" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
        <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('BP1')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.BP1=[],showBP1 = false "
            @on-click-right="showBP1 = false"></popup-header>
        <checker v-model="TG.BP1" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in BP1List" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
        </checker></div></popup></div>

        <div v-transfer-dom>
            <popup v-model="showBP2" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('BP2')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.BP2=[],showBP2 = false "
            @on-click-right="showBP2 = false"></popup-header>
            <checker v-model="TG.BP2" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
                <checker-item v-for="itema in BP2List" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>


        <popup-picker title="意识" :data="[AVPUList]"   :class="!$v.TG.AVPU.required?'red':'black'"     v-model="TG.AVPU" value-text-align="center"></popup-picker>

    </template >
    <group  label-width="14em" label-margin-right="0em"  label-align="left" style=" margin-top: -20px;" >
    <cell  id="apply2" style="color:green;" 
        :title="'基础检查(转运途中)'"
        is-link
        :border-intent="false"
        :arrow-direction="ShowJCJCZ ? 'up' : 'down'"
        @click.native="ShowJCJCZ = !ShowJCJCZ">
    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
    </cell>
    </group>
    <template   v-if="ShowJCJCZ">
    <divider>转运途中</divider>
   
    <flexbox>
        <flexbox-item :span="4/5">  <x-input title="T    "  :show-clear="false"  value-text-align="right"  v-model="TG.TemperatuZ" >
        <x-icon slot="right" title="c" type="ios-plus"  class="cell-x-icon"  @click.native="showTZ=true"></x-icon>
        </x-input> </flexbox-item>
        <flexbox-item>℃</flexbox-item> 
    </flexbox>
        <div v-transfer-dom>
        <popup v-model="showTZ" class="checker-popup">
        <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('体温')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.TemperatuZ=[],showTZ = false "
            @on-click-right="showTZ = false"></popup-header>
        <div style="padding:10px 10px 40px 10px;background-color: #fff;  ">
            <checker v-model="TG.TemperatuZ" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
                <checker-item v-for="itema in TListZ" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup></div>
        <flexbox>
            <flexbox-item  :span="4/5" >
            <x-input title="P    "  :show-clear="false"    v-model="TG.PulseZ" >
            <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showPulseZ=true"></x-icon></x-input></flexbox-item>
            <flexbox-item >次/分</flexbox-item>    
        </flexbox>

        <div v-transfer-dom>
        <popup v-model="showPulseZ" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
        
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('P')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.PulseZ=[],showPulseZ = false "
            @on-click-right="showPulseZ = false"></popup-header>
        
        <checker v-model="TG.PulseZ" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in PListZ" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
        </checker></div></popup></div>

        <flexbox>
            <flexbox-item :span="4/5"> 
            <x-input title="R    "   :show-clear="false"   v-model="TG.RespiratiZ" >
            <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showRespiratioZ=true"></x-icon></x-input></flexbox-item>
            <flexbox-item >次/分</flexbox-item> 
        </flexbox>

        <div v-transfer-dom>
        <popup v-model="showRespiratioZ" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
        <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('R')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.RespiratiZ=[],showRespiratioZ = false "
            @on-click-right="showRespiratioZ = false"></popup-header>
        
        <checker v-model="TG.RespiratiZ" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in RespiratioListZ" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
        </checker></div></popup></div>


    <flexbox>
        <flexbox-item :span="4/5"  >
        <x-input title="BP1   " :show-clear="false"  v-model="TG.BP1Z"  >
        <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showBP1Z=true"></x-icon></x-input>
        </flexbox-item>
        <p>/</p>
    </flexbox>

    <flexbox>
        <flexbox-item  :span="4/5" >
            <x-input title="BP2   " :show-clear="false"  v-model="TG.BP2Z" >
            <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showBP2Z=true"></x-icon></x-input>
        </flexbox-item>
        <p>mmHG</p>
    </flexbox>
        <div v-transfer-dom>
        <popup v-model="showBP1Z" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
        <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('BP1')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.BP1Z=[],showBP1Z = false "
            @on-click-right="showBP1Z = false"></popup-header>
        <checker v-model="TG.BP1Z" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in BP1ListZ" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
        </checker></div></popup></div>

        <div v-transfer-dom>
            <popup v-model="showBP2Z" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('BP2')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.BP2Z=[],showBP2Z = false "
            @on-click-right="showBP2Z = false"></popup-header>
            <checker v-model="TG.BP2Z" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
                <checker-item v-for="itema in BP2ListZ" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>


        <popup-picker title="意识" :data="[AVPUListZ]"     v-model="TG.AVPUZ" value-text-align="center"></popup-picker>

    </template >

    <group  label-width="14em" label-margin-right="0em"  label-align="left"   style=" margin-top: -20px;" >
    <cell  id="apply3" style="color:green;" 
        :title="'基础检查(交接中)'"
        is-link
        :border-intent="false"
        :arrow-direction="ShowJCJCJ ? 'up' : 'down'"
        @click.native="ShowJCJCJ = !ShowJCJCJ">
    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
    </cell>
    </group>
    <template   v-if="ShowJCJCJ">
    <divider>交接中</divider>

    <flexbox>
        <flexbox-item :span="4/5">  <x-input title="T    "  :show-clear="false"  value-text-align="right"  v-model="TG.TemperatuJ" >
        <x-icon slot="right" title="c" type="ios-plus"  class="cell-x-icon"  @click.native="showTJ=true"></x-icon>
        </x-input> </flexbox-item>
        <flexbox-item>℃</flexbox-item> 
    </flexbox>
        <div v-transfer-dom>
        <popup v-model="showTJ" class="checker-popup">
        <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('体温')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.TemperatuJ=[],showTJ = false "
            @on-click-right="showTJ = false"></popup-header>
        <div style="padding:10px 10px 40px 10px;background-color: #fff;  ">
            <checker v-model="TG.TemperatuJ" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
                <checker-item v-for="itema in TListJ" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup></div>
        <flexbox>
            <flexbox-item  :span="4/5" >
            <x-input title="P    "  :show-clear="false"    v-model="TG.PulseJ" >
            <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showPulseJ=true"></x-icon></x-input></flexbox-item>
            <flexbox-item >次/分</flexbox-item>    
        </flexbox>

        <div v-transfer-dom>
        <popup v-model="showPulseJ" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
        
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('P')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.PulseJ=[],showPulseJ = false "
            @on-click-right="showPulseJ = false"></popup-header>
        
        <checker v-model="TG.PulseJ" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in PListJ" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
        </checker></div></popup></div>

        <flexbox>
            <flexbox-item :span="4/5"> 
            <x-input title="R    "   :show-clear="false"   v-model="TG.RespiratiJ" >
            <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showRespiratioJ=true"></x-icon></x-input></flexbox-item>
            <flexbox-item >次/分</flexbox-item> 
        </flexbox>

        <div v-transfer-dom>
        <popup v-model="showRespiratioJ" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
        <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('R')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.RespiratiJ=[],showRespiratioJ = false "
            @on-click-right="showRespiratioJ = false"></popup-header>
        
        <checker v-model="TG.RespiratiJ" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in RespiratioListJ" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
        </checker></div></popup></div>


    <flexbox>
        <flexbox-item :span="4/5"  >
        <x-input title="BP1   " :show-clear="false"  v-model="TG.BP1J"  >
        <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showBP1J=true"></x-icon></x-input>
        </flexbox-item>
        <p>/</p>
    </flexbox>

    <flexbox>
        <flexbox-item  :span="4/5" >
            <x-input title="BP2   " :show-clear="false"  v-model="TG.BP2J" >
            <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showBP2J=true"></x-icon></x-input>
        </flexbox-item>
        <p>mmHG</p>
    </flexbox>
        <div v-transfer-dom>
        <popup v-model="showBP1J" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
        <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('BP1')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.BP1J=[],showBP1J = false "
            @on-click-right="showBP1J = false"></popup-header>
        <checker v-model="TG.BP1J" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
            <checker-item v-for="itema in BP1ListJ" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
        </checker></div></popup></div>

        <div v-transfer-dom>
            <popup v-model="showBP2J" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('BP2')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.BP2J=[],showBP2J = false "
            @on-click-right="showBP2J = false"></popup-header>
            <checker v-model="TG.BP2J" type="radio" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected">
                <checker-item v-for="itema in BP2ListJ" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>


        <popup-picker title="意识" :data="[AVPUListJ]"     v-model="TG.AVPUJ" value-text-align="center"></popup-picker>

    </template >
    <div v-if="$store.state.AddPatientPage=='AddPatientRecordSZ1'">
        <cell   style="color:green;" 
            :title="'发育'"
            is-link
            :border-intent="false"
            :arrow-direction="ShowFY ? 'up' : 'down'"
            @click.native="ShowFY = !ShowFY">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>

        <template   v-if="ShowFY">
            <divider>发育</divider>
            <popup-picker title="发育" :data="[GrowthList]"    v-model="TG.Growth" value-text-align="center"></popup-picker>
            <popup-picker title="营养" :data="[NutritionList]"    v-model="TG.Nutrition" value-text-align="center"></popup-picker>
            
            
            
            <x-textarea title='发育描述' :max="20"  :rows="2" name="description"  v-model="TG.FYOther  " :placeholder="'填写补充说明'"></x-textarea>

        </template >
    </div>



    <cell id="apply4"  style="color:green;" 
        :title="'体位'"
        is-link
        :border-intent="false"
        :arrow-direction="ShowTW ? 'up' : 'down'"
        @click.native="ShowTW = !ShowTW">
    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
    </cell>
    <template   v-if="ShowTW">
    <divider>体位</divider>
        <popup-picker title="体位" :data="[PosturalList]"    v-model="TG.Postural" value-text-align="center"></popup-picker>
    <x-textarea title='体位描述' :max="20"  :rows="2" name="description"  v-model="TG.TWOther" :placeholder="'填写补充说明'"></x-textarea>

    </template >
    <cell  style="color:green;" 
            :title="('皮肤')"
            is-link
            :border-intent="false"
            :arrow-direction="ShowPFSD ? 'up' : 'down'"
            @click.native="ShowPFSD = !ShowPFSD">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>
        <template   v-if="ShowPFSD">
        <divider>皮肤湿度</divider>
        
        <popup-picker title="皮肤湿度" :data="[SkinHumList]"    v-model="TG.SkinHum" value-text-align="center"></popup-picker>
        <popup-picker title="皮肤弹性" :data="[SkinElaList]"    v-model="TG.SkinEla" value-text-align="center"></popup-picker>
        <popup-picker title="皮肤颜色" :data="[SkinCloList]"    v-model="TG.SkinClo" value-text-align="center"></popup-picker>
        <x-textarea title='皮肤其它' :max="20"  :rows="2" name="description"  v-model="TG.SkOther" :placeholder="('填写补充说明')"></x-textarea>
        </template>

    <cell  style="color:green;"  :title="('眼部')"  is-link  :border-intent="false" 
            :arrow-direction="ShowYB ? 'up' : 'down'"
            @click.native="ShowYB = !ShowYB">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
            </cell>
        <template   v-if="ShowYB">
        <divider>眼部</divider>
        <x-input title="瞳孔" :show-clear="false"     :class="!$v.TG.Pupil.required?'red':'black'"  readonly  v-model="TG.Pupil"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupPupil=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupPupil" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('瞳孔')" :show-bottom-border="true"
                align="center"  style="background-color: #fff;"
                @on-click-left="TG.Pupil=[],showPopupPupil = false "
                @on-click-right="showPopupPupil = false"></popup-header>    
            <checker v-model="TG.Pupil" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                
                
                <checker-item v-for="itema in PupilList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>



            </checker></div></popup></div>

        <x-input title="瞳孔左侧"  value-align="center" :show-clear="false" v-model="TG.PupilLeft" ><p slot="right">mm</p></x-input>
        <x-input title="瞳孔右侧" :show-clear="false" v-model="TG.PupilRight" ><p slot="right">mm</p></x-input>
        <x-textarea title='瞳孔其他' :max="20"  :rows="2" name="description"  v-model="TG.PupilOther" :placeholder="'填写补充说明'"></x-textarea>
        <popup-picker title="对光反射" :data="[RefleList]"    v-model="TG.Refle" value-text-align="center"></popup-picker>
        <popup-picker title="对光反射左" :data="[RefleLeftList]"    v-model="TG.RefleLeft" value-text-align="center"></popup-picker>
        <popup-picker title="对光反射右" :data="[RefleRightList]"    v-model="TG.RefleRight" value-text-align="center"></popup-picker>
        <x-textarea title='对光反射描述' :max="20"  :rows="2" name="description"  v-model="TG.RefleOther" :placeholder="'填写对光反射补充说明'"></x-textarea>
     
        
        
        </template>
    <cell  id="apply5" style="color:green;" 
        :title="('头部')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowTB ? 'up' : 'down'"
        @click.native="ShowTB = !ShowTB" >
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>
    <template   v-if="ShowTB">
    <divider>头部</divider>
        <x-input title="头部" :show-clear="false"  readonly  v-model="TG.Head"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupHead=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupHead" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('头部')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Head=[],showPopupHead = false "
            @on-click-right="showPopupHead = false"></popup-header>    
            <checker v-model="TG.Head" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in HeadList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>
        <popup-picker title="口唇" :data="[CyanosisList]"    v-model="TG.Cyanosis" value-text-align="center"></popup-picker>
        <x-textarea title='头部描述' :max="20"  :rows="2" name="description"  v-model="TG.HeadOther" :placeholder="('填写补充说明')"></x-textarea>
    </template>



    <cell 
        :class="!$v.TG.Neck.required?'red':'green1'"
        :title="('颈部')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowJB ? 'up' : 'down'"
        @click.native="ShowJB = !ShowJB">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>
    <template   v-if="ShowJB">
    <divider>颈部</divider>

        <x-input title="颈部" :show-clear="false"  readonly  :class="!$v.TG.Neck.required?'red':'black'"  v-model="TG.Neck"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupNeck=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupNeck" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('颈部')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Neck=[],showPopupNeck = false "
            @on-click-right="showPopupNeck = false"></popup-header>    
            <checker v-model="TG.Neck" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in NeckList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>
        <!-- <popup-picker title="颈椎压痛" :data="[TendernessList]"    v-model="TG.Tenderness" value-text-align="center"></popup-picker> -->

        <x-textarea title='颈部其它' :max="20"  :rows="2" name="description"  v-model="TG.NeckOther" :placeholder="('填写补充说明')"></x-textarea>

    </template>

    <cell  style="color:green;" 
        :title="('神志')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowSZ ? 'up' : 'down'"
        @click.native="ShowSZ = !ShowSZ">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
    </cell>
    <template   v-if="ShowSZ">
    <divider>神志</divider>
    <popup-picker title="神志" :data="[MindList]"    v-model="TG.Mind" value-text-align="center"></popup-picker>
    <x-textarea title='其他' :max="20"  :rows="2" name="description"  v-model="TG.TWOther" :placeholder="('填写补充说明')"></x-textarea>
    </template>


    <cell  :class="!$v.TG.Chest.required?'red':'green1'"
        :title="('胸部')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowXB ? 'up' : 'down'"
        @click.native="ShowXB = !ShowXB">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >        
        </cell>
    <template   v-if="ShowXB">
    <divider>胸部</divider>  
        <x-input title="胸部" :show-clear="false"   :class="!$v.TG.Chest.required?'red':'black'"  readonly  v-model="TG.Chest"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupChest=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupChest" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('胸部')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Chest=[],showPopupChest = false "
            @on-click-right="showPopupChest = false"></popup-header>  
            <checker v-model="TG.Chest" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in ChestList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>

        <popup-picker title="运动度" :data="[MotionDList]"    v-model="TG.MotionD" value-text-align="center"></popup-picker>
        <popup-picker title="呼吸节律" :data="[RCRList]"    v-model="TG.RCR" value-text-align="center"></popup-picker> 

        <popup-picker title="胸廓挤压实验" :data="[ThoraxList]"    v-model="TG.Thorax" value-text-align="center"></popup-picker>
        <x-input title="肺脏" :show-clear="false"  readonly  v-model="TG.Lung"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupLung=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupLung" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('胸部')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Lung=[],showPopupLung = false "
            @on-click-right="showPopupLung = false"></popup-header>  
            <checker v-model="TG.Lung" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in LungList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>
        <x-textarea title='胸部其他' :max="20"  :rows="2" name="description"  v-model="TG.ChestOther" :placeholder="('填写补充说明')"></x-textarea>

    </template>
    <!-- <cell  style="color:green;" 
        :title="('肺脏')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowFZ ? 'up' : 'down'"
        @click.native="ShowFZ = !ShowFZ">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>
    <template   v-if="ShowFZ">
    <divider>肺脏</divider>
     
            
        <x-input title="左肺" :show-clear="false"  readonly  v-model="TG.LungLeft"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupLungLeft=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupLungLeft" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('左肺')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.LungLeft=[],showPopupLungLeft = false "
            @on-click-right="showPopupLungLeft = false"></popup-header>  
            <checker v-model="TG.LungLeft" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in LungLeftList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>

        <x-input title="右肺" :show-clear="false"  readonly  v-model="TG.LungRight"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupLungRight=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupLungRight" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('左肺')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.LungRight=[],showPopupLungRight = false "
            @on-click-right="showPopupLungRight = false"></popup-header>  
            <checker v-model="TG.LungRight" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in LungRightList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>
            
            <x-textarea title='口唇其它' :max="20"  :rows="2" name="description"  v-model="TG.LungOther" :placeholder="('填写补充说明')"></x-textarea>

    </template> -->
    <cell  :class="!$v.TG.Heart.required?'red':'green1'"
        :title="('心脏')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowXZ ? 'up' : 'down'"
        @click.native="ShowXZ = !ShowXZ">
    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>
    <template   v-if="ShowXZ">
    <divider>心脏</divider>
        <popup-picker title="心脏" :data="[HeartList]"   :class="!$v.TG.Heart.required?'red':'black'"   v-model="TG.Heart" value-text-align="center"></popup-picker>
        <popup-picker title="心律" :data="[CardiovertList]"    v-model="TG.Cardiovert" value-text-align="center"></popup-picker>
        <popup-picker title="心音" :data="[HSList]"    v-model="TG.HS" value-text-align="center"></popup-picker>
        <popup-picker title="杂音" :data="[HeartSoundList]"    v-model="TG.Thorax" value-text-align="center"></popup-picker>
        <x-textarea title='心脏其他' :max="20"  :rows="2" name="description"  v-model="TG.HeartOther" :placeholder="('填写补充说明')"></x-textarea>
    </template>

    <cell  style="color:green;" 
        :title="('腹部')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowFB ? 'up' : 'down'"
        @click.native="ShowFB = !ShowFB">
    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>
    <template   v-if="ShowFB">
    <divider>腹部</divider>

        <x-input title="腹部" :show-clear="false"  readonly  v-model="TG.Belly"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupBelly=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupBelly" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('腹部')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Belly=[],showPopupBelly = false "
            @on-click-right="showPopupBelly = false"></popup-header>  
            <checker v-model="TG.Belly" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in BellyList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>
        
        <x-input title="部位" :show-clear="false"  readonly  v-model="TG.Position"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupPosition=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupPosition" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('腹部部位')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Position=[],showPopupPosition = false "
            @on-click-right="showPopupPosition = false"></popup-header>  
            <checker v-model="TG.Position" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in PositionList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>

        <x-input title="症状" :show-clear="false"  readonly  v-model="TG.Symptom"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupSymptom=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupSymptom" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('腹部症状')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Symptom=[],showPopupSymptom = false "
            @on-click-right="showPopupSymptom = false"></popup-header>  
            <checker v-model="TG.Symptom" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in SymptomList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>


        <x-textarea title='腹部其他' :max="20"  :rows="2" name="description"  v-model="TG.BellyOther" :placeholder="('填写补充说明')"></x-textarea>

        
    </template>

    <cell  style="color:green;" 
        :title="('脊柱')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowJZ ? 'up' : 'down'"
        @click.native="ShowJZ = !ShowJZ">
    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>
    <template   v-if="ShowJZ">
    <divider>脊柱</divider>

    <x-input title="脊柱" :show-clear="false"  readonly  v-model="TG.Limbs"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupLimbs=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupLimbs" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('脊柱')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Limbs=[],showPopupLimbs = false "
            @on-click-right="showPopupLimbs = false"></popup-header>  
            <checker v-model="TG.Limbs" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in LimbsList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
    </div>

    <x-textarea title='脊柱其他' :max="20"  :rows="2" name="description"  v-model="TG.LimbsOther" :placeholder="('填写补充说明')"></x-textarea>


    </template>

    <cell  style="color:green;" 
        :title="('四肢')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowSZ ? 'up' : 'down'"
        @click.native="ShowSZ = !ShowSZ">
    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>
    <template   v-if="ShowSZ">
    <divider>四肢</divider>



    <x-input title="四肢" :show-clear="false"  readonly  v-model="TG.Limb"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupLimb=true"></x-icon></x-input>
        <div v-transfer-dom>
            <popup v-model="showPopupLimb" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('四肢')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Limb=[],showPopupLimb = false "
            @on-click-right="showPopupLimb = false"></popup-header>  
            <checker v-model="TG.Limb" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in LimbList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
    </div>

    <popup-picker title="骨盆挤压  实 验" :data="[PelvisList]"    v-model="TG.Pelvis" value-text-align="center"></popup-picker>
    <x-textarea title='四肢其他' :max="20"  :rows="2" name="description"  v-model="TG.LimbOther" :placeholder="('填写补充说明')"></x-textarea>


    </template>

    <cell  style="color:green;" 
        :title="('肌力')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowJL ? 'up' : 'down'"
        @click.native="ShowJL = !ShowJL">
    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>
    <template   v-if="ShowJL">
    <divider>肌力</divider>
    <popup-picker title="肌力" :data="[MuscleList]"    v-model="TG.Muscle" value-text-align="center"></popup-picker>
    <popup-picker title="左上" :data="[MuscleLUList]"    v-model="TG.MuscleLU" value-text-align="center"></popup-picker>
    <popup-picker title="左下" :data="[MuscleLDList]"    v-model="TG.MuscleLD" value-text-align="center"></popup-picker>
    <popup-picker title="右上" :data="[MuscleRUList]"    v-model="TG.MuscleRU" value-text-align="center"></popup-picker>
    <popup-picker title="右下" :data="[MuscleRDList]"    v-model="TG.MuscleRD" value-text-align="center"></popup-picker>
    <x-textarea title='肌力描述' :max="20"  :rows="2" name="description"  v-model="TG.MusclOther" :placeholder="('填写补充说明')"></x-textarea>

    </template>


    <cell  style="color:green;" 
        :title="('肌张力')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowJZL ? 'up' : 'down'"
        @click.native="ShowJZL = !ShowJZL">
    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>
    <template   v-if="ShowJZL">
        <divider>肌张力</divider>

        <popup-picker title="肌张力" :data="[PROMList]"    v-model="TG.PROM" value-text-align="center"></popup-picker>
        <popup-picker title="左上" :data="[PROMLUList]"    v-model="TG.PROMLU" value-text-align="center"></popup-picker>
        <popup-picker title="左下" :data="[PROMLDList]"    v-model="TG.PROMLD" value-text-align="center"></popup-picker>
        <popup-picker title="右上" :data="[PROMRUList]"    v-model="TG.PROMRU" value-text-align="center"></popup-picker>
        <popup-picker title="右下" :data="[PROMRDList]"    v-model="TG.PROMRD" value-text-align="center"></popup-picker>
        <x-textarea title='肌张力描述' :max="20"  :rows="2" name="description"  v-model="TG.PROMOther" :placeholder="('填写补充说明')"></x-textarea>


    </template>
    <group  label-width="10em" label-margin-right="0em"  label-align="left"  style=" margin-top: -20px;"  >
    <cell  style="color:green;" 
        :title="'神经系统病理反射'"
        is-link
        :border-intent="false"
        :arrow-direction="ShowSJXT ? 'up' : 'down'"
        @click.native="ShowSJXT = !ShowSJXT">
    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>
    </group>

    <template   v-if="ShowSJXT">
    <divider>神经系统病理反射</divider>

        <popup-picker title="神经系统病理反射" :data="[PronsList]"    v-model="TG.Prons" value-text-align="center"></popup-picker>

        <popup-picker title="巴氏征" :data="[BabinskiList]"    v-model="TG.Babinski" value-text-align="center"></popup-picker>
        <popup-picker title="左" :data="[BabLeftList]"    v-model="TG.BabLeft" value-text-align="center"></popup-picker>
        <popup-picker title="右" :data="[BabRightList]"    v-model="TG.BabRight" value-text-align="center"></popup-picker>
        <x-textarea title='神经系统 其 他' :max="20"  :rows="2" name="description"  v-model="TG.NerOther" :placeholder="('填写补充说明')"></x-textarea>
    
        <popup-picker title="克尼格氏征" :data="[KernigList]"      v-model="TG.Kernig" value-text-align="center"></popup-picker>
        <popup-picker title="布鲁金斯氏征" :data="[BrudzinskiList]"     v-model="TG.Brudzinski" value-text-align="center"></popup-picker>

    </template>

    
    <!-- 下面三个字典表没存  一下部分应该是保存在病历主表中故应该存入MainData中-->

    <group  label-width="14em" label-margin-right="0em"  label-align="left"  style=" margin-top: -20px;"  >
    <cell  style="color:green;" 
        :title="('辛辛那提院前卒中(CPSS)评分')"
        label-width="10em"
        is-link
        :border-intent="false"
        :arrow-direction="ShowXXNT ? 'up' : 'down'"
        @click.native="ShowXXNT = !ShowXXNT">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
    </cell>
    </group>
    <template   v-if="ShowXXNT">
    <divider>辛辛那提院前卒中(CPSS)评分</divider>

    <popup-picker  title="口角歪斜" :data="[ListDeviatedMouth]"     v-model="MainData.DeviatedMouth" value-text-align="center" ></popup-picker>
    <popup-picker title="上肢无力" :data="[ListWeakness]"     v-model="MainData.Weakness" value-text-align="center"></popup-picker>
    <popup-picker title="言语异常" :data="[ListDarley]"     v-model="MainData.Darley" value-text-align="center"></popup-picker>
    </template>
    
     <!--  -->
    <group  label-width="14em" label-margin-right="0em"  label-align="left"   style=" margin-top: -20px;" >
    <cell  style="color:green;" 
        :title="(' 格拉斯哥昏迷指数(GCS)评分')"
        is-link
        :border-intent="false"
        :arrow-direction="ShowGLSG ? 'up' : 'down'"
        @click.native="ShowGLSG = !ShowGLSG">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
    </cell>
    </group>
    <template   v-if="ShowGLSG">
    <divider> 格拉斯哥昏迷指数(GCS)</divider>
     <!--此处的评分先用隐藏的存对象,让后通过触发事件来改变真正的分数  -->
    <popup-picker title="睁眼反应" :data="[EyeScoreList]"  show-name   v-model="MainData.HiddenEyeScore" value-text-align="center"></popup-picker>
    <popup-picker title="语言反应" :data="[VerbalScoreList]"  show-name    v-model="MainData.HiddenVerbalScore" value-text-align="center"></popup-picker>
    <popup-picker title="肢体运动" :data="[MotorScoreList]"   show-name   v-model="MainData.HiddenMotorScore" value-text-align="center"></popup-picker>
    <!--  -->
    </template>
    <x-textarea title='其他补充' :max="100"  :rows="3" name="description"  v-model="TG.Other" :placeholder="('填写其他补充说明')"></x-textarea>


</group>
</template>
<script>
    import Physical  from  "./js/Physical.js"
    export default Physical
</script>


<style scoped lang="less">

    .red{
    color:red;
    }
    .green1{
    color:green;
    }
    .black{
    color:black;

    }
    .vux-header-box {
    z-index: 100;
    /* position: absolute; */
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    }


    .popup-item-selected {
        background: #ffffff  url(../../assets/images/active.png)  no-repeat right bottom;
        border-color: #ff4a00;
    }
    .popup-item {
        font-size: 9px;
        width: 130px;
        height: 30px;
        line-height: 26px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-right: 6px;
    }
    .cell-x-icon {
        display: block;
        fill: gray;
    }
    .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
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
    margin-right: 6px;
    }
    .SendAdd-item-selected {
    background: #ffffff  url(../../assets/images/active.png)  no-repeat right bottom;
    border-color: #ff4a00;
    }
    .demo4-item-disabled {
    color: #999;
    }
    .newslist ul li p {
    font-size: 14px;
    color: #555;
    line-height: 25px;
    height: 50px;
    overflow: hidden;
    transition: height .3s;
    }
    .popup_header{
    padding: 5px 5px 5px 2px;color:#888;
    }
    .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
    }
    .xuanfu {
        height: 4.5rem;
        width: 4.5rem;
        /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
        z-index: 999;
        position: fixed;
        top: 4.2rem;
        right: 3.2rem;
        border-radius: 0.8rem;
        background-color: rgba(0, 0, 0, 0.55);
        }
        .yuanqiu {
        height: 2.7rem;
        width: 2.7rem;
        border: 0.3rem solid rgba(140, 136, 136, 0.5);
        margin: 0.65rem auto;
        color: #000000;
        font-size: 1.6rem;
        line-height: 2.7rem;
        text-align: center;
        border-radius: 100%;
        background-color: #ffffff;
    }
</style>