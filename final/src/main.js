// import * as THREE from 'https://threejs.org/build/three.module.js';
// import {GLTFLoader} from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
// import {TWEEN} from 'https://threejs.org/examples/jsm/libs/tween.module.min.js';
// import * as THREE from '../three.js/build/three.module.js';
// import {GLTFLoader} from '../three.js/examples/jsm/loaders/GLTFLoader.js';
// import {TWEEN} from '../three.js/examples/jsm/libs/tween.module.min.js';
import * as THREE from '../three.js/build/three.module.js';
import {GLTFLoader} from '../three.js/examples/jsm/loaders/GLTFLoader.js';
import {TWEEN} from '../three.js/examples/jsm/libs/tween.module.min.js';

import {controller} from './controller.js';


let _APP = null;
let mixer, mixer2, mixer3, mixer4, clock, cubes = [];
var player_spacecraft, earth_model, planet1_model;
var bbox_earth, bbox_planet1;
var lazes = [];
var gameover_check = false;
var explosion1, explosion2;

class Game_Graphics {
    Initialize() {

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2', {alpha: false});

      this._threejs = new THREE.WebGLRenderer({
        canvas: canvas,
        context: context,
        antialias: true,
      });
      this._threejs.setPixelRatio(window.devicePixelRatio);
      this._threejs.setSize(window.innerWidth, window.innerHeight);

      const target = document.getElementById('target');
      target.appendChild(this._threejs.domElement);

      window.addEventListener('resize', () => {
        this._ResizeWindow();
      }, false);

      const fov = 60;
      const aspect = 1920 / 1080;
      const near = 1;
      const far = 100000.0;
      this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this._camera.position.set(75, 20, 0);

      this._scene = new THREE.Scene();
      this._scene.background = new THREE.Color(0xaaaaaa);

      this._CreateLights();

      return true;
    }

    _ResizeWindow() {
      this._camera.aspect = window.innerWidth / window.innerHeight;
      this._camera.updateProjectionMatrix();
      this._threejs.setSize(window.innerWidth, window.innerHeight);
    }

    _CreateLights() {
      var light1 = new THREE.DirectionalLight(0xFFFFFF, 1, 100);
      light1.position.set(-100, 100, -100);
      light1.target.position.set(0, 0, 0);
      this._scene.add(light1);

      var light2 = new THREE.DirectionalLight(0x404040, 1, 100);
      light2.position.set(100, 100, -100);
      light2.target.position.set(0, 0, 0);
      this._scene.add(light2);

      var light3 = new THREE.DirectionalLight(0x404040, 1, 100);
      light3.position.set(100, 100, -100);
      light3.target.position.set(0, 0, 0);
      this._scene.add(light3);

      var light4 = new THREE.DirectionalLight(0x101040, 1, 100);
      light4.position.set(100, -100, 100);
      light4.target.position.set(0, 0, 0);
      this._scene.add(light4);
    }  

    get Scene() {
      return this._scene;
    }

    get Camera() {
      return this._camera;
    }


    Collisions(bbox_spacecraft) {
      var centerBox = new THREE.Vector3();

      explosion1.position.copy(bbox_spacecraft.getCenter(centerBox));
      explosion1.position.y -= 2000;
      // explosion1.position.z -= 400;
      player_spacecraft.player._game._graphics.Scene.add(explosion1);

      explosion2.position.copy(bbox_spacecraft.getCenter(centerBox));
      explosion2.position.y -= 600;
      // explosion2.position.z -= 400;
      player_spacecraft.player._game._graphics.Scene.add(explosion2);
      

      player_spacecraft.player._game._graphics.Scene.remove(
        player_spacecraft['player']._model);
      
      gameover_check = true;
    }

