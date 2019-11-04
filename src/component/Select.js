import React from 'react';
import PropTypes from 'prop-types';

import Bfore from './Bfore';
import Logo from './Logo';
import Start from './Start';
import Popup from './Popup';
import Home from './Home';

class Select extends React.Component {
	constructor(props) {
		super(props); // 0: Logo 1: Start 2: Popup 3: Home
	}

	render() {
		const renderState = this.props.renderState;
		console.log(12345);
		console.log(this.props.target);
		switch(renderState) {
		case 0:
			setTimeout(() => {
				this.props.nextPage();
			}, 4000);
			return <Logo/>;
		case 1:
			return <Start 
				renderState = {this.props.renderState}
				nextPage = {this.props.nextPage.bind(this)}
				backPage = {this.props.backPage.bind(this)}
				target = {this.props.target}
			/>;
		case 2:
			return <Popup
				renderState = {this.props.renderState}
				nextPage = {this.props.nextPage.bind(this)}
				backPage = {this.props.backPage.bind(this)}
			/>;
		case 3:
			return <Home
				renderState = {this.props.renderState}
				nextPage = {this.props.nextPage.bind(this)}
				backPage = {this.props.backPage.bind(this)}
			/>; 
		}
	}
}

Select.propTypes = {
	renderState: PropTypes.number.isRequired,
	nextPage: PropTypes.func.isRequired,
	backPage: PropTypes.func.isRequired,
	target: PropTypes.object.isRequired
};

export default Select;