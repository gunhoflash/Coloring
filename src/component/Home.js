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
					goto = {this.props.goto.bind(this)}
				/>
				<After
					value = "현재로"
					next = 'Home'
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