    // all animation will be render here
    Render() {
      this._threejs.render(this._scene, this._camera);
      if ( mixer ) mixer.update( .003 );
      if ( mixer2 ) mixer2.update( .03 );
      if ( mixer3 ) mixer3.update( .02 );
      // if ( mixer4 ) mixer4.update( .03 );
      if (cubes != null) {
        for (var c in cubes) {
          // cubes[c].position.x += 100; // globle variable
          // cubes[c].rotation.x += .1;
          cubes[c].translateZ(20);     // local variable

          // // cubes[c].rotation.x += .1;

          // if ( (cubes[c].position.x < -30000 || cubes[c].position.x > 30000) ||
          //      (cubes[c].position.y < -30000 || cubes[c].position.y > 30000) ||
          //      (cubes[c].position.z < -30000 || cubes[c].position.z > 30000) ) {

          //    // console.log(222)
          //   cubes[c].rotation.x = Math.random()*Math.PI*2;
          //   // cubes[c].rotation.x = Math.PI;
          //   // cubes[c].rotation.y += .1;
          //   // cubes[c].rotation.x += .3;
          // }

          if ( (cubes[c].position.x < -32000 || cubes[c].position.x > 32000) ||
               (cubes[c].position.y < -32000 || cubes[c].position.y > 32000) ||
               (cubes[c].position.z < -32000 || cubes[c].position.z > 32000) )
          {
            cubes[c].rotation.x -= .1;
          }

          // var space_demension = 10000;
          // if (bullet1.position.x > space_demension || bullet1.position.x < -space_demension || 
          //     bullet1.position.y > space_demension || bullet1.position.y < -space_demension || 
          //     bullet1.position.z > space_demension || bullet1.position.z < -space_demension ) {
          //     // console.log(123)
          //     lazes.splice(bullet1, 1);
          //     player_spacecraft.player._game._graphics.Scene.remove(bullet1); 
          // }

          // if (bullet2.position.x > space_demension || bullet2.position.x < -space_demension || 
          //     bullet2.position.y > space_demension || bullet2.position.y < -space_demension || 
          //     bullet2.position.z > space_demension || bullet2.position.z < -space_demension ) {
          //     lazes.splice(bullet2, 1);
          //     // console.log(321)
          //     player_spacecraft.player._game._graphics.Scene.remove(bullet2); 
          // }


         if (player_spacecraft != null){ 
            // console.log(player_spacecraft['player']._model)
            var bbox_spacecraft = new THREE.Box3().setFromObject(player_spacecraft['player']._model.children[0]);
            var bbox_cube = new THREE.Box3().setFromObject(cubes[c]);


            // COLLISION
            // with cubes
            if ( bbox_spacecraft.intersectsBox(bbox_cube) && !gameover_check) {

                console.log("GAME OVER!!!");  
                this.Collisions(bbox_spacecraft);  
                player_spacecraft.player._game._graphics.Scene.remove(cubes[c]); 
            } 

             // with earth
             if (bbox_earth != null) {
               if ( bbox_spacecraft.intersectsBox(bbox_earth) && !gameover_check) {

                  console.log("GAME OVER!!!");
                  this.Collisions(bbox_spacecraft);
                  player_spacecraft.player._game._graphics.Scene.remove(earth_model);
               } 
             }

             // with planet1
             if (bbox_planet1 != null) {
               if ( bbox_spacecraft.intersectsBox(bbox_planet1) && !gameover_check) {

                  console.log("GAME OVER!!!");
                  this.Collisions(bbox_spacecraft);
                  player_spacecraft.player._game._graphics.Scene.remove(planet1_model);
               } 
             }

             if (lazes != null){
              for (var laze in lazes) {
                var bbox_laze = new THREE.Box3().setFromObject(lazes[laze]);

                if ( bbox_laze.intersectsBox(bbox_cube)) {

                console.log("BUM!!!");   
                player_spacecraft.player._game._graphics.Scene.remove(cubes[c]); 
                player_spacecraft.player._game._graphics.Scene.remove(lazes[laze]); 
            }
              } 
            }
         }
        }

        
      }

      // console.log(Game_Player._entities.player._offsets)

    }
  }

