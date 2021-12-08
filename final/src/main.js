import * as THREE from 'https://threejs.org/build/three.module.js';
import {GLTFLoader} from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

import {controls} from './controls.js';


let _APP = null;
let mixer, mixer2, clock, cubes = [];

class _Graphics {
    constructor(game) {
    }

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
        this._OnWindowResize();
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

    _CreateLights() {
      let light = new THREE.DirectionalLight(0xFFFFFF, 1, 100);
      light.position.set(-100, 100, -100);
      light.target.position.set(0, 0, 0);
      light.castShadow = false;
      this._scene.add(light);

      light = new THREE.DirectionalLight(0x404040, 1, 100);
      light.position.set(100, 100, -100);
      light.target.position.set(0, 0, 0);
      light.castShadow = false;
      this._scene.add(light);

      light = new THREE.DirectionalLight(0x404040, 1, 100);
      light.position.set(100, 100, -100);
      light.target.position.set(0, 0, 0);
      light.castShadow = false;
      this._scene.add(light);

      light = new THREE.DirectionalLight(0x101040, 1, 100);
      light.position.set(100, -100, 100);
      light.target.position.set(0, 0, 0);
      light.castShadow = false;
      this._scene.add(light);
    }

    _OnWindowResize() {
      this._camera.aspect = window.innerWidth / window.innerHeight;
      this._camera.updateProjectionMatrix();
      this._threejs.setSize(window.innerWidth, window.innerHeight);
    }

    get Scene() {
      return this._scene;
    }

    get Camera() {
      return this._camera;
    }

    Render(timeInSeconds) {
      this._threejs.render(this._scene, this._camera);
      // console.log(123)
      if ( mixer ) mixer.update( .01 );
      if ( mixer2 ) mixer2.update( .03 );
      // if (cubes != null) {
      //   for (var c in cubes) {
      //     cubes[c].rotation.x = 1;
      //   }
      // }
    }
  }


class Game{
      constructor() {
        this._Initialize();
      }

      _Initialize() {
        this._graphics = new _Graphics(this);
        if (!this._graphics.Initialize()) {
          this._DisplayError('WebGL2 is not available.');
          return;
        }

        this._previousRAF = null;
        this._minFrameTime = 1.0 / 10.0;
        this._entities = {};

        this._OnInitialize();
        this._RAF();


      }

      _DisplayError(errorText) {
        const error = document.getElementById('error');
        error.innerText = errorText;
      }

      _RAF() {
        requestAnimationFrame((t) => {
          if (this._previousRAF === null) {
            this._previousRAF = t;
          }
          this._Render(t - this._previousRAF);
          this._previousRAF = t;

        });
      }

      _StepEntities(timeInSeconds) {
        for (let k in this._entities) {
          this._entities[k].Update(timeInSeconds);
        }
      }

      _Render(timeInMS) {
        // const timeInSeconds = Math.min(timeInMS * 0.001, this._minFrameTime);
        const timeInSeconds = 0.05;
        // const timeInSeconds = 0.2;
        // console.log(timeInSeconds)

        this._StepEntities(timeInSeconds);
        this._graphics.Render(timeInSeconds);

        this._RAF();
      }
    };

class PlayerEntity {
  constructor(params) {
    this._model = params.model;
    this._params = params;
    this._game = params.game;
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._direction = new THREE.Vector3(0, 0, -1);

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

  get Radius() {
    return 1.0;
  }

  Update(timeInSeconds) {
    if (this.Dead) {
      return;
    }
    this._direction.copy(this._velocity);
    this._direction.normalize();
    this._direction.applyQuaternion(this._model.quaternion);
  }
}




class ProceduralTerrain_Demo extends Game {
  constructor() {
    super();
  }

