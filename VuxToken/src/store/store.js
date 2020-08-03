import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import  Patient,{
    main, taskmsg, WSJC, MedicalHistory, Physical, AidCheck, Treaments, TreamentItemModel,CPR
    , Error,Basicinfo} from  '@/model/Patient.js'
Vue.use(Vuex);
export default new Vuex.Store({
	modules:{
		mutations
	},

	state: {
		ISUrumqiPatientType:true,//是否开启新疆特殊转运病历判断 （病历类型为转运的填特殊病历）


		IsLogin:false,			//是否登录成功
		DeleteTROrder:'',  //想删除的救治措施TROrder
		JZCSSubmitType:'jm',//lsy为保存病历时同步一起提交的模式，修改为其他则为偷跑保存版
		
		NetworkSuccess:true,
		TaskCode: '',
		PatientOrder:'',
		FillPersonCode:'',
		Type:'',
		TROrder:'',
		Treaments:Treaments(),
		TreamentItemModel:TreamentItemModel(),
		WSJC:WSJC(),
		Basicinfo:Basicinfo(),
		AidCheck:AidCheck(),
		Physical:Physical(),
		Error:Error(),
		Token:'',
		ID:'',
		ErrorMsg:'',
		ErrorSwitch:false,
		AddPatientPage:'',
		ShowPhysical:false,
		
	},
	getters:{
		Basicinfo(state){
			
			return state.Basicinfo.MainData;
		},
	},
	mutations: {
		//此处不改为UpdateBasicinfo是因为通用获取填写页面内容方法图省事传参只传一个 其它模块也按这种形式就行
		// Basicinfo(state,msg,errorCount) {
		// 	state.Basicinfo.MainData=msg;
		// 	console.log('msg',msg)
		// 	console.log('errorCount',errorCount)
		// 	state.Basicinfo.errorCount=errorCount;
		// 	console.log('state.Basicinfo.errorCount',state.Basicinfo.errorCount)
		// },
		IsLogin(state,msg) {
			state.IsLogin=msg;
		},
		ErrorMsg(state,msg) {
			state.ErrorMsg=msg;
		},
		ErrorSwitch(state,msg) {
			state.ErrorSwitch=msg;
		},
		Token(state,msg) {
			state.Token=msg;
		},
		ID(state,msg) {
			state.ID=msg;
		},

		Basicinfo(state,msg) {
			state.Basicinfo.MainData=msg;
			console.log('msg',msg)
			console.log('state.Basicinfo',msg)
			console.log('跑来修改maindata了',msg)
		
		
		},
		BasicinfoError(state,msg) {
			state.Basicinfo.BasicinfoError=msg;
			console.log('msg',msg)
			console.log('state.Basicinfo.BasicinfoError',msg)
		
		
		},
		AidCheckError(state,msg) {
			state.Basicinfo.AidCheckError=msg;
			console.log('msg',msg)
			console.log('state.Basicinfo.AidCheckError',msg)
		},
		DiagnosisError(state,msg) {
			state.Basicinfo.DiagnosisError=msg;
			console.log('msg',msg)
			console.log('state.Basicinfo.DiagnosisError',msg)
		},
		CPRCheckrror(state,msg) {
			state.Basicinfo.CPRCheckrror=msg;
			console.log('msg',msg)
			console.log('state.Basicinfo.CPRCheckrror',msg)
		},
		HandoverError(state,msg) {
			state.Basicinfo.HandoverError=msg;
			console.log('msg',msg)
			console.log('state.Basicinfo.HandoverError',msg)
		
		
		},
		PhysicalError(state,msg) {
			state.Basicinfo.PhysicalError=msg;
			console.log('msg',msg)
			console.log('state.Physical.errorCount',msg)
		
		
		},


		Physical(state,msg) {
			state.Physical.TG=msg;
			state.ShowPhysical=true;
			
		},
		AidCheck(state,msg,errorCount) {
			state.AidCheck.MainData=msg;
			state.AidCheck.errorCount=errorCount;
		},

		TreamentItemModel(state,List){
			state.TreamentItemModel.form=List;
		},
		Treaments(state,List){
			state.Treaments.MainData.TreamentsList=List;
		},
		WSJC(state,msg,errorCount) {
			state.WSJC.MainData=msg;
			state.WSJC.errorCount=errorCount;
		},
		WSJCList(state,msg) {
			state.WSJC.MainData.List=msg;
			
		},
		ClearData(state){
			state.Basicinfo=Basicinfo();
			state.AidCheck=AidCheck();
			state.WSJC=WSJC();
			state.Physical=Physical();
			
		},
		
		UpdateNetworkSuccess(state,msg) {
			console.log(' UpdateNetworkSuccess', msg);
		    state.NetworkSuccess= msg;
		},
		UpdateFillPersonCode(state,msg) {
			console.log(' msg', msg);
		    state.FillPersonCode= msg;
		},
		UpdateTaskCode(state,msg) {
			console.log(' msg', msg);
		    state.TaskCode= msg;
		},
		UpdatePatientOrder(state,msg) {
			console.log(' msg', msg);
			state.PatientOrder= msg;
		},
		UpdateType(state,msg) {
			state.Type= msg;
			
		},
		UpdateTROrder(state,msg) {
			state.TROrder= msg;
		},
		UpdateDeleteTROrder(state,msg) {
			state.DeleteTROrder= msg;
		},
		UpdateAddPatientPage(state,msg) {
			state.AddPatientPage= msg;
		},
		
},
	actions
});

