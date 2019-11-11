import React from 'react';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';
import $ from 'jquery';

class Nav extends React.Component {

	constructor(props) {
		super(props);
		this.show_inform = this.show_inform.bind(this);
		this.hide_inform = this.hide_inform.bind(this);
	}

	show_inform() {
		$('#PopupInform').addClass('show'); // show
	}
	hide_inform() {
		$('#PopupInform').addClass('hide'); // show
	}

	render() {
		return (
			<div className="Nav">
				<div className="nav_button">
					<Bfore
						goto = {this.props.goto.bind(this)}
					/>
					<div className="inform">
						<button type="button" onClick={this.show_inform}>?</button>
					</div>
				</div>
				<div className="navi">
					<img src="/img/title.png" alt="title"/>
					<p>OOO님</p>
				</div>

				<div id="PopupInform" className="fixed-popup hide">
					<h3>숫자 맞추기 게임</h3>
					<ol>
						<li>시작하면 숫자 4개가 차례로 나옵니다.</li>
						<li>숫자의 순서를 잘 기억했다가 정답을 선택하세요.</li>
						<li>정답을 맞추면 점수가 오르고, 점수가 5점이 되면 레벨이 오릅니다.</li>
						<li>레벨이 높을수록 나오는 숫자의 갯수가 많아집니다.</li>
					</ol>
					<button type="button" onClick={this.hide_inform}>닫기</button>
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