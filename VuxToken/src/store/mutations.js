import {
	UPDATE_HEAD,
	UPDATE_LOADING,
	UPDATE_FOOTER,
	UPDATE_PAGE_TITLE,
	UPDATE_PAGE_ErrorMsg,
	UPDATE_PAGE_ErrorSWitch
} from './data'

const state={
	headShow:false,
	loading:false,
	footerShow:process.env.NODE_ENV === 'production' ?false:false, //当为生产模式时将下部tab页先隐藏
	pageTitle:'首页',
	ErrorMsg:'',
	ErrorSWitch:false,
};


const mutations={
	/*head*/
	[UPDATE_HEAD](state,type){
		state.headShow=type;
	},
	/*loading*/
	[UPDATE_LOADING](state,type){
		state.loading=type;
	},
	/*footer*/
	[UPDATE_FOOTER](state,type){
		state.footerShow=type;
	},
	/*title*/
	[UPDATE_PAGE_TITLE](state,type){
		state.pageTitle=type;
	},
	[UPDATE_PAGE_ErrorMsg](state,type){
		state.ErrorMsg=type;
	},
	[UPDATE_PAGE_ErrorSWitch](state,type){
		state.ErrorSWitch=type;
	}
};

const getters={
	ErrorSWitch(state){
		return state.ErrorSWitch;
	},
	ErrorMsg(state){
		return state.ErrorMsg;
	},
	headShow(state){
		return state.headShow;
	},
	loading(state){
		return state.loading;
	},
	footerShow(state){
		return state.footerShow;
	},
	pageTitle(state){
		return state.pageTitle;
	}
};

export default{
	state,
	mutations,
	getters
}