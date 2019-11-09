import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
	return (
		<div className="Input">
			<label>{props.title}</label>
			<input id={"input_" + props.title} type={props.type} defaultValue={props.value || ''} />
		</div>
	)
}

Input.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string
};

export default Input;