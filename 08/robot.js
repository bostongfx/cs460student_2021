Robot = function(x, y, z) {

  const colors = ['green', 'blue', 'yellow', 'purple', 'orange']
  
  // head, neck, torso
  var [geometry, material, bones] = HELPER.cylinderSkeletonMesh(3, 5, colors[Math.floor(Math.random() * colors.length)])
  var mesh = new THREE.SkinnedMesh(geometry, material)
  var skeleton = new THREE.Skeleton(bones)
  mesh.add(bones[0])
  mesh.bind(skeleton)


  this.root = bones[0]
  this.root.position.set(x, y, z)
  
  this.head = bones[1] // new THREE.Bone();
  this.head.position.y = 10


  this.neck = bones[2] //new THREE.Bone();
  this.neck.position.y = -10;



  this.torso = bones[3] //new THREE.Bone();
  this.torso.position.y = -30;

  this.body_mesh = mesh


  var [geometry, material, bones] = HELPER.cylinderSkeletonMesh(3, 5, 'red')
  var mesh = new THREE.SkinnedMesh(geometry, material)
  var skeleton = new THREE.Skeleton(bones)
  mesh.add(bones[0])
  mesh.bind(skeleton)

  this.neck.add(bones[0])

  this.left_upperarm = bones[1] //new THREE.Bone();
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;

  this.left_lowerarm = bones[2]
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 5;

  this.left_hand = bones[3]
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;

  this.left_arm_mesh = mesh


  var [geometry, material, bones] = HELPER.cylinderSkeletonMesh(3, 5, 'red')
  var mesh = new THREE.SkinnedMesh(geometry, material)
  var skeleton = new THREE.Skeleton(bones)
  mesh.add(bones[0])
  mesh.bind(skeleton)

  this.torso.add(bones[0])

  this.left_upperleg = bones[1] //
  this.left_upperleg.position.x = 5;
  this.left_upperleg.position.y = -5;

  this.left_lowerleg = bones[2] //new THREE.Bone();
  this.left_lowerleg.position.x = 5;
  this.left_lowerleg.position.y = -15;

  this.left_foot = bones[3] //new THREE.Bone();
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;

  this.left_leg_mesh = mesh


  var [geometry, material, bones] = HELPER.cylinderSkeletonMesh(3, 5, 'red')
  var mesh = new THREE.SkinnedMesh(geometry, material)
  var skeleton = new THREE.Skeleton(bones)
  mesh.add(bones[0])
  mesh.bind(skeleton)

  this.neck.add(bones[0])


  this.right_upperarm = bones[1] //new THREE.Bone();
  this.right_upperarm.position.y = -5;
  this.right_upperarm.position.x = -5;

  this.right_lowerarm = bones[2] // new THREE.Bone();
  this.right_lowerarm.position.y = -15;
  this.right_lowerarm.position.x = -5;

  this.right_hand = bones[3] //new THREE.Bone();
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;

  this.right_arm_mesh = mesh


  var [geometry, material, bones] = HELPER.cylinderSkeletonMesh(3, 5, 'red')
  var mesh = new THREE.SkinnedMesh(geometry, material)
  var skeleton = new THREE.Skeleton(bones)
  mesh.add(bones[0])
  mesh.bind(skeleton)

  this.torso.add(bones[0])

  this.right_upperleg = bones[1] //new THREE.Bone();
  this.right_upperleg.position.x = -5;
  this.right_upperleg.position.y = -5;

  this.right_lowerleg = bones[2] //new THREE.Bone();
  this.right_lowerleg.position.x = -5;
  this.right_lowerleg.position.y = -15;

  this.right_foot = bones[3] //new THREE.Bone();
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;

  this.right_leg_mesh = mesh


  this.movement = null;
};


Robot.prototype.show = function(scene) {

  scene.add(this.body_mesh)
  scene.add(this.left_arm_mesh)
  scene.add(this.left_leg_mesh)
  scene.add(this.right_arm_mesh)
  scene.add(this.right_leg_mesh)

};

Robot.prototype.raise_left_arm = function() { this.movement = 'raise left arm'; };
Robot.prototype.lower_left_arm = function() { this.movement = 'lower left arm'; };
Robot.prototype.kick = function() { this.movement = 'kick'; };
Robot.prototype.dance = function() { this.movement = 'dance'; };
Robot.prototype.walk = function() { this.movement = 'walk'; };
Robot.prototype.onStep = function() { 

  const boardLength = 1000
  const maxDistance = 50
  const speed = 5

  this.root.translateZ(speed)
  
  if (this.root.position.z > (boardLength / 2) || this.root.position.x > (boardLength / 2)) {
    this.root.rotateY(180)
  }

  if (this.root.position.z < (boardLength / -2) || this.root.position.x < (boardLength / -2)) {
    this.root.rotateY(-180)
  }

  for (const r of allRobots) {
    if (r.root.position === this.root.position) {
      continue
    }

    if (r.root.position.distanceTo(this.root.position) < maxDistance) {
      this.root.rotateY(Math.random() * Math.PI * 2)
    }
  }

}

const quaternions = {
  "identity" : new THREE.Quaternion(0, 0, 0, 1),
  "raise_left_arm" : new THREE.Quaternion(Math.sin(-Math.PI/4), 0, 0, Math.cos(-Math.PI/4)),
  "move_leg" : new THREE.Quaternion(Math.sin(-Math.PI/8), 0, 0, Math.cos(-Math.PI/8))
}

Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise left arm') {

    this.left_upperarm.quaternion.slerp(quaternions.raise_left_arm, 0.1);

  } else  if (this.movement == 'lower left arm') {

    this.left_upperarm.quaternion.slerp(quaternions.identity, 0.1);

  } else if (this.movement == 'kick') {

    if (this.right_upperleg.quaternion.w < 0.72) {

      this.movement = 'kick done';

    } else {
      this.right_upperleg.quaternion.slerp(quaternions.raise_left_arm, 0.1);
    }
  
  } else if (this.movement == 'kick done') {
    this.right_upperleg.quaternion.slerp( quaternions.identity, 0.1);
    
  } else if (this.movement === 'walk') {

    if (this.left_upperleg.quaternion.w < 0.93) this.movement = 'walk2';

      this.left_upperleg.quaternion.slerp(quaternions.move_leg, 0.5)
      this.right_upperleg.quaternion.slerp(quaternions.identity, 0.5)
      this.onStep()
    
  } else if (this.movement === 'walk2') {

    if (this.right_upperleg.quaternion.w < 0.93) this.movement = 'walk';

    this.right_upperleg.quaternion.slerp(quaternions.move_leg, 0.5)
    this.left_upperleg.quaternion.slerp(quaternions.identity, 0.5)
    this.onStep()

  } else if (this.movement == 'dance') {

    if (typeof this.dancer === 'undefined') {

      this.dancer = setInterval(function() {
        // some random translation
        var shakehead = 3*Math.random();
        if (Math.random() < .5) { shakehead *= -1; }

        var shakeneck = 3*Math.random();
        if (Math.random() < .5) { shakeneck *= -1; }

        var shaketorso = 3*Math.random();
        if (Math.random() < .5) { shaketorso *= -1; }

        this.head.position.x += shakehead;
        this.neck.position.x += shakeneck;
        this.torso.position.x += shaketorso;

        if (Math.random() < .3) { this.raise_left_arm(); }
        if (Math.random() < .3) { this.lower_left_arm(); }
        if (Math.random() < .3) { this.kick(); }
        if (Math.random() < .3) { this.movement = 'kick done'; }

      }.bind(this), 500);
    }
  }
};