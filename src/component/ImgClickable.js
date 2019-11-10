import React from 'react';
import PropTypes from 'prop-types';
class ImgClickable extends React.Component {
	onClick = () => {
		this.props.goto(this.props.next);
	}

	render() {
		return (
			<img className={"ImgClickable " + this.props.classNames} src={this.props.src} onClick={this.onClick} alt={this.props.alt || ''}/>
		)
	}
}

ImgClickable.propTypes = {
	classNames: PropTypes.string,
	next: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string
};

export default ImgClickable;