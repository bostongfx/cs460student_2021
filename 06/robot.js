Robot = function(x, y, z) {

  // constructor
  console.log('robot', this)

  this.head = new THREE.Bone();
  this.head.position.x = x;
  this.head.position.y = y;
  this.head.position.z = z;

  // NECK

  this.neck = new THREE.Bone();
  this.neck.position.y = -5;

  this.head.add(this.neck);

  // TORSO

  this.torso = new THREE.Bone();
  this.torso.position.y = -15;

  this.neck.add(this.torso);

  // LEFT UPPER ARM
  
  this.left_upper_arm = new THREE.Bone();
  this.left_upper_arm.position.y = -5;
  this.left_upper_arm.position.x = 5;

  this.neck.add(this.left_upper_arm);

  // LEFT LOWER ARM

  this.left_lower_arm = new THREE.Bone();
  this.left_lower_arm.position.y = -5;
  this.left_lower_arm.position.x = 3;

  this.left_upper_arm.add(this.left_lower_arm);

  // LEFT HAND

  this.left_hand = new THREE.Bone();
  this.left_hand.position.y = -3;
  this.left_hand.position.x = 1;

  this.left_lower_arm.add(this.left_hand);

  // RIGHT UPPER ARM

  this.right_upper_arm = new THREE.Bone();
  this.right_upper_arm.position.y = -5;
  this.right_upper_arm.position.x = -5;

  this.neck.add(this.right_upper_arm);

  // RIGHTER LOWER ARM

  this.right_lower_arm = new THREE.Bone();
  this.right_lower_arm.position.y = -5;
  this.right_lower_arm.position.x = -3;

  this.right_upper_arm.add(this.right_lower_arm);

  // RIGHT HAND

  this.right_hand = new THREE.Bone();
  this.right_hand.position.y = -3;
  this.right_hand.position.x = -1;

  this.right_lower_arm.add(this.right_hand);

  // LEFT UPPER LEG

  this.left_upper_leg = new THREE.Bone();
  this.left_upper_leg.position.y = -8;
  this.left_upper_leg.position.x = 5;

  this.torso.add(this.left_upper_leg);

  // LEFT LOWER LEG

  this.left_lower_leg = new THREE.Bone();
  this.left_lower_leg.position.y = -8;
  this.left_lower_leg.position.x = 2;

  this.left_upper_leg.add(this.left_lower_leg);

  // LEFT FOOT

  this.left_foot = new THREE.Bone();
  this.left_foot.position.y = -1;
  this.left_foot.position.x = 3;

  this.left_lower_leg.add(this.left_foot);

  // RIGHT UPPER LEG

  this.right_upper_leg = new THREE.Bone();
  this.right_upper_leg.position.y = -8;
  this.right_upper_leg.position.x = -5;

  this.torso.add(this.right_upper_leg);

  // RIGHT LOWER LEG

  this.right_lower_leg = new THREE.Bone();
  this.right_lower_leg.position.y = -8;
  this.right_lower_leg.position.x = -2;

  this.right_upper_leg.add(this.right_lower_leg);

  // RIGHT FOOT

  this.right_foot = new THREE.Bone();
  this.right_foot.position.y = -1;
  this.right_foot.position.x = -3;

  this.right_lower_leg.add(this.right_foot);

  // END

  this.movement = '';

};

Robot.prototype.show = function(scene){
  var rGroup = new THREE.Group();
  rGroup.add( this.head );

  var helper = new THREE.SkeletonHelper( rGroup );
  helper.material.linewidth = 3; // make the skeleton thick

  scene.add(rGroup);
  scene.add(helper);

};

Robot.prototype.raise_left_arm = function() {
  this.movement = 'raise_left_arm';
}
Robot.prototype.lower_left_arm = function() {
  this.movement = 'lower_left_arm';
}
Robot.prototype.raise_right_arm = function() {
  this.movement = 'raise_right_arm';
}
Robot.prototype.lower_right_arm = function() {
  this.movement = 'lower_right_arm';
}

Robot.prototype.kick = function() {
  this.movement = 'kick';
}

Robot.prototype.onAnimate = function() {
  if (this.movement == 'raise_left_arm') {

    q = new THREE.Quaternion(Math.sin(Math.PI/2), 0, 0, Math.cos(Math.PI/2));

    this.left_upper_arm.quaternion.slerp(q, 0.1);

  } else if (this.movement == 'lower_left_arm') {

    q = new THREE.Quaternion(0, 0, 0, 1);

    this.left_upper_arm.quaternion.slerp(q, 0.1);

  } else if (this.movement == 'raise_right_arm') {
    
    q = new THREE.Quaternion(Math.sin(Math.PI/2), 0, 0, Math.cos(Math.PI/2));

    this.right_upper_arm.quaternion.slerp(q, 0.1);

  } else if (this.movement == 'lower_right_arm') {
    
    q = new THREE.Quaternion(0, 0, 0, 1);

    this.right_upper_arm.quaternion.slerp(q, 0.1);

  } else if (this.movement == 'kick') {
    
    if (this.left_upper_leg.quaternion.w < 0.72) {

      this.movement = 'leg_down';

    } else {

      q = new THREE.Quaternion(Math.sin(Math.PI/4), 0, 0, Math.cos(Math.PI/4));

    }

    this.left_upper_leg.quaternion.slerp(q, 0.1);

  } else if (this.movement == 'leg_down') {

    q = new THREE.Quaternion(0, 0, 0, 1);

    this.left_upper_leg.quaternion.slerp(q, 0.1);

  }
};