// import { api } from 'plugins/myapi'

// import linq from "linq";

import dsBridge from "dsbridge";

import { TreamentItemModel, GoodModel, getArrayValue } from "model/Patient.js";
let myLocalDictionaryApi = (ljqFun) => {
  //总缓存字典 localStorage 有备份
  var MobileDictionary = {
  }
  //总缓存字典 下 分别的每张表key的缓存
  var MobileDictionaryNeedComputer = {};
  //总缓存树 下 分别的每张表key的缓存
  var MobileTreeNeedComputer = {};
  //#region 母方法
  function getComputerBaseKey(table, keyColumn, orderColumn) {
    return (key) => {
      //#region 把要的字典都初始化好 就不调用以下判断方法
      if (!MobileDictionaryNeedComputer[table])
        MobileDictionaryNeedComputer[table] = {};
      //#endregion
      if (MobileDictionaryNeedComputer[table][key])
        return MobileDictionaryNeedComputer[table][key];
      let tableDataFilter = returnValue.getMobileDictionaryKey(table).filter(v => v[keyColumn] == key);
      if (orderColumn) {
        MobileDictionaryNeedComputer[table][key] = tableDataFilter.sort(returnValue.sortNumAsc(orderColumn))
      }
      else {
        MobileDictionaryNeedComputer[table][key] = tableDataFilter;
      }
      return MobileDictionaryNeedComputer[table][key];
    }
  }
  function clearComputerBase(table) {
    return () => {
      MobileDictionaryNeedComputer[table] = {};
    }
  }
  //#endregion

  //#region 母方法
  function getComputerBaseTree(TreeName, GetTreeDataFun) {
    if (MobileTreeNeedComputer[TreeName])
      return MobileTreeNeedComputer[TreeName];
    MobileTreeNeedComputer[TreeName] = GetTreeDataFun();
    return MobileTreeNeedComputer[TreeName];
  }
  function clearComputerBaseTree(TreeName) {
    return () => {
      MobileTreeNeedComputer[table] = {};
    }
  }
  //#endregion

  //#region dsBridge 相关方法
  function queryDictionaryByType(typeName) { //此方法进行修改
    console.log(JSON.parse(dsBridge.call("dictionaryApi.queryDictionaryByType", typeName)))
    return JSON.parse(dsBridge.call("dictionaryApi.queryDictionaryByType", typeName));
  }
  function queryTentativeDiagnose() {
    console.log(JSON.parse(dsBridge.call("dictionaryApi.queryTentativeDiagnose")))
    return JSON.parse(dsBridge.call("dictionaryApi.queryTentativeDiagnose"));
  }
  function queryGoods() {
    console.log(JSON.parse(dsBridge.call("dictionaryApi.queryGoods")))
    return JSON.parse(dsBridge.call("dictionaryApi.queryGoods"));
  }
  function queryECGDiagnose() {
    console.log(JSON.parse(dsBridge.call("dictionaryApi.queryECGDiagnose")))
    return JSON.parse(dsBridge.call("dictionaryApi.queryECGDiagnose"));
  }
  function queryMeasures() {
    console.log(JSON.parse(dsBridge.call("dictionaryApi.queryMeasures")))
    return JSON.parse(dsBridge.call("dictionaryApi.queryMeasures"));
  }
  function queryChargeItem() {
    console.log(JSON.parse(dsBridge.call("dictionaryApi.queryChargeItem")))
    return JSON.parse(dsBridge.call("dictionaryApi.queryChargeItem"));
  }
  function queryTZAccidentType() {
    console.log(JSON.parse(dsBridge.call("dictionaryApi.queryTZAccidentType")))
    return JSON.parse(dsBridge.call("dictionaryApi.queryTZAccidentType"));
  }
  function backNative() {
    console.log("backNative")
    dsBridge.call("nativeApi.backNative")
  }
  //#endregion



  var returnValue = {
    backNative,

    //#region 基础Local方法
    // getLocalDataBase64: function (key) {
    //   let value = localStorage.getItem(key)
    //   let vJ = JSON.parse(new Buffer(value || '', 'base64').toString() || '{}')
    //   return vJ;
    // },
    // setLocalDataBase64: function (key, data) {
    //   localStorage.setItem(key, new Buffer(JSON.stringify(data)).toString("base64"))
    // },
    // getLocalData: function (key) {
    //   return JSON.parse(localStorage.getItem(key) || '{}')
    // },
    // setLocalData: function (key, data) {
    //   localStorage.setItem(key, (JSON.stringify(data)));
    // },
    // clearLocalData: function (key) {
    //   localStorage.removeItem(key)
    // },
    //#endregion

    //#region 全部使用MobileDictionary local方法
    // getMobileDictionaryKey: function (key) {
    //   if (MobileDictionary[key])
    //     return MobileDictionary[key];
    //   // MobileDictionary=this.getLocalDataBase64("MobileDictionary");
    //   MobileDictionary = this.getLocalData("MobileDictionary");
    //   return MobileDictionary[key];
    // },

    // pad端修改
    getMobileDictionaryKey: function (key) {
      // 这里现在只做
      // M_PredefinedTreatmentRecord_Treament
      // S_GOODS
      // 还是利用下缓存 调试阶段请去掉
      if (MobileDictionary && MobileDictionary[key])
        return MobileDictionary[key];

      // if (MobileDictionary[key]){
      //   console.log("getMobileDictionaryKey(used js catch):" + key)
      //   return MobileDictionary[key];
      // }
      console.log("getMobileDictionaryKey:" + key)
      switch (key) {
        case "M_PredefinedTreatmentRecord_Treament":
          MobileDictionary[key] = queryMeasures().map(t => {
            var re = JSON.parse(t.Detail);
            // console.log(re)
            var Detail = t.defaultGoods.filter(d => {
              return d;
            }).map(d => {
              // 0:
              //   Abbreviation:"lhn"
              //   Category:"日常药品"
              //   CategoryID:"2"
              //   GoodsID:1
              //   MinNum:250
              //   MinSpec:"ml"
              //   Name:"氯化钠注射液(盐水）"
              //   Price:4.25
              //   Spec:"0.9%*250ml  50瓶/箱，40瓶/箱"
              //   Unit:"瓶"
              //   checked:false
              //   extends:GoodsID:1
              //     checked:false
              //     lossVal:0
              //     num:1
              //     uniqueCode:"1"
              if (d.Category.indexOf("药品") > -1) {
                return {
                  MinSpec: d.MinSpec,
                  // MinNum: Number.parseFloat(d.MinNum),
                  MinNum: d.MinNum,
                  Num: d.extends.num, //
                  Price: d.Price,
                  GoodsName: d.Name,
                  Spec: d.Spec,
                  LossVal: d.extends.lossVal,
                  UseNum: (d.MinNum * d.extends.num) + d.MinSpec,
                  TableName: "M_DrugUseRecord",
                  ResID: d.GoodsID
                }
              } else {
                return {
                  MinSpec: d.Unit,
                  MinNum: 1,
                  Num: d.extends.num, //
                  Price: d.Price,
                  GoodsName: d.Name,
                  Spec: d.Spec,
                  LossVal: d.extends.lossVal,
                  UseNum: d.extends.num + d.Unit,
                  TableName: "M_ConsumableRecord",
                  ResID: d.GoodsID
                }
              }
            })
            // linq
            return {
              IsPack: re.IsPack,
              OrderID: re.OrderID,
              PackOrder: re.PackOrder === undefined ? null : re.PackOrder,
              Prefixes: re.Prefixes,
              ProjectID: re.ProjectID,
              ResponsClassify: re.ResponsClassify,
              UpperID: re.UpperID,
              // goodsUseRecords:t.goodsUseRecords,
              goodsUseRecords: Detail,
              // defaultGoods:t.defaultGoods,
              // Detail:t.Detail,
              // GoodsDetailStr:t.GoodsDetailStr,
              Price: t.Price,
              Pinyin: t.Pinyin
            };
          });
          break;
        case "S_GOODS":
          MobileDictionary[key] = queryGoods().map(t => {
            return {
              Categroup: t.Category,
              ID: t.GoodsID,
              MinNum: t.MinNum,
              MinSpec: t.MinSpec,
              PinYin: t.Abbreviation,
              Price: t.Price,
              // Serial: 0,//顺序号
              Spec: t.Spec,
              label: t.Name,
              // t.CategoryID
            }
          });
          break;
        // case "M_DrugDetail":
        //   // 默认用药和默认耗材不用了
        //   return [];
        default:
          MobileDictionary[key] = [];
          break;
      }
      console.log(MobileDictionary[key])
      return MobileDictionary[key];
    },
    // setMobileDictionaryKey: function (key, data) {
    //   // 怕万一 MobileDictionary丢失
    //   MobileDictionary = this.getLocalData("MobileDictionary");
    //   MobileDictionary[key] = data;
    //   // this.setLocalDataBase64("MobileDictionary",MobileDictionary)
    //   this.setLocalData("MobileDictionary", MobileDictionary)
    // },
    // setMobileDictionary: function (data) {
    //   MobileDictionary = data;
    //   // this.setLocalDataBase64("MobileDictionary",MobileDictionary)
    //   this.setLocalData("MobileDictionary", MobileDictionary)
    // },
    clearMobileDictionary: function () {
      MobileDictionary = {};
      MobileDictionaryNeedComputer = {};
      MobileTreeNeedComputer = {};
      // this.clearLocalData("MobileDictionary")
    },
    //#endregion
    getComputerBaseKey,
    clearComputerBase,

    //#region 类似computer属性的 TDictionary表方法 全局变量

    // getTDictionaryKey: getComputerBaseKey("TDictionary", "类型编码", "顺序号"),
    getTDictionaryKey(key) {
      return queryDictionaryByType(key)
    },
    // clearTDictionary: clearComputerBase("TDictionary"),
    // getGConfigKey: getComputerBaseKey("G_CONFIG", "Key"),

    getGConfigKey(key) {
      return queryDictionaryByType("G_CONFIG").filter(t => t.ID == key)
    },
    // clearGConfig: clearComputerBase("G_CONFIG"),
    // getPredefinedTreatmentRecordKey: getComputerBaseKey("M_PredefinedTreatmentRecord", "UpperID", "OrderID"),
    getPredefinedTreatmentRecordKey(key) {
      return queryDictionaryByType("TG-" + key)
    },
    // clearPredefinedTreatmentRecord: clearComputerBase("M_PredefinedTreatmentRecord"),
    // getGlasgowKey: getComputerBaseKey("M_Glasgow", "ID"),
    getGlasgowKey(key) {
      return queryDictionaryByType("Glasgow-" + key)
    },
    // clearGlasgow: clearComputerBase("M_Glasgow"),
    // getM_DrugDetailKey: getComputerBaseKey("M_DrugDetail", "ProjectID"),
    getM_DrugDetailKey() {
      return queryMeasures()
    },


    getTDictionaryKeySel: function (key) {
      return this.getTDictionaryKey(key).map(v => {
        return {
          name: v.Name, 
          value: v.Name
          // value:v.编码
        }
      })
    },

    GetAlarmEventType: function () {
      // 病历保存的是名称，所以
      return this.getTDictionaryKey('TZAlarmEventType').map(v => {
        return {
          label: v.Name,
          value: v.Name
        }
      })
    },
    GetLocalAddrType: function () {
      return this.getTDictionaryKey('TZLocalAddrType').map(v => {
        return {
          label: v.Name,
          value: v.ID
        }
      })
    },
    GetLocalAddrTypeMCByBM: function (bm) {
      // var q = getComputerBaseKey('TZLocalAddrType', '编码')(bm)
      var q = this.getTDictionaryKey('TZLocalAddrType').filter(t => t.ID == bm)
      console.log(q)
      if (q && q[0] && q[0].Name) {
        if (q[0].Name != null)
          return q[0].Name
      }
      return "";
    },
    GetSendAddrType: function () {
      // return this.getMobileDictionaryKey('TZSendAddrType').map(v => {
      // 需要更新字典程序 和字典
      return this.getTDictionaryKey('TZSendAddrType').map(v => {
        return {
          label: v.Name,
          value: v.ID
        }
      })
    },
    GetStation: function () {
      // 病历分站保存的是名称，所以
      // 需要更新字典程序 和字典
      return this.getTDictionaryKey('TStation').map(v => {
        return {
          label: v.Name,
          value: v.Name
          // value: v.编码
        }
      })
    },
    GetM_TentativeDiagnose: function () {
      // 病历分站保存的是名称，所以
      return queryTentativeDiagnose().map(v => {
        // 树 编码,名称,顺序号,上级编码,字头
        return {
          key: v.id,
          label: v.label,
          value: v.id,
          orderCode: Number.parseInt(v.order),
          parentCode: v.parentId,
          // pinyin: ?????
          // pinyin: v.te
          pinyin: v.pinyin
        }
      })
    },
    GetM_ECGDiagnose: function () {
      // 病历分站保存的是名称，所以
      return queryECGDiagnose().map(v => {
        // 树 编码,名称,顺序号,上级编码,字头
        return {
          key: v.id,
          label: v.label,
          value: v.id,
          orderCode: Number.parseInt(v.order),
          parentCode: v.parentId,
          // pinyin: v.字头
          // pinyin: v.te
          pinyin: v.pinyin
        }
      })
    },
    GetM_PredefinedTreatmentRecord_GroupID: function () {
      // queryMeasures 含有救治措施 M_DrugDetail 表，和 M_ConsumableDetail 表
      return this.getMobileDictionaryKey('M_PredefinedTreatmentRecord_Treament').map(v => {
        return {
          key: v.ProjectID,
          label: v.Prefixes,
          OrderID: v.OrderID,
          PackOrder: v.PackOrder,
          parentCode: v.UpperID,
          IsPack: v.IsPack,
          ResponsClassify: v.ResponsClassify
        }
      })
    },

    GetHospitalInfo: function () {
      // 病历送往地点保存的是名称，所以
      return this.getTDictionaryKey('HospitalInfo').map(v => {
        return {
          label: v.Name,
          value: v.Name
          // value: v.编码
        }
      })
    },
    GetM_AccidentType: function () {
      return this.getTDictionaryKey('AccidentType').map(v => {
        return {
          label: v.Name,
          value: v.ID
        }
      })
    },
    GetSelectPredefinedTreatmentRecordKey: function (key) {
      // 病历 M_PredefinedTreatmentRecord 表中 基本都是要 名称，所以
      return this.getPredefinedTreatmentRecordKey(key).map(v => {
        return {
          name: v.Name,
          value: v.Name
          // value: v.ID
        }
      })
    },
    GetSelectGlasgowKey: function (key) {
      // 病历 M_Glasgow 表中  ，所以
      return this.getGlasgowKey(key).map(v => {
        return {
          label: v.Name,
          // value: v.Name
          // Glasgow-1,0
          // value: Number.parseInt(v.ID.slice(-1)) 
          value: Number.parseInt(v.ID.replace(v.Type + ",", ""))
        }
      })
    },

    // LinkPhone
    //#endregion
    //#region G_CONFIG 相关方法
    GetStringConfigValue: function (key) {
      var q = this.getGConfigKey(key)
      if (q && q[0]) {
        if (q[0].Name != null)
          return q[0].Name
      }
      return "";
    },
    GetInt32ConfigValue: function (key) {
      let v = this.GetStringConfigValue(key)
      try {
        // return Number(this.trim(v))
        return Number.parseInt(this.trim(v))
      }
      catch (e) {
        console.log(e)
        return 0;
      }
    },
    GetBoolConfigValue: function (key) {
      let v = this.GetStringConfigValue(key)
      if (v.toLowerCase() == "true" || v == "1") { return true } else { return false }
    },
    //#endregion

    trim: function (v) {
      return v.replace(/^\s+|\s+$/g, "")
    },
    //排序方法
    sortNumAsc: function (prop) {
      return function (a, b) {
        return a[prop] - b[prop];
      };
    },

    //#region tree 相关 方法
    GetDiagnoseOptions() {
      let diagnoseOptionsCom = this.GetM_TentativeDiagnose();
      const tailRecursion = array => {
        if (array && array.length > 0) {
          return array.map(item => {
            const children = tailRecursion(
              diagnoseOptionsCom
                .filter(v => v.parentCode == item.key)
                .sort(this.sortNumAsc("orderCode"))
            );
            let re = {
              ...item,
              children,
              noTick: children != null
            };
            if (children == null) {
              re.header = "toggle";
              re.enabled = false;
            }
            return re;
          });
        }
        return null;
      };
      return (
        tailRecursion(
          diagnoseOptionsCom
            .filter(v => v.parentCode == "0")
          // 开始不需排序
          // .sort(this.sortNumAsc("orderCode"))
        ) || []
      );
    },
    GetTreamentOptions(optionsType) {
      let GetOptions;
      let orderName;
      if (optionsType == "TreamentAll") {
        GetOptions = this.GetM_PredefinedTreatmentRecord_GroupID();
        orderName = "OrderID";
      } else {
        GetOptions = this.GetM_PredefinedTreatmentRecord_GroupID().filter(v => v.IsPack);
        orderName = "PackOrder";
      }
      console.log("GetTreamentOptions")
      console.log(GetOptions)
      const tailRecursion = (array, level) => {
        if (array && array.length > 0) {
          // console.log(orderName)
          level++;
          return array.map(item => {
            const children = tailRecursion(
              GetOptions.filter(v => v.parentCode == item.key).sort(
                this.sortNumAsc(orderName)
              ),
              level
            );
            // 树形第一级不允许选择
            return {
              ...item,
              children,
              noTick: level < 3 ? true : children != null
            };
          });
        }
        return null;
      };
      return (
        tailRecursion(
          GetOptions.filter(v => v.parentCode == "0").sort(
            this.sortNumAsc(orderName)
          ),
          1
          // ,orderName
        ) || []
      );

    },

    GetECGTnodes() {
      let ECGTOptions = this.GetM_ECGDiagnose();
      console.log(ECGTOptions);
      const tailRecursion = array => {
        if (array && array.length > 0) {
          return array.map(item => {
            const children = tailRecursion(
              ECGTOptions
                .filter(v => v.parentCode == item.key)
                .sort(this.sortNumAsc("orderCode"))
            );
            let re = {
              ...item,
              children,
              noTick: children != null
            };
            if (children == null) {
              re.header = "toggle";
              re.enabled = false;
            }
            return re;
          });
        }
        return null;
      };
      return (
        tailRecursion(
          ECGTOptions
            .filter(v => v.parentCode == "0")
          // 开始不需排序
          // .sort(this.sortNumAsc("orderCode"))
        ) || []
      );
    },
    GetDiagnoseOptionsComputer() {
      let obj1 = getComputerBaseTree("Diagnose", this.GetDiagnoseOptions.bind(this));
      console.log(obj1);
      // 树形控件折叠会修改model 且 后一个 复选框 也会修改model 所以需要深复制
      return JSON.parse(JSON.stringify(obj1));
    },
    GetTreamentOptionsComputer(optionsType) {
      // TreamentAll // TreamentPack
      let obj1 = getComputerBaseTree(optionsType, this.GetTreamentOptions.bind(this, optionsType));
      console.log(obj1);
      // 树形控件折叠会修改model所以需要深复制
      return JSON.parse(JSON.stringify(obj1));
    },
    GetECGTnodesComputer() {
      console.log('GetECGTnodesComputer');
      let obj1 = getComputerBaseTree("ECGT", this.GetECGTnodes.bind(this));
      console.log(obj1);
      // 树形控件折叠会修改model 且 后一个 复选框 也会修改model 所以需要深复制
      return JSON.parse(JSON.stringify(obj1));
    },

    GetLoginedUser() {
      return JSON.parse(dsBridge.call("userApi.getLoginedUser"));
    },
    GetToken() {
      // 就将Token放这里吧
      let login = this.GetLoginedUser()
      // console.log(login)
      if (login.IsSuccess && login.padUser) {
        return login.padUser;
      }
      return null;
    },
    GetWorkID() {
      // 就将Token放这里吧
      let login=this.GetLoginedUser()
      console.log(login)
      if(login.IsSuccess && login.UserInfo && login.UserInfo.W && login.UserInfo.W.ID){
        return login.UserInfo.W.ID;
      }
      return null;
    },
    //以下暂时 没有用
    GetTokenComputer() {
      // 就将Token放这里吧
      console.log('GetTokenComputer');
      let obj1 = getComputerBaseTree("Token", this.GetToken.bind(this));
      console.log(obj1);
      return obj1;
    },
    clearMobileTreeNeedComputerOne(TreeName) {
      MobileTreeNeedComputer[TreeName] = null;
    },
    //#endregion
    GetDoctorOrderList() {
      return queryDictionaryByType("M_DoctorOrder").map(t => {
        return {
          value: t.ID,
          label: t.Name
        }
      })
    },
    GetTreamentItemModelLs(ID) {
      console.log("GetTreamentItemModelLs")
      var S_GOODS = this.getMobileDictionaryKey("S_GOODS");
      return queryDictionaryByType("M_DoctorOrder").filter(t => {
        return t.ID == ID
      }).map(DoctorOrder => {
        return {
          value: DoctorOrder.ID,
          label: DoctorOrder.Name,
          Detail: JSON.parse(DoctorOrder.Detail).map(v => {
            //  查找Treament
            // let Treament= this.getMobileDictionaryKey("M_PredefinedTreatmentRecord_Treament").filter(t => t.ProjectID == v.ID)
            // let Prefixes="未能正确获取字典";
            // if(Treament && Treament.length>0)
            // {
            //   Prefixes=Treament[0].Prefixes;
            // }
            return Object.assign(TreamentItemModel(), {
              fromFromDic: {
                // Prefixes
                Prefixes: v.Prefixes
              },
              form: {
                TROrder: 0,
                ProjectID: v.ID,
                MeasureContent: v.measureContent,
                DoTime: v.doTime,
                Place: getArrayValue(v.place),
                JZResults: v.jzResult,
                SBReson: getArrayValue(v.sbReson),
                Results: v.result,
                // ResponsClassify: "医生"//暂时没有对应项
                ResponsClassify: v.zrfl
                // DoOrder: 1,//顺序号
              },
              Detail: JSON.parse(v.GoodsDetailStr).map(d => {
                let Goodsls = S_GOODS.filter(g => {
                  return g.ID == d.GoodsID
                });
                let Goods;
                if (!Goodsls || Goodsls.length < 1) {
                  alert("错误，打包医嘱查找药品耗材时物品：“" + d.GoodsID + "”不存在.请检查物品字典")
                  Goods = { MinNum: 0, Categroup: "" };
                } else {
                  Goods = Goodsls[0];
                }
                // console.log(Goods);
                let NewGoodModel = Object.assign(GoodModel(), {
                  fromFromDic: {
                    MinSpec: Goods.MinSpec,
                    MinNum: Number.parseFloat(Goods.MinNum),
                    // UseNumNum: Number.parseFloat(Goods.MinNum) * Number.parseFloat(d.num)
                    // 以下这样更好
                    UseNumNum: Number.parseFloat(d.useNum)
                  },
                  form: {
                    Num: d.num, //
                    Price: Goods.Price,
                    GoodsName: Goods.label,
                    Spec: Goods.Spec,
                    LossVal: d.lossVal,
                    UseNum: d.useNum
                  },
                  OtherForm: {
                    ID: 0,
                    TableName: Goods.Categroup.indexOf("药品") > -1 ? "M_DrugUseRecord" : "M_ConsumableRecord",
                    ResID: d.GoodsID
                  }
                });
                return NewGoodModel;
              })
            })

          })
        }
      })

    }

  }
  return returnValue;
}

//单实例 就不传函数了
export default myLocalDictionaryApi()