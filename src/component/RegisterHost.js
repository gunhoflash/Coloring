import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Bfore from './Bfore.js';
import Button from './Button.js';
import Input from './Input.js';
class RegisterHost extends React.Component {

	constructor(props) {
		super(props);
		this.event_register = this.event_register.bind(this);
	}

	event_register = () => {
		var email = $('#input_login_email').val();
		var name = $('#input_login_name').val();
		var age = $('#input_login_age').val();
		var sex = $('#input_login_sex').val();
		if (!email || !name || !age || !sex) {
			alert('invalid inputs');
			return;
		}
		console.log(`register: ${email}, ${name}, ${age}, ${sex}`);

		$.post('http://localhost:5000/createHost', {
			name  : name,
			age   : age,
			sex   : sex,
			email : email
		}, function (response) {
			alert(response.message);
			if (response.result == 1) {
				// TODO: auto login right now

				this.props.goto(); // back to Start.js
			}
		}.bind(this));
	}
	render () {
		return (
			<div className="RegisterHost">
				This is RegisterHost component!
				<Bfore
					goto = {this.props.goto.bind(this)}
				/>
				<Input
					title = "login_email"
					type = "email"
				/>
				<Input
					title = "login_name"
					type = "text"
				/>
				<Input
					title = "login_age"
					type = "number"
				/>
				<Input
					title = "login_sex"
					type = "text"
				/>
				<Button
					id = 'register'
					content = 'register'
					onClick = {this.event_register}
				/>
			</div>
		)
	}
}

RegisterHost.propTypes = {
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
};

export default RegisterHost;