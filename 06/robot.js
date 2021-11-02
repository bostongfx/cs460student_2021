Robot = function(x, y, z) {

	// constructor
	// console.log('new robot', this);

	// Head (Global Position)
	this.head = new THREE.Bone();
	this.head.position.x = x;
	this.head.position.y = y;
	this.head.position.z = z;

	// Neck
	this.neck = new THREE.Bone();
	this.neck.position.y = -10;  // relative to the head

	this.head.add(this.neck);

	// Torso
	this.torso =  new THREE.Bone();
	this.torso.position.y = -30;  // relative to the neck

	this.neck.add(this.torso);

	// Left Upper Arm
	this.left_upper_arm = new THREE.Bone();
	this.left_upper_arm.position.x = 5;   // relative to the neck
	this.left_upper_arm.position.y = -5;  

	this.neck.add(this.left_upper_arm);

	// Left Lower Arm
	this.left_lower_arm = new THREE.Bone();
	this.left_lower_arm.position.x = 10;   // relative to the L upper arm
	this.left_lower_arm.position.y = -15;  

	this.left_upper_arm.add(this.left_lower_arm);

	// 	Left Hand
	this.left_hand = new THREE.Bone();
	this.left_hand.position.x = -1;   // relative to the L lower arm
	this.left_hand.position.y = -5;  

	this.left_lower_arm.add(this.left_hand);

	// Right Upper Arm
	this.right_upper_arm = new THREE.Bone();
	this.right_upper_arm.position.x = -5;   // relative to the neck
	this.right_upper_arm.position.y = -5;  

	this.neck.add(this.right_upper_arm);

	// Right Lower Arm
	this.right_lower_arm = new THREE.Bone();
	this.right_lower_arm.position.x = -10;   // relative to the R upper arm
	this.right_lower_arm.position.y = -15;  

	this.right_upper_arm.add(this.right_lower_arm);

	// 	Right Hand
	this.right_hand = new THREE.Bone();
	this.right_hand.position.x = -3;   // relative to the R lower arm
	this.right_hand.position.y = 5;  

	this.right_lower_arm.add(this.right_hand);

	// Right Upper Leg
	this.right_upper_leg = new THREE.Bone();
	this.right_upper_leg.position.x = -5;
	this.right_upper_leg.position.y = -5;

	this.torso.add(this.right_upper_leg);

	// Right Lower Leg
	this.right_lower_leg = new THREE.Bone();
	this.right_lower_leg.position.x = -5;
	this.right_lower_leg.position.y = -15;

	this.right_upper_leg.add(this.right_lower_leg);

	// Right Foot
	this.right_foot = new THREE.Bone();
	this.right_foot.position.x = -5;
	this.right_foot.position.y = -5;

	this.right_lower_leg.add(this.right_foot);

	// Left Upper Leg
	this.left_upper_leg = new THREE.Bone();
	this.left_upper_leg.position.x = 5;
	this.left_upper_leg.position.y = -5;

	this.torso.add(this.left_upper_leg);

	// Left Lower Leg
	this.left_lower_leg = new THREE.Bone();
	this.left_lower_leg.position.x = 5;
	this.left_lower_leg.position.y = -15;

	this.left_upper_leg.add(this.left_lower_leg);

	// Left Foot
	this.left_foot = new THREE.Bone();
	this.left_foot.position.x = 5;
	this.left_foot.position.y = -5;

	this.left_lower_leg.add(this.left_foot);

	this.movement = '';

};

// prints the robot as a stick figure
Robot.prototype.show = function(scene) {

	// console.log(this.head.position);

	// first, we create a Three.JS group to group limbs together
	// and add the head to it (ie. the root of the group)
	rGroup = new THREE.Group();
	rGroup.add( this.head );

	// skeleton helper 
	helper = new THREE.SkeletonHelper( rGroup );
	helper.material.linewidth = 3;  // make the skeleton thicker

	// and add both rGroup and helper to the scene
	scene.add(rGroup);
	scene.add(helper); 

};

Robot.prototype.raiseLeftArm = function() {

	this.movement = 'raise_left_arm';

};

Robot.prototype.lowerLeftArm = function() {

	this.movement = 'lower_left_arm';

};

Robot.prototype.kick = function() {

	this.movement = 'kick';

};

Robot.prototype.onAnimate = function() {

	// this gets called in the animation loop
	// for every rendered frame

	// raising of the left arm
	// rotation of 180 degrees around X

	if (this.movement == 'raise_left_arm') {


		var T = Math.PI;
		var x = Math.sin( T/2 );
		var y = 0;
		var z = 0;
		var w = Math.cos( T/2 );

		// setup quaternion
		var q2 = new THREE.Quaternion(x, y, z, w);

		// slerping
		// grab quaternion of left upper arm
		// and slerp to a new quaternion, q2
		var q = this.left_upper_arm.quaternion;
		q.slerp( q2, 0.1 );

	} else if (this.movement == 'lower_left_arm') {

		var q2 = new THREE.Quaternion(0, 0, 0, 1);
		var q = this.left_upper_arm.quaternion;
		q.slerp( q2, 0.1 );

	} else if (this.movement == 'kick') {

		// check if slerp reached almost the end
    	if (this.right_upper_leg.quaternion.w < 0.72) {

    		// signal that the kick is done and the leg should move back
      		this.movement = 'kick done';

    	} else {

    		var T = Math.PI/2;
			var x = Math.sin( T/2 );
			var y = 0;
			var z = 0;
			var w = Math.cos( T/2 );

			// setup quaternion
			var q2 = new THREE.Quaternion(x, y, z, w);

			// slerping
			var q = this.right_upper_leg.quaternion;
			q.slerp( q2, 0.1 );

    	};

	} else if (this.movement == 'kick done') {

		// reset leg back to identity
		this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );


	}

};