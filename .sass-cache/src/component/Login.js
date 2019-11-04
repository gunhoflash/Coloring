import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';
import Input from './Input.js';

class Login extends React.Component {
	event_post_login() {
		$.post(
			'http://localhost/getHostInfo',
			{
				name  : 'name',
				age   : 24,
				sex   : 'sex',
				email : 'email',
			},
			function (result) {
				console.log(result);
			}
		);
	}

	render() {
		return (
			<div className="Login">
				<Bfore
					//renderState = {this.props.renderState}
					//backPage = {this.props.backPage.bind(this)}
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>
				<div>
					<Input
						title = "login_email"
						type = "email"
					/>
					<Input
						title = "login_name"
						type = "text"
					/>
					<button id="button_login" onClick={this.event_post_login}></button>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	//renderState: PropTypes.number.isRequired,
	//backPage: PropTypes.func.isRequired
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired
};

export default Login;