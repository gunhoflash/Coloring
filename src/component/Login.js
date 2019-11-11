import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';
import Input from './Input.js';

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.event_post_login = this.event_post_login.bind(this);
	}

	event_post_login = () => {
		var email = $('#input_login_email').val();
		var name = $('#input_login_name').val();
		if (!email || !name) {
			alert('invalid inputs');
			return;
		}

		$.post(this.props.server_url + '/getHostInfo', {
			email : email,
			name  : name
		}, function (response) {
			if (response.result == 1) {
				this.props.set_user(response.host_info, 'host');
				this.props.goto();
			} else {
				alert(response.message);
			}
		}.bind(this));
	}

	render() {
		return (
			<div className="Login">
				<Bfore
					goto = {this.props.goto.bind(this)}
				/>
				<div className="login_form">
					<Input
						title = "login_email"
						type = "email"
					/>
					<Input
						title = "login_name"
						type = "text"
					/>
					<div className="submit_login submit_btn">
						<button id="button_login" onClick={this.event_post_login}>login</button>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	react_url: PropTypes.string.isRequired,
	server_url: PropTypes.string.isRequired,
	currentPage: PropTypes.string.isRequired,
	set_user: PropTypes.func.isRequired,
	goto: PropTypes.func.isRequired
};

export default Login;