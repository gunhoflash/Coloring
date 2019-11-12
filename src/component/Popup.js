import React from 'react';
import PropTypes from 'prop-types';
import Home from './Home.js';
import After from './After.js';

class Popup extends React.Component {
	constructor() {
		super();
		this.state = {
			popUpCount: 0
		};
	}

	nextPopUp = () => {
		this.setState(prevState => ({ popUpCount: prevState.popUpCount + 1 }));
	}

	exitPopUp = () => {
		this.setState({ popUpCount: 4 });
	}

	rePopUp = () => {
		this.setState({ popUpCount: 0 });
	}

	render() {
		let popUpCount = this.state.popUpCount;
		let popUpRender;

		switch (popUpCount) {
			case 0:
				popUpRender = (
					<div className="popup_box box_one">
						<div className="pop_up_space row">
							<div className="col-4"><img src="/img/ball.png" alt="ball" className="emoball"/></div>
							<div className="pop_des col-12"><p>설명해드릴까요?</p></div>
							<div className="pop_btn col-12">
								<button type="button" onClick={this.nextPopUp}>네</button>
								<button type="button" onClick={this.exitPopUp}>아니오</button>
							</div>
						</div>
					</div>
				);
				break;

			case 1:
				popUpRender = (
					<div className="popup_box box_two" onClick={this.nextPopUp}>
						<div className="pop_up_space row">
							<div className="pop_img col-xs-12 col-sm-6">
								<img src="/img/popup_ball.png"></img>
							</div>
							<div className="pop_des col-xs-12 col-sm-6 row">
								<p className="main_p col-12"><strong>뒤로가기</strong><br/>버튼이에요!</p>
								<p className="sub_p col-12">누르면 이전 화면으로<br/>이동해요</p>
							</div>
						</div>
					</div>
				);
				break;

			case 2:
				popUpRender = (
					<div className="popup_box box_three" onClick={this.nextPopUp}>
						<div className="pop_up_space row">
							<div className="pop_des col-xs-12 col-sm-6 col-lg-9 row">
								<p className="main_p">여기를 <strong>클릭</strong>하면<br/> 다음 게임을<br/>볼 수 있어요</p>
							</div>
							<div className="pop_img col-xs-12 col-sm-6 col-lg-3">
								<img src="/img/popup_ball2.png"></img>
							</div>
						</div>
					</div>
				);
				break;
			case 3:
				popUpRender = (
					<div className="popup_box box_five">
						<div className="pop_up_space row">
							<div className="pop_img col-xs-12 col-sm-6">
								<img src="/img/ball5.png"></img>
							</div>
							<div className="pop_des col-xs-12 col-sm-6">
								<p>설명을<br/>끝낼까요?</p>
							</div>
							<div className="pop_btn col-xs-12 col-sm">
								<After
									value = "네"
									next = 'Home'
									goto = {this.props.goto.bind(this)}
								/>
								<div>
									<button type="button" onClick={this.rePopUp}>다시<br/>보기</button>
								</div>
							</div>
						</div>
					</div>
				);
				break;

			default:
				// TODO: handle default
				break;
		}

		return (
			<div className="popUp">
				<Home
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
				/>;
				{popUpRender}
			</div>
		);
	}
}

Popup.propTypes = {
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
};

export default Popup;