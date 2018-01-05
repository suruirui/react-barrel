import React, { Component } from 'react';
import Camp from './Camp';
import Company from './Company';

class Corps extends Component {

  //组件声明周期方法 挂载
  componentWillMount() {
    console.log("组件马上就要挂载了");
  }

  componentDidMount() {
    console.log("组件已经挂载");
  }

  componentWillReceiveProps(nextProps) {
    console.log("组件要接收组件的值了");
  }
  //更新
  shouldComponentUpdate() {
    console.log("判断是不是要更新组件");
    return true;        // 记得要返回true
  }
  componentWillUpdate() {
    console.log("马上就要更新组件了");
  }
 
  componentDidUpdate() {
    console.log("组件更新完毕");
  }
  //卸载
  componentWillUnmount() {
    console.log("组件卸载了");
  }

  render() {
    return (
      <div>
          <h2>独立团，团长{this.props.boss}</h2>
          <Camp campLeader="王壮"></Camp>
          <Company commander="杨隆"></Company>
      </div>
    );
  }
}

export default Corps;