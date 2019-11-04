import React from 'react';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';
import After from './After.js';

class Home extends React.Component {
	render () {
		return (
			<div className="Home">
				This is Home component!
				<Bfore
					//renderState = {props.renderState}
					//backPage = {props.backPage.bind(this)}
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>
				<After
					value = "현재로"
					next = 'Home'
					//renderState = {props.renderState}
					//nextPage = {props.nextPage.bind(this)}
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>
			</div>
		)
	}
}

Home.propTypes = {
	//renderState: PropTypes.number.isRequired,
	//nextPage: PropTypes.func.isRequired,
	//backPage: PropTypes.func.isRequired
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
};

export default Home;