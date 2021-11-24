Robot = function(x, y, z) {

  // constructor
  console.log('robot', this)

  var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
  var geometry = fromHelper[0];
  var material = fromHelper[1];
  var bones = fromHelper[2];
  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton ( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[0];
  this.root.position.set( x, y, z );

  this.head = bones[1];
  this.head.position.y = 10;

  this.neck = bones[2];
  this.neck.position.y = -10;

  this.torso = bones[3];
  this.torso.position.y = -30;

  this.body_mesh = mesh;

  // LEFT ARM SET UP

  var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
  var geometry = fromHelper[0];
  var material = fromHelper[1];
  var bones = fromHelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.neck.add(bones[0]);

  // LEFT UPPER ARM
  
  this.left_upper_arm = bones[1];
  this.left_upper_arm.position.y = -8;
  this.left_upper_arm.position.x = 5;

  // LEFT LOWER ARM

  this.left_lower_arm = bones[2];
  this.left_lower_arm.position.y = -8;
  this.left_lower_arm.position.x = 5;

  // LEFT HAND

  this.left_hand = bones[3];
  this.left_hand.position.y = -3;
  this.left_hand.position.x = 1;

  this.left_arm_mesh = mesh;

  // RIGHT ARM SET UP

  var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
  var geometry = fromHelper[0];
  var material = fromHelper[1];
  var bones = fromHelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.neck.add(bones[0]);

  // RIGHT UPPER ARM

  this.right_upper_arm = bones[1];
  this.right_upper_arm.position.y = -8;
  this.right_upper_arm.position.x = -5;

  // RIGHTER LOWER ARM

  this.right_lower_arm = bones[2];
  this.right_lower_arm.position.y = -8;
  this.right_lower_arm.position.x = -5;

  // RIGHT HAND

  this.right_hand = bones[3];
  this.right_hand.position.y = -3;
  this.right_hand.position.x = -1;

  this.right_arm_mesh = mesh;

  // LEFT LEG SET UP

  var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
  var geometry = fromHelper[0];
  var material = fromHelper[1];
  var bones = fromHelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.torso.add(bones[0]);

  // LEFT UPPER LEG

  this.left_upper_leg = bones[1];
  this.left_upper_leg.position.y = -8;
  this.left_upper_leg.position.x = 5;

  // LEFT LOWER LEG

  this.left_lower_leg = bones[2];
  this.left_lower_leg.position.y = -8;
  this.left_lower_leg.position.x = 2;

  // LEFT FOOT

  this.left_foot = bones[3];
  this.left_foot.position.y = -1;
  this.left_foot.position.x = 3;

  this.left_leg_mesh = mesh;

  // RIGHT LEG SET UP

  var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
  var geometry = fromHelper[0];
  var material = fromHelper[1];
  var bones = fromHelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.torso.add(bones[0]);

  // RIGHT UPPER LEG

  this.right_upper_leg = bones[1];
  this.right_upper_leg.position.y = -8;
  this.right_upper_leg.position.x = -5;

  // RIGHT LOWER LEG

  this.right_lower_leg = bones[2];
  this.right_lower_leg.position.y = -8;
  this.right_lower_leg.position.x = -2;

  // RIGHT FOOT

  this.right_foot = bones[3];
  this.right_foot.position.y = -1;
  this.right_foot.position.x = -3;

  this.right_leg_mesh = mesh;

  // END

  this.movement = '';

};

Robot.prototype.show = function(scene){
  
  scene.add(this.body_mesh);
  scene.add(this.left_arm_mesh);
  scene.add(this.left_leg_mesh);
  scene.add(this.right_arm_mesh);
  scene.add(this.right_leg_mesh);

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

Robot.prototype.walk = function() {
  this.movement = 'walk';

}

Robot.prototype.onStep = function(ALL_ROBOTS) {

  this.root.translateZ(10);

  if (this.root.position.z > 500 || this.root.position.z < -500 || this.root.position.x > 500 || this.root.position.x < -500) {
    this.root.rotateY(180);
  }

  for (var i in ALL_ROBOTS) {

    if (this.root.position.distanceTo(ALL_ROBOTS[i].root.position) <= 30 && !this.root.position.equals(ALL_ROBOTS[i].root.position)) {
      this.root.rotateY(180);
    }
  }
}


Robot.prototype.onAnimate = function() {
  if (this.movement == 'raise_left_arm') {

    var T = Math.PI;

    q = new THREE.Quaternion(Math.sin(-Math.PI/2), 0, 0, Math.cos(-Math.PI/2));

    this.left_upper_arm.quaternion.slerp(q, 0.1);

  } else if (this.movement == 'lower_left_arm') {

    q = new THREE.Quaternion(0, 0, 0, 1);

    this.left_upper_arm.quaternion.slerp(q, 0.1);

  } else if (this.movement == 'raise_right_arm') {
    
    q = new THREE.Quaternion(Math.sin(-Math.PI/2), 0, 0, Math.cos(-Math.PI/2));

    this.right_upper_arm.quaternion.slerp(q, 0.1);

  } else if (this.movement == 'lower_right_arm') {
    
    q = new THREE.Quaternion(0, 0, 0, 1);

    this.right_upper_arm.quaternion.slerp(q, 0.1);

  } else if (this.movement == 'kick') {
    
    if (this.left_upper_leg.quaternion.w < 0.72) {

      this.movement = 'leg_down';

    } else {

      q = new THREE.Quaternion(Math.sin(-Math.PI/4), 0, 0, Math.cos(-Math.PI/4));

    }

    this.left_upper_leg.quaternion.slerp(q, 0.1);

  } else if (this.movement == 'leg_down') {

    q = new THREE.Quaternion(0, 0, 0, 1);

    this.left_upper_leg.quaternion.slerp(q, 0.1);

  } else if (this.movement == 'walk') {
    
    if (this.left_upper_leg.quaternion.w < 0.93) {

      this.movement = 'walk2';

    }

    q = new THREE.Quaternion(0, 0, 0, 1);

    this.right_upper_leg.quaternion.slerp(q, 0.1);

    var T = -Math.PI/4;
    this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),
                                                                0,                  
                                                                0,                  
                                                                Math.cos( T / 2 ) ),
                                          0.1 );

    this.onStep();

  } else if (this.movement == 'walk2') {
    
    if (this.right_upper_leg.quaternion.w < 0.93) {

      this.movement = 'walk';

    }

    q = new THREE.Quaternion(0, 0, 0, 1);

    this.left_upper_leg.quaternion.slerp(q, 0.1);

    var T = -Math.PI/4;
    this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),
                                                                0,
                                                                0,
                                                                Math.cos( T / 2 ) ),
                                          0.1 );

    this.onStep();
    
  }

};