import React from 'react';
import PropTypes from 'prop-types';
class After extends React.Component {
	onClick = () => {
		this.props.goto(this.props.next);
	}

	render() {
		return (
			<div className="After">
				<button type="button" onClick={this.onClick}>{this.props.value}</button>
			</div>
		)
	}
}

After.propTypes = {
	//renderState: PropTypes.number.isRequired,
	//nextPage: PropTypes.func.isRequired,
	next: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default After;