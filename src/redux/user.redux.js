import axios from 'axios'
import {getRedirectPath} from '../util'

const REG_SUCCESS = 'REG_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'

const initState={
	redirectTo:'',
	isAuth:false,
	msg:'',
	user:'',
	type:''
}

// reducer
export function user(state=initState,action){
	switch (action.type) {
		case REG_SUCCESS:
			return {...state, msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
		case LOGIN_SUCCESS:
			return {...state, msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
		case LOAD_DATA:
			return {...state, msg:'',...action.payload}
		case ERROR_MSG:
			return {...state, isAuth:false, msg:action.msg}
		default:
			return state;
	}
}

function regSuccess(data){
	return {type:REG_SUCCESS,payload:data};
}

function loginSuccess(data){
	return {type:LOGIN_SUCCESS,payload:data};
}
function errorMsg(msg){
	return {type:ERROR_MSG,msg};
}

export function loadData(userInfo){
	// console.log(loadData);
	return {type:LOAD_DATA,payload:userInfo};
}

export function login({username,pwd}){
	if (!username||!pwd) {
		return errorMsg('用户名和密码必须输入')
	}
	return dispatch=>{
		axios.post('/users/login',{username,pwd})
			.then(res=>{
				if (res.status==200&&res.data.code===0) {
					dispatch(loginSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			});
	}
}

export function reg({username,pwd,rePwd,type}){
	if (!username||!pwd||!type) {
		return errorMsg('用户名密码必须输入')
	}
	if (pwd!==rePwd) {
		return errorMsg('密码和确认密码不同')
	}
	return dispatch=>{
		axios.post('/users/reg',{username,pwd,type})
			.then(res=>{
					if (res.status==200&&res.data.code===0) {
						dispatch(regSuccess({username,pwd,type}))
					}else{
						dispatch(errorMsg(res.data.msg))
					}
				}
			)
	}
}
