import React from 'react';
import PropTypes from 'prop-types';
import After from './After.js';
import Nav from './Nav.js';

class Start extends React.Component {
	render() {
		console.log('안녕하세요');
		console.log(this.props.user_info.name);
		return (
			<div className="Start">
				<Nav
					renderState = {this.props.renderState}
					backPage = {this.props.backPage.bind(this)}
				/>
				<div className="start_box s_md">
					<p>안녕하세요</p>
					<p>{this.props.user_info.name}님</p>
				</div>
				<div className="start_btn">
					<After 
						value = "시작"
						renderState = {this.props.renderState}
						nextPage = {this.props.nextPage.bind(this)}/>
				</div>
				<img src="/img/ball.png" alt="ball" className="emoball"/>
			</div>
		);
	}
}

Start.propTypes = {
	renderState: PropTypes.number.isRequired,
	nextPage: PropTypes.func.isRequired,
	backPage: PropTypes.func.isRequired,
	user_info: PropTypes.object.isRequired,
	user_type: PropTypes.string.isRequired
};

export default Start;