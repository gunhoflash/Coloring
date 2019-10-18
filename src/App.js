import React from 'react';
import './index.css';

import Select from './component/Select';


class App extends React.Component {
  state = {
    renderState : 0 // 0: Logo 1: Start 2: Popup 3: Home
  };

  nextPage=()=>{
    this.setState((prevState)=>({renderState: prevState.renderState+1}));
  }
  backPage=()=>{
    this.setState((prevState)=>({renderState: prevState.renderState-1}));
  }

  render(){
    return(<Select 
      renderState={this.state.renderState}
      nextPage = {this.nextPage.bind(this)}
      backPage = {this.backPage.bind(this)}
      />);
  }
}

export default App;

