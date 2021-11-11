Robot = function(x, y, z) {

    // head, neck, torso
    var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromHelper[0];
    var material = fromHelper[1];
    var bones = fromHelper[2];

 

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]); // anchor of our skeleton
    mesh.bind(skeleton);

    
  

    this.root = bones[0];
    this.root.position.set(x, -14, z);

    // Bonus 1
    var geometryHead = new THREE.BoxGeometry( 10, 10,  10);
    var texture = new THREE.TextureLoader().load( "void.jpg" );
    var materialHead = new THREE.MeshBasicMaterial( {map: texture} );
    var headShape = new THREE.Mesh( geometryHead, materialHead );

    this.head = bones[1]; // new THREE.Bone();
    this.head.add( headShape );
   
    this.head.position.set(0, -10, 0);
    // this.head.position.y = -10;
  
    this.neck = bones[2]; //new THREE.Bone();
    this.neck.position.y = -5;
  
    //this.head.add(this.neck);
  
    this.torso = bones[3] //new THREE.Bone();
    this.torso.position.y = -30;
  
   //this.neck.add(this.torso);

   this.body_mesh = mesh;


   this.head = mesh;

   // create left upper, lower arm and hand
   var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
   var geometry = fromhelper[0];
   var material = fromhelper[1];
   var bones = fromhelper[2];

   var mesh = new THREE.SkinnedMesh(geometry, material);
   var skeleton = new THREE.Skeleton(bones);
   mesh.add(bones[0]); // anchor of our skeleton
   mesh.bind(skeleton);

   this.neck.add(bones[0]);

  // Set left upper arm, lower arm left hand to bones
    this.left_upperarm = bones[1];//new THREE.Bone();
    this.left_upperarm.position.y = -5;
    this.left_upperarm.position.x = 5;
  
    this.left_lowerarm = bones[2]; //new THREE.Bone();
    this.left_lowerarm.position.y = -15;
    this.left_lowerarm.position.x = 5;
  
    this.left_hand = bones[3]; //new THREE.Bone();
    this.left_hand.position.x = 5;
    this.left_hand.position.y = -5;
  
    this.larm_mesh = mesh;

    //this.neck.add(this.left_upperarm);
    //this.left_upperarm.add(this.left_lowerarm)
    //this.left_lowerarm.add(this.left_hand);
  
  // Create hepler function for left leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  // Bonus 2 references: stackoverflow

video = document.createElement( 'video' );
video.src = "test.ogv";
video.load(); 
video.play();
videoImage = document.createElement( 'canvas' );
videoImage.width = 480;
videoImage.height = 204;

videoImageContext = videoImage.getContext( '2d' );
// background color if no video present
videoImageContext.fillStyle = '#000000';
videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

videoTexture = new THREE.Texture( videoImage );
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

  this.torso.add(bones[0]);
// Set left upper leg, lower leg left leg to bones
    this.left_upperleg = bones[1]; //new THREE.Bone();
    this.left_upperleg.position.x = 5;
    this.left_upperleg.position.y = -5;
  
    this.left_lowerleg = bones[2]; //new THREE.Bone();
    this.left_lowerleg.position.x = 5;
    this.left_lowerleg.position.y = -15;
  
    this.left_foot = bones[3]; //new THREE.Bone();
    this.left_foot.position.x = 5;
    this.left_foot.position.y = -5;
  
    // this.torso.add(this.left_upperleg);
    // this.left_upperleg.add(this.left_lowerleg)
    // this.left_lowerleg.add(this.left_foot);
  
    this.lleg_mesh = mesh;
  
   // create right upper, lower arm and hand
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );


  this.neck.add(bones[0]);
  
    this.right_upperarm = bones[1]; //new THREE.Bone();
    this.right_upperarm.position.y = -5;
    this.right_upperarm.position.x = -5;
  
    this.right_lowerarm = bones[2]; //new THREE.Bone();
    this.right_lowerarm.position.y = -15;
    this.right_lowerarm.position.x = -5;
  
    this.right_hand = bones[3]; //new THREE.Bone();
    this.right_hand.position.x = -5;
    this.right_hand.position.y = -5;
  
    // this.neck.add(this.right_upperarm);
    // this.right_upperarm.add(this.right_lowerarm)
    // this.right_lowerarm.add(this.right_hand);

    this.rarm_mesh = mesh;
  
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
    this.right_upperleg = bones[1]; //new THREE.Bone();
    this.right_upperleg.position.x = -5;
    this.right_upperleg.position.y = -5;
  
    this.right_lowerleg = bones[2]; //new THREE.Bone();
    this.right_lowerleg.position.x = -5;
    this.right_lowerleg.position.y = -15;
  
    this.right_foot = bones[3]; //new THREE.Bone();
    this.right_foot.position.x = -5;
    this.right_foot.position.y = -5;
  
    // this.torso.add(this.right_upperleg);
    // this.right_upperleg.add(this.right_lowerleg)
    // this.right_lowerleg.add(this.right_foot);
  
    this.rleg_mesh = mesh;
    this.movement = null;
  
  };
  
  
  Robot.prototype.show = function(scene) {
  
    // var rGroup = new THREE.Group();
    // rGroup.add( this.head );
  
    // var helper = new THREE.SkeletonHelper( rGroup );
    // helper.material.linewidth = 3;
  
    // scene.add(rGroup);
    // scene.add(helper);
  
  scene.add(this.body_mesh);
   scene.add(this.larm_mesh);
    scene.add(this.lleg_mesh);
    scene.add(this.rarm_mesh);
   
    scene.add(this.rleg_mesh);
    
    
  };
  
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