class Game_Player {
  constructor(params) {
    this._model = params.model;
    this._params = params;
    this._game = params.game;
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._direction = new THREE.Vector3(0, 0, -1);
    this._health = 100.0;

    const x = 2.5;
    const y1 = 2;
    const y2 = 0.4;
    const z = 2.7;
    this._offsets = [
        new THREE.Vector3(-x, y1, -z),
        new THREE.Vector3(x, y1, -z),
        new THREE.Vector3(-x, y2, -z),
        new THREE.Vector3(x, y2, -z),
    ];

    this._offsetIndex = 0;
  }

  get Velocity() {
    return this._velocity;
  }

  get Direction() {
    return this._direction;
  }

  get Position() {
    return this._model.position;
  }

  get Health() {
    return this._health;
  }

  get Dead() {
    return (this._health <= 0.0);
  }

  TakeDamage(damage) {
    this._health -= damage;
  }

  Fire() {
    let loader = new GLTFLoader();
    loader.setPath('./resources/lazer_bullet/');
    loader.load('scene.gltf', (gltf) => {
      const model = gltf.scene;
      // model.rotation.z = -Math.PI/2;
      // model.rotation.x = Math.PI/2;
      model.scale.setScalar(.05);
      var pos_x = this.Position.x;
      var pos_y = this.Position.y;
      var pos_z = this.Position.z;

      model.position.set(pos_x, pos_y, pos_z - 11);


      // var geometry = new THREE.BoxGeometry( 2000, 2000, 2000 );
      // var material = new THREE.MeshNormalMaterial();

      // var mesh = new THREE.Mesh( geometry, material );
      // this._game._graphics.Scene.add( mesh );
      
      // var targetPosition1 = new THREE.Vector3( 20000, 0, 0 );
      // var targetPosition2 = new THREE.Vector3( 20000, 20000, 0 );
      // var targetPosition3 = new THREE.Vector3( 0, 20000, 0 );
      
      // var tween1 = new TWEEN.Tween( mesh.position ).to( targetPosition1, 100 ); 
      // var tween2 = new TWEEN.Tween( mesh.position ).to( targetPosition2, 100 ); 
      // var tween3 = new TWEEN.Tween( mesh.position ).to( targetPosition3, 100 );
      
      // tween1.chain( tween2 );
      // tween2.chain( tween3 );
      

      // var pos_x = this.Position.x;
      // var pos_y = this.Position.y;
      // var pos_z = this.Position.z;
      // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      // var geometry = new THREE.BoxGeometry( 0.6, 0.6, 0.6 );
      var geometry = new THREE.TetrahedronGeometry( .6 );
      // var material = new THREE.MeshNormalMaterial();
      // var material = new THREE.MeshStandardMaterial( {color: 0xff0000} );
      var material = new THREE.MeshLambertMaterial( {color: 0xff0000} );
      

      var bullet1 = new THREE.Mesh( geometry, material );
      // this._model.add(bullet1);
      // bullet1.position.set( -1, 0, 0);
      var position = new THREE.Vector3();
      this._model.children[1].getWorldPosition(position);
      bullet1.position.copy(position);
      this._game._graphics.Scene.add(bullet1);
      // bullet1.position.copy(this._model.children[1].position);


      var distance = 1000000000000000000;
      // var targetPosition = new THREE.Vector3( this._direction.x*distance,this._direction.y*distance,this._direction.z*distance );
      var targetPosition = new THREE.Vector3( this._direction.x*distance,this._direction.y*distance,this._direction.z*distance );
      var tween1 = new TWEEN.Tween( bullet1.position ).to( targetPosition, distance );
      tween1.start();

      var bullet2 = new THREE.Mesh( geometry, material );
      // this._model.add(bullet2)
      // bullet2.position.set( 1, 0, 0);
      // bullet2.position.copy(this._model.children[2].position);
      var position = new THREE.Vector3();
      this._model.children[2].getWorldPosition(position);
      bullet2.position.copy(position);
      this._game._graphics.Scene.add(bullet2);


      var targetPosition = new THREE.Vector3( this._direction.x*distance,this._direction.y*distance,this._direction.z*distance );
      var tween2 = new TWEEN.Tween( bullet2.position ).to( targetPosition, distance );
      tween2.start();


      lazes.push(bullet1);
      lazes.push(bullet2);

      // var space_demension = 10000;
      // if (bullet1.position.x > space_demension || bullet1.position.x < -space_demension || 
      //     bullet1.position.y > space_demension || bullet1.position.y < -space_demension || 
      //     bullet1.position.z > space_demension || bullet1.position.z < -space_demension ) {
      //     // console.log(123)
      //     lazes.splice(bullet1, 1);
      //     player_spacecraft.player._game._graphics.Scene.remove(bullet1); 
      // }

      // if (bullet2.position.x > space_demension || bullet2.position.x < -space_demension || 
      //     bullet2.position.y > space_demension || bullet2.position.y < -space_demension || 
      //     bullet2.position.z > space_demension || bullet2.position.z < -space_demension ) {
      //     lazes.splice(bullet2, 1);
      //     // console.log(321)
      //     player_spacecraft.player._game._graphics.Scene.remove(bullet2); 
      // }

      // console.log(this.Direction)
      // console.log(this._direction)
      // console.log(mesh1.position)


      // var position = new THREE.Vector3();
      // console.log(this._model.children[1].getWorldPosition(position))
      // var position1 = new THREE.Vector3();
      // console.log(this._model.children[1].localToWorld(position))


      // this._game._graphics.Scene.add(model);
    });

    
  }

  

