import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from "three";
import Nav from './Nav.js';
import $ from 'jquery';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			num_size  : 10, // random number 범위: 0 ~ 10
			num       : [],
			color     : [],
			level     : this.props.user_info.level,    // 레벨
			score     : this.props.user_info.score,    // 점수
			tryNumber : this.props.user_info.level + 3 // 레벨에 따라 출력되는 숫자가 많아짐
		}
		this.request_add_score = this.request_add_score.bind(this);
	}

	request_add_score = (score) => {
		$.post(this.props.server_url + '/addScore', {
			hashed       : this.props.user_info.hashed,
			level_before : this.state.level, // for temp user
			score        : score,
			score_before : this.state.score  // for temp user
		}, function (response) {
			if (response.result == 1) {
				console.log(response);
				// level up
				if (parseInt(response.level_up) > 0) {
					this.show_popup('#popup_levelup', 2000);
				}
				// set state: level, score, tryNumber
				this.setState({
					level: response.level,
					score: response.score,
					tryNumber : response.level + 3
				});
			} else {
				alert(response.message);
			}
		}.bind(this));
	}

	show_popup(id, time) {
		if ($(id).length == 0) return;
		$(id).addClass('show').removeClass('hide');
		setTimeout(function () {
			if ($(id).length == 0) return;
			$(id).addClass('hide').removeClass('show');
		}, time);
	}

	componentDidMount() {
		var ans;
		var startGameButton = document.getElementsByClassName('start_button')[0];
		startGameButton.addEventListener("click", startGame.bind(this));
		var resetGameButton = document.getElementsByClassName('reset_button')[0];
		resetGameButton.addEventListener("click", resetGame.bind(this));

		var explainText = document.getElementsByClassName('instruct_text')[0].children[1];
		/*game variable*/

		/*general object of three.js*/
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		scene.add(camera);
		var renderer = new THREE.WebGLRenderer({ alpha: true });
		var renderObject = document.getElementsByClassName('three')[0];
		renderer.setSize(renderObject.offsetWidth, renderObject.offsetHeight);
		renderObject.appendChild(renderer.domElement);
		camera.position.z = 100;

		var text = null;
		var timeout = null;
		var font;
		var loader = new THREE.FontLoader();
		loader.load('fonts/dohyeon.typeface.json', function(_font) { font = _font; });

		requestAnimationFrame(animate);
		renderer.render(scene, camera);

		/*general object of three.js*/
		function createText(num, color) { // text 생성
			console.log("text");

			var message = String(num);
			var randomColor = color;
			var size = 80;
			var posX = -40;
			var posY = 20;
			var posZ = -100;

			console.log(message, randomColor);
			
			var geometry = new THREE.TextGeometry(message, {
				font: font,
				size: size,
				height: 0,
				curveSegments: 12
			});
			var meshMaterial = new THREE.MeshBasicMaterial({
				color: randomColor
			});

			resetText();
			text = new THREE.Mesh(geometry, meshMaterial);
			text.position.x = posX;
			text.position.y = posY;
			text.position.z = posZ;
			scene.add(text);
		}

		function resetTimeout() {
			if (timeout == null) return;
			clearTimeout(timeout);
			timeout = null;
		}

		function resetText() {
			if (text == null) return;
			scene.remove(text);
			text = null;
		}

		function removeText(time) { // 출력된 text 없애기
			return new Promise(resolve => {
				timeout = setTimeout(function () {
					console.log("remove");
					resetText();
					resetTimeout();
					resolve();
				}, time);
			})
		}

		function answerWait() { // 기다리면서 배경 잠시 바꾸기
			console.log("wait");
			console.log(document.getElementsByClassName('three')[0].children[0]);
			document.getElementsByClassName('three')[0].children[0].style = "display:flex";
			document.getElementsByClassName('three')[0].children[1].style = "display:none";
			explainText.children[0].style = "display:none";
			explainText.children[1].innerHTML = "아래의 보기 중 하나를 선택해주세요";
		}

		// 랜덤 색상을 리스트에서 뽑아주는 코드
		function randColor() {
			// 랜덤으로 나올 색상
			var color_list = {
				red    : 0xc9382a,
				blue   : 0x2658bd,
				green  : 0x1da35c,
				yellow : 0xebdd26,
				orange : 0xde7e23,
				pupple : 0xa322d6,
				pink   : 0xe374cd
			};
			var keys = Object.keys(color_list);
			var selectColor = keys[keys.length * Math.random() << 0];
			return color_list[selectColor];
		};

		// 게임 재실행
		function resetGame() {
			console.log("reset");
			resetTimeout();
			startGameButton.style = "display:block";
			resetGameButton.style = "display:none";
			document.getElementsByClassName('three')[0].children[0].style = "display:none";
			document.getElementsByClassName('three')[0].children[1].style = "display:none";
			explainText.children[0].style = "display:block";
			explainText.children[1].innerHTML = "시작버튼을 눌러주세요"
		}

		// start에서의 숫자 : num, 색상 : color 에 저장
		async function startGame() {
			console.log("start");
			startGameButton.style = "display:none";
			resetGameButton.style = "display:block";
			document.getElementsByClassName('three')[0].children[0].style = "display:none";
			document.getElementsByClassName('three')[0].children[1].style = "display:block";
			explainText.children[0].style = "display:none";
			explainText.children[1].innerHTML = "";

			var num   = []; // 출력할 숫자 변수
			var color = []; // 출력할 색상 변수

			// 정답 넣기
			for (var i = 0; i < this.state.tryNumber; i++) {
				num.push(Math.floor(Math.random() * this.state.num_size << 0));
				color.push(randColor());
			}
			console.log(num, color);

			await removeText(0);
			for (var i = 0; i < this.state.tryNumber; i++) {
				createText(num[i], color[i]);
				await removeText(1000);
			}
			answerWait();
			this.setState({
				num: num,
				color: color
			});

			// 정답 리스트들 순서섞기
			ans = document.getElementsByClassName("answer")[0];
			ans.style = "order:" + String(Math.random() * 5 << 0);
			for (var i = 0; i < 4; i++) {
				document.getElementsByClassName("wrong")[i].style = "order:" + String(Math.random() * 5 << 0);
			}
		}

		// 정답 리스트들에 핸들러 엮기
		document.getElementsByClassName("answer")[0].addEventListener("click", submit.bind(this))
		for (var i = 0; i < 4; i++) {
			document.getElementsByClassName("wrong")[i].addEventListener("click", submit.bind(this))
		}

		function submit(e) {
			if (e.target.className === "answer") {
				this.show_popup('#popup_score', 1000);
				this.request_add_score(1);
			}
			resetGame();
		}

		function animate() {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};

		window.onload = function () {
			animate();
		}
	}

	render() {

		var num = this.state.num;
		var tryNumber = this.state.tryNumber;
		var answerString = "";
		var wrongString = ["", "", "", ""];
		var answer;
		var wrongAnswer = ["", "", "", ""];

		// 정답 문자열 생성
		for (var i = 0; i < tryNumber - 1; i++) {
			answerString += String(num[i]) + ",";
		}
		answerString += String(num[tryNumber - 1]);

		// 오답 문자열 생성 => 한 숫자씩만 다르게
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < tryNumber; j++) {
				var tmp = num[j];
				if (j == i) {
					while (tmp == num[j]) {
						tmp = Math.random() * this.state.num_size << 0;
					}
					wrongString[i] += String(tmp) + ",";
				} else {
					wrongString[i] += String(num[j]) + ",";
				}
			}
			wrongString[i] = wrongString[i].substring(0, tryNumber * 2 - 1);
		}

		// button 객체 만들기
		answer = (<button className="answer">{answerString}</button>);

		for (var i = 0; i < 4; i++) {
			wrongAnswer[i] = (<button className={"wrong wrong" + i}>{wrongString[i]}</button>);
		}

		return (
			<div className="Game">
				<Nav
					currentPage={this.props.currentPage}
					goto={this.props.goto.bind(this)}
				/>
				<div className="game_button">
					<button className="start_button">시작</button>
					<button className="reset_button">다시하기</button>
					<div className="instruct_text">
						<p>다음의 숫자를 기억하세요!</p>
						<div><p className="allow">&larr;</p><p>시작버튼을 눌러주세요</p></div>
						<div className="scoreLevel">
							<p>{"레벨:"+this.state.level}</p>
							<p>{"점수:"+this.state.score}</p>
						</div>
					</div>
				</div>
				<div className="three">
					<div className="example">
						{answer}
						{wrongAnswer[0]}
						{wrongAnswer[1]}
						{wrongAnswer[2]}
						{wrongAnswer[3]}
					</div>
				</div>
				<span id="popup_score" className="fixed-popup hide">+1점</span>
				<span id="popup_levelup" className="fixed-popup hide">레벨 업!</span>
				<script src="build/three.js" type="module"></script>
				<script src="src/loaders/FontLoader.js" type="module"></script>
			</div>
		)
	}
}

Game.propTypes = {
	react_url: PropTypes.string.isRequired,
	server_url: PropTypes.string.isRequired,
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired,
	user_info: PropTypes.object.isRequired,
	user_type: PropTypes.string.isRequired
};

export default Game;