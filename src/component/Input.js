import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
	return (
		<div className="Input">
			<label>{props.title}</label>
			<input id="input_{props.title}" type="{props.type}">
		</div>
	)
}

Input.propTypes = {
	renderState: PropTypes.number.isRequired,
	backPage: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default Input;