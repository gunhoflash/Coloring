import React from 'react';
import PropTypes from 'prop-types';

function Bfore(props) {
	return (
		<div className="Bfore">
			<button type="button" onClick={props.goto}>◀</button>
		</div>
	)
}

Bfore.propTypes = {
	//renderState: PropTypes.number.isRequired,
	//backPage: PropTypes.func.isRequired
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired
};

export default Bfore;