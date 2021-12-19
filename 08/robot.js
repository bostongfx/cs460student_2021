// part 2
// part 3 4 5 6 7 9
Robot = function(x, y ,z){


  // create head, neck, and torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  // bonus 1, reference :
  // https://threejs.org/docs/#api/en/loaders/TextureLoader
  var geo = new THREE.SphereGeometry( 15, 15,  15);
  var texture = new THREE.TextureLoader().load( "Face.png" );
  texture.offset.x = 0.30;
  var mat = new THREE.MeshPhongMaterial( {map: texture} );
  var sphere = new THREE.Mesh( geo, mat );


  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );


  this.root = bones[ 0 ]; 
  this.root.position.set(x, y, z);

  this.head = bones[ 1 ];
  this.head.add( sphere );
  this.head.position.y = 10;

  this.neck = bones[ 2 ];
  this.neck.position.y = -10;

  this.torso = bones[ 3 ];
  this.torso.position.y = -30;

  this.body_mesh = mesh;

  
  this.head = mesh

  // create left upper, lower arm and hand
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.neck.add(bones[0]);

  this.left_upperarm = bones[ 1 ];
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;

  this.left_lowerarm = bones[ 2 ];
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 5;

  this.left_hand = bones[ 3 ];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;  

  this.leftarm_mesh = mesh;

  // create right upper, lower arm and hand
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.neck.add(bones[0]);

  this.right_upperarm = bones[ 1 ];
  this.right_upperarm.position.y = -5;
  this.right_upperarm.position.x = -5;

  this.right_lowerarm = bones[ 2 ];
  this.right_lowerarm.position.y = -15;
  this.right_lowerarm.position.x = -5;

  this.right_hand = bones[ 3 ];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;  

  this.rightarm_mesh = mesh;


  // create left upper,lower leg and foot
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.torso.add(bones[0]);

  this.left_upperleg = bones[1];
  this.left_upperleg.position.x = 5;
  this.left_upperleg.position.y = -5;

  this.left_lowerleg = bones[2];
  this.left_lowerleg.position.x = 5;
  this.left_lowerleg.position.y = -15;

  this.left_foot = bones[3];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;

  this.leftleg_mesh = mesh;

  // create right upper, lower leg and foot 
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.torso.add(bones[0]);

  this.right_upperleg = bones[1];
  this.right_upperleg.position.x = -5;
  this.right_upperleg.position.y = -5;

  this.right_lowerleg = bones[2];
  this.right_lowerleg.position.x = -5;
  this.right_lowerleg.position.y = -15;

  this.right_foot = bones[3];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;

  this.rightleg_mesh = mesh;

  this.movement = null;
};

Robot.prototype.show = function(scene) {

  // var rGroup = new THREE.Group();
  // rGroup.add( this.head );

  // var helper = new THREE.SkeletonHelper( rGroup );
  // helper.material.linewidth = 3; // make the skeleton thick

  // scene.add(rGroup);
  // scene.add(helper);
  scene.add( this.body_mesh );
  scene.add( this.leftarm_mesh );
  scene.add( this.rightarm_mesh );
  scene.add( this.leftleg_mesh );
  scene.add( this.rightleg_mesh );
};

// copy from Daniel's solution
Robot.prototype.raise_left_arm = function() {
	this.movement = 'raise left arm';
};

Robot.prototype.lower_left_arm = function() {
	this.movement = 'lower left arm';
};

Robot.prototype.kick = function() {
	this.movement = 'kick';
};

Robot.prototype.dance = function() {
	this.movement = 'dance';
};

Robot.prototype.walk = function() {
  this.movement = 'walk';
};

// hw8
Robot.prototype.onStep = function() {
  // bonus 2
  objTex = new THREE.TextureLoader().load( 'cover.png' );
  var geometry = new THREE.BoxGeometry( 100,100,100 );
  var material = new THREE.MeshBasicMaterial( {map: objTex} );
  var box = new THREE.Mesh( geometry, material );
  box.position.x = 0;
  box.position.z = 0; 
  box.position.y = -60;


  this.root.translateZ(10);
  if ((this.root.position.z > 490) || (this.root.position.z < -490) ||
      (this.root.position.x > 490) || (this.root.position.x < -490)) {
    this.root.rotateY(Math.PI);
  }

  for(var i in robots){
    if(!this.root.position.equals(robots[i].root.position)){
       if(this.root.position.distanceTo(robots[i].root.position) < 70){
          this.root.rotateY(Math.PI);
      }
    }
  } 
  
  // bonus 2
  if (this.root.position.distanceTo(box.position) < 70) {
    this.root.rotateY(Math.PI);
  }
}

// copy from Daniel's solution
Robot.prototype.onAnimate = function() {
	
	if (this.movement == 'raise left arm') {

    var T = Math.PI;
    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.1 );

  } else  if (this.movement == 'lower left arm') {

    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),
                                        0.1 );

  } else if (this.movement == 'kick') {
  
    // check if slerp reached almost the end
    if (this.right_upperleg.quaternion.w < 0.72) {
  
      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';
  
    } else {
  
      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
  
    }
  
  } else if (this.movement == 'kick done') {
  
    // reset leg back to identity
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  
  } // hw8 
  else  if (this.movement == 'walk') {

    var T = -Math.PI/4;
    this.left_upperleg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0, 0, Math.cos(T/2)),0.1 );
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),0.1 );
    
    if(this.left_upperleg.quaternion.w < .93){
      this.movement = 'walk2';
      this.onStep();
    }
    
} else  if (this.movement == 'walk2') {

  var T = -Math.PI/4;
  this.right_upperleg.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2), 0, 0, Math.cos(T/2)), 0.1 );
  this.left_upperleg.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),0.1 );
  
  if(this.right_upperleg.quaternion.w < .93){
    this.movement = 'walk';
    this.onStep();
  }
 
} else if (this.movement == 'dance') {

    if (typeof this.dancer === 'undefined') {

      this.dancer = setInterval(function() {

        // 
        // some random translation
        //
        var shakehead = 3*Math.random();
        if (Math.random() < .5) {
          shakehead *= -1;
        }

        var shakeneck = 3*Math.random();
        if (Math.random() < .5) {
          shakeneck *= -1;
        }

        var shaketorso = 3*Math.random();
        if (Math.random() < .5) {
          shaketorso *= -1;
        }

        this.head.position.x += shakehead;

        this.neck.position.x += shakeneck;

        this.torso.position.x += shaketorso;


        //
        // use actions
        //
        if (Math.random() < .3) {
          this.raise_left_arm();
        }

        if (Math.random() < .3) {
          this.lower_left_arm();
        }

        if (Math.random() < .3) {
          this.kick();
        }

        if (Math.random() < .3) {
          this.movement = 'kick done';
        }

      }.bind(this), 500);

    }

  }

};