  Update() {
    if (this.Dead) {
      console.log("DEAD---->GAMEOVER!!!")

      return;
    }
    this._direction.copy(this._velocity);
    this._direction.normalize();
    this._direction.applyQuaternion(this._model.quaternion);
  }
}




class Game_Demo {

  constructor() {
    this._graphics = new Game_Graphics(this);
    this._graphics.Initialize();

    this._previousRAF = null;
    this._minFrameTime = 1.0 / 10.0;
    this._entities = {};

    this._OnInitialize();
    this._Animation();
  }

  _DisplayError(errorText) {
    const error = document.getElementById('error');
    error.innerText = errorText;
  }

  _Animation() {
    requestAnimationFrame(() => {
      for (let k in this._entities) {
        this._entities[k].Update();
      }
      this._graphics.Render();
      this._Animation();
      TWEEN.update();
    });
  }

  _OnInitialize() {

    this._graphics.Scene.background = new THREE.Color(0xFFFFFF);
    const bg_loader = new THREE.CubeTextureLoader();
    const bg_texture = bg_loader.load([
    './resources/bkg/lightblue/right.png',
    './resources/bkg/lightblue/left.png',
    './resources/bkg/lightblue/top.png',
    './resources/bkg/lightblue/bot.png',
    './resources/bkg/lightblue/front.png',
    './resources/bkg/lightblue/back.png',
    ]);
    this._graphics._scene.background = bg_texture;

    clock = new THREE.Clock();

    this._userCamera = new THREE.Object3D();
    this._userCamera.position.set(4100, 0, 0);

    this._graphics.Camera.position.set(10000, 1000, -2000);


    this._score = 0;

    

    // let loader = new GLTFLoader();
    // loader.setPath('./resources/models/x-wing1/');
    // loader.load('scene.gltf', (gltf) => {
    //   const model = gltf.scene.children[0];
    //   // model.rotation.z = -Math.PI/2;
    //   model.rotation.x = Math.PI/2;
    //   model.scale.setScalar(0.07);


    //   const group = new THREE.Group();
    //   group.add(model);

    //   mixer = new THREE.AnimationMixer( gltf.scene );
        
    //   gltf.animations.forEach( ( clip ) => {
        
    //       mixer.clipAction( clip ).play();
        
    //   } );


    //   this._graphics.Scene.add(group);

    //   this._entities['player'] = new Game_Player(
    //       {model: group, camera: this._graphics.Camera, game: this,});



    //   // player_spacecraft controller
      // player_spacecraft = this._entities
    //   // console.log(player_spacecraft)



    //   this._entities['_controls'] = new controls.ShipControls({
    //     target: this._entities['player'],
    //     camera: this._graphics.Camera,
    //     scene: this._graphics.Scene,
    //     domElement: this._graphics._threejs.domElement,
    //     mixer: mixer
    //   });
    // });


    let loader = new GLTFLoader();
    loader.setPath('./resources/models/space_ship/');
    loader.load('scene.gltf', (gltf) => {
      const model = gltf.scene.children[0];
      model.rotation.z = -Math.PI/2;
      // model.rotation.x = Math.PI/2;
      // model.scale.setScalar(0.07);

      const group = new THREE.Group();
      group.add(model);

      const geometry = new THREE.BufferGeometry();
      const material = new THREE.PointsMaterial();

      const weapon1 = new THREE.Points( geometry, material );
      weapon1.position.set( -1.5, 0, 0 );
      group.add(weapon1);

      const weapon2 = new THREE.Points( geometry, material );
      weapon2.position.set( 1.5, 0, 0 );
      group.add(weapon2);


      // player_spacecraft = group;

      

      mixer = new THREE.AnimationMixer( gltf.scene );
        
      gltf.animations.forEach( ( clip ) => {
        
          mixer.clipAction( clip ).play();
        
      } );




      this._graphics.Scene.add(group);

      this._entities['player'] = new Game_Player(
          {model: group, camera: this._graphics.Camera, game: this,});



      // player_spacecraft controller
      player_spacecraft = this._entities
      // console.log(player_spacecraft)



      this._entities['_controls'] = new controller.ShipController({
        target: this._entities['player'],
        camera: this._graphics.Camera,
        scene: this._graphics.Scene,
        domElement: this._graphics._threejs.domElement,
        mixer: mixer
      });

      // player_spacecraft = this._entities;
    });


    // // gridHelper
    // const size = 1000000;
    // const divisions = 500;

    // const gridHelper = new THREE.GridHelper( size, divisions );
    // this._graphics.Scene.add( gridHelper );



    // cubes
    for (var i = 0; i < 60; i++) {
      var cube = new THREE.Mesh(
        new THREE.BoxGeometry(500, 500, 500),
        new THREE.MeshNormalMaterial({
          // color: '0x000000',
          side: THREE.DoubleSide,
        }));
      cube.rotation.x = -Math.PI / 2;
      var a = Math.random()*60000 - 30000;
      var b = Math.random()*60000 - 30000;
      var c = Math.random()*60000 - 30000;
      cube.position.set(a,b,c);
      cube.rotation.x = Math.random()*Math.PI*2;
      cube.rotation.y = Math.random()*Math.PI*2;
      cube.rotation.z = Math.random()*Math.PI*2;
      cubes.push(cube);
      this._graphics.Scene.add(cube);
    }


    


    // Planet1
    loader.setPath('./resources/models/planet1/');
    loader.load('scene.gltf', (gltf) => {
      const model = gltf.scene;
      // model.rotation.z = -Math.PI/2;
      // model.rotation.x = Math.PI/2;
      model.scale.setScalar(10);
      model.position.set(-20000,-2000,-5000)


      // planet1_model = gltf;
      // bbox_planet1 = new THREE.Box3().setFromObject(model);
      var cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(9500, 9500, 9500),
        new THREE.MeshNormalMaterial({
          // color: '0x000000',
          side: THREE.DoubleSide,
        }));
      cube1.position.set(-20000,-2000,-5000);
      // cubes.push(cube);
      // this._graphics.Scene.add(cube1);
      bbox_planet1 = new THREE.Box3().setFromObject(cube1);


      // const group = new THREE.Group();
      // group.add(model);

      mixer = new THREE.AnimationMixer( gltf.scene );
        
      gltf.animations.forEach( ( clip ) => {
        
          mixer.clipAction( clip ).play();
        
      } );


      this._graphics.Scene.add(model);
    });


