import * as THREE from 'https://threejs.org/build/three.module.js';
// import { GUI } from 'https://threejs.org/examples/jsm/libs/dat.gui.module.js';
import { GUI } from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';
import { TrackballControls } from 'https://threejs.org/examples/jsm/controls/TrackballControls.js';
// import { PLYLoader } from 'https://threejs.org/examples/jsm/loaders/PLYLoader.js';
// import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
// import { FirstPersonControls } from 'https://threejs.org/examples/js/controls/FirstPersonControls.js';
import { PointerLockControls } from 'https://threejs.org/examples/jsm/controls/PointerLockControls.js'


let scene, camera, renderer, ambientLight, directionalLight, controls, controller;

var cube, plane;
var left, right, forward, backward, space, shift;

var goal, follow;
var DEGTORAD = 0.01745327;
var temp = new THREE.Vector3;
var dir = new THREE.Vector3;
var a = new THREE.Vector3;
var b = new THREE.Vector3;
var coronaSafetyDistance = .3;


const objects = [];

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let raycaster;
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

window.onload = function() {


  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set( 0, 50, -200);

  renderer = new THREE.WebGLRenderer({ });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  ambientLight = new THREE.AmbientLight();
  scene.add( ambientLight );

  directionalLight = new THREE.DirectionalLight( 0xffffff, 5.0 );
  directionalLight.position.set( 300, 450, -100 );
  scene.add( directionalLight );
  // var directionalLighttHelper1 = new THREE.DirectionalLightHelper(directionalLight, 10);
  // scene.add(directionalLighttHelper1);


  // var pointLight1 = new THREE.PointLight(0xffffff, 1);
  // pointLight1.position.set(550, 400, 100);
  // scene.add(pointLight1);
  // var pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 10);
  // scene.add(pointLightHelper1);

  // var pointLight2 = new THREE.PointLight(0xffffff, 1);
  // pointLight2.position.set(-250, -350, -100);
  // scene.add(pointLight2);
  // var pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 10);
  // scene.add(pointLightHelper2);

  raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
  



  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
  // './resources/bkg/right.png',
  // './resources/bkg/left.png',
  // './resources/bkg/top.png',
  // './resources/bkg/bot.png',
  // './resources/bkg/front.png',
  // './resources/bkg/back.png',
  // './resources/skybox/skybox1/1.png',
  // './resources/skybox/skybox1/3.png',
  // './resources/skybox/skybox1/5.png',
  // './resources/skybox/skybox1/6.png',
  // './resources/skybox/skybox1/2.png',
  // './resources/skybox/skybox1/4.png',
  // './resources/skybox/skybox/1.png',
  // './resources/skybox/skybox/3.png',
  // './resources/skybox/skybox/5.png',
  // './resources/skybox/skybox/6.png',
  // './resources/skybox/skybox/2.png',
  // './resources/skybox/skybox/4.png',
  './resources/bkg/lightblue/right.png',
  './resources/bkg/lightblue/left.png',
  './resources/bkg/lightblue/top.png',
  './resources/bkg/lightblue/bot.png',
  './resources/bkg/lightblue/front.png',
  './resources/bkg/lightblue/back.png',
  ]);
  scene.background = texture;


  plane = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200, 10, 10),
    new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
    }));
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  cube = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshNormalMaterial({
      // color: '0x000000',
    }));
  cube.position.set(0, 30, 0);
  scene.add(cube);

  

  camera.lookAt( scene.position );
  
  // goal = new THREE.Object3D;
  // follow = new THREE.Object3D;
  // follow.position.z = -coronaSafetyDistance;
  // cube.add( follow );
  
  // goal.add( camera );




  // controls = new TrackballControls( camera, renderer.domElement );
  // controls = new FirstPersonControls( camera, renderer.domElement );

  controls = new PointerLockControls( camera, document.body );
  // scene.add( controls.getObject() );


  // renderer = new THREE.WebGLRenderer( { antialias: true } );
  // renderer.setPixelRatio( window.devicePixelRatio );
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // document.body.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize );

  animate();

  };

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function cubeController() {
  // var left = false, right = false, forward = false, backward = false;
  // var cube_move = [left, right, forward, backward];

  window.onkeyup = function(event) {

    // switch(event.keyCode) {
    //   case 87: // w
    //     forward = false;
    //     break;
    //   case 65: // a        
    //     left = false;
    //     break;
    //   case 83: // s
    //     backward = false;
    //     break;
    //   case 68: // d        
    //     right = false;
    //     break;
    //   case 32: // SPACE
    //     space = false;
    //     break;
    //   case 16: // SHIFT
    //     shift = false;
    //     break;
    // }

    switch(event.keyCode) {
      case 87: // w
        moveForward = false;
        break;
      case 65: // a        
        moveLeft = false;
        break;
      case 83: // s
        moveBackward = false;
        break;
      case 68: // d        
        moveRight = false;
        break;
      case 32: // SPACE
        // space = true;
        // canJump = false;
        break;
      case 16: // SHIFT
        shift = true;
        controls.lock();
        break;
    }

  };
  window.onkeydown = function(event) {    

    // switch(event.keyCode) {
    //   case 87: // w
    //     cube.translateZ(5);
    //     break;
    //   case 65: // a        
    //     cube.translateZ(5);
    //     cube.rotateY(0.1);
    //     break;
    //   case 83: // s
    //     cube.translateZ(-5);
    //     break;
    //   case 68: // d        
    //     cube.translateZ(5);
    //     cube.rotateY(-0.1);
    //     break;
    // }

    // switch(event.keyCode) {
    //   case 87: // w
    //     cube_move[2] = false;
    //     break;
    //   case 65: // a        
    //     cube_move[0] = false;
    //     break;
    //   case 83: // s
    //     cube_move[3] = false;
    //     break;
    //   case 68: // d        
    //     cube_move[1] = false;
    //     break;
    // }

    // switch(event.keyCode) {
    //   case 87: // w
    //     forward = true;
    //     break;
    //   case 65: // a        
    //     left = true;
    //     break;
    //   case 83: // s
    //     backward = true;
    //     break;
    //   case 68: // d        
    //     right = true;
    //     break;
    //   case 32: // SPACE
    //     space = true;
    //     break;
    //   case 16: // SHIFT
    //     shift = true;
    //     break;
    // }

    switch(event.keyCode) {
      case 87: // w
        moveForward = true;
        break;
      case 65: // a        
        moveLeft = true;
        break;
      case 83: // s
        moveBackward = true;
        break;
      case 68: // d        
        moveRight = true;
        break;
      case 32: // SPACE
        // space = true;
        // canJump = true;
        if ( canJump === true ) velocity.y += 350;
        // canJump = false;
        break;
      case 16: // SHIFT
        shift = true;
        controls.lock();
        break;
    }

  };

  // if (left) cube.rotateY(0.05);
  // if (right) cube.rotateY(-0.05);
  // // if (forward) cube.translateZ(2);
  // // if (backward) cube.translateZ(-2);
  // if (forward) cube.rotateX(0.05);
  // if (backward) cube.rotateX(-0.05);
  // if (space) cube.translateZ(2);
  // if (shift && space) cube.translateZ(5);

  if (moveLeft) cube.translateX(.7);
  if (moveRight) cube.translateX(-.7);
  if (moveForward) cube.translateZ(.7);
  if (moveBackward) cube.translateZ(-.7);
}


function animate() {
  requestAnimationFrame( animate );

  cubeController();

  // controls.update();

  //
  // a.lerp(cube.position, 0.4);
  // b.copy(goal.position);
  
  // dir.copy( a ).sub( b ).normalize();
  // const dis = a.distanceTo( b ) - coronaSafetyDistance;
  // goal.position.addScaledVector( dir, dis );
  // goal.position.lerp(temp, 0.02);
  // temp.setFromMatrixPosition(follow.matrixWorld);
  
  // camera.lookAt( cube.position );




  


  // test first person camera
  const time = performance.now();
  if ( controls.isLocked === true ) {

    raycaster.ray.origin.copy( controls.getObject().position );
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects( objects, false );

    const onObject = intersections.length > 0;

    const delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    // if ( onObject === true ) {

    //   velocity.y = Math.max( 0, velocity.y );
    //   canJump = true;

    // }

    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );

    // controls.getObject().position.y += ( velocity.y * delta ); // new behavior

    // if ( controls.getObject().position.y < 10 ) {
    //   velocity.y = 0;
    //   controls.getObject().position.y = 10;

    //   canJump = true;

    // }

  }

  prevTime = time;


  renderer.render( scene, camera );


};


