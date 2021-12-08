import * as THREE from 'https://threejs.org/build/three.module.js';

const math = (function() {
  return {
    rand_range: function(a, b) {
      return Math.random() * (b - a) + a;
    },

    rand_normalish: function() {
      const r = Math.random() + Math.random() + Math.random() + Math.random();
      return (r / 4.0) * 2.0 - 1;
    },

    rand_int: function(a, b) {
      return Math.round(Math.random() * (b - a) + a);
    },

    lerp: function(x, a, b) {
      return x * (b - a) + a;
    },

    smoothstep: function(x, a, b) {
      x = x * x * (3.0 - 2.0 * x);
      return x * (b - a) + a;
    },

    smootherstep: function(x, a, b) {
      x = x * x * x * (x * (x * 6 - 15) + 10);
      return x * (b - a) + a;
    },

    clamp: function(x, a, b) {
      return Math.min(Math.max(x, a), b);
    },

    sat: function(x) {
      return Math.min(Math.max(x, 0.0), 1.0);
    },
  };
})();


export const controls = (function() {

  class _ShipControls {
    constructor(params) {
      this._Init(params);
    }

    _Init(params) {
      this._params = params;
      this._radius = 2;
      this._enabled = false;
      this._move = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        up: false,
        down: false,
        rocket: false,
        faster: false,
      };
      this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -1);
      this._acceleration = new THREE.Vector3(100, 0.5, 25000);

      this._params.target._model.position.copy(this._params.camera.position);
      this._params.target._model.quaternion.copy(this._params.camera.quaternion);

      document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
      document.addEventListener('keyup', (e) => this._onKeyUp(e), false);

    }

    _onKeyDown(event) {
      switch (event.keyCode) {
        case 87: // w
          this._move.forward = true;
          break;
        case 65: // a
          this._move.left = true;
          break;
        case 83: // s
          this._move.backward = true;
          break;
        case 68: // d
          this._move.right = true;
          break;
        case 75: // k
          console.log('hoho')
          this._move.rollLeft = true;
          break;
        case 76: // l
          this._move.rollRight = true;
          break;
        case 32: // SPACE
          this._move.rocket = true;
          break;
        case 16: // SHIFT
          this._move.faster = true;
          break;
        case 13: // ENTER
          this._move.fire = true;
        case 38: // up 
        case 37: // left
        case 40: // down
        case 39: // right
          break;
      }
    }

    _onKeyUp(event) {
      switch(event.keyCode) {
        case 87: // w
          this._move.forward = false;
          break;
        case 65: // a
          this._move.left = false;
          break;
        case 83: // s
          this._move.backward = false;
          break;
        case 68: // d
          this._move.right = false;
          break;
        case 75: // k
          this._move.rollLeft = false;
          break;
        case 76: // l
          this._move.rollRight = false;
          break;
        case 32: // SPACE
          this._move.rocket = false;
          break;
        case 16: // SHIFT
          this._move.faster = false;
          break;
        case 13: // ENTER
          this._move.fire = false;
        case 38: // up
        case 37: // left
        case 40: // down
        case 39: // right
          break;
      }
    }

    Update(timeInSeconds) {
      timeInSeconds = 0.025;
      var timeInSeconds2 = 0.1;
      const velocity = this._params.target.Velocity;
      const frameDecceleration = new THREE.Vector3(
          velocity.x * this._decceleration.x,
          velocity.y * this._decceleration.y,
          velocity.z * this._decceleration.z
      );
      frameDecceleration.multiplyScalar(timeInSeconds);

      velocity.add(frameDecceleration);
      velocity.z = -math.clamp(Math.abs(velocity.z), 25.0, 125.0);

      const controlObject = this._params.target;
      const _Q = new THREE.Quaternion();
      const _A = new THREE.Vector3();
      const _R = controlObject._model.quaternion.clone();

      if (this._move.forward) {
        _A.set(1, 0, 0);
        _Q.setFromAxisAngle(_A, -Math.PI * timeInSeconds * this._acceleration.y);
        _R.multiply(_Q);
      }
      if (this._move.backward) {
        _A.set(1, 0, 0);
        _Q.setFromAxisAngle(_A, Math.PI * timeInSeconds * this._acceleration.y);
        _R.multiply(_Q);
      }
      if (this._move.left) {
        _A.set(0, 1, 0);
        _Q.setFromAxisAngle(_A, Math.PI * timeInSeconds * this._acceleration.y);
        _R.multiply(_Q);
      }
      if (this._move.right) {
        _A.set(0, 1, 0);
        _Q.setFromAxisAngle(_A, -Math.PI * timeInSeconds * this._acceleration.y);
        _R.multiply(_Q);
      }
      if (this._move.rollLeft) {
        _A.set(0, 0, -1);
        _Q.setFromAxisAngle(_A, -Math.PI * timeInSeconds * this._acceleration.y);
        _R.multiply(_Q);
      }
      if (this._move.rollRight) {
        _A.set(0, 0, -1);
        _Q.setFromAxisAngle(_A, Math.PI * timeInSeconds * this._acceleration.y);
        _R.multiply(_Q);
      }
      if (this._move.rocket) {
        velocity.z -= this._acceleration.x * timeInSeconds;
        // velocity.z -= 500;
      }

      controlObject._model.quaternion.copy(_R);

      const oldPosition = new THREE.Vector3();
      oldPosition.copy(controlObject._model.position);

      const forward = new THREE.Vector3(0, 0, 1);
      forward.applyQuaternion(controlObject._model.quaternion);
      forward.normalize();

      const updown = new THREE.Vector3(0, 1, 0);

      const sideways = new THREE.Vector3(1, 0, 0);
      sideways.applyQuaternion(controlObject._model.quaternion);
      sideways.normalize();

      sideways.multiplyScalar(velocity.x * timeInSeconds);
      updown.multiplyScalar(velocity.y * timeInSeconds);


      if (this._move.faster)
        forward.multiplyScalar(velocity.z * timeInSeconds * 12);
      else
        forward.multiplyScalar(velocity.z * timeInSeconds * 4);



      controlObject._model.position.add(forward);
      controlObject._model.position.add(sideways);
      controlObject._model.position.add(updown);
      controlObject._velocity.copy(velocity);

      oldPosition.copy(controlObject._model.position);

      // Now place the camera in relation
      // const offsetFactor = (-velocity.z - 25.0) / 100.0;
      const offsetFactor = (-velocity.z - 25.0) / 100.0;
      const offset = new THREE.Vector3(0, 4, math.smootherstep(offsetFactor, 10.0, 15.0));
      offset.applyQuaternion(this._params.camera.quaternion);

      this._params.camera.quaternion.slerp(this._params.target._model.quaternion, timeInSeconds * 2.0);
  
      const position = new THREE.Vector3();
      position.copy(this._params.target._model.position);
      position.add(offset);
  
      this._params.camera.position.copy(position);
      this._params.camera.updateProjectionMatrix();
  
      if (this._move.fire) {
        this._params.target.Fire();
      }
    }
  };

  return {
    ShipControls: _ShipControls,
  };
})();
