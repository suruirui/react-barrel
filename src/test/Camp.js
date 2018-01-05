import React, { Component } from 'react';


class Camp extends Component{
  constructor(props){
      super(props);
      this.state = {
        soldiers:['虎子','柱子','王根生']
      }
      this.addSoldier = this.addSoldier.bind(this);
  }

  addSoldier(){
     this.setState({
       soldiers:[...this.state.soldiers,'新兵'+Math.trunc(Math.random()*100)]
     });
  }

  render(){
      return(
        <div>
            <h2>二营,营长{this.props.campLeader}</h2>
            <button onClick={this.addSoldier}>新兵入伍</button>
            <ul>
                {this.state.soldiers.map(v=><li key={v}>{v}</li>)}
            </ul>
        </div>
      );
  }
}

export default Camp;