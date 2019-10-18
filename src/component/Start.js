import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';
import After from './After.js';

class Start extends React.Component{
    constructor(){
        super();
        this.state = {
          startCount:0
        };
      }

    nextStart=()=>{
        this.setState((prevState)=>({startCount: prevState.startCount+1}));
    }

    render(){
        let startCount=this.state.startCount;
        let startRender;

        switch(startCount){
            case 0:
            startRender="first start page"; break;
            case 1:
            startRender="second start page"; break;
            case 2:
            startRender="third start page"; break;
        }

        return (
            <div className="start">
                {startRender}
                <input type="button" onClick={this.nextStart}/>
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


Start.propTypes={
    renderState: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
    backPage: PropTypes.func.isRequired
};

export default Start;