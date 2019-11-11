import React from 'react';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';

class Nav extends React.Component {
	render() {
		return (
			<div className="Nav">
				<div className="nav_button">
					<Bfore
						goto = {this.props.goto.bind(this)}
					/>
					<div className="inform">
						<button type="button">?</button>
					</div>
				</div>
				<div className="navi">
					<img src="/img/title.png" alt="title"/>
					<p>OOO님</p>
				</div>
			</div>
		);
	}
}

Nav.propTypes = {
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired
};

export default Nav;