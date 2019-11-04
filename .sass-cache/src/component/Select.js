import React from 'react';
import PropTypes from 'prop-types';

import Bfore from './Bfore';
import Logo from './Logo';
import Start from './Start';
import Popup from './Popup';
import Home from './Home';
import Login from './Login';

class Select extends React.Component {
	constructor(props) {
		super(props); // 0: Logo 1: Start 2: Popup 3: Home
	}

	render() {
		switch (this.props.currentPage) {
			case 'Logo':
				setTimeout(() => {
					this.props.goto('Start');
					// this.props.nextPage();
				}, 4000);
				return <Logo/>;
			case 'Start':
				return <Start 
					//renderState = {this.props.renderState}
					//nextPage = {this.props.nextPage.bind(this)}
					//backPage = {this.props.backPage.bind(this)}

					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}

					user_info = {this.props.user_info}
					user_type = {this.props.user_type}
				/>;
			case 'Popup':
				return <Popup
					//renderState = {this.props.renderState}
					//nextPage = {this.props.nextPage.bind(this)}
					//backPage = {this.props.backPage.bind(this)}
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>;
			case 'Home':
				return <Home
					//renderState = {this.props.renderState}
					//nextPage = {this.props.nextPage.bind(this)}
					//backPage = {this.props.backPage.bind(this)}
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}

				/>;
			case 'Login':
				return <Login
					//renderState = {this.props.renderState}
					//nextPage = {this.props.nextPage.bind(this)}
					//backPage = {this.props.backPage.bind(this)}
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>; 
		}
		/*const renderState = this.props.renderState;
		console.log(this.props.user_info);
		console.log(this.props.user_type);
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
				user_info = {this.props.user_info}
				user_type = {this.props.user_type}
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
		}*/
	}
}

Select.propTypes = {
	//renderState: PropTypes.number.isRequired,
	//nextPage: PropTypes.func.isRequired,
	//backPage: PropTypes.func.isRequired,
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
	user_info: PropTypes.object.isRequired,
	user_type: PropTypes.string.isRequired
};

export default Select;