    // Earth
    loader.setPath('./resources/models/earth2/');
    loader.load('scene.gltf', (gltf) => {
      const model = gltf.scene;
      // model.rotation.z = -Math.PI/2;
      // model.rotation.x = Math.PI/2;
      model.scale.setScalar(100);
      model.position.set(7000,-5000,20000)

      earth_model = model;

      bbox_earth = new THREE.Box3().setFromObject(model);

      // const group = new THREE.Group();
      // group.add(model);

      mixer2 = new THREE.AnimationMixer( gltf.scene );
        
      gltf.animations.forEach( ( clip ) => {
        
          mixer2.clipAction( clip ).play();
        
      } );


      this._graphics.Scene.add(model);
    });
    

    // explosion1
    loader.setPath('./resources/explosion/1/');
    loader.load('scene.gltf', (gltf) => {
      const model = gltf.scene;
      // model.rotation.z = -Math.PI/2;
      // model.rotation.x = Math.PI/2;
      model.scale.setScalar(20);
      // if (player_spacecraft != null)
      // model.position.copy(player_spacecraft['player']._model.children[0].position)
      model.position.set(0, -2000, 0);

      
      // const group = new THREE.Group();
      // group.add(model);

      mixer3 = new THREE.AnimationMixer( gltf.scene );
        
      gltf.animations.forEach( ( clip ) => {
        
          mixer3.clipAction( clip ).play();
        
      } );

      explosion1 = model;


      // player_spacecraft.player._game._graphics.Scene.add(model);
    });

