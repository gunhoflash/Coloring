import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from "three";
import Nav from './Nav.js';


class Game extends React.Component {

    componentDidMount(){
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.x=30;
        camera.position.y=50;
        var renderer = new THREE.WebGLRenderer({alpha:true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        
        var loader = new THREE.FontLoader();

        loader.load('./helvetiker_regular.typeface.json', function ( font ) {

            var geometry = new THREE.TextGeometry( '8', {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            } );

            
            var meshMaterial = new THREE.MeshBasicMaterial({
                color: 0xdf1234
            });

            var textMesh1 = new THREE.Mesh( geometry, meshMaterial );
            textMesh1.position.z = -100;

            scene.add(textMesh1);
        } );

        var animate = function () {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        };
        animate();  

        document.getElementById("three").appendChild(renderer.domElement);
        document.getElementById('three').onClick="changeNum";
    }
    

    changeNum=()=>{
        alert('change');
    }

    render(){
        return(
            <div className="Game">
                <Nav
					currentPage = {this.props.currentPage}
					goto = {this.props.goto.bind(this)}
                />
                <div id="three"></div>
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