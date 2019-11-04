import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav.js';
import After from './After.js';

class StartCommon extends React.Component {
	render() {
		return (
			<div className="StartCommon">
				<Nav
					//renderState = {this.props.renderState}
					//backPage = {this.props.backPage.bind(this)}
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>
				<div className="start_box s_md">
					<p>안녕하세요</p>
					<p>{this.props.user_info.name}님</p>
				</div>
				<div className="start_btn">
					<After
						value = "시작"
						next = 'Popup'
						goto = {this.props.goto.bind(this)}
					/>
				</div>
				<img src="/img/ball.png" alt="ball" className="emoball"/>
			</div>
		);
	}
}

StartCommon.propTypes = {
	//renderState: PropTypes.number.isRequired,
	//backPage: PropTypes.func.isRequired,
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
	user_info: PropTypes.object.isRequired,
	user_type: PropTypes.string.isRequired
};

export default StartCommon;