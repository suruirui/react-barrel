import React, { Component } from 'react';

class Company extends Component{
 
  render(){
      return(
        <div>
          <h2>骑兵连，连长{this.props.commander}</h2>
        </div>
      );
  }
}

export default Company;