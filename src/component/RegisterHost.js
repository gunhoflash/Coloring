import React from 'react';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';
import After from './After.js';

function RegisterHost(props) {
	return (
		<div className="RegisterHost">
			This is RegisterHost component!
			<Bfore
				renderState = {props.renderState}
				backPage = {props.backPage.bind(this)}
			/>
			<After
				renderState = {props.renderState}
				nextPage = {props.nextPage.bind(this)}
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
			<Input
				title = "login_email"
				type = "email"
			/>
			<button id="button_register" onclick='createHost'>register</button>
		<script>
			function createHost() {
				var name = $('#input_name').val();
				var age = $('#input_age').val();
				var sex = $('#input_sex').val();
				var email = $('#input_email').val();
				if (!name || !age || !sex || !email) {
					console.log('invalid inputs');
					return;
				}
				$.ajax({
					method: 'POST',
					url: 'http://localhost/createHost',
					data: {
						name  : name,
						age   : age,
						sex   : sex,
						email : email
					},
					success: function (result) {
						console.log(result);
					}
				});
			}
		</script>
		</div>
	)
}

RegisterHost.propTypes = {
	renderState: PropTypes.number.isRequired,
	nextPage: PropTypes.func.isRequired,
	backPage: PropTypes.func.isRequired
};

export default RegisterHost;