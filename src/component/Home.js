import React from 'react';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';
import Nav from './Nav.js';
import After from './After.js';

class Home extends React.Component {
	render () {
		return (
			<div className="Home">
				<Nav
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>
				<div className="home_con">
					<img className="game_list" src="./img/title.png" onClick={this.props.goto('Game')}/>
				</div>
				<Bfore
					goto = {this.props.goto.bind(this)}
				/>
				<After
					value = "Game으로"
					next = 'Game'
					goto = {this.props.goto.bind(this)}
				/>
			</div>
		)
	}
}

Home.propTypes = {
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
};

export default Home;