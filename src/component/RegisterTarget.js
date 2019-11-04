// TODO: test 
// TODO: get host data
import React from 'react';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';
import After from './After.js';

function RegisterTarget(props) {
	return (
		<div className="RegisterTarget">
			This is RegisterTarget component!
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
				title = "login_grade"
				type = "text"
			/>
			<button id="button_register" onclick='registerTarget'>register</button>
		<script>
			function registerTarget() {
				var name = $('#input_name').val();
				var age = $('#input_age').val();
				var sex = $('#input_sex').val();
				var grade = $('#input_grade').val();
				var email = {props.user_info.email};
				if (!name || !age || !sex || !grade) {
					console.log('invalid inputs');
					return;
				}
				$.ajax({
					method: 'POST',
					url: 'http://localhost/registerTarget',
					data: {
						name  : name,
						age   : age,
						sex   : sex,
						grade : grade,
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

RegisterTarget.propTypes = {
	renderState: PropTypes.number.isRequired,
	nextPage: PropTypes.func.isRequired,
	backPage: PropTypes.func.isRequired,
	user_info: PropTypes.object.isRequired
};

export default RegisterTarget;