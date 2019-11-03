import React from 'react';
import PropTypes from 'prop-types';
import After from './After.js';
import Nav from './Nav.js';

class Start extends React.Component{
    render(){
        return (
            <div className="Start">
                <Nav
                    renderState={this.props.renderState}
                    backPage = {this.props.backPage.bind(this)}
                />
                <div className="start_box s_md">
                    <p>안녕하세요</p>
                    <p>OOO님</p>
                </div>
                <div className="start_btn">
                    <After 
                        value="시작"
                        renderState={this.props.renderState}
                        nextPage = {this.props.nextPage.bind(this)}/>
                </div>
                <img src="/img/ball.png" alt="ball" className="emoball"/>
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