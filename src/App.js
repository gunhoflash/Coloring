import React from 'react';
import axios from 'axios';
import $ from "jquery";

import Select from './component/Select';


class App extends React.Component {
  state = {
    renderState : 0, // 0: Logo 1: Start 2: Popup 3: Home
    targetSelected: false,
    target : null
  };

  nextPage=()=>{
    this.setState((prevState)=>({renderState: prevState.renderState+1}));
  }
  backPage=()=>{
    this.setState((prevState)=>({renderState: prevState.renderState-1}));
  }

  componentDidMount() {
    axios.post('http://localhost:5000' + window.location.pathname).then(response => {
      let jsondata = JSON.parse(response.data.target);
      console.log(jsondata);
      if (jsondata == null) {
        jsondata = {
          name: 'user' + String('0000' + Math.floor(Math.random() * 9999)).substr(-4)
        };
      }
      this.setState({
        targetSelected: true,
        target: jsondata
      });

    });
  }
  render(){
    if (this.state.targetSelected == false)
      return null;
    return(<div className="component">
      <div className="sub_com">
        <Select 
      renderState={this.state.renderState}
      nextPage = {this.nextPage.bind(this)}
      backPage = {this.backPage.bind(this)}
      target={this.state.target}
      />
      </div>
      </div>);
  }
}

export default App;

