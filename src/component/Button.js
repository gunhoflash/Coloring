import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
	return (
		<button id={"button_" + props.id} onClick={props.onClick} className="Button">
			{props.content}
		</button>
	)
}

Button.propTypes = {
	id: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default Button;