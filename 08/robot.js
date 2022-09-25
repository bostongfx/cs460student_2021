Robot = function (x, y, z) {

  // // root 
  // this.root = new THREE.Bone();
  // this.root.position.x = x;
  // this.root.position.y = y;
  // this.root.position.z = z;

  // head 
  this.head = new THREE.Bone();
  this.head.position.x = x;
  this.head.position.y = y;
  this.head.position.z = z;
  // this.root.add(this.head);

  // neck
  this.neck = new THREE.Bone();
  this.neck.position.y = -10;
  this.head.add(this.neck);

  // torso
  this.torso1 = new THREE.Bone();
  this.torso1.position.x = 0;
  this.torso1.position.y = -30;
  this.neck.add(this.torso1);

  this.torso2 = new THREE.Bone();
  this.torso2.position.x = 0;
  this.torso2.position.y = -30;
  this.torso1.add(this.torso2);

  this.torso3 = new THREE.Bone();
  this.torso3.position.x = 0;
  this.torso3.position.y = -25;
  this.torso2.add(this.torso3);

  this.torso4 = new THREE.Bone();
  this.torso4.position.x = 0;
  this.torso4.position.y = -25;
  this.torso3.add(this.torso4);

  // right shoulder
  this.right_shoulder1 = new THREE.Bone();
  this.right_shoulder1.position.x = -10;
  this.right_shoulder1.position.y = 25;
  this.torso1.add(this.right_shoulder1);

  this.right_shoulder2 = new THREE.Bone();
  this.right_shoulder2.position.x = -25;
  this.right_shoulder2.position.y = -5;
  this.right_shoulder1.add(this.right_shoulder2);


  // left shoulder
  this.left_shoulder1 = new THREE.Bone();
  this.left_shoulder1.position.x = 10;
  this.left_shoulder1.position.y = 25;
  this.torso1.add(this.left_shoulder1);

  this.left_shoulder2 = new THREE.Bone();
  this.left_shoulder2.position.x = 25;
  this.left_shoulder2.position.y = -5;
  this.left_shoulder1.add(this.left_shoulder2);

  // right arm
  this.right_upper_arm = new THREE.Bone();
  this.right_upper_arm.position.x = -20;
  this.right_upper_arm.position.y = -60;
  this.right_shoulder2.add(this.right_upper_arm);

  this.right_lower_arm = new THREE.Bone();
  this.right_lower_arm.position.x = -15;
  this.right_lower_arm.position.y = -60;
  this.right_upper_arm.add(this.right_lower_arm);

  this.right_hand = new THREE.Bone();
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -20;
  this.right_lower_arm.add(this.right_hand);

  // // left arm
  this.left_upper_arm = new THREE.Bone();
  this.left_upper_arm.position.x = 20;
  this.left_upper_arm.position.y = -60;
  this.left_shoulder2.add(this.left_upper_arm);

  this.left_lower_arm = new THREE.Bone();
  this.left_lower_arm.position.x = 15;
  this.left_lower_arm.position.y = -60;
  this.left_upper_arm.add(this.left_lower_arm);

  this.left_hand = new THREE.Bone();
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -20;
  this.left_lower_arm.add(this.left_hand);

  // right pelvis
  this.right_pelvis = new THREE.Bone();
  this.right_pelvis.position.x = -20;
  this.right_pelvis.position.y = -15;
  this.torso4.add(this.right_pelvis);

  // left pelvis
  this.left_pelvis = new THREE.Bone();
  this.left_pelvis.position.x = 20;
  this.left_pelvis.position.y = -15;
  this.torso4.add(this.left_pelvis);

  // right leg
  this.right_upper_leg= new THREE.Bone();
  this.right_upper_leg.position.x = -10;
  this.right_upper_leg.position.y = -100;
  this.right_pelvis.add(this.right_upper_leg);

  this.right_lower_leg = new THREE.Bone();
  this.right_lower_leg.position.x = -8;
  this.right_lower_leg.position.y = -80;
  this.right_upper_leg.add(this.right_lower_leg);

  this.right_foot = new THREE.Bone();
  this.right_foot.position.x = -10;
  this.right_foot.position.y = -35;
  this.right_lower_leg.add(this.right_foot);

  // left leg
  this.left_upper_leg= new THREE.Bone();
  this.left_upper_leg.position.x = 10;
  this.left_upper_leg.position.y = -100;
  this.left_pelvis.add(this.left_upper_leg);

  this.left_lower_leg = new THREE.Bone();
  this.left_lower_leg.position.x = 8;
  this.left_lower_leg.position.y = -80;
  this.left_upper_leg.add(this.left_lower_leg);

  this.left_foot = new THREE.Bone();
  this.left_foot.position.x = 10;
  this.left_foot.position.y = -35;
  this.left_lower_leg.add(this.left_foot);



  //////////////////////////////////////////////////////////////////////////
  // interface for the robot
  //////////////////////////////////////////////////////////////////////////

  var ironman_color = new THREE.MeshStandardMaterial( {
    // skinning: true,
    // side: THREE.DoubleSide,
    // flatShading: true,
    map: new THREE.TextureLoader().load( 'ironman/ironman_color.png' )
  } );
  ironman_color.map.rotation = 2;

  var ironman_color2 = new THREE.MeshStandardMaterial( {
    // skinning: true,
    // side: THREE.DoubleSide,
    // flatShading: true,
    map: new THREE.TextureLoader().load( 'ironman/ironman_color2.png' )
  } );
  ironman_color2.map.rotation = 2;

  // head UI //////////////////////////////////////////////////////////
  var ironman_face = new THREE.MeshStandardMaterial( {
    // skinning: true,
    // side: THREE.DoubleSide,
    // flatShading: true,
    map: new THREE.TextureLoader().load( 'ironman/ironman_face.png' )
  } );
  var head_UI = new THREE.Mesh( 
    new THREE.SphereGeometry(22), 
    ironman_face 
  );  
  head_UI.position.y = 9;
  head_UI.rotation.y = -Math.PI/2;
  this.head.add(head_UI);

  // neck UI //////////////////////////////////////////////////////////
  var neck_UI = new THREE.Mesh( 
    new THREE.CylinderGeometry(5, 5, 20, 32), 
    ironman_color 
  );
  this.neck.add(neck_UI);

  // torso UI //////////////////////////////////////////////////////////
  var ironman_torso = new THREE.MeshStandardMaterial( {
    // skinning: true,
    // side: THREE.DoubleSide,
    // flatShading: true,
    map: new THREE.TextureLoader().load( 'ironman/torso.png' )
  } );
  var torso_UI = new THREE.Mesh( 
    new THREE.CylinderGeometry(35, 33, 105, 32), 
    ironman_torso 
  );
  torso_UI.rotation.y = Math.PI + .2;
  this.torso2.add(torso_UI);

  // left shoulder UI //////////////////////////////////////////////////////////
  var left_connect_shoulder_UI = new THREE.Mesh( 
    new THREE.SphereGeometry(14), 
    ironman_color 
  );
  left_connect_shoulder_UI.position.x = 3;
  left_connect_shoulder_UI.position.y = -2;
  this.left_shoulder2.add(left_connect_shoulder_UI);

  // right shoulder UI //////////////////////////////////////////////////////////
  var right_connect_shoulder_UI = new THREE.Mesh( 
    new THREE.SphereGeometry(14), 
    ironman_color 
  );
  right_connect_shoulder_UI.position.x = -3;
  right_connect_shoulder_UI.position.y = -2;
  this.right_shoulder2.add(right_connect_shoulder_UI);

  // left arm UI //////////////////////////////////////////////////////////
  var left_upper_arm_UI = new THREE.Mesh( 
    new THREE.CylinderGeometry(15, 13, 65, 32), 
    ironman_color2 
  );
  left_upper_arm_UI.position.x = 10;
  left_upper_arm_UI.position.y = -25;
  left_upper_arm_UI.rotation.z = .3;
  this.left_shoulder2.add(left_upper_arm_UI);

  var left_lower_arm_UI = new THREE.Mesh( 
    new THREE.CylinderGeometry(12, 10, 60, 32), 
    ironman_color 
  );
  left_lower_arm_UI.position.x = 8;
  left_lower_arm_UI.position.y = -30;
  left_lower_arm_UI.rotation.z =  .2;
  this.left_upper_arm.add(left_lower_arm_UI);

  var left_hand_UI = new THREE.Mesh( 
    new THREE.DodecahedronGeometry(20, 0), 
    ironman_color 
  );
  left_hand_UI.position.x = 1;
  left_hand_UI.position.y = -9;
  // left_hand_UI.rotation.z = .1;
  this.left_lower_arm.add(left_hand_UI);

  var left_connect_arm_UI = new THREE.Mesh( 
    new THREE.SphereGeometry(11.5), 
    ironman_color 
  );
  // left_connect_arm_UI.position.x = 2;
  // left_connect_arm_UI.position.y = -2;
  // this.left_upper_arm.add(left_connect_arm_UI);
  left_connect_arm_UI.position.x = 21;
  left_connect_arm_UI.position.y = -58;
  this.left_shoulder2.add(left_connect_arm_UI);

  // right arm UI //////////////////////////////////////////////////////////
  var right_upper_arm_UI = new THREE.Mesh( 
    new THREE.CylinderGeometry(15, 13, 65, 32), 
    ironman_color2 
  );
  right_upper_arm_UI.position.x = -10;
  right_upper_arm_UI.position.y = -25;
  right_upper_arm_UI.rotation.z = -.3;
  this.right_shoulder2.add(right_upper_arm_UI);

  var right_lower_arm_UI = new THREE.Mesh( 
    new THREE.CylinderGeometry(12, 10, 60, 32), 
    ironman_color 
  );
  right_lower_arm_UI.position.x = -8;
  right_lower_arm_UI.position.y = -30;
  right_lower_arm_UI.rotation.z = -.2;
  this.right_upper_arm.add(right_lower_arm_UI);

  var right_hand_UI = new THREE.Mesh( 
    new THREE.DodecahedronGeometry(20, 0), 
    ironman_color 
  );
  right_hand_UI.position.x = -1;
  right_hand_UI.position.y = -9;
  // left_hand_UI.rotation.z = .1;
  this.right_lower_arm.add(right_hand_UI);

  var right_connect_arm_UI = new THREE.Mesh( 
    new THREE.SphereGeometry(11.5), 
    ironman_color 
  );
  // right_connect_arm_UI.position.x = -2;
  // right_connect_arm_UI.position.y = -2;
  // this.right_upper_arm.add(right_connect_arm_UI);
  right_connect_arm_UI.position.x = -21;
  right_connect_arm_UI.position.y = -58;
  this.right_shoulder2.add(right_connect_arm_UI);

  // left leg UI //////////////////////////////////////////////////////////
  var left_upper_leg_UI = new THREE.Mesh( 
    new THREE.CylinderGeometry(20, 18, 100, 32), 
    ironman_color2 
  );
  left_upper_leg_UI.position.x = 5;
  left_upper_leg_UI.position.y = -50;
  left_upper_leg_UI.rotation.z = .1;
  this.left_pelvis.add(left_upper_leg_UI);

  var left_lower_leg_UI = new THREE.Mesh( 
    new THREE.CylinderGeometry(17, 16, 80, 32), 
    ironman_color 
  );
  left_lower_leg_UI.position.x = 5;
  left_lower_leg_UI.position.y = -45;
  left_lower_leg_UI.rotation.z =  .1;
  this.left_upper_leg.add(left_lower_leg_UI);


  const length1 = 32, width1 = 35;

  const shape1 = new THREE.Shape();
  shape1.moveTo( 0,0 );
  shape1.lineTo( 0, width1 );
  shape1.lineTo( length1, width1 );
  shape1.lineTo( length1, 0 );
  shape1.lineTo( 0, 0 );

  const extrudeSettings1 = {
    steps: 2,
    depth: 75,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 5,
    bevelOffset: 0,
    bevelSegments: 1
  };

  var left_foot_UI = new THREE.Mesh( 
    new THREE.ExtrudeGeometry(shape1, extrudeSettings1), 
    ironman_color 
  );
  left_foot_UI.position.x = -25;
  left_foot_UI.position.y = 0;
  left_foot_UI.position.z = -25;
  // left_foot_UI.rotation.z = .1;
  // this.left_lower_leg.add(left_foot_UI);
  this.left_foot.add(left_foot_UI);

  var left_connect_leg_UI = new THREE.Mesh( 
    new THREE.SphereGeometry(16), 
    ironman_color 
  );
  // left_connect_leg_UI.position.x = -2;
  // left_connect_leg_UI.position.y = -2;
  // this.left_upper_leg.add(left_connect_leg_UI);
  left_connect_leg_UI.position.x = 10;
  left_connect_leg_UI.position.y = -100;
  this.left_pelvis.add(left_connect_leg_UI);

  // right leg UI //////////////////////////////////////////////////////////
  var right_upper_leg_UI = new THREE.Mesh( 
    new THREE.CylinderGeometry(20, 18, 100, 32), 
    ironman_color2 
  );
  right_upper_leg_UI.position.x = -5;
  right_upper_leg_UI.position.y = -50;
  right_upper_leg_UI.rotation.z = -.1;
  this.right_pelvis.add(right_upper_leg_UI);

  var right_lower_leg_UI = new THREE.Mesh( 
    new THREE.CylinderGeometry(17, 16, 80, 32), 
    ironman_color 
  );
  right_lower_leg_UI.position.x = -5;
  right_lower_leg_UI.position.y = -45;
  right_lower_leg_UI.rotation.z =  -.1;
  this.right_upper_leg.add(right_lower_leg_UI);


  const length2 = 32, width2 = 35;

  const shape2 = new THREE.Shape();
  shape2.moveTo( 0,0 );
  shape2.lineTo( 0, width2 );
  shape2.lineTo( length2, width2 );
  shape2.lineTo( length2, 0 );
  shape2.lineTo( 0, 0 );

  const extrudeSettings2 = {
    steps: 2,
    depth: 75,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 5,
    bevelOffset: 0,
    bevelSegments: 1
  };

  var right_foot_UI = new THREE.Mesh( 
    new THREE.ExtrudeGeometry(shape2, extrudeSettings2), 
    ironman_color 
  );
  right_foot_UI.position.x = -7;
  right_foot_UI.position.y = 0;
  right_foot_UI.position.z = -25;
  // right_foot_UI.rotation.z = .1;
  // this.right_lower_leg.add(left_foot_UI);
  this.right_foot.add(right_foot_UI);

  var right_connect_leg_UI = new THREE.Mesh( 
    new THREE.SphereGeometry(16), 
    ironman_color 
  );
  // right_connect_leg_UI.position.x = -2;
  // right_connect_leg_UI.position.y = -2;
  // this.right_upper_leg.add(right_connect_arm_UI);
  right_connect_leg_UI.position.x = -10;
  right_connect_leg_UI.position.y = -100;
  this.right_pelvis.add(right_connect_leg_UI);


  // belt UI //////////////////////////////////////////////////////////
  // const length3 = 74, width3 = 12;

  // const shape3 = new THREE.Shape();
  // shape3.moveTo( 0,0 );
  // shape3.lineTo( 0, width3 );
  // shape3.lineTo( length3, width3 );
  // shape3.lineTo( length3, 0 );
  // shape3.lineTo( 0, 0 );

  // const extrudeSettings3 = {
  //   steps: 2,
  //   depth: 80,
  //   bevelEnabled: true,
  //   bevelThickness: 1,
  //   bevelSize: 5,
  //   bevelOffset: 1,
  //   bevelSegments: 1
  // };

  // var belt_UI = new THREE.Mesh( 
  //   new THREE.ExtrudeGeometry(shape3, extrudeSettings3), 
  //   new THREE.MeshNormalMaterial() 
  // );

  var belt_UI = new THREE.Mesh( 
    new THREE.TorusGeometry( 40, 10, 16, 100 ), 
    ironman_color 
  );

  belt_UI.rotation.x = Math.PI/2;

  // belt_UI.position.x = -37;
  belt_UI.position.y = -10;
  // belt_UI.position.z = -40;
  // right_foot_UI.rotation.z = .1;
  // this.right_lower_leg.add(left_foot_UI);
  this.torso4.add(belt_UI);





  var effect_dancing1 = new THREE.Mesh( 
    new THREE.OctahedronGeometry(30,0), 
    new THREE.MeshNormalMaterial() 
  );
  effect_dancing1.position.y = 100;
  var effect_dancing2 = new THREE.Mesh( 
    new THREE.OctahedronGeometry(30,0), 
    new THREE.MeshNormalMaterial() 
  );
  effect_dancing2.position.x = 70;
  effect_dancing2.position.y = 80;
  var effect_dancing3 = new THREE.Mesh( 
    new THREE.OctahedronGeometry(30,0), 
    new THREE.MeshNormalMaterial() 
  );
  effect_dancing3.position.x = -70;
  effect_dancing3.position.y = 80;
  this.head.add(effect_dancing1);
  this.head.add(effect_dancing2);
  this.head.add(effect_dancing3);
  effect_dancing1.visible = false;
  effect_dancing2.visible = false;
  effect_dancing3.visible = false;

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  // displays the robot 
  Robot.prototype.show = function(scene) {
    var rGroup = new THREE.Group();
    rGroup.add( this.head );

    helper = new THREE.SkeletonHelper( rGroup );
    helper.material.linewidth = 3; // make the skeleton thick
    
    helper.visible = false; 
    scene.add(rGroup);
    scene.add(helper);
  };


  // display skeleton
  Robot.prototype.showSkeleton = function ( visibility ) {
    helper.visible = visibility; 
  }

  // display robot's interface
  Robot.prototype.showRobot = function ( visibility ) {
    head_UI.visible = visibility;
    neck_UI.visible = visibility;
    torso_UI.visible = visibility;

    left_upper_arm_UI.visible = visibility;
    left_lower_arm_UI.visible = visibility;
    left_hand_UI.visible = visibility;

    right_upper_arm_UI.visible = visibility;
    right_lower_arm_UI.visible = visibility;
    right_hand_UI.visible = visibility;

    left_upper_leg_UI.visible = visibility;
    left_lower_leg_UI.visible = visibility;
    left_foot_UI.visible = visibility;

    right_upper_leg_UI.visible = visibility;
    right_lower_leg_UI.visible = visibility;
    right_foot_UI.visible = visibility;

    belt_UI.visible = visibility;

    this.left_pelvis.visible = visibility;
    this.right_pelvis.visible = visibility;
    this.left_shoulder2.visible = visibility;
    this.right_shoulder2.visible = visibility;
    left_connect_arm_UI = visibility;
    right_connect_arm_UI = visibility;
    left_connect_leg_UI = visibility;
    right_connect_leg_UI = visibility;
    left_connect_shoulder_UI = visibility;
    right_connect_shoulder_UI = visibility;
  }

  // some animations
  Robot.prototype.raise_left_arm = function() {
    deactive_all();
    this.movement = 'raise left arm';
  };
  Robot.prototype.lower_left_arm = function() {
    deactive_all();
    this.movement = 'lower left arm';    
  };
  Robot.prototype.kick = function() {
    deactive_all();
    this.movement = 'kick';
  };
  Robot.prototype.dance = function() {
    deactive_all();
    effect_dancing1.visible = true;
    effect_dancing2.visible = true;
    effect_dancing3.visible = true;
    this.movement = 'dance';
  };
  Robot.prototype.walk = function() {
    deactive_all();
    this.movement = 'walk';
  };
  Robot.prototype.run = function() {
    deactive_all();
    this.movement = 'run';
  };

  Robot.prototype.fly = function() {
    deactive_all();
    this.movement = 'fly';
  };
  Robot.prototype.stand = function() {
    // deactive_all();
    this.movement = 'stand';
  };

  // Robot.prototype.assemble = function() {
  //   deactive_all();
  // };

  Robot.prototype.make_monster = function() {
    this.movement = 'make_monster';
    // armadillo_mesh_global.position.set( 0, 500, -2000 );
    // armadillo_mesh_global.visible = true;


    // if (!armadillo_mesh_global.position.equals( {x:0, y:500, z:0} ))
    //   armadillo_mesh_global.translateY(-2);
  };
  monster_move_check = false;
  Robot.prototype.monster_moving = function() {    

    if (armadillo_mesh_global.visible == true ) {
      monster_move_check = true;
      if ( !(this.movement == 'run' || this.movement == 'run2') ) 
      {
        this.movement = 'run';
      }
    }
      
    
  };

  Robot.prototype.onStep = function() {
    var lengthX = 4500;
    var lengthY = 4000;

    var angle = Math.PI / (Math.random()* 6 -0.000001);

    // moving inside the board
    if (this.head.position.x >= lengthX  || 
        this.head.position.x <= -lengthX ||
        this.head.position.z >= lengthY + 500 || 
        this.head.position.z <= -lengthY) {

      if (this.head.position.x >= lengthX) this.head.position.x = lengthX - 50;
      if (this.head.position.x <= -lengthX) this.head.position.x = -lengthX + 50;
      if (this.head.position.z >= lengthY + 500) this.head.position.z = lengthY - 50 + 500;
      if (this.head.position.z <= -lengthY) this.head.position.z = -lengthY + 50;

      this.head.rotateY(angle);
    } 


    // change direction when 2 robots meet each other
    for (var rb in robot_store) {
      if (!robot_store[rb].head.position.equals(this.head.position) &&
        robot_store[rb].head.position.distanceTo(this.head.position) < 170) {
        robot_store[rb].head.rotateY(-Math.PI);
        this.head.rotateY(Math.PI);
      }
    }

    // walk speed 
    this.head.translateZ(10);
    
    // this helps robots not walk through the Armadillo mesh  
    if (armadillo_mesh_global.visible == true){  
      if (armadillo_mesh_global.position.distanceTo(
        this.head.position) < 600) {
        this.head.rotateY(-Math.PI);
        if (armadillo_mesh_global.position.distanceTo(
          this.head.position) < 500) {
          this.head.visible = false;
          for (var rb in robot_store) {
            if (robot_store[rb].head.position.equals(this.head.position)) {
              robot_store.splice(rb, 1);
            }
          }
        }
      }
    


      // Armadillo moving
      if (armadillo_mesh_global.position.x >= lengthX  || 
          armadillo_mesh_global.position.x <= -lengthX ||
          armadillo_mesh_global.position.z >= lengthY + 500  || 
          armadillo_mesh_global.position.z <= -lengthY) {

        if (armadillo_mesh_global.position.x >= lengthX) 
          armadillo_mesh_global.position.x = lengthX - 300;
        if (armadillo_mesh_global.position.x <= -lengthX) 
          armadillo_mesh_global.position.x = -lengthX + 300;
        if (armadillo_mesh_global.position.z >= lengthY) 
          armadillo_mesh_global.position.z = lengthY - 300 + 500;
        if (armadillo_mesh_global.position.z <= -lengthY) 
          armadillo_mesh_global.position.z = -lengthY + 300;

        armadillo_mesh_global.rotateY(angle);
      } 
      if ( monster_move_check )
        armadillo_mesh_global.translateZ(-2);
    } else {
      monster_move_check = false;
      armadillo_mesh_global.position.set( 0, 500 - 700, -8000 );
    }
  };


  ////////////////////////////////////////////////////////////////
  // make all UI back to normal ////////////////////////////////
  ////////////////////////////////////////////////////////////////
  deactive_all = function() {
    // reset head UI     
    head_UI.position.set(0,9,0);
    // head_UI.updateMatrix();

    // neck UI reset
    neck_UI.position.set(0,0,0);

    // torso UI reset
    torso_UI.position.set(0,0,0);

    // left shoulder UI reset
    // left_connect_shoulder_UI.position.set(3,-2,0);

    // right shoulder UI reset
    // right_connect_shoulder_UI.position.set(-3,-2,0);

    // left arm UI reset
    left_upper_arm_UI.position.set(10,-25,0);
    left_upper_arm_UI.rotation.set(0,0,.3);

    left_lower_arm_UI.position.set(8,-30,0);
    left_lower_arm_UI.rotation.set(0,0,.2);

    // left_hand_UI.position.set(1,-9,0);

    // left_connect_arm_UI.position.set(21,-58,0);

    // right arm UI reset
    right_upper_arm_UI.position.set(-10,-25,0);
    right_upper_arm_UI.rotation.set(0,0,-.3);

    right_lower_arm_UI.position.set(-8,-30,0);
    right_lower_arm_UI.rotation.set(0,0,-.2);

    // right_hand_UI.position.set(-1,-9,0);

    // right_connect_arm_UI.position.set(-21,-58,0);

    // left leg UI reset
    left_upper_leg_UI.position.set(5,-50,0);
    left_upper_leg_UI.rotation.set(0,0,.1);

    left_lower_leg_UI.position.set(5,-45,0);
    left_lower_leg_UI.rotation.set(0,0,.1);

    left_foot_UI.position.set(-25,0,-25);
    left_foot_UI.rotation.set(0,0,0);

    // left_connect_leg_UI.position.set(10,-100,0);

    // // right leg UI reset
    right_upper_leg_UI.position.set(-5,-50,0);
    right_upper_leg_UI.rotation.set(0,0,-.1);

    right_lower_leg_UI.position.set(-5,-45,0);
    right_lower_leg_UI.rotation.set(0,0,-.1);

    right_foot_UI.position.set(-7,0,-25);
    right_foot_UI.rotation.set(0,0,0);

    // right_connect_leg_UI.position.set(-10,-100,0);

    // belt UI reset
    belt_UI.position.set(0,-10,0);
    belt_UI.rotation.set(Math.PI/2,0,0);

    // effect dancing reset
    effect_dancing1.visible = false;
    effect_dancing2.visible = false;
    effect_dancing3.visible = false;

    // reset all slerp
    // this.left_shoulder2.rotation.set(0,0,0)


    


  };

  /////////////////////////////////////////////////////////////////
  // animate function
  /////////////////////////////////////////////////////////////////

  Robot.prototype.onAnimate = function() {
    // raise left arm function /////////////////////////////////////////////////////////////////
    if (this.movement == 'raise left arm') {
      // ... TODO slerping
      var T = -Math.PI*5/6;
      this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),  // x
                                                                0,               // y
                                                                0,               // z
                                                                Math.cos(T/2)),  // w
                                                                0.08 ); //slerping speed [0,1]  

    // lower left arm function /////////////////////////////////////////////////////////////////
    } else if (this.movement == 'lower left arm') {
      // ... TODO slerping
      var T = Math.PI*0;
      this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( Math.sin(T/2),    // x
                                                                  0,                // y
                                                                  0,                // z
                                                                  Math.cos(T/2)),   // w
                                                                0.02 ); //slerping speed [0,1]

    // kick function /////////////////////////////////////////////////////////////////
    } else if (this.movement == 'kick') {
      // ... TODO slerping and check once it is done for a backwards slerp
      // you can use the identity quaternion for a backwards slerp

      // check if slerp reached almost the end
      if (this.right_upper_leg.quaternion.w < 0.72) {
        // signal that the kick is done and the leg should move back
        this.movement = 'kick2';
      } else {
        var T = Math.PI/2;
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( T / 2 ) ), 
                                                                    0.1 );
        this.right_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI*0) / 2) ), 
                                                                  0.1 );
      }
    } else if (this.movement == 'kick2') {
      if (this.right_pelvis.quaternion.w < 0.72) {
        // signal that the kick is done and the leg should move back
        this.movement = 'kick3';
      } else {
        var T = Math.PI*0;
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( T / 2 ) ), 
                                                                    0.1 );
        this.right_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/2) / 2 ), 
                                                                      0,
                                                                      0, 
                                                                      Math.cos( (-Math.PI/2) / 2) ), 
                                                                      0.1 );
      }
    } else if (this.movement == 'kick3') {
      // reset leg back to identity
      var T = Math.PI*0;
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( T / 2 ) ), 
                                                                  0.1 );
      this.right_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( T / 2) ), 
                                                                    0.1 );

    // walk function /////////////////////////////////////////////////////////////////
    } else if (this.movement == 'walk') {
      var walk_speed = 0.13;
      // check if slerp reached almost the end
      if (this.right_shoulder2.quaternion.w < 0.93) {
        // signal to loop the dance and dance2
        this.movement = 'walk2';
      } else {
        this.left_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI*0) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI*0) / 2) ), 
                                                                  walk_speed );
        this.right_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/4) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI/4) / 2) ), 
                                                                  walk_speed );
        this.left_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/4) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/4) / 2) ), 
                                                                  walk_speed );
        this.right_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI*0) / 2) ), 
                                                                  walk_speed );
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/4) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI/4) / 2) ), 
                                                                  walk_speed );
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI*0) / 2) ), 
                                                                  walk_speed );
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/4) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/4) / 2) ), 
                                                                  walk_speed );
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/5) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/5) / 2) ), 
                                                                  walk_speed );        
        this.torso1.quaternion.slerp( new THREE.Quaternion( Math.sin( 0.2 / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( 0.2 / 2) ), 
                                                                  walk_speed );
        // this.head.position.x += 10;
        // this.head.position.y += 10;

        // this.head.position.z += 1;
        // head_UI.position.z +=.5;
        // neck_UI.position.z +=.5;
        head_UI.position.z = 10;
        this.head.position.y = 257 - 700;


        // moving (translation)
        this.onStep();


      }
    } else if (this.movement == 'walk2') {
      var walk_speed = 0.13;
      if (this.left_shoulder2.quaternion.w < 0.93) {
        // signal to loop the dance and dance2
        this.movement = 'walk';
      } else {
        this.left_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/4) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (Math.PI/4) / 2) ), 
                                                                    walk_speed );
        this.right_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI*0) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (Math.PI*0) / 2) ), 
                                                                    walk_speed );
        this.left_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (-Math.PI*0) / 2) ), 
                                                                    walk_speed );
        this.right_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/4) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (-Math.PI/4) / 2) ), 
                                                                    walk_speed );
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (-Math.PI*0) / 2) ), 
                                                                    walk_speed );
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/4) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (Math.PI/4) / 2) ), 
                                                                    walk_speed );
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/5) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/5) / 2) ), 
                                                                  walk_speed );
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/4) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/4) / 2) ), 
                                                                  walk_speed );        
        this.torso1.quaternion.slerp( new THREE.Quaternion( Math.sin( 0.1 / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( 0.1 / 2) ), 
                                                                  walk_speed );
        
        // this.head.position.z -= 1;
        // head_UI.position.z -=.5;
        // neck_UI.position.z -=.5;
        head_UI.position.z = 10;
        this.head.position.y = 257 - 700;


        // moving (translation)
        this.onStep();
      } 

      // run function /////////////////////////////////////////////////////////////////
      } else if (this.movement == 'run') {
        var run_speed = 0.4;
      // check if slerp reached almost the end
      if (this.right_shoulder2.quaternion.w < 0.71) {
        // signal to loop the dance and dance2
        this.movement = 'run2';
      } else {
        this.left_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI*0) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI*0) / 2) ), 
                                                                  run_speed );
        this.right_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/2) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI/2) / 2) ), 
                                                                  run_speed );
        this.left_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/2) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/2) / 2) ), 
                                                                  run_speed );
        this.right_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI*0) / 2) ), 
                                                                  run_speed );
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/2) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI/2) / 2) ), 
                                                                  run_speed );
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI*0) / 2) ), 
                                                                  run_speed );
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/2) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/2) / 2) ), 
                                                                  run_speed );
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/5) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/5) / 2) ), 
                                                                  run_speed );        
        this.torso1.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/6) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI/6) / 2) ), 
                                                                  run_speed );
        // this.head.position.x += 10;
        // this.head.position.y += 10;

        // this.head.position.z += 4.5;
        head_UI.position.z = 20;
        neck_UI.position.z = 15;
        this.head.position.y = 257 - 700;

        // moving (translation)
        this.onStep();
        this.head.translateZ(20);
      }
    } else if (this.movement == 'run2') {
      var run_speed = 0.4;
      if (this.left_shoulder2.quaternion.w < 0.71) {
        // signal to loop the dance and dance2
        this.movement = 'run';
      } else {
        this.left_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/2) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (Math.PI/2) / 2) ), 
                                                                    run_speed );
        this.right_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI*0) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (Math.PI*0) / 2) ), 
                                                                    run_speed );
        this.left_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (-Math.PI*0) / 2) ), 
                                                                    run_speed );
        this.right_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/2) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (-Math.PI/2) / 2) ), 
                                                                    run_speed );
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (-Math.PI*0) / 2) ), 
                                                                    run_speed );
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/2) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (Math.PI/2) / 2) ), 
                                                                    run_speed );
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/5) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/5) / 2) ), 
                                                                  run_speed );
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/2) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/2) / 2) ), 
                                                                  run_speed );        
        this.torso1.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/5) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI/5) / 2) ), 
                                                                  run_speed );
        // this.head.position.z -= 4.5;
        head_UI.position.z = 20;
        neck_UI.position.z = 15;
        this.head.position.y = 257 - 700;

        // moving (translation)
        this.onStep();
        this.head.translateZ(20);

      } 
    } else if (this.movement == 'fly') {
        var run_speed = 0.4;


        this.left_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI*0) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI*0) / 2) ), 
                                                                  run_speed );
        this.right_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/2) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI/2) / 2) ), 
                                                                  run_speed );
        this.left_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/2) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/2) / 2) ), 
                                                                  run_speed );
        this.right_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI*0) / 2) ), 
                                                                  run_speed );
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/2) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI/2) / 2) ), 
                                                                  run_speed );
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI*0) / 2) ), 
                                                                  run_speed );
        this.left_upper_arm.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/2) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/2) / 2) ), 
                                                                  run_speed );
        this.right_upper_arm.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/5) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/5) / 2) ), 
                                                                  run_speed );        
        this.torso1.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/6) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI/6) / 2) ), 
                                                                  run_speed );
        // this.head.position.x += 10;
        // this.head.position.y += 10;

        // this.head.position.z += 4.5;
        head_UI.position.z = 20;
        neck_UI.position.z = 15;

        // moving (translation)
        this.onStep();
        this.head.position.y = 2000;
        this.head.translateZ(30);
      
    // dance function /////////////////////////////////////////////////////////////////
    } else if (this.movement == 'dance') {
      // check if slerp reached almost the end
      if (this.left_shoulder2.quaternion.w < 0.59) {
        // signal to loop the dance and dance2
        this.movement = 'dance2';
      } else {
        this.left_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*3/5) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI*3/5) / 2) ), //.58
                                                                  0.3 );
        this.right_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*2/5) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI*2/5) / 2) ), //.80
                                                                  0.3 );
        this.left_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/4) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/4) / 2) ), 
                                                                  0.3 );
        this.right_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/4) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI/4) / 2) ), 
                                                                  0.3 );
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/4) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI/4) / 2) ), 
                                                                  0.3 );
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (Math.PI/4) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (Math.PI/4) / 2) ), 
                                                                  0.3 );

        this.head.position.x += 1;
        this.head.position.z += 1;
        head_UI.position.x += .5;
        head_UI.position.z += 1;
        neck_UI.position.x += .5;
        neck_UI.position.z += 1;
        left_hand_UI.rotation.z +=.5;
        right_hand_UI.rotation.z +=.5;
        left_foot_UI.rotation.z +=1;
        right_foot_UI.rotation.z +=1;
        torso_UI.position.y +=.3;
        belt_UI.position.y +=1;
        left_lower_leg_UI.position.y +=.3;
        right_lower_leg_UI.position.y -=.4;
        left_upper_leg_UI.position.y +=.3;
        right_upper_leg_UI.position.y -=.4;
        
        effect_dancing1.rotation.z +=1;
        effect_dancing2.rotation.z +=1;
        effect_dancing3.rotation.z +=1;  
      }
    } else if (this.movement == 'dance2') {
      if (this.right_shoulder2.quaternion.w < 0.59 ) {
        // signal to loop the dance and dance2
        this.movement = 'dance';
      } else {
        this.left_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*2/5) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI*2/5) / 2) ), 
                                                                  0.3 );
        this.right_shoulder2.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*3/5) / 2 ), 
                                                                  0,
                                                                  0, 
                                                                  Math.cos( (-Math.PI*3/5) / 2) ), 
                                                                  0.3 );
        this.left_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (-Math.PI*0) / 2) ), 
                                                                    0.5 );
        this.right_pelvis.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI/2) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (-Math.PI/2) / 2) ), 
                                                                    0.5 );
        this.left_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( (-Math.PI*0) / 2 ), 
                                                                    0,
                                                                    0, 
                                                                    Math.cos( (-Math.PI*0) / 2) ), 
                                                                    0.5 );

        this.head.position.x -= 1;
        this.head.position.z -= 1;
        head_UI.position.x -= .5;
        head_UI.position.z -= 1;
        neck_UI.position.x -= .5;
        neck_UI.position.z -= 1;
        left_hand_UI.rotation.z +=.5;
        right_hand_UI.rotation.z +=.5;
        left_foot_UI.rotation.z -=1;
        right_foot_UI.rotation.z -=1;
        torso_UI.position.y -=.3;
        belt_UI.position.y -=1;
        left_lower_leg_UI.position.y -=.3;
        right_lower_leg_UI.position.y +=.4;
        left_upper_leg_UI.position.y -=.3;
        right_upper_leg_UI.position.y +=.4;


        effect_dancing1.rotation.z -=1;
        effect_dancing2.rotation.z -=1;
        effect_dancing3.rotation.z -=1;
      }

    } else if (this.movement == 'stand') {
      // for (var rb in robot_store) {
      //   rb.head.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);
      // }
    } else if (this.movement == 'make_monster') {
      if (Math.round(armadillo_mesh_global.position.y) >= 460 - 700){
        armadillo_mesh_global.translateY(-20);
        // if (armadillo_mesh_global.position.y == 440 - 700){ some error with y-axis
        if (Math.round(armadillo_mesh_global.position.y) <= 460 - 700){
          floor.visible = false;
          floor2.visible = true;
          document.body.style.backgroundImage = "url('sky3.jpg')";
        }
      }
      else this.movement = 'walk';
    } else {
    }
  };
}