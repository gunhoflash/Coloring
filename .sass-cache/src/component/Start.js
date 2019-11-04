import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import After from './After.js';
import Nav from './Nav.js';
import StartCommon from './StartCommon';
import Button from './Button.js';

class Start extends React.Component {

	constructor(props) {
		super(props); // 0: Logo 1: Start 2: Popup 3: Home
		this.event_manage_target = this.event_manage_target.bind(this);
		this.event_login = this.event_login.bind(this);
	}

	event_manage_target() {
		console.log('event_manage_target clicked.');
		// TODO: move to RegisterTarget.js
	}
	event_login() {
		console.log('event_login clicked.');
		this.props.goto('Login');
		// TODO: move to Login.js
	}

	render() {
		console.log(this.props.user_info.name);
		return (
			<div className="Start">
				<StartCommon
					//renderState = {this.props.renderState}
					//backPage = {this.props.backPage.bind(this)}
					//nextPage = {this.props.nextPage.bind(this)}

					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}

					user_info = {this.props.user_info}
					user_type = {this.props.user_type}
				/>
				{(this.props.user_type == 'target') ?
				null
				:
					(this.props.user_type == 'host') ?
					<Button
						id = 'manage_target'
						content = 'manage target'
						onClick = {this.event_manage_target}
					/>
						:
					<Button
						id = 'login'
						content = 'login'
						onClick = {this.event_login}
					/>
				}
			</div>
		);
	}
}

Start.propTypes = {
	//renderState: PropTypes.number.isRequired,
	//nextPage: PropTypes.func.isRequired,
	//backPage: PropTypes.func.isRequired,
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
	user_info: PropTypes.object.isRequired,
	user_type: PropTypes.string.isRequired
};

export default Start;