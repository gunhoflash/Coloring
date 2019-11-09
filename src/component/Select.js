import React from 'react';
import PropTypes from 'prop-types';

import Logo from './Logo';
import Start from './Start';
import Popup from './Popup';
import Home from './Home';
import Game from './Game';
import Login from './Login';
import RegisterHost from './RegisterHost';
import ManageTarget from './ManageTarget';

class Select extends React.Component {

	render() {
		switch (this.props.currentPage) {
			case 'Logo':
				setTimeout(() => {
					this.props.goto('Start');
				}, 1000);
				return <Logo/>;
			case 'Start':
				return <Start 
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
					user_info = {this.props.user_info}
					user_type = {this.props.user_type}
				/>;
			case 'Popup':
				return <Popup
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>;
			case 'Home':
				return <Home
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>;
			case 'Login':
				return <Login
					currentPage = {this.props.currentPage}
					set_user = {this.props.set_user.bind(this)}
					goto = {this.props.goto.bind(this)}
				/>;
			case 'RegisterHost':
				return <RegisterHost
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>;
			case 'ManageTarget':
				return <ManageTarget
					currentPage = {this.props.currentPage}
					update_target = {this.props.update_target.bind(this)}
					goto = {this.props.goto.bind(this)}
					user_info = {this.props.user_info}
				/>;
			case 'Game':
				return <Game
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>;
			default:
				console.log(`route default from ${this.props.currentPage}`);
				this.props.goto('Logo');
				break;
		}
	}
}

Select.propTypes = {
	currentPage: PropTypes.string.isRequired,
	set_user: PropTypes.func.isRequired,
	update_target: PropTypes.func.isRequired,
	goto: PropTypes.func.isRequired,
	user_info: PropTypes.object.isRequired,
	user_type: PropTypes.string.isRequired
};

export default Select;