  _OnInitialize() {

    this._graphics.Scene.background = new THREE.Color(0xFFFFFF);
    const bg_loader = new THREE.CubeTextureLoader();
    const bg_texture = bg_loader.load([
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
    this._graphics._scene.background = bg_texture;

    clock = new THREE.Clock();

    this._userCamera = new THREE.Object3D();
    this._userCamera.position.set(4100, 0, 0);

    this._graphics.Camera.position.set(10340, 880, -2130);
    this._graphics.Camera.quaternion.set(-0.032, 0.885, 0.062, 0.46);

    this._score = 0;

    // var cube = new THREE.Mesh(
    //   new THREE.BoxGeometry(10, 10, 10),
    //   new THREE.MeshNormalMaterial({
    //     // color: '0x000000',
    //   }));
    // cube.position.set(0, -10, -30);
    // const group = new THREE.Group();
    // group.add(cube);
    // this._graphics.Scene.add(group);

    // this._entities['player'] = new PlayerEntity(
    //     {model: group, camera: this._graphics.Camera, game: this});

    // this._entities['_controls'] = new controls.ShipControls({
    //   target: this._entities['player'],
    //   camera: this._graphics.Camera,
    //   scene: this._graphics.Scene,
    //   domElement: this._graphics._threejs.domElement,
    // });

    

    let loader = new GLTFLoader();
    loader.setPath('./resources/models/x-wing1/');
    loader.load('scene.gltf', (gltf) => {
      const model = gltf.scene.children[0];
      // model.rotation.z = -Math.PI/2;
      model.rotation.x = Math.PI/2;
      model.scale.setScalar(0.07);


      const group = new THREE.Group();
      group.add(model);

      mixer = new THREE.AnimationMixer( gltf.scene );
        
      gltf.animations.forEach( ( clip ) => {
        
          mixer.clipAction( clip ).play();
        
      } );


      this._graphics.Scene.add(group);

      this._entities['player'] = new PlayerEntity(
          {model: group, camera: this._graphics.Camera, game: this,});

      this._entities['_controls'] = new controls.ShipControls({
        target: this._entities['player'],
        camera: this._graphics.Camera,
        scene: this._graphics.Scene,
        domElement: this._graphics._threejs.domElement,
        mixer: mixer
      });
    });


    // // floor
    // var plane = new THREE.Mesh(
    //   new THREE.PlaneGeometry(2000, 2000, 10, 10),
    //   new THREE.MeshStandardMaterial({
    //     color: 0xFFFFFF,
    //     side: THREE.DoubleSide,
    //   }));
    // plane.rotation.x = -Math.PI / 2;
    // plane.position.set(1000,0,0);
    // this._graphics.Scene.add(plane);

    // cubes
    for (var i = 0; i < 60; i++) {
      var cube = new THREE.Mesh(
        new THREE.BoxGeometry(500, 500, 500),
        new THREE.MeshNormalMaterial({
          // color: '0x000000',
        }));
      cube.rotation.x = -Math.PI / 2;
      var a = Math.random()*60000 - 30000;
      var b = Math.random()*60000 - 30000;
      var c = Math.random()*60000 - 30000;
      cube.position.set(a,b,c);
      cube.rotation.x = Math.random()*Math.PI*2;
      cube.rotation.y = Math.random()*Math.PI*2;
      cube.rotation.z = Math.random()*Math.PI*2;
      // cubes.push(cube);
      this._graphics.Scene.add(cube);
    }


    // Earth
    loader.setPath('./resources/models/planet1/');
    loader.load('scene.gltf', (gltf) => {
      const model = gltf.scene;
      // model.rotation.z = -Math.PI/2;
      // model.rotation.x = Math.PI/2;
      model.scale.setScalar(10);
      model.position.set(-20000,-2000,-5000)


      // const group = new THREE.Group();
      // group.add(model);

      mixer = new THREE.AnimationMixer( gltf.scene );
        
      gltf.animations.forEach( ( clip ) => {
        
          mixer.clipAction( clip ).play();
        
      } );


      this._graphics.Scene.add(model);
    });


    loader.setPath('./resources/models/earth2/');
    loader.load('scene.gltf', (gltf) => {
      const model = gltf.scene;
      // model.rotation.z = -Math.PI/2;
      // model.rotation.x = Math.PI/2;
      model.scale.setScalar(100);
      model.position.set(7000,-5000,20000)


      // const group = new THREE.Group();
      // group.add(model);

      mixer2 = new THREE.AnimationMixer( gltf.scene );
        
      gltf.animations.forEach( ( clip ) => {
        
          mixer2.clipAction( clip ).play();
        
      } );


      this._graphics.Scene.add(model);
    });

  }
}



function _Main() {
  _APP = new ProceduralTerrain_Demo();
}

_Main();
