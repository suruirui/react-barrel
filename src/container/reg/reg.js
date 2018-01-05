import React, { Component } from 'react';
import Logo from '../../component/logo/logo'
import {List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Reg extends Component{

	render(){
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				<Logo></Logo>
				<List>
					<InputItem>用户名</InputItem>
					<WhiteSpace/>
					<InputItem>密码</InputItem>
					<WhiteSpace/>
					<InputItem>确认密码</InputItem>
					<WhiteSpace/>
					<RadioItem>牛人</RadioItem>
					<RadioItem>BOSS</RadioItem>
					<WhiteSpace/>
					<Button type='primary'>注册</Button>
				</List>
			</div>
		)
	}
}

export default Reg;