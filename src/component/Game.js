import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from "three";
import Nav from './Nav.js'; 


class Game extends React.Component {

    componentDidMount(){
        /*game variable*/
        var num_size=10; // random number 범위
        var num=[]; // 출력할 숫자 변수 ( start에서의 변수만 저장됨 )

        var color_list ={ // 랜덤으로 나올 색상
            red:0xc9382a,
            blue:0x2658bd,
            green:0x1da35c,
            yellow:0xebdd26,
            orange:0xde7e23,
            pupple:0xa322d6,
            pink:0xe374cd
        };
        var color=[]; // 출력할 색상 변수 ( start에서의 변수만 저장됨 )
        
        var level = 4; // 레벨
        var tryNumber=level; // 레벨에 따라 출력되는 숫자가 많아짐

        var startGameButton = document.getElementsByClassName('start_button')[0];
        startGameButton.addEventListener("click", startGame);
        
        var resetGameButton = document.getElementsByClassName('reset_button')[0];
        resetGameButton.addEventListener("click", resetGame);
        
        /*game variable*/

        /*general object of three.js*/
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        scene.add(camera);

        var renderer = new THREE.WebGLRenderer({alpha:true});
        var renderObject =document.getElementsByClassName('three')[0];
        renderer.setSize(renderObject.offsetWidth,renderObject.offsetHeight);
        renderObject.appendChild( renderer.domElement );
        
        camera.position.z=100;

        var text;

        /*general object of three.js*/

        function createText(kind, create_num){ // text 생성
            console.log("text");

            var message;
            var randomColor;
            var size =80;
            var posX =-40;
            var posY =20;
            var posZ =-100;

            if(kind === 'start'){ // 저장된 변수 출력
                message = String(num[create_num]);
                randomColor = color[create_num];
            }else if(kind === 'first'){
                message= "위쪽의"+""+"시작버튼을"+""+"눌러주세요!";   
                randomColor = 0x000000;
                size=25;
                posX=-200;
            }else if(kind==='answer'){ // 랜덤 변수 출력
                message= "아래의"+""+"보기중"+""+"하나를"+""+"선택해주세요!";   
                randomColor = 0xffffff;
                size=23;
                posX=-230;
            }
            
            console.log(message, randomColor);
            var loader = new THREE.FontLoader();

            loader.load( 'fonts/dohyeon.typeface.json', function ( font ) {
                var geometry = new THREE.TextGeometry( message, {
                    font: font,
                    size: size,
                    height: 0,
                    curveSegments: 12
                    } );
                var meshMaterial = new THREE.MeshBasicMaterial({
                    color: randomColor
                });
                text = new THREE.Mesh(geometry, meshMaterial);
                text.position.x=posX;
                text.position.y=posY;
                text.position.z=posZ;
                scene.add(text);
            } );
        }

        function removeText(time){ // 출력된 text 없애기
            return new Promise(resolve=>{
                setTimeout(function(){
                    resolve(20);
                    console.log("remove");
                    scene.remove(text);
                },time)
            })
        }

        function answerWait(){ // 기다리면서 배경 잠시 바꾸기
            console.log("wait");
            var canvas = document.getElementsByClassName('three')[0].children[0];
            canvas.style="background-color:black";
            createText('answer');
        }

        function randColor(obj) { // 랜덤 색상을 리스트에서 뽑아주는 코드
            var keys = Object.keys(obj)
            var selectColor = keys[ keys.length * Math.random() << 0];
            return obj[selectColor];
        };

        function resetGame(){ // 게임 재실행 (수정 필요!!)
            console.log("reset");
            startGameButton.style="display:block";
            resetGameButton.style="display:none";
            removeText(1);
        }

        async function startGame(){ // start에서의 숫자 : num, 색상 : color 에 저장
            console.log("start");
            for(var i=0; i<tryNumber; i++){
                num.push(Math.floor(Math.random()*num_size << 0));
                color.push(randColor(color_list));
            }
            console.log(num,color);

            startGameButton.style="display:none";
            resetGameButton.style="display:block";

            await removeText(0);
            for(var i=0; i<tryNumber; i++){
                createText('start',i);
                await removeText(2000);
            }
            answerWait();
        }

        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        };

        window.onload=function(){
            createText('first');
            animate();
        }
    }

    render(){
        return(
            <div className="Game">
                <Nav
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
                />
                <div className="game_button">
                    <button className="start_button">시작</button>
                    <button className="reset_button">다시하기</button>
                    <div className="instruct_text">다음의 숫자와 색깔을 기억하세요!</div>
                </div>
                <div className="three"></div>
                <div className="example"></div>
            <script src="build/three.js" type="module"></script>
            <script src="src/loaders/FontLoader.js" type="module"></script>
            </div>
        )
    }
}

Game.propTypes = {
	//renderState: PropTypes.number.isRequired,
	//backPage: PropTypes.func.isRequired
	currentPage: PropTypes.string.isRequired,
	goto: PropTypes.func.isRequired
};


export default Game;