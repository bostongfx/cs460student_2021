Robot = function(x, y, z) {

    // constructor
    console.log('new robot', this);

    // head
    this.head = new THREE.Bone();
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;

    this.neck = new THREE.Bone();
    // relative to the head
    this.neck.position.y = -10; 
    this.head.add(this.neck);

    // torso
    this.torso = new THREE.Bone();
    // relative to the neck
    this.torso.position.y = -30;
    this.neck.add(this.torso);

    // other limbs to add

    // LEFT SIDE OF ARMS
    this.left_upper_arm = new THREE.Bone();
    // relative to the neck
    this.left_upper_arm.position.y = -5;
    this.left_upper_arm.position.x = 5;
    this.neck.add(this.left_upper_arm);

    this.left_lower_arm = new THREE.Bone();
    // relative to the left upper arm
    this.left_lower_arm.position.y = -15;
    this.left_lower_arm.position.x = 10;
    this.left_upper_arm.add(this.left_lower_arm);

    this.left_hand = new THREE.Bone();
    // relative to the left lower arm
    this.left_hand.position.y = -5;
    this.left_hand.position.x = 1;
    this.left_lower_arm.add(this.left_hand);

    // RIGHT SIDE OF ARMS
    this.right_upper_arm = new THREE.Bone();
    // relative to the neck
    this.right_upper_arm.position.y = -5;
    this.right_upper_arm.position.x = -5;
    this.neck.add(this.right_upper_arm);

    this.right_lower_arm = new THREE.Bone();
    // relative to the left upper arm
    this.right_lower_arm.position.y = -15;
    this.right_lower_arm.position.x = -10;
    this.right_upper_arm.add(this.right_lower_arm);

    this.right_hand = new THREE.Bone();
    // relative to the left lower arm
    this.right_hand.position.y = -5;
    this.right_hand.position.x = -1;
    this.right_lower_arm.add(this.right_hand);

    // LEFT SIDE OF LEGS   
    this.left_upper_leg = new THREE.Bone();
    // relative to the neck
    this.left_upper_leg.position.y = -15;
    this.left_upper_leg.position.x = 5;
    this.torso.add(this.left_upper_leg);

    this.left_lower_leg = new THREE.Bone();
    // relative to the left upper leg
    this.left_lower_leg.position.y = -15;
    this.left_lower_leg.position.x = 10;
    this.left_upper_leg.add(this.left_lower_leg);

    this.left_foot = new THREE.Bone();
    // relative to the left lower leg
    this.left_foot.position.y = -5;
    this.left_foot.position.x = 1;
    this.left_lower_leg.add(this.left_foot);

    // RIGHT SIDE OF LEGS
    this.right_upper_leg = new THREE.Bone();
    // relative to the neck
    this.right_upper_leg.position.y = -15;
    this.right_upper_leg.position.x = -5;
    this.torso.add(this.right_upper_leg);

    this.right_lower_leg = new THREE.Bone();
    // relative to the right upper leg
    this.right_lower_leg.position.y = -15;
    this.right_lower_leg.position.x = -10;
    this.right_upper_leg.add(this.right_lower_leg);

    this.right_foot = new THREE.Bone();
    // relative to the right lower leg
    this.right_foot.position.y = -5;
    this.right_foot.position.x = -1;
    this.right_lower_leg.add(this.right_foot);

};

Robot.prototype.show = function(scene) {

    console.log(this.head.position);
    rGroup = new THREE.Group();
    rGroup.add(this.head);
    scene.add(rGroup);

    helper = new THREE.SkeletonHelper(rGroup);
    scene.add(helper);

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

Robot.prototype.onAnimate = function() {

    // this gets called in the animation loop for every rendered frame

    // raising of the left arm
    // rotation of 180 degrees around X
    if (this.movement == 'raise left arm') {
  
      var T = -Math.PI;
      this.left_upper_arm.quaternion.slerp( new THREE.Quaternion(Math.sin(T/2),   // x
                                                                0,               // y
                                                                0,               // z
                                                                Math.cos(T/2)),  // w
                                          0.5 );  
        console.log('left arm raised');
    } 
    // lower left arm
    else if (this.movement == 'lower left arm') {
        var T = -Math.PI;
        this.left_lower_arm.quaternion.slerp(new THREE.Quaternion(0,0,0, Math.cos(T/2)), 0.5);
        console.log('left arm lowered');
    }
    
    else if (this.movement == 'kick') {
  
      // check if slerp reached almost the end
      if (this.right_upper_leg.quaternion.w < 0.72) {
  
        // signal that the kick is done and the leg should move back
        this.movement = 'kick done';
  
      } else {
  
        var T = -Math.PI/2;
        this.right_upper_leg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                    0,                   // y
                                                                    0,                   // z
                                                                    Math.cos( T / 2 ) ), // w
                                              0.5 );
                                        
      }
  
    } else if (this.movement == 'kick done') {
  
      // reset leg back to identity
      this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.5 );
      console.log('kick done');
    }
  
  };