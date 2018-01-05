import React, { Component } from 'react';
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Login extends Component{

	render(){
		return (
			<div>
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem>用户名</InputItem>
						<WhiteSpace/>
						<InputItem>密码</InputItem>
						<WhiteSpace/>
						<Button type='primary'>登录</Button>
						<WhiteSpace/>
						<Button type='primary'>注册</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}

export default Login;
