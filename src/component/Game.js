import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from "three";
import Nav from './Nav.js';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			num_size  : 10, // random number 범위: 0 ~ 10
			num       : [],
			color     : [],
			score     : 0,
			level     : 1, // 레벨
			tryNumber : 4  // 레벨에 따라 출력되는 숫자가 많아짐
		}
	}

	componentDidMount() {
		var ans;
		var startGameButton = document.getElementsByClassName('start_button')[0];
		var thisComponent = this;
		startGameButton.addEventListener("click", startGame.bind(thisComponent));
		var resetGameButton = document.getElementsByClassName('reset_button')[0];
		resetGameButton.addEventListener("click", resetGame.bind(thisComponent));

		var explainText = document.getElementsByClassName('instruct_text')[0].children[0].children[1];
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

		var text;

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

		function removeText(time) { // 출력된 text 없애기
			return new Promise(resolve => {
				timeout = setTimeout(function () {
					resolve();
					console.log("remove");
					scene.remove(text);
					resetTimeout();
				}, time);
			})
		}

		function answerWait() { // 기다리면서 배경 잠시 바꾸기
			console.log("wait");
			console.log(document.getElementsByClassName('three')[0].children[0]);
			document.getElementsByClassName('three')[0].children[0].style = "display:flex";
			document.getElementsByClassName('three')[0].children[1].style = "display:none";
			explainText.innerHTML = "아래의 보기 중 하나를 선택해주세요";
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

		// 게임 재실행 (수정 필요!!)
		function resetGame() {
			console.log("reset");
			resetTimeout();
			startGameButton.style = "display:block";
			resetGameButton.style = "display:none";
			document.getElementsByClassName('three')[0].children[0].style = "display:none";
			document.getElementsByClassName('three')[0].children[1].style = "display:none";
			explainText.innerHTML = "&larr; 시작버튼을 눌러주세요"
		}

		// start에서의 숫자 : num, 색상 : color 에 저장
		async function startGame() {
			console.log("start");
			startGameButton.style = "display:none";
			resetGameButton.style = "display:block";
			document.getElementsByClassName('three')[0].children[0].style = "display:none";
			document.getElementsByClassName('three')[0].children[1].style = "display:block";
			explainText.innerHTML = "";

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
		document.getElementsByClassName("answer")[0].addEventListener("click", scoreup.bind(thisComponent))
		for (var i = 0; i < 4; i++) {
			document.getElementsByClassName("wrong")[i].addEventListener("click", scoreup.bind(thisComponent))
		}

		function scoreup(e) {
			if (e.target.className === "answer") {
				this.setState(prevState => ({ score: prevState.score + 1 }));
				alert("+1점");
			}
			resetGame();
			levelup.bind(this)();
		}

		function levelup() {
			if (this.state.score == 5) {
				console.log("level up!");
				this.setState(prevState => ({ level: prevState.level + 1 }));
				this.setState({
					score: 0,
					tryNumber: this.state.level + 3
				});
				console.log(this.state.tryNumber);
			}
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
		var color = this.state.color;
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
						<div>
							<p>다음의 숫자와 색깔을 기억하세요!</p>
							<p>&larr; 시작버튼을 눌러주세요</p>
						</div>
						<p>레벨:{this.state.level}</p>
						<p>점수:{this.state.score}</p>
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
				<script src="build/three.js" type="module"></script>
				<script src="src/loaders/FontLoader.js" type="module"></script>
			</div>
		)
	}
}

Game.propTypes = {
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired
};

export default Game;