    // explosion2
    loader.setPath('./resources/explosion/2/');
    loader.load('scene.gltf', (gltf) => {
      const model = gltf.scene;
      // model.rotation.z = -Math.PI/2;
      // model.rotation.x = Math.PI/2;
      model.scale.setScalar(150);
      // if (player_spacecraft != null)
      // model.position.copy(player_spacecraft['player']._model.children[0].position)
      model.position.set(0, -600, 0);

      
      // const group = new THREE.Group();
      // group.add(model);

      // mixer4 = new THREE.AnimationMixer( gltf.scene );
        
      // gltf.animations.forEach( ( clip ) => {
        
      //     mixer4.clipAction( clip ).play();
        
      // } );

      explosion2 = model;


      // player_spacecraft.player._game._graphics.Scene.add(model);
    });
    
    // // fire by click mouse
    // document.addEventListener("click", function(){
    //   console.log(111);
    //   if (player_spacecraft != null){
    //     var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //     var material = new THREE.MeshNormalMaterial();
    //     var mesh1 = new THREE.Mesh( geometry, material );
    //     // this._model.add(mesh1);
    //     // mesh1.position.set( -1, 0, 0);
    //     var position = new THREE.Vector3();
    //     player_spacecraft['player']._model.children[1].getWorldPosition(position);
    //     mesh1.position.copy(position);
    //     // this._game._graphics.Scene.add(mesh1);
    //     // mesh1.position.copy(this._model.children[1].position);
    //     player_spacecraft.player._game._graphics.Scene.add( mesh1 );
    //     // this._graphics.Scene.add( mesh );

    //     var distance = 1000000000000000000;
    //     var targetPosition1 = new THREE.Vector3( player_spacecraft.player._direction.x*distance,player_spacecraft.player._direction.y*distance,player_spacecraft.player._direction.z*distance );
    //     var tween1 = new TWEEN.Tween( mesh1.position ).to( targetPosition1, distance*2 );
    //     tween1.start();
    //     console.log(mesh1.position)
    //   }
    // });

  }
}



function _Main() {
  _APP = new Game_Demo();
}

_Main();
