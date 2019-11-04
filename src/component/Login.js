import React from 'react';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';
import Input from './Input.js';

class Login extends React.Component {
	render() {
		return (
			<div className="Login">
				<Bfore
					renderState = {this.props.renderState}
					backPage = {this.props.backPage.bind(this)}
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
					<button id="button_login"></button>
				</div>
				<!-- TODO: script tag here -->
			</div>
		);
	}
}

Login.propTypes = {
	renderState: PropTypes.number.isRequired,
	backPage: PropTypes.func.isRequired
};

export default Login;