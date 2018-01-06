import React, { Component } from 'react';
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'

@connect(
	state=>state.user,
	{login}
)
class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			username:'',
			pwd:''
		}
		this.reg = this.reg.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}
	//跳转注册页面
	reg(){
		this.props.history.push('/reg');
	}
	//获取输入的用户名和密码
	handleChange(key,val){
		console.log(key,val);
		this.setState({
			[key]:val
		})
	}
	handleLogin(){
		this.props.login(this.state)
	}
	render(){
		return (
			<div>
				{this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<WingBlank>
					<List>
						{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
						<InputItem onChange={v=>this.handleChange('username',v)}>用户名</InputItem>
						<WhiteSpace/>
						<InputItem type="password" onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
						<WhiteSpace/>
						<Button type='primary' onClick={this.handleLogin}>登录</Button>
						<WhiteSpace/>
						<Button type='primary' onClick={this.reg}>去注册</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}

export default Login;
