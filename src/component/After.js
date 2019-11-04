import React from 'react';
import PropTypes from 'prop-types';

function After(props) {
	return (
		<div className="After">
			<button type="button" onClick={props.nextPage}>{props.value}</button>
		</div>
	)
}

After.propTypes = {
	renderState: PropTypes.number.isRequired,
	nextPage: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default After;