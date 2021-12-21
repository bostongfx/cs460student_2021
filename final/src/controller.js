import * as THREE from 'https://threejs.org/build/three.module.js';

export const controller = (function() {

  class _ShipController {
    constructor(params) {
      this._params = params;
      this.quaternionActionadius = 2;
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

      this._params.target._model.position.copy(this._params.camera.position);
      this._params.target._model.quaternion.copy(this._params.camera.quaternion);
      this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -1);
      this._acceleration = new THREE.Vector3(100, 0.5, 25000);

      document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
      document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    }

    _onKeyDown(event) {
      switch (event.keyCode) {
        case 87: // w
          this._move.down = true;
          break;
        case 65: // a
          this._move.left = true;
          break;
        case 83: // s
          this._move.up = true;
          break;
        case 68: // d
          this._move.right = true;
          break;
        case 75: // k
          this._move.rollLeft = true;
          break;
        case 76: // l
          this._move.rollRight = true;
          break;
        case 32: // space
          this._move.rocket = true;
          break;
        case 16: // shift
          this._move.faster = true;
          break;
        case 13: // enter
          this._move.fire = true;
          break;
      }
    }

    _onKeyUp(event) {
      switch(event.keyCode) {
        case 87: // w
          this._move.down = false;
          break;
        case 65: // a
          this._move.left = false;
          break;
        case 83: // s
          this._move.up = false;
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
        case 32: // space
          this._move.rocket = false;
          break;
        case 16: // shift
          this._move.faster = false;
          break;
        case 13: // enter
          this._move.fire = false;
          break;
      }
    }

    Update() {
      var speedScale = 0.02;
      // var speedScale2 = 0.1;
      const velocity = this._params.target.Velocity;
      const frameDecceleration = new THREE.Vector3(
          velocity.x * this._decceleration.x,
          velocity.y * this._decceleration.y,
          velocity.z * this._decceleration.z
      );
      frameDecceleration.multiplyScalar(speedScale);

      velocity.add(frameDecceleration);

      const controlObject = this._params.target;
      const quaternion = new THREE.Quaternion();
      const angle = new THREE.Vector3();
      const quaternionAction = controlObject._model.quaternion.clone();

      if (this._move.down) {
        angle.set(1, 0, 0);
        quaternion.setFromAxisAngle(angle, -Math.PI  * this._acceleration.y * speedScale);
        quaternionAction.multiply(quaternion);
      }
      if (this._move.up) {
        angle.set(1, 0, 0);
        quaternion.setFromAxisAngle(angle, Math.PI  * this._acceleration.y * speedScale);
        quaternionAction.multiply(quaternion);
      }
      if (this._move.left) {
        angle.set(0, 1, 0);
        quaternion.setFromAxisAngle(angle, Math.PI  * this._acceleration.y * speedScale);
        quaternionAction.multiply(quaternion);
      }
      if (this._move.right) {
        angle.set(0, 1, 0);
        quaternion.setFromAxisAngle(angle, -Math.PI  * this._acceleration.y * speedScale);
        quaternionAction.multiply(quaternion);
      }
      if (this._move.rollLeft) {
        angle.set(0, 0, -1);
        quaternion.setFromAxisAngle(angle, -Math.PI  * this._acceleration.y * speedScale);
        quaternionAction.multiply(quaternion);
      }
      if (this._move.rollRight) {
        angle.set(0, 0, -1);
        quaternion.setFromAxisAngle(angle, Math.PI  * this._acceleration.y * speedScale);
        quaternionAction.multiply(quaternion);
      }
      if (this._move.rocket) {
        velocity.z -= this._acceleration.x * speedScale;
      }

      controlObject._model.quaternion.copy(quaternionAction);

      const oldPosition = new THREE.Vector3();
      oldPosition.copy(controlObject._model.position);

      const forward = new THREE.Vector3(0, 0, 1);
      forward.applyQuaternion(controlObject._model.quaternion);
      forward.normalize();

      const updown = new THREE.Vector3(0, 1, 0);

      const sideways = new THREE.Vector3(1, 0, 0);
      sideways.applyQuaternion(controlObject._model.quaternion);
      sideways.normalize();

      sideways.multiplyScalar(velocity.x * speedScale);
      updown.multiplyScalar(velocity.y * speedScale);

      // controll speed
      if (this._move.faster)
        forward.multiplyScalar(velocity.z * speedScale * 20);
      else
        forward.multiplyScalar(velocity.z * speedScale * 10);



      controlObject._model.position.add(forward);
      controlObject._model.position.add(sideways);
      controlObject._model.position.add(updown);
      controlObject._velocity.copy(velocity);

      oldPosition.copy(controlObject._model.position);

      // animation spacecraft moving
      var offsetAnimation =  function(x, a, b) {
        x = x * x * x * (x * (x * 6 - 15) + 10);
        return x * (b - a) + a;
      }
      // place the camera in relation
      const offsetFactor = (-velocity.z - 25.0) / 100.0;
      const offset = new THREE.Vector3(0, 4, offsetAnimation(offsetFactor, 10.0, 15.0));
      offset.applyQuaternion(this._params.camera.quaternion);

      this._params.camera.quaternion.slerp(this._params.target._model.quaternion, speedScale * 2.0);
  
      const position = new THREE.Vector3();
      position.copy(this._params.target._model.position);
      position.add(offset);
  
      this._params.camera.position.copy(position);
      this._params.camera.updateProjectionMatrix();
  
      if (this._move.fire) {
        this._params.target.Fire();
        this._move.rocket = false;
      }
    }
  };

  return {
    ShipController: _ShipController,
  };
})();
