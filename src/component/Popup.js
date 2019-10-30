import React from 'react';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';
import After from './After.js';

class Popup extends React.Component{
    constructor(){
        super();
        this.state = {
          popUpCount:0
        };
      }

    nextPopUp=()=>{
        this.setState((prevState)=>({popUpCount: prevState.popUpCount+1}));
    }

    render(){
        let popUpCount=this.state.popUpCount;
        let popUpRender;

        switch(popUpCount){
            case 0:
            popUpRender="first popUp page"; break;
            case 1:
            popUpRender="second popUp page"; break;
            case 2:
            popUpRender="third popUp page"; break;
        }

        return (
            <div className="popUp">
                {popUpRender}
                <input type="button" onClick={this.nextPopUp}/>
                <Bfore
                     renderState={this.props.renderState}
                     backPage = {this.props.backPage.bind(this)}
                />
                <After
                     renderState={this.props.renderState}
                     nextPage = {this.props.nextPage.bind(this)}
                />
            </div>
        );
    }
}


Popup.propTypes={
    renderState: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
    backPage: PropTypes.func.isRequired
  };

export default Popup;