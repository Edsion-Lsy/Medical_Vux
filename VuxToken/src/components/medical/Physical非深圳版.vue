<template>

<group  label-width="5.5em" label-margin-right="0em"  label-align="left" style=" margin-top: 30px;"  >
    <div  v-if="FoldSwitch==='close'">
    <x-header class="vux-header-box"  style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
        
        体格检查<!--<a slot="right" style="color:black "   @click="SaveTGinfo()">保存</a>  -->
        <a slot="right"  style="color:black "   @click="SaveTGinfo()">保存</a>
        </x-header>
    </div>
    <div v-if="FoldSwitch!=='close'">
    <x-header class="vux-header-box"  :left-options="{showBack: false}" style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);color:black;" >
        {{HeaderTitle}}
        <!--<a slot="right" style="color:black "   @click="SaveTGinfo()">保存</a>  -->
        
        
    </x-header>
    </div>
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
<div style=" margin-top: 10px;" >


    <div v-transfer-dom>
                <popup v-model="ButtonOpen" height="17em" :hide-on-blur=false is-transparent >
                    <div style="width: 95%;background-color:#fff;height:15em;margin:0 auto;border-radius:5px;padding-top:0px;">
                    
                    <div style="padding:25px 15px;">
                        
                        <p align="center"  style="font-size:20px" >{{ ('是否全部部位设置为阴性无异常选项') }}</p>

                        <!-- <p align="center"  style="font-size:20px" >{{ ('有'+this.$store.state.Basicinfo.errorCount.toString()+'条必填项未填写，是否确认保存') }}</p> -->
                        <x-button type="primary" @click.native="DefaultCorrect()">确定</x-button>
                        <x-button @click.native="ButtonOpen=false">取消</x-button>
                    </div>
                    </div>
                </popup>
    </div>

    <div v-if="FoldSwitch==='close' ">
        
        <!-- <cell  id="loadmore" :title="('查体时间')"   style=" margin-top: 10px;" > 
            <el-date-picker required class="data-width" v-model="MainData.DrivingTime" @focus="forbid" size="large" value-format="yyyy-MM-dd HH:mm:ss"   type="datetime"  placeholder="选择出车时间"  default-time="12:00:00">
        </el-date-picker></cell> -->
    </div>
    
    <div v-if="GridSwitch">
       <grid >
            <grid-item    @click.native="FoldSwitch='JCJC',GridSwitch=false,HeaderTitle='上车前'"  >
                <img slot="icon" src="../../assets/images/icons/担架.png">
                <span slot="label" :class="$v.TG.Temperatur.required&&$v.TG.Pulse.required&&$v.TG.Respiratio.required&&$v.TG.BP1.required
                
                &&$v.TG.BP2.required
                
                ?'green1':'red'">{{ ('上车前') }}
                </span> 
                
            </grid-item>
            <grid-item    @click.native="FoldSwitch='JCJCZ',GridSwitch=false,HeaderTitle='转运途中'"  >
                <img slot="icon" src="../../assets/images/icons/救护车.png">
                <span slot="label">{{ ('转运途中') }}
                </span> 
                
            </grid-item>
            <grid-item    @click.native="FoldSwitch='JCJCJ',GridSwitch=false,HeaderTitle='交接点'"  >
                <img slot="icon" src="../../assets/images/icons/交接.png">
                <span slot="label">{{ ('交接点') }}
                </span> 
                
            </grid-item>
            
        </grid>


        <grid>
            
            <grid-item  v-if="$store.state.AddPatientPage=='AddPatientRecordGuangZ'"   @click.native="FoldSwitch='FY',GridSwitch=false,HeaderTitle='发育'"  >
                        <img slot="icon" src="../../assets/images/icons/Gridicon-note.png">
                        <span slot="label">{{ ('发育') }}
                        </span> 
                        
                    </grid-item>
            </grid>



        <grid v-if="$store.state.AddPatientPage=='AddPatientRecordGuangZ'">

            <grid-item    @click.native="FoldSwitch='LB',GridSwitch=false,HeaderTitle='淋巴'"  >
                <img slot="icon" src="../../assets/images/icons/Gridicon-note.png">
                <span slot="label">{{ ('淋巴') }}
                </span> 
                
            </grid-item>
             <grid-item    @click.native="FoldSwitch='EB',GridSwitch=false,HeaderTitle='耳部'"  >
                <img slot="icon" src="../../assets/images/icons/Gridicon-note.png">
                <span slot="label">{{ ('耳部') }}
                </span> 
                
            </grid-item>

        </grid>

        
        <grid v-if="$store.state.AddPatientPage=='AddPatientRecordGuangZ'">
           
            <grid-item    @click.native="FoldSwitch='BB',GridSwitch=false,HeaderTitle='鼻部'"  >
                <img slot="icon" src="../../assets/images/icons/Gridicon-note.png">
                <span slot="label">{{ ('鼻部') }}
                </span> 
                
            </grid-item>

             <grid-item    @click.native="FoldSwitch='HB',GridSwitch=false,HeaderTitle='喉部'"  >
                <img slot="icon" src="../../assets/images/icons/Gridicon-note.png">
                <span slot="label">{{ ('喉部') }}
                </span> 
                
            </grid-item>

        </grid>

        <grid v-if="$store.state.AddPatientPage=='AddPatientRecordGuangZ'">
           
            <grid-item    @click.native="FoldSwitch='KQ',GridSwitch=false ,HeaderTitle='口腔'"  >
                <img slot="icon" src="../../assets/images/icons/Gridicon-note.png">
                <span slot="label">{{ ('口腔') }}
                </span> 
                
            </grid-item>

             <grid-item    @click.native="FoldSwitch='SS',GridSwitch=false,HeaderTitle='双肾'"  >
                <img slot="icon" src="../../assets/images/icons/Gridicon-note.png">
                <span slot="label">{{ ('双肾') }}
                </span> 
                
            </grid-item>

        </grid>




        <grid>
            <grid-item   v-if="$store.state.AddPatientPage=='AddPatientRecordQH'"  @click.native="FoldSwitch='TW',GridSwitch=false,HeaderTitle='神志与体位'  "  >
                <img slot="icon" src="../../assets/images/icons/外科检查.png">
                <span slot="label">{{ ('神志与体位') }}
                </span> 
                
            </grid-item>
            
            <grid-item    @click.native="FoldSwitch='YB',GridSwitch=false,HeaderTitle='瞳孔'"  >
                <img slot="icon" src="../../assets/images/icons/眼.png">
                <span slot="label" :class="$v.TG.Pupil.required?'green1':'red'" >{{ ('瞳孔') }}
                </span> 
                
            </grid-item>
             <!-- <grid-item    @click.native="FoldSwitch='DGFS',GridSwitch=false,HeaderTitle='对光反射'"  >
                <img slot="icon" src="../../assets/images/icons/眼.png">
                <span slot="label"  >{{ ('对光反射') }}
                </span> 
                
            </grid-item> -->
            <grid-item    @click.native="FoldSwitch='TB',GridSwitch=false,HeaderTitle='头部'"  >
                <img slot="icon" src="../../assets/images/icons/头部.png">
                <span slot="label">{{ ('头部') }}
                </span> 
                
            </grid-item>
        </grid>
        <grid>
          
            <grid-item    @click.native="FoldSwitch='JB',GridSwitch=false,HeaderTitle='颈部'"  >
                <img slot="icon" src="../../assets/images/icons/咽喉颈部.png">
                <span slot="label" :class="$v.TG.Neck.required?'green1':'red'" >{{ ('颈部') }}
                </span> 
                
            </grid-item>
            <grid-item    @click.native="FoldSwitch='XB',GridSwitch=false,HeaderTitle='胸部'"  >
                <img slot="icon" src="../../assets/images/icons/胸部.png">
                <span slot="label"  :class="$v.TG.Chest.required?'green1':'red'" >{{ ('胸部') }}
                </span> 
                
            </grid-item>
            <grid-item    @click.native="FoldSwitch='XZ',GridSwitch=false,HeaderTitle='心脏'"  >
                <img slot="icon" src="../../assets/images/icons/心脏.png">
                <span slot="label"    >{{ ('心脏') }}
                </span> 
                
            </grid-item>
        </grid>
       
        <grid>
            <grid-item    @click.native="FoldSwitch='FeiB',GridSwitch=false,HeaderTitle='肺脏'"  >
                <img slot="icon" src="../../assets/images/icons/肺.png">
                <span slot="label" >{{ ('肺脏') }}
                </span> 
                
            </grid-item>

            <grid-item    @click.native="FoldSwitch='FB',GridSwitch=false,HeaderTitle='腹部'"  >
                <img slot="icon" src="../../assets/images/icons/腹部.png">
                <span slot="label" >{{ ('腹部') }}
                </span> 
                
            </grid-item>
            <grid-item    @click.native="FoldSwitch='JZ',GridSwitch=false,HeaderTitle='脊柱'"  >
                <img slot="icon" src="../../assets/images/icons/脊柱外科.png">
                <span slot="label">{{ ('脊柱') }}
                </span> 
                
            </grid-item>
            

        </grid>
        <grid>
    
            <grid-item    @click.native="FoldSwitch='SZhi',GridSwitch=false,HeaderTitle='四肢'"  >
                <img slot="icon" src="../../assets/images/icons/四肢.png">
                <span slot="label">{{ ('四肢') }}
                </span> 
                
            </grid-item>
            <grid-item    @click.native="FoldSwitch='JL',GridSwitch=false,HeaderTitle='肌力'"  >
                <img slot="icon" src="../../assets/images/icons/肌力.png">
                <span slot="label">{{ ('肌力') }}
                </span> 
                
            </grid-item>
            <grid-item    @click.native="FoldSwitch='JZL',GridSwitch=false,HeaderTitle='肌张力'"  >
                <img slot="icon" src="../../assets/images/icons/肌力.png">
                <span slot="label">{{ ('肌张力') }}
                </span> 
                
            </grid-item>
            
            
        </grid>
        
        <grid>
             <grid-item  v-if="$store.state.AddPatientPage=='AddPatientRecordQH'"   @click.native="FoldSwitch='PF',GridSwitch=false,HeaderTitle='皮肤'"  >
                <img slot="icon" src="../../assets/images/icons/皮肤科.png">
                <span slot="label">{{ ('皮肤') }}
                </span> 
                
            </grid-item>
             <grid-item     @click.native="FoldSwitch='SJXTBLFS',GridSwitch=false,HeaderTitle='神经系统病理反射'"  >
                <img slot="icon" src="../../assets/images/icons/神经内科.png">
                <span slot="label">{{ ('神经系统病理反射') }}
                </span> 
                
            </grid-item>

       

        </grid>

        <grid>
            

            <grid-item    @click.native="FoldSwitch='XXNT',GridSwitch=false,HeaderTitle='辛辛那提院前卒中评分'"  >
                <img slot="icon" src="../../assets/images/icons/评估报告.png">
                <span slot="label">{{ ('辛辛那提院前卒中评分') }}
                </span> 
                <!-- (CPSS) -->
            </grid-item>
            <grid-item    @click.native="FoldSwitch='GLSG',GridSwitch=false,HeaderTitle='格拉斯哥昏迷指数评分'"  >
                <img slot="icon" src="../../assets/images/icons/评估报告.png">
                <span slot="label">{{ ('格拉斯哥昏迷指数评分') }}
                </span> 
                <!-- (GCS) -->
            </grid-item>
                
                
        </grid>
    </div>

  
    <template   v-if="FoldSwitch==='JCJC'">
        
        <cell  id="loadmore" :title="('查体时间')"   style=" margin-top: 10px;" > 
            <el-date-picker required class="data-width" v-model="MainData.ArrivedTime" @focus="forbid" size="large" value-format="yyyy-MM-dd HH:mm:ss"   type="datetime"  placeholder="选择出车时间"  default-time="12:00:00">
        </el-date-picker></cell>
        <flexbox>
            <flexbox-item :span="4/5">  <x-input title="T    "  :show-clear="false"  :class="!$v.TG.Temperatur.required &&  $v.TG.Temperatur.required!=undefined?'red':'black'"  value-text-align="right"  v-model="TG.Temperatur" >
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


            <!-- <popup-picker title="意识" :data="[AVPUList]"   :class="!$v.TG.AVPU.required?'red':'black'"     v-model="TG.AVPU" value-text-align="center"></popup-picker> -->

            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </template >
 
    <template   v-else-if="FoldSwitch==='JCJCZ'" >
       
    
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


            <!-- <popup-picker title="意识" :data="[AVPUListZ]"     v-model="TG.AVPUZ" value-text-align="center"></popup-picker> -->
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </template >


    <template   v-else-if="FoldSwitch==='JCJCJ'">
       

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


            <!-- <popup-picker title="意识" :data="[AVPUListJ]"     v-model="TG.AVPUJ" value-text-align="center"></popup-picker> -->
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </template >
    <div v-else-if="$store.state.AddPatientPage=='AddPatientRecordGuangZ'&& FoldSwitch==='FY' ">
        <!-- <cell   style="color:green;" 
            :title="'发育'"
            is-link
            :border-intent="false"
            :arrow-direction="ShowFY ? 'up' : 'down'"
            @click.native="ShowFY = !ShowFY">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/images/icons/Gridicon-note.png"  >
        </cell>

        <template   v-if="ShowFY"> -->
       
            

            <!-- <x-input title="发育" :show-clear="false"       readonly  v-model="TG.Growth"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupGrowth=true"></x-icon></x-input>
            <div v-transfer-dom>
                <popup v-model="showPopupGrowth" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
                <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('发育')" :show-bottom-border="true"
                    align="center"  style="background-color: #fff;"
                    @on-click-left="TG.Growth=[],showPopupGrowth = false "
                    @on-click-right="showPopupGrowth = false"></popup-header>    
                <checker v-model="TG.Growth" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                    <checker-item v-for="itema in GrowthList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
                </checker></div></popup>
            </div> -->


            <Lsy-checkbox  :Title="'发育'"   :Sign="'Growth'"   :Maindata="TG.Growth"  :DictionaryList="GrowthList" 
            
            @lsyonchange="data => { TG.Growth = data }"
            
            ></Lsy-checkbox>
            <!-- @disabled="disabled" -->
            
            
            <x-textarea title='发育描述' :max="20"  :rows="2" name="description"  v-model="TG.GrowthQT" :placeholder="'填写补充说明'"></x-textarea>
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

        <!-- </template > -->
    </div>


    <div v-else-if="$store.state.AddPatientPage=='AddPatientRecordGuangZ'&& FoldSwitch==='LB' ">
           
            <Lsy-checkbox  :Title="'淋巴结症状'"  :Sign="'LymphType'"   :Maindata="TG.LymphType"  :DictionaryList="LymphTypeList" 
            
            @lsyonchange="data => { TG.LymphType = data }"
            
            ></Lsy-checkbox>
            <Lsy-checkbox  :Title="'淋巴结部位'"   :Sign="'Lymph'"    :Maindata="TG.Lymph"  :DictionaryList="LymphList" 
            
            @lsyonchange="data => { TG.Lymph = data }"
            
            ></Lsy-checkbox>
            

            <!-- <x-input title="淋巴结症状" :show-clear="false"       readonly  v-model="TG.LymphType"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupLymphType=true"></x-icon></x-input>
            <div v-transfer-dom>
                <popup v-model="showPopupLymphType" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
                <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('淋巴结症状')" :show-bottom-border="true"
                    align="center"  style="background-color: #fff;"
                    @on-click-left="TG.LymphType=[],showPopupLymphType = false "
                    @on-click-right="showPopupLymphType = false"></popup-header>    
                <checker v-model="TG.LymphType" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                    <checker-item v-for="itema in LymphTypeList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
                </checker></div></popup>
            </div>
            <x-input title="淋巴结部位" :show-clear="false"     readonly  v-model="TG.Lymph"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupLymph=true"></x-icon></x-input>
            <div v-transfer-dom>
                <popup v-model="showPopupLymph" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
                <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('淋巴结部位')" :show-bottom-border="true"
                    align="center"  style="background-color: #fff;"
                    @on-click-left="TG.Lymph=[],showPopupLymph = false "
                    @on-click-right="showPopupLymph = false"></popup-header>    
                <checker v-model="TG.Lymph" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                    <checker-item v-for="itema in LymphList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
                </checker></div></popup>
            </div> -->

            
            
            
            <x-textarea title='淋巴描述' :max="20"  :rows="2" name="description"  v-model="TG.LymphQT" :placeholder="'填写补充说明'"></x-textarea>
            
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

        <!-- </template > -->
    </div>



    <div v-else-if="$store.state.AddPatientPage=='AddPatientRecordGuangZ'&& FoldSwitch==='EB' ">
            
            
            <popup-picker title="耳廓" :data="[AuricleList]"    v-model="TG.Auricle" value-text-align="center"></popup-picker>
            <x-input title="外耳道" :show-clear="false"     readonly  v-model="TG.Earopen"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupEaropen=true"></x-icon></x-input>
            <div v-transfer-dom>
                <popup v-model="showPopupEaropen" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
                <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('外耳道')" :show-bottom-border="true"
                    align="center"  style="background-color: #fff;"
                    @on-click-left="TG.Earopen=[],showPopupEaropen = false "
                    @on-click-right="showPopupEaropen = false"></popup-header>    
                <checker v-model="TG.Earopen" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                    <checker-item v-for="itema in EaropenList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
                </checker></div></popup>
            </div>
            <popup-picker title="乳突" :data="[EarRTList]"    v-model="TG.EarRT" value-text-align="center"></popup-picker>
            <popup-picker title="听力" :data="[HearingList]"    v-model="TG.Hearing" value-text-align="center"></popup-picker>
            

            
            
            <x-textarea title='耳部描述' :max="20"  :rows="2" name="description"  v-model="TG.EaropenQT" :placeholder="'填写补充说明'"></x-textarea>
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

        <!-- </template > -->
    </div>

    <div v-else-if="$store.state.AddPatientPage=='AddPatientRecordGuangZ'&& FoldSwitch==='BB' ">
           
            
           
            <x-input title="鼻部" :show-clear="false"     readonly  v-model="TG.Nose"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupNose=true"></x-icon></x-input>
            <div v-transfer-dom>
                <popup v-model="showPopupNose" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
                <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('鼻部')" :show-bottom-border="true"
                    align="center"  style="background-color: #fff;"
                    @on-click-left="TG.Nose=[],showPopupNose = false "
                    @on-click-right="showPopupNose = false"></popup-header>    
                <checker v-model="TG.Nose" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                    <checker-item v-for="itema in NoseList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
                </checker></div></popup>
            </div>

            <x-textarea title='鼻部描述' :max="20"  :rows="2" name="description"  v-model="TG.NoseQT" :placeholder="'填写补充说明'"></x-textarea>
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>

    <div v-else-if="$store.state.AddPatientPage=='AddPatientRecordGuangZ'&& FoldSwitch==='HB' ">
            

            <x-input title="喉部" :show-clear="false"     readonly  v-model="TG.Throat"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupThroat=true"></x-icon></x-input>
            <div v-transfer-dom>
                <popup v-model="showPopupThroat" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
                <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('喉部')" :show-bottom-border="true"
                    align="center"  style="background-color: #fff;"
                    @on-click-left="TG.Throat=[],showPopupThroat = false "
                    @on-click-right="showPopupThroat = false"></popup-header>    
                <checker v-model="TG.Throat" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                    <checker-item v-for="itema in ThroatList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
                </checker></div></popup>
            </div>

            <x-textarea title='喉部描述' :max="20"  :rows="2" name="description"  v-model="TG.ThroatQT" :placeholder="'填写补充说明'"></x-textarea>
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>
    <div v-else-if="$store.state.AddPatientPage=='AddPatientRecordGuangZ'&& FoldSwitch==='KQ' ">
            

            <x-input title="口腔" :show-clear="false"     readonly  v-model="TG.OralCavity"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupOralCavity=true"></x-icon></x-input>
            <div v-transfer-dom>
                <popup v-model="showPopupOralCavity" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
                <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('喉部')" :show-bottom-border="true"
                    align="center"  style="background-color: #fff;"
                    @on-click-left="TG.OralCavity=[],showPopupOralCavity = false "
                    @on-click-right="showPopupOralCavity = false"></popup-header>    
                <checker v-model="TG.OralCavity" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                    <checker-item v-for="itema in OralCavityList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
                </checker></div></popup>
            </div>

            <x-textarea title='喉部描述' :max="20"  :rows="2" name="description"  v-model="TG.OralCavityQT" :placeholder="'填写补充说明'"></x-textarea>
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>
    <div v-else-if="$store.state.AddPatientPage=='AddPatientRecordGuangZ'&& FoldSwitch==='SS' ">
            

            <x-input title="双肾" :show-clear="false"     readonly  v-model="TG.Kidneys"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupKidneys=true"></x-icon></x-input>
            <div v-transfer-dom>
                <popup v-model="showPopupKidneys" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
                <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('喉部')" :show-bottom-border="true"
                    align="center"  style="background-color: #fff;"
                    @on-click-left="TG.Kidneys=[],showPopupKidneys = false "
                    @on-click-right="showPopupKidneys = false"></popup-header>    
                <checker v-model="TG.Kidneys" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                    <checker-item v-for="itema in KidneysList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
                </checker></div></popup>
            </div>

            <x-textarea title='双肾描述' :max="20"  :rows="2" name="description"  v-model="TG.KidneyQT" :placeholder="'填写补充说明'"></x-textarea>
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>




    <div v-else-if="FoldSwitch==='TW' ">
    
        <popup-picker title="神志" :data="[MindList]"    v-model="TG.Mind" value-text-align="center"></popup-picker>
        <popup-picker title="体位" :data="[PosturalList]"    v-model="TG.Postural" value-text-align="center"></popup-picker>
        <x-textarea title='体位描述' :max="20"  :rows="2" name="description"  v-model="TG.TWOther" :placeholder="'填写补充说明'"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    
    </div>
    <div v-else-if="FoldSwitch==='PF' ">

       
        
        <popup-picker title="皮肤湿度" :data="[SkinHumList]"    v-model="TG.SkinHum" value-text-align="center"></popup-picker>
        <popup-picker title="皮肤弹性" :data="[SkinElaList]"    v-model="TG.SkinEla" value-text-align="center"></popup-picker>
        <popup-picker title="皮肤颜色" :data="[SkinCloList]"    v-model="TG.SkinClo" value-text-align="center"></popup-picker>
        <x-textarea title='皮肤其它' :max="20"  :rows="2" name="description"  v-model="TG.SkOther" :placeholder="('填写补充说明')"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>

    <div v-else-if="FoldSwitch==='YB' ">   
       
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
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>
    <div v-else-if="FoldSwitch==='DGFS' ">   
    
        <popup-picker title="对光反射" :data="[RefleList]"    v-model="TG.Refle" value-text-align="center"></popup-picker>
        <popup-picker title="对光反射左" :data="[RefleLeftList]"    v-model="TG.RefleLeft" value-text-align="center"></popup-picker>
        <popup-picker title="对光反射右" :data="[RefleRightList]"    v-model="TG.RefleRight" value-text-align="center"></popup-picker>
        <x-textarea title='对光反射描述' :max="20"  :rows="2" name="description"  v-model="TG.RefleOther" :placeholder="'填写对光反射补充说明'"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>
        
    <div v-else-if="FoldSwitch==='TB' ">
       
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
         <!-- <div v-transfer-dom> //使用pad原生接口
            <popup v-model="showPopupHead" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('头部')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Head=[],showPopupHead = false "
            @on-click-right="showPopupHead = false"></popup-header>    
            <checker v-model="TG.Head" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in this.$LocalDictionaryApi.GetSelectPredefinedTreatmentRecordKey('Head')" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div> -->
        <popup-picker title="口唇" :data="[CyanosisList]"    v-model="TG.Cyanosis" value-text-align="center"></popup-picker>
        <x-textarea title='头部描述' :max="20"  :rows="2" name="description"  v-model="TG.HeadOther" :placeholder="('填写补充说明')"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>


    <div v-else-if="FoldSwitch==='JB' ">
        

      
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
        <popup-picker v-if="$store.state.AddPatientPage=='AddPatientRecordQH'" title="颈椎压痛" :data="[TendernessList]"    v-model="TG.Tenderness" value-text-align="center"></popup-picker>
   
        <!-- <popup-picker title="颈椎压痛" :data="[TendernessList]"    v-model="TG.Tenderness" value-text-align="center"></popup-picker> -->

        <x-textarea title='颈部其它' :max="20"  :rows="2" name="description"  v-model="TG.NeckOther" :placeholder="('填写补充说明')"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>
 

    <div v-else-if="FoldSwitch==='XB' ">
       
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

    
        <x-textarea  title='胸部其他' :max="20"  :rows="2" name="description"  v-model="TG.ChestOther" :placeholder="('填写补充说明')"></x-textarea>
        
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>
    

    <div v-else-if="FoldSwitch==='FeiB' ">

        <x-input   title="肺脏" :show-clear="false"  readonly  v-model="TG.Lung"     >
            <x-icon slot="right" type="ios-plus"  class="cell-x-icon"  @click.native="showPopupLung=true"></x-icon></x-input>
        <div  v-transfer-dom>
            <popup v-model="showPopupLung" class="checker-popup"><div style="padding:10px 10px 40px 10px;background-color: #fff;">
            <popup-header :left-text="('取消')"  :right-text="('确定')" :title="('胸部')" :show-bottom-border="true"
            align="center"  style="background-color: #fff;"
            @on-click-left="TG.Lung=[],showPopupLung = false "
            @on-click-right="showPopupLung = false"></popup-header>  
            <checker v-model="TG.Lung" type="checkbox" default-item-class="SendAdd-item" selected-item-class="SendAdd-item-selected" disabled-item-class="demo4-item-disabled">
                <checker-item v-for="itema in LungList" :key="itema.key" :value="itema.value" >{{itema.value}}</checker-item>
            </checker></div></popup>
        </div>
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
        <popup-picker  title="胸廓挤压实验" :data="[ThoraxList]"    v-model="TG.Thorax" value-text-align="center"></popup-picker>
       
        <x-textarea  title='胸部其他' :max="20"  :rows="2" name="description"  v-model="TG.LungOther" :placeholder="('填写补充说明')"></x-textarea>
        
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>
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
    <div v-else-if="FoldSwitch==='XZ' ">
    
        <popup-picker title="心脏" :data="[HeartList]"      v-model="TG.Heart" value-text-align="left"></popup-picker>
        
        
        <flexbox v-if="$store.state.AddPatientPage=='AddPatientRecordQH'" >
                <flexbox-item  :span="4/5" >
                <x-input title="心率   "  :show-clear="false"  value-text-align="left"   v-model="TG.HeartRate" ></x-input>
                </flexbox-item>
                <flexbox-item >次/分</flexbox-item>    
        </flexbox>

        <popup-picker title="心律" :data="[CardiovertList]"    v-model="TG.Cardiovert" value-text-align="left"></popup-picker>
        <popup-picker title="心音" :data="[HSList]"    v-model="TG.HS" value-text-align="left"></popup-picker>
        <popup-picker title="杂音" :data="[HeartSoundList]"    v-model="TG.Thorax" value-text-align="left"></popup-picker>
        <x-textarea title='心脏其他' :max="20"  :rows="2" name="description"  v-model="TG.HeartOther" :placeholder="('填写补充说明')"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>

    <div v-else-if="FoldSwitch==='FB' ">


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
        
        <!-- <x-input title="部位" :show-clear="false"  readonly  v-model="TG.Position"     >
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
        </div> -->


        <x-textarea title='腹部其他' :max="20"  :rows="2" name="description"  v-model="TG.BellyOther" :placeholder="('填写补充说明')"></x-textarea>

        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>

    <div v-else-if="FoldSwitch==='JZ' ">


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
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>

    <div v-else-if="FoldSwitch==='SZhi' ">
  

    <x-input title="四 肢" :show-clear="false"  readonly  v-model="TG.Limb"     >
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

    <popup-picker title="骨 盆 挤 压 实 验" :data="[PelvisList]"    v-model="TG.Pelvis" value-text-align="center"></popup-picker>
    <x-textarea title='四肢其他' :max="20"  :rows="2" name="description"  v-model="TG.LimbOther" :placeholder="('填写补充说明')"></x-textarea>
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>
    <div v-else-if="FoldSwitch==='JL' ">
   

    <popup-picker title="肌力" :data="[MuscleList]"    v-model="TG.Muscle" value-text-align="center"></popup-picker>
    
    <flexbox>
            <flexbox-item > <popup-picker title="左上" :data="[MuscleLUList]"    v-model="TG.MuscleLU" value-text-align="center"></popup-picker>  </flexbox-item>
            <flexbox-item><popup-picker title="左下" :data="[MuscleLDList]"    v-model="TG.MuscleLD" value-text-align="center"></popup-picker></flexbox-item> 
    </flexbox>
    <flexbox>
            <flexbox-item><popup-picker title="右上" :data="[MuscleRUList]"    v-model="TG.MuscleRU" value-text-align="center"></popup-picker>  </flexbox-item>
            <flexbox-item><popup-picker title="右下" :data="[MuscleRDList]"    v-model="TG.MuscleRD" value-text-align="center"></popup-picker></flexbox-item> 
    </flexbox>
    
    <x-textarea title='肌力描述' :max="20"  :rows="2" name="description"  v-model="TG.MusclOther" :placeholder="('填写补充说明')"></x-textarea>
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>

    <div v-else-if="FoldSwitch==='JZL' ">
    

        <popup-picker title="肌张力" :data="[PROMList]"    v-model="TG.PROM" value-text-align="center"></popup-picker>
        
        <flexbox>
                <flexbox-item > <popup-picker title="左上" :data="[PROMLUList]"    v-model="TG.PROMLUList" value-text-align="center"></popup-picker>  </flexbox-item>
                <flexbox-item><popup-picker title="左下" :data="[PROMLDList]"    v-model="TG.PROMLDList" value-text-align="center"></popup-picker></flexbox-item> 
        </flexbox>
        <flexbox>
                <flexbox-item><popup-picker title="右上" :data="[PROMRUList]"    v-model="TG.PROMRUList" value-text-align="center"></popup-picker>  </flexbox-item>
                <flexbox-item><popup-picker title="右下" :data="[PROMRDList]"    v-model="TG.PROMRDList" value-text-align="center"></popup-picker></flexbox-item> 
        </flexbox>

        <x-textarea title='肌张力描述' :max="20"  :rows="2" name="description"  v-model="TG.PROMOther" :placeholder="('填写补充说明')"></x-textarea>
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>

    <div v-else-if="FoldSwitch==='SJXTBLFS' ">
    <!-- <group  label-width="10em" label-margin-right="0em"  label-align="left"  style=" margin-top: -20px;"  > -->
    <!-- </group> -->

        <popup-picker title="神经系统病理反射" :data="[PronsList]"    v-model="TG.Prons" value-text-align="center"></popup-picker>

        <popup-picker title="巴氏征" :data="[BabinskiList]"    v-model="TG.Babinski" value-text-align="center"></popup-picker>
        <popup-picker title="左" :data="[BabLeftList]"    v-model="TG.BabLeft" value-text-align="center"></popup-picker>
        <popup-picker title="右" :data="[BabRightList]"    v-model="TG.BabRight" value-text-align="center"></popup-picker>
        <x-textarea title='神经系统 其 他' :max="20"  :rows="2" name="description"  v-model="TG.NerOther" :placeholder="('填写补充说明')"></x-textarea>
    
        <popup-picker title="克尼格氏征" :data="[KernigList]"      v-model="TG.Kernig" value-text-align="center"></popup-picker>
        <popup-picker title="布鲁金斯氏征" :data="[BrudzinskiList]"     v-model="TG.Brudzinski" value-text-align="center"></popup-picker>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>

    
    <!-- 下面三个字典表没存  一下部分应该是保存在病历主表中故应该存入MainData中-->

    <div v-else-if="FoldSwitch==='XXNT' ">

    <popup-picker  title="口角歪斜" :data="[ListDeviatedMouth]"     v-model="MainData.DeviatedMouth" value-text-align="center" ></popup-picker>
    <popup-picker title="上肢无力" :data="[ListWeakness]"     v-model="MainData.Weakness" value-text-align="center"></popup-picker>
    <popup-picker title="言语异常" :data="[ListDarley]"     v-model="MainData.Darley" value-text-align="center"></popup-picker>
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>
    
     <!--  -->
    <div v-else-if="FoldSwitch==='GLSG' ">

     <!--此处的评分先用隐藏的存对象,让后通过触发事件来改变真正的分数  -->
    <popup-picker title="睁眼反应" :data="[EyeScoreList]"  show-name   v-model="MainData.HiddenEyeScore" value-text-align="center"></popup-picker>
    <popup-picker title="语言反应" :data="[VerbalScoreList]"  show-name    v-model="MainData.HiddenVerbalScore" value-text-align="center"></popup-picker>
    <popup-picker title="肢体运动" :data="[MotorScoreList]"   show-name   v-model="MainData.HiddenMotorScore" value-text-align="center"></popup-picker>
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>

    <div v-if="FoldSwitch==='close' ">
        <group  v-if="$store.state.AddPatientPage=='AddPatientRecordQH'"  label-width="13em" label-margin-right="0em"  label-align="left"
            :title="'改良早期预警评分等级：'+MEWSContent"
        >
            <x-input title="改良早期预警评分(MEWS) " readonly  :show-clear="false"  text-align="center"   value-text-align="center"  v-model="MainData.MEWS" >
                <p slot="right"  >分</p></x-input>
                </flexbox-item>
                
            </x-input>
    

        </group>

        
       

    <x-textarea title='其他补充' :max="100"  :rows="3" name="description"  v-model="TG.Other" :placeholder="('填写其他补充说明')"></x-textarea>
    </div>
</div>
</group>

</template>
<script>
    import Physical  from  "./js/Physical.js"
    export default Physical
</script>

<style>
    .el-picker-panel .el-popper{
        width: 150px;
    }
</style>

<style   lang="less">
	/deep/.data-width{
            /deep/.el-time-panel{
                width: 150px;
            }
    }
//scoped
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
        width: 140px;
        height: 30px;
        line-height: 26px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-right: 6px;
        margin-left: 6px;
        margin-top: 1px;
        margin-bottom: 1px;
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
    width: 140px;
    height: 30px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
        margin-left: 6px;
        margin-top: 1px;
        margin-bottom: 1px;
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