Robot = function(x, y, z) {
  var color = Math.floor(Math.random() * 0xffffff);
  // create head, neck, and, torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color)
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.root = bones[0];
  this.root.position.set(x, y, z);

  this.head = bones[1];
  var robohead = new THREE.BoxBufferGeometry(30, 30, 30);
  var text = new THREE.TextureLoader().load('AS.png');
  var stuff = new THREE.MeshStandardMaterial(
    {map: text}
  );
  Drone = new THREE.Mesh(robohead, stuff);

  this.neck = bones[2];
  this.neck.add(Drone);
  this.neck.position.y = -10;
  this.torso = bones[3];
  this.torso.position.y = -30;
  this.body_mesh = mesh;


  // create left arm
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color)
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.neck.add(bones[0]);

  this.left_upperarm = bones[1];
  this.left_upperarm.position.y = -10;
  this.left_upperarm.position.x = 15;
  this.left_lowerarm = bones[2];
  this.left_lowerarm.position.y = -10;
  this.left_lowerarm.position.x = 5;
  this.left_hand = bones[3];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;
  this.leftarm_mesh = mesh;



  // create right arm
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color)
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.neck.add(bones[ 0 ]);

  this.right_upperarm = bones[1];
  this.right_upperarm.position.y = -10;
  this.right_upperarm.position.x = -15;
  this.right_lowerarm = bones[2];
  this.right_lowerarm.position.y = -10;
  this.right_lowerarm.position.x = -5;
  this.right_hand = bones[3];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;
  this.rightarm_mesh = mesh;


  // create left leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color)
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.torso.add(bones[0]);

  this.left_upperleg = bones[1];
  this.left_upperleg.position.y = -5;
  this.left_upperleg.position.x = 10;
  this.left_lowerleg = bones[2];
  this.left_lowerleg.position.y = -20;
  this.left_lowerleg.position.x = 5;
  this.left_foot = bones[3];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;
  this.leftleg_mesh = mesh;

  // create right leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color)
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);
  mesh.add(bones[0]);
  mesh.bind(skeleton);

  this.torso.add(bones[0]);

  this.right_upperleg = bones[1];
  this.right_upperleg.position.y = -5;
  this.right_upperleg.position.x = -10;
  this.right_lowerleg = bones[2];
  this.right_lowerleg.position.y = -20;
  this.right_lowerleg.position.x = -5;
  this.right_foot = bones[3];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;
  this.rightleg_mesh = mesh;

  this.movement = null;
};


Robot.prototype.show = function(scene) {
  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh)
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);
};

Robot.prototype.walk = function() {
  this.movement = 'walk';
};

Robot.prototype.onStep = function() {
  this.root.translateZ(10);

  if (this.root.position.x > 500) {
    this.root.rotateY(180);
  }
  if (this.root.position.x < -500) {
    this.root.rotateY(180);
  }
  
  if (this.root.position.z > 500) {
    this.root.rotateY(180);
  }
  if (this.root.position.z < -500) {
    this.root.rotateY(180);
  }
  if (this.root.position.x > -250 && this.root.position.x < -50 && 
    this.root.position.z > 250 && this.root.position.z < 350) {
    this.root.rotateY(Math.PI/2); 
  }
  for (var r in all_robots) {
    r = all_robots[r];
    if (r.root.position.equals(this.root.position)) {
      continue;
    }
    if (r.root.position.distanceTo(this.root.position) < 30) {
      this.root.rotateY(180);
    }
  }
}

Robot.prototype.onAnimate = function() {

if (this.movement == 'walk') {
    if (this.left_upperleg.quaternion.w < 0.93) {
        this.movement = 'walk2';
    }
    this.right_upperleg.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1);
    var T = Math.PI/4;
    this.left_upperleg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),0,0,Math.cos(T/2)), 0.1 );
    this.onStep();
    
} else if (this.movement == 'walk2') {
    if (this.right_upperleg.quaternion.w < 0.93) {
        this.movement = 'walk';
    }
    this.left_upperleg.quaternion.slerp(new THREE.Quaternion(0,0,0,1), 0.1);
    var T = Math.PI/4;
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),0,0,Math.cos(T/2)), 0.1 );
    this.onStep();

  } };