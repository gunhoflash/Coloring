import React from 'react';
import PropTypes from 'prop-types';
import StartCommon from './StartCommon';
import Button from './Button.js';

class Start extends React.Component {

	constructor(props) {
		super(props);
		this.event_manage_target = this.event_manage_target.bind(this);
		this.event_login = this.event_login.bind(this);
		this.event_register = this.event_register.bind(this);
	}

	event_manage_target() {
		console.log('event_manage_target clicked.');
		this.props.goto('ManageTarget');
	}
	event_login() {
		console.log('event_login clicked.');
		this.props.goto('Login');
	}
	event_register() {
		console.log('event_login clicked.');
		this.props.goto('RegisterHost');
	}

	render() {
		console.log(this.props.user_info.name);
		return (
			<div className="Start">
				<StartCommon
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
					user_info = {this.props.user_info}
					user_type = {this.props.user_type}
				/>
				{(this.props.user_type == 'target') ?
				null
				:
					(this.props.user_type == 'host') ?
					<span>
						<Button
							id = 'manage_target'
							content = '타켓 관리'
							onClick = {this.event_manage_target}
						/>
					</span>
						:
					<span>
						<Button
							id = 'login'
							content = '로그인'
							onClick = {this.event_login}
						/>
						<Button
							id = 'register'
							content = '등록'
							onClick = {this.event_register}
						/>
					</span>
				}
			</div>
		);
	}
}

Start.propTypes = {
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
	user_info: PropTypes.object.isRequired,
	user_type: PropTypes.string.isRequired
};

export default Start;