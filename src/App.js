import React from 'react';

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
    return(<div className="component">
      <div className="sub_com">
        <Select 
      renderState={this.state.renderState}
      nextPage = {this.nextPage.bind(this)}
      backPage = {this.backPage.bind(this)}
      />
      </div>
      </div>);
  }
}

export default App;

