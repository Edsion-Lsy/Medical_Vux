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
                <span slot="label" :class="$v.TG.Pulse.required&&$v.TG.Respiratio.required&&$v.TG.BP1.required&&$v.TG.BP2.required&&$v.TG.AVPU.required?'green1':'red'">{{ ('上车前') }}
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
            <grid-item   v-if="$store.state.AddPatientPage==='AddPatientRecordQH'"  @click.native="FoldSwitch='TW',GridSwitch=false,HeaderTitle='神志与体位'  "  >
                <img slot="icon" src="../../assets/images/icons/外科检查.png">
                <span slot="label">{{ ('神志与体位') }}
                </span> 
                
            </grid-item>
            <grid-item   v-if="$store.state.AddPatientPage==='AddPatientRecordSZ'"    @click.native="FoldSwitch='TW',GridSwitch=false,HeaderTitle='体位'  "  >
                <img slot="icon" src="../../assets/images/icons/外科检查.png">
                <span slot="label">{{ ('体位') }}
                </span> 
                
            </grid-item>
            <grid-item    @click.native="FoldSwitch='YB',GridSwitch=false,HeaderTitle='眼部'"  >
                <img slot="icon" src="../../assets/images/icons/眼.png">
                <span slot="label" :class="$v.TG.Pupil.required?'green1':'red'" >{{ ('眼部') }}
                </span> 
                
            </grid-item>
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
             <grid-item    @click.native="FoldSwitch='SZhi',GridSwitch=false,HeaderTitle='四肢'"  >
                <img slot="icon" src="../../assets/images/icons/四肢.png">
                <span slot="label">{{ ('四肢') }}
                </span> 
                
            </grid-item>

        </grid>
        <grid>
    
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
             <grid-item  v-if="$store.state.AddPatientPage==='AddPatientRecordQH'"   @click.native="FoldSwitch='PF',GridSwitch=false,HeaderTitle='皮肤'"  >
                <img slot="icon" src="../../assets/images/icons/皮肤科.png">
                <span slot="label">{{ ('皮肤') }}
                </span> 
                
            </grid-item>
            <grid-item  v-if="$store.state.AddPatientPage==='AddPatientRecordSZ'"   @click.native="FoldSwitch='SJXTBLFS',GridSwitch=false,HeaderTitle='神经系统病理反射'"  >
                <img slot="icon" src="../../assets/images/icons/神经内科.png">
                <span slot="label">{{ ('神经系统病理反射') }}
                </span> 
                
            </grid-item>
        </grid>
        
         <grid>
             <grid-item  v-if="$store.state.AddPatientPage==='AddPatientRecordQH'"   @click.native="FoldSwitch='SJXTBLFS',GridSwitch=false,HeaderTitle='神经系统病理反射'"  >
                <img slot="icon" src="../../assets/images/icons/神经内科.png">
                <span slot="label">{{ ('神经系统病理反射') }}
                </span> 
                
            </grid-item>

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
            <el-date-picker required class="data-width" v-model="MainData.ArrivedTime" 
             :disabled="MainData.ArrivedTime=='' || MainData.ArrivedTime==null ?false:true" 
            @focus="forbid" size="large" value-format="yyyy-MM-dd HH:mm:ss"   type="datetime"  placeholder="选择出车时间"  default-time="12:00:00">
        </el-date-picker></cell>
        <flexbox>
            <flexbox-item :span="4/5">  
           <!--  <x-input title="T    "  :show-clear="false"   value-text-align="right"  v-model="TG.Temperatur" >
            <x-icon slot="right" title="c" type="ios-plus"  class="cell-x-icon"  @click.native="showT=true"></x-icon>
            </x-input>               
            :Requiredcss="$v.TG.Temperatur.$error"
            @Validations="$v.TG.Temperatur.$touch()"  -->
            <Lsy-inputpicker  :Title="'T    '"   :Sign="'Temperatur'"   :Maindata="TG.Temperatur"  
            :DictionaryList="baseFun.localGetType('Temperatur')" 
            :Isinput="true"
            @lsyonchange="data => {TG.Temperatur = data }"
            ></Lsy-inputpicker>
            </flexbox-item>
            <flexbox-item>℃</flexbox-item> 
        </flexbox>
       
            <flexbox>
                <flexbox-item  :span="4/5" >
                    <Lsy-inputpicker  :Title="'P    '"   :Sign="'Pulse'"   :Maindata="TG.Pulse"  
                        :DictionaryList="baseFun.localGetType('Pulse')" 
                        :Isinput="true"
                        :Requiredcss="$v.TG.Pulse.$error"
                        @Validations="$v.TG.Pulse.$touch()" 
                        @lsyonchange="data => {TG.Pulse = data }"
                    ></Lsy-inputpicker>
                <!-- <x-input title="P    "  :show-clear="false"  :class="!$v.TG.Pulse.required?'red':'black'"   v-model="TG.Pulse" >
                <x-icon slot="right"  type="ios-plus"  class="cell-x-icon"  @click.native="showPulse=true"></x-icon></x-input> -->
                
                </flexbox-item>
                <flexbox-item >次/分</flexbox-item>    
            </flexbox>


            <flexbox>
                <flexbox-item :span="4/5"> 
                    <Lsy-inputpicker  :Title="'R    '"   :Sign="'Respiratio'"   :Maindata="TG.Pulse"  
                        :DictionaryList="baseFun.localGetType('Respiratio')" 
                        :Isinput="true"
                        :Requiredcss="$v.TG.Respiratio.$error"
                        @Validations="$v.TG.Respiratio.$touch()" 
                        @lsyonchange="data => {TG.Respiratio = data }"
                    ></Lsy-inputpicker>
                </flexbox-item>
                <flexbox-item >次/分</flexbox-item> 
            </flexbox>

        <flexbox>
            <flexbox-item :span="4/5"  >
                <Lsy-inputpicker  :Title="'BP1    '"   :Sign="'BP1'"   :Maindata="TG.BP1"  
                        :DictionaryList="baseFun.localGetType('BP1')" 
                        :Isinput="true"
                        :Requiredcss="$v.TG.BP1.$error"
                        @Validations="$v.TG.BP1.$touch()" 
                        @lsyonchange="data => {TG.BP1 = data }"
                ></Lsy-inputpicker>
            </flexbox-item>
            <p>/</p>
        </flexbox>
        <flexbox>
            <flexbox-item  :span="4/5" >
                <Lsy-inputpicker  :Title="'BP2    '"   :Sign="'BP2'"   :Maindata="TG.BP2"  
                        :DictionaryList="baseFun.localGetType('BP2')" 
                        :Isinput="true"
                        :Requiredcss="$v.TG.BP2.$error"
                        @Validations="$v.TG.BP2.$touch()" 
                        @lsyonchange="data => {TG.BP2 = data }"
                ></Lsy-inputpicker>
            </flexbox-item>
            <p>mmHG</p>
        </flexbox>
            <popup-picker title="意识" :data="[baseFun.localGetType('AVPU')]"   :class="!$v.TG.AVPU.required?'red':'black'"      
            v-model="TG.AVPU" value-text-align="center"></popup-picker>
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </template >
    <template   v-else-if="FoldSwitch==='JCJCZ'" >
    
    <flexbox>
            <flexbox-item :span="4/5">  
                <Lsy-inputpicker  :Title="'T    '"   :Sign="'TemperatuZ'"   :Maindata="TG.TemperatuZ"  
                    :DictionaryList="baseFun.localGetType('TemperatuZ')" 
                    :Isinput="true"
                    @lsyonchange="data => {TG.TemperatuZ = data }"
                ></Lsy-inputpicker>
                </flexbox-item>
                <flexbox-item>℃</flexbox-item> 
            </flexbox>
            <flexbox>
                <flexbox-item  :span="4/5" >
                    <Lsy-inputpicker  :Title="'P    '"   :Sign="'PulseZ'"   :Maindata="TG.PulseZ"  
                        :DictionaryList="baseFun.localGetType('PulseZ')" 
                        :Isinput="true"
                        @lsyonchange="data => {TG.PulseZ = data }"
                    ></Lsy-inputpicker>
                </flexbox-item>
                <flexbox-item >次/分</flexbox-item>    
            </flexbox>
            <flexbox>
                <flexbox-item :span="4/5"> 
                    <Lsy-inputpicker  :Title="'R    '"   :Sign="'RespiratiZ'"   :Maindata="TG.RespiratiZ"  
                        :DictionaryList="baseFun.localGetType('RespiratiZ')" 
                        :Isinput="true"
                        @lsyonchange="data => {TG.RespiratiZ = data }"
                    ></Lsy-inputpicker>
                </flexbox-item>
                <flexbox-item >次/分</flexbox-item> 
            </flexbox>
        <flexbox>
            <flexbox-item :span="4/5"  >
                <Lsy-inputpicker  :Title="'BP1    '"   :Sign="'BP1Z'"   :Maindata="TG.BP1Z"  
                        :DictionaryList="baseFun.localGetType('BP1Z')" 
                        :Isinput="true"
                        @lsyonchange="data => {TG.BP1Z = data }"
                ></Lsy-inputpicker>
            </flexbox-item>
            <p>/</p>
        </flexbox>
        <flexbox>
            <flexbox-item  :span="4/5" >
                <Lsy-inputpicker  :Title="'BP2    '"   :Sign="'BP2Z'"   :Maindata="TG.BP2Z"  
                        :DictionaryList="baseFun.localGetType('BP2Z')" 
                        :Isinput="true"
                        @lsyonchange="data => {TG.BP2Z = data }"
                ></Lsy-inputpicker>
            </flexbox-item>
            <p>mmHG</p>
        </flexbox>
            <popup-picker title="意识" :data="[baseFun.localGetType('AVPUZ')]"     v-model="TG.AVPUZ" value-text-align="center"></popup-picker>
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </template >

    <template   v-else-if="FoldSwitch==='JCJCJ'">
  <flexbox>
            <flexbox-item :span="4/5">  
                <Lsy-inputpicker  :Title="'T    '"   :Sign="'TemperatuJ'"   :Maindata="TG.TemperatuJ"  
                    :DictionaryList="baseFun.localGetType('TemperatuJ')" 
                    :Isinput="true"
                    @lsyonchange="data => {TG.TemperatuJ = data }"
                ></Lsy-inputpicker>
                </flexbox-item>
                <flexbox-item>℃</flexbox-item> 
            </flexbox>
            <flexbox>
                <flexbox-item  :span="4/5" >
                    <Lsy-inputpicker  :Title="'P    '"   :Sign="'PulseJ'"   :Maindata="TG.PulseJ"  
                        :DictionaryList="baseFun.localGetType('PulseJ')" 
                        :Isinput="true"
                        @lsyonchange="data => {TG.PulseJ = data }"
                    ></Lsy-inputpicker>
                </flexbox-item>
                <flexbox-item >次/分</flexbox-item>    
            </flexbox>
            <flexbox>
                <flexbox-item :span="4/5"> 
                    <Lsy-inputpicker  :Title="'R    '"   :Sign="'RespiratiJ'"   :Maindata="TG.RespiratiJ"  
                        :DictionaryList="baseFun.localGetType('RespiratiJ')" 
                        :Isinput="true"
                        @lsyonchange="data => {TG.RespiratiJ = data }"
                    ></Lsy-inputpicker>
                </flexbox-item>
                <flexbox-item >次/分</flexbox-item> 
            </flexbox>
        <flexbox>
            <flexbox-item :span="4/5"  >
                <Lsy-inputpicker  :Title="'BP1    '"   :Sign="'BP1J'"   :Maindata="TG.BP1J"  
                        :DictionaryList="baseFun.localGetType('BP1J')" 
                        :Isinput="true"
                        @lsyonchange="data => {TG.BP1J = data }"
                ></Lsy-inputpicker>
            </flexbox-item>
            <p>/</p>
        </flexbox>
        <flexbox>
            <flexbox-item  :span="4/5" >
                <Lsy-inputpicker  :Title="'BP2    '"   :Sign="'BP2J'"   :Maindata="TG.BP2J"  
                        :DictionaryList="baseFun.localGetType('BP2J')" 
                        :Isinput="true"
                        @lsyonchange="data => {TG.BP2J = data }"
                ></Lsy-inputpicker>
            </flexbox-item>
            <p>mmHG</p>
        </flexbox>
            <popup-picker title="意识" :data="[baseFun.localGetType('AVPUJ')]"     v-model="TG.AVPUJ" value-text-align="center"></popup-picker>
            <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </template >




    <div v-else-if="FoldSwitch==='TW' ">
    
        <popup-picker title="神志" :data="[baseFun.localGetType('Mind')]"  v-if="$store.state.AddPatientPage!=='AddPatientRecordSZ'"    v-model="TG.Mind" value-text-align="center"></popup-picker>
        <popup-picker title="体位" :data="[baseFun.localGetType('Postural')]"    v-model="TG.Postural" value-text-align="center"></popup-picker>
        <x-textarea title='体位描述' :max="20"  :rows="2" name="description"  v-model="TG.TWOther" :placeholder="'填写补充说明'"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    
    </div>
    <div v-else-if="FoldSwitch==='PF' ">

       
        
        <popup-picker title="皮肤湿度" :data="[baseFun.localGetType('SkinHum')]"    v-model="TG.SkinHum" value-text-align="center"></popup-picker>
        <popup-picker title="皮肤弹性" :data="[baseFun.localGetType('SkinEla')]"    v-model="TG.SkinEla" value-text-align="center"></popup-picker>
        <popup-picker title="皮肤颜色" :data="[baseFun.localGetType('SkinClo')]"    v-model="TG.SkinClo" value-text-align="center"></popup-picker>
        <x-textarea title='皮肤其它' :max="20"  :rows="2" name="description"  v-model="TG.SkOther" :placeholder="('填写补充说明')"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>

    <div v-else-if="FoldSwitch==='YB' " style=" margin-top: 35px;">   
        <Lsy-checkbox  :Title="'瞳孔'"   :Sign="'Pupil'"   :Maindata="TG.Pupil"  
                        :DictionaryList="baseFun.localGetType('Pupil')" 
                        :Requiredcss="$v.TG.Pupil.$error"
                        @Validations="$v.TG.Pupil.$touch()" 
                        @lsyonchange="data => {TG.Pupil = data }"
                ></Lsy-checkbox>

        <x-input title="瞳孔左侧"  value-align="center" :show-clear="false" v-model="TG.PupilLeft" ><p slot="right">mm</p></x-input>
        <x-input title="瞳孔右侧" :show-clear="false" v-model="TG.PupilRight" ><p slot="right">mm</p></x-input>
        <x-textarea title='瞳孔其他' :max="20"  :rows="2" name="description"  v-model="TG.PupilOther" :placeholder="'填写补充说明'"></x-textarea>
        <popup-picker title="对光反射" :data="[baseFun.localGetType('Refle')]"    v-model="TG.Refle" value-text-align="center"></popup-picker>
        <popup-picker title="对光反射左" :data="[baseFun.localGetType('RefleLeft')]"    v-model="TG.RefleLeft" value-text-align="center"></popup-picker>
        <popup-picker title="对光反射右" :data="[baseFun.localGetType('RefleRight')]"    v-model="TG.RefleRight" value-text-align="center"></popup-picker>
        <x-textarea title='对光反射描述' :max="20"  :rows="2" name="description"  v-model="TG.RefleOther" :placeholder="'填写对光反射补充说明'"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>
        
    <div v-else-if="FoldSwitch==='TB' "  style=" margin-top: 35px;">
        
                <Lsy-checkbox  :Title="'头部'"   :Sign="'Head'"   :Maindata="TG.Head"  
                        :DictionaryList="baseFun.localGetType('Head')" 
                        @lsyonchange="data => {TG.Head = data }"
                ></Lsy-checkbox>

        <popup-picker title="口唇" :data="[baseFun.localGetType('Cyanosis')]"    v-model="TG.Cyanosis" value-text-align="center"></popup-picker>
        <x-textarea title='头部描述' :max="20"  :rows="2" name="description"  v-model="TG.HeadOther" :placeholder="('填写补充说明')"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>


    <div v-else-if="FoldSwitch==='JB' " style=" margin-top: 35px;">
        
        <Lsy-checkbox  :Title="'颈部'"   :Sign="'Neck'"   :Maindata="TG.Neck"  
                        :DictionaryList="baseFun.localGetType('Neck')" 
                        :Requiredcss="$v.TG.Neck.$error"
                        @Validations="$v.TG.Neck.$touch()" 
                        @lsyonchange="data => {TG.Neck = data }"
        ></Lsy-checkbox>
        <popup-picker v-if="$store.state.AddPatientPage=='AddPatientRecordQH'" title="颈椎压痛" :data="[baseFun.localGetType('Tenderness')]"    v-model="TG.Tenderness" value-text-align="center"></popup-picker>
   
        <!-- <popup-picker title="颈椎压痛" :data="[TendernessList]"    v-model="TG.Tenderness" value-text-align="center"></popup-picker> -->

        <x-textarea title='颈部其它' :max="20"  :rows="2" name="description"  v-model="TG.NeckOther" :placeholder="('填写补充说明')"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>
 

    <div v-else-if="FoldSwitch==='XB' " style=" margin-top: 35px;">
       <Lsy-checkbox  :Title="'胸部'"   :Sign="'Chest'"   :Maindata="TG.Chest"  
                        :DictionaryList="baseFun.localGetType('Chest')" 
                        :Requiredcss="$v.TG.Chest.$error"
                        @Validations="$v.TG.Chest.$touch()" 
                        @lsyonchange="data => {TG.Chest = data }"
        ></Lsy-checkbox>


       

        <popup-picker title="运动度" :data="[baseFun.localGetType('MotionD')]"    v-model="TG.MotionD" value-text-align="center"></popup-picker>
        <popup-picker title="呼吸节律" :data="[baseFun.localGetType('RCR')]"    v-model="TG.RCR" value-text-align="center"></popup-picker> 

        <popup-picker v-if="$store.state.AddPatientPage=='AddPatientRecordSZ'" title="胸廓挤压试验" :data="[baseFun.localGetType('Thorax')]"    v-model="TG.Thorax" value-text-align="center"></popup-picker>
        
        <Lsy-checkbox  :Title="'肺脏'"   :Sign="'Lung'"   :Maindata="TG.Lung"  
                        :DictionaryList="baseFun.localGetType('Lung')" 
                      
                        @lsyonchange="data => {TG.Lung = data }"
                        v-if="$store.state.AddPatientPage=='AddPatientRecordSZ'"
        ></Lsy-checkbox>
        <x-textarea v-if="$store.state.AddPatientPage=='AddPatientRecordSZ'" title='胸部其他' :max="20"  :rows="2" name="description"  v-model="TG.LungOther" :placeholder="('填写补充说明')"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>
    

    <div v-else-if="FoldSwitch==='FeiB' " style=" margin-top: 35px;">
        <Lsy-checkbox  :Title="'肺脏'"   :Sign="'Lung'"   :Maindata="TG.Lung"  
                        :DictionaryList="baseFun.localGetType('Lung')" 
                      
                        @lsyonchange="data => {TG.Lung = data }"
        
        ></Lsy-checkbox>
        <Lsy-checkbox  :Title="'左肺'"   :Sign="'LungLeft'"   :Maindata="TG.LungLeft"  
                        :DictionaryList="baseFun.localGetType('LungLeft')" 
              
                        @lsyonchange="data => {TG.LungLeft = data }"
        
        ></Lsy-checkbox>
        <Lsy-checkbox  :Title="'右肺'"   :Sign="'LungRight'"   :Maindata="TG.LungRight"  
                        :DictionaryList="baseFun.localGetType('LungRight')" 
                    
                        @lsyonchange="data => {TG.LungRight = data }"
        
        ></Lsy-checkbox>

        <popup-picker  title="胸廓挤压实验" :data="[baseFun.localGetType('Thorax')]"    v-model="TG.Thorax" value-text-align="center"></popup-picker>
       
        <x-textarea  title='胸部其他' :max="20"  :rows="2" name="description"  v-model="TG.LungOther" :placeholder="('填写补充说明')"></x-textarea>
        
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>
    <div v-else-if="FoldSwitch==='XZ' ">
    <divider>心脏</divider>

    <Lsy-checkbox   @input="$v.TG.Heart.$touch()"  :Title="'心脏'"  :Sign="'Heart'"  :Maindata="TG.Heart"  :DictionaryList="baseFun.localGetType('Heart')" 
            @lsyonchange="data => { TG.Heart = data }"
    ></Lsy-checkbox>


            
        <flexbox v-if="$store.state.AddPatientPage=='AddPatientRecordQH'" >
                <flexbox-item  :span="4/5" >
                <x-input title="心率   "  :show-clear="false"  value-text-align="center"   v-model="TG.HeartRate" ></x-input>
                </flexbox-item>
                <flexbox-item >次/分</flexbox-item>    
        </flexbox>

        <Lsy-popuppicker   @input="$v.TG.Cardiovert.$touch()"  :Title="'心律'"  
            :Sign="'Cardiovert'"  :Maindata="TG.Cardiovert"  :DictionaryList="baseFun.localGetType('Cardiovert')" 
                    @lsyonchange="data => { TG.Cardiovert = data }"
        
        ></Lsy-popuppicker>


        <!-- v-if="CardiovertList.length != 0 " <popup-picker title="心律" :data="[CardiovertList]"    v-model="TG.Cardiovert" value-text-align="center"></popup-picker> -->
        <!-- <popup-picker title="心音" :data="this.DicitionaryApi.VuxGetOption('HS')"   v-model="TG.HS" value-text-align="center"></popup-picker> -->
            <popup-picker title="心音" :data="[baseFun.localGetType('HS')]"    v-model="TG.HS" value-text-align="center"></popup-picker>

        <popup-picker title="杂音" :data="[baseFun.localGetType('HeartSound')]"    v-model="TG.HeartSound" value-text-align="center"></popup-picker>
        <x-textarea title='心脏其他' :max="20"  :rows="2" name="description"  v-model="TG.HeartOther" :placeholder="('填写补充说明')"></x-textarea>
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>

    <div v-else-if="FoldSwitch==='FB' " style=" margin-top: 35px;" >
        <Lsy-checkbox   @input="$v.TG.Belly.$touch()"  :Title="'腹部'"  :Sign="'Belly'"  
                :Maindata="TG.Belly"  :DictionaryList="baseFun.localGetType('Belly')" 
                @lsyonchange="data => { TG.Belly = data }"
        ></Lsy-checkbox>
        <Lsy-checkbox   @input="$v.TG.Position.$touch()"  :Title="'部位'"  :Sign="'Position'"  
                :Maindata="TG.Position"  :DictionaryList="baseFun.localGetType('Position')" 
                @lsyonchange="data => { TG.Position = data }"
        ></Lsy-checkbox>
        <Lsy-checkbox   @input="$v.TG.Symptom.$touch()"  :Title="'症状'"  :Sign="'Symptom'"  
                :Maindata="TG.Symptom"  :DictionaryList="baseFun.localGetType('Symptom')" 
                @lsyonchange="data => { TG.Symptom = data }"
        ></Lsy-checkbox>

        <x-textarea title='腹部其他' :max="20"  :rows="2" name="description"  v-model="TG.BellyOther" :placeholder="('填写补充说明')"></x-textarea>

        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>

    <div v-else-if="FoldSwitch==='JZ' ">

        <Lsy-popuppicker   @input="$v.TG.Limbs.$touch()"  :Title="'脊柱'"  
                :Sign="'Cardiovert'"  :Maindata="TG.Limbs"  :DictionaryList="baseFun.localGetType('Limbs')" 
                @lsyonchange="data => { TG.Limbs = data }"
        ></Lsy-popuppicker>
 
    
    <popup-picker title="骨 盆 挤 压 实 验" :data="[baseFun.localGetType('Pelvis')]"    v-model="TG.Pelvis" value-text-align="center"></popup-picker>

    <x-textarea title='脊柱其他' :max="20"  :rows="2" name="description"  v-model="TG.LimbsOther" :placeholder="('填写补充说明')"></x-textarea>
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>

    </div>

    <div v-else-if="FoldSwitch==='SZhi' " style=" margin-top: 35px;">
    
        <Lsy-popuppicker   @input="$v.TG.Limb.$touch()"  :Title="'四 肢'"  
                :Sign="'Cardiovert'"  :Maindata="TG.Limb"  :DictionaryList="baseFun.localGetType('Limb')" 
                @lsyonchange="data => { TG.Limb = data }"
        ></Lsy-popuppicker>

    <x-textarea title='四肢其他' :max="20"  :rows="2" name="description"  v-model="TG.LimbOther" :placeholder="('填写补充说明')"></x-textarea>
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>
    <div v-else-if="FoldSwitch==='JL' ">
    <divider>肌力</divider>
    <popup-picker title="肌力" :data="[baseFun.localGetType('Muscle')]"    v-model="TG.Muscle" value-text-align="center"></popup-picker>
    <popup-picker title="左上" :data="[baseFun.localGetType('MuscleLU')]"    v-model="TG.MuscleLU" value-text-align="center"></popup-picker>
    <popup-picker title="左下" :data="[baseFun.localGetType('MuscleLD')]"    v-model="TG.MuscleLD" value-text-align="center"></popup-picker>
    <popup-picker title="右上" :data="[baseFun.localGetType('MuscleRU')]"    v-model="TG.MuscleRU" value-text-align="center"></popup-picker>
    <popup-picker title="右下" :data="[baseFun.localGetType('MuscleRD')]"    v-model="TG.MuscleRD" value-text-align="center"></popup-picker>
    <x-textarea title='肌力描述' :max="20"  :rows="2" name="description"  v-model="TG.MusclOther" :placeholder="('填写补充说明')"></x-textarea>
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>

    <div v-else-if="FoldSwitch==='JZL' ">
        <divider>肌张力</divider>

        <popup-picker title="肌张力" :data="[baseFun.localGetType('PROM')]"    v-model="TG.PROM" value-text-align="center"></popup-picker>
        <popup-picker title="左上" :data="[baseFun.localGetType('PROMLU')]"    v-model="TG.PROMLU" value-text-align="center"></popup-picker>
        <popup-picker title="左下" :data="[baseFun.localGetType('PROMLD')]"    v-model="TG.PROMLD" value-text-align="center"></popup-picker>
        <popup-picker title="右上" :data="[baseFun.localGetType('PROMRU')]"    v-model="TG.PROMRU" value-text-align="center"></popup-picker>
        <popup-picker title="右下" :data="[baseFun.localGetType('PROMRD')]"    v-model="TG.PROMRD" value-text-align="center"></popup-picker>
        <x-textarea title='肌张力描述' :max="20"  :rows="2" name="description"  v-model="TG.PROMOther" :placeholder="('填写补充说明')"></x-textarea>
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>

    <div v-else-if="FoldSwitch==='SJXTBLFS' ">
    <!-- <group  label-width="10em" label-margin-right="0em"  label-align="left"  style=" margin-top: -20px;"  > -->
    <!-- </group> -->
    <divider>神经系统病理反射</divider>

        <popup-picker title="神经系统病理反射" :data="[baseFun.localGetType('Prons')]"    v-model="TG.Prons" value-text-align="center"></popup-picker>


        <popup-picker v-if="PronsSwitch" title="巴宾斯基征" :data="[baseFun.localGetType('Babinski')]"    v-model="TG.Babinski" value-text-align="center"></popup-picker>
        <popup-picker v-if="PronsSwitch" title="左" :data="[baseFun.localGetType('BabLeft')]"    v-model="TG.BabLeft" value-text-align="center"></popup-picker>
        <popup-picker  v-if="PronsSwitch" title="右" :data="[baseFun.localGetType('BabRight')]"    v-model="TG.BabRight" value-text-align="center"></popup-picker>
        <popup-picker title="克尼格氏征" :data="[baseFun.localGetType('Kernig')]"      v-model="TG.Kernig" value-text-align="center"></popup-picker>
        <popup-picker title="布鲁金斯氏征" :data="[baseFun.localGetType('Brudzinski')]"     v-model="TG.Brudzinski" value-text-align="center"></popup-picker>
        <x-textarea title='神经系统 描 述 ' :max="20"  :rows="2" name="description"  v-model="TG.NerOther" :placeholder="('填写补充说明')"></x-textarea>
    
        <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>

    
    <!-- 下面三个字典表没存  一下部分应该是保存在病历主表中故应该存入MainData中-->

    <div v-else-if="FoldSwitch==='XXNT' ">
    <divider>辛辛那提院前卒中(CPSS)评分</divider>

    <popup-picker  title="口角歪斜" :data="[ListDeviatedMouth]"     v-model="MainData.DeviatedMouth" value-text-align="center" ></popup-picker>
    <popup-picker title="上肢无力" :data="[ListWeakness]"     v-model="MainData.Weakness" value-text-align="center"></popup-picker>
    <popup-picker title="言语异常" :data="[ListDarley]"     v-model="MainData.Darley" value-text-align="center"></popup-picker>
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>
    
     <!--  -->
    <div v-else-if="FoldSwitch==='GLSG' ">
    <divider> 格拉斯哥昏迷指数(GCS)</divider>
     <!--此处的评分先用隐藏的存对象,让后通过触发事件来改变真正的分数  -->
    <popup-picker title="睁眼反应" :data="[EyeScoreList]"  show-name   v-model="MainData.HiddenEyeScore" value-text-align="center"></popup-picker>
    <popup-picker title="语言反应" :data="[VerbalScoreList]"  show-name    v-model="MainData.HiddenVerbalScore" value-text-align="center"></popup-picker>
    <popup-picker title="肢体运动" :data="[MotorScoreList]"   show-name   v-model="MainData.HiddenMotorScore" value-text-align="center"></popup-picker>
    <x-button  type="primary" action-type="submit"  @click.native="FoldSwitch='close',GridSwitch=true">确定</x-button>
    </div>

    <div v-if="FoldSwitch==='close' ">
     <x-textarea title='其他情况：' :max="100"  :rows="3" name="description"  v-model="TG.Other" :placeholder="('填写其他补充说明')"></x-textarea> 
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