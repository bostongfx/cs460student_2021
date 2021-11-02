Robot = function(x, y, z) {

	this.head = new THREE.Bone();
	this.head.position.x = x;
	this.head.position.y = y;
	this.head.position.z = z;
	
	this.neck = new THREE.Bone();
	this.neck.position.y = -12;
	this.head.add(this.neck);


	this.torso = new THREE.Bone();
	this.torso.position.y = -36;
	this.neck.add(this.torso);

	// left
	this.left_upper_arm = new THREE.Bone();
	this.left_upper_arm.position.y = -10;
	this.left_upper_arm.position.x = 5;
	this.neck.add(this.left_upper_arm);

	this.left_lower_arm = new THREE.Bone();
	this.left_lower_arm.position.y = -10;
	this.left_lower_arm.position.x = 8;
	this.left_upper_arm.add(this.left_lower_arm);

	this.left_hand = new THREE.Bone();
	this.left_hand.position.y = 0;
	this.left_hand.position.x = 3;
	this.left_lower_arm.add(this.left_hand);

	this.left_upper_leg = new THREE.Bone();
	this.left_upper_leg.position.y = -10;
	this.left_upper_leg.position.x = 5;
	this.torso.add(this.left_upper_leg);

	this.left_lower_leg = new THREE.Bone();
	this.left_lower_leg.position.y = -20;
	this.left_lower_leg.position.x = 5;
	this.left_upper_leg.add(this.left_lower_leg);

	this.left_foot = new THREE.Bone();
	this.left_foot.position.y = -3;
	this.left_foot.position.x = 5;
	this.left_lower_leg.add(this.left_foot);

	// right
	this.right_upper_arm = new THREE.Bone();
	this.right_upper_arm.position.y = -10;
	this.right_upper_arm.position.x = -5;
	this.neck.add(this.right_upper_arm);

	this.right_lower_arm = new THREE.Bone();
	this.right_lower_arm.position.y = -10;
	this.right_lower_arm.position.x = -8;
	this.right_upper_arm.add(this.right_lower_arm);

	this.right_hand = new THREE.Bone();
	this.right_hand.position.y = 0;
	this.right_hand.position.x = -3;
	this.right_lower_arm.add(this.right_hand);

	this.right_upper_leg = new THREE.Bone();
	this.right_upper_leg.position.y = -10;
	this.right_upper_leg.position.x = -5;
	this.torso.add(this.right_upper_leg);

	this.right_lower_leg = new THREE.Bone();
	this.right_lower_leg.position.y = -20;
	this.right_lower_leg.position.x = -5;
	this.right_upper_leg.add(this.right_lower_leg);

	this.right_foot = new THREE.Bone();
	this.right_foot.position.y = -3;
	this.right_foot.position.x = -5;
	this.right_lower_leg.add(this.right_foot);

	this.movement = '';

};


Robot.prototype.show = function(scene) {
	rGroup = new THREE.Group();
	rGroup.add(this.head);

	helper = new THREE.SkeletonHelper(rGroup);
	helper.material.linewidth = 3;

	scene.add(rGroup);
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

Robot.prototype.dance = function() {
	this.movement = 'dance';
};


var T = - Math.PI;
Robot.prototype.onAnimate = function() {
	if (this.movement == 'raise left arm') {
		
		var x = Math.sin( T/2 );
		var y = 0;
		var z = 0;
		var w = Math.cos( T/2 );

		var q2 = new THREE.Quaternion(x, y, z, w);

		// slerping
		var q = this.left_upper_arm.quaternion;
		q.slerp( q2, 0.1);
	
	} else if (this.movement == 'lower left arm') {

		var x = 0;
		var y = 0;
		var z = 0;
		var w = 1;

		var q2 = new THREE.Quaternion(x, y, z, w);

		// slerping
		var q = this.left_upper_arm.quaternion;
		q.slerp( q2, 0.1);

	} else if (this.movement == 'kick') {
			var x = Math.sin( T/4 );
			var y = 0;
			var z = 0;
			var w = Math.cos( T/4 );

			var q2 = new THREE.Quaternion(x, y, z, w);

			// slerping
			var q = this.left_upper_leg.quaternion;
			q.slerp( q2, 0.04);

			// check if slerp reached almost the end
		 	if (q.w < 0.72) {

      this.movement = 'kick done';
    } 
	} else if (this.movement == 'kick done') {
		var q2 = new THREE.Quaternion(0, 0, 0, 1);
		this.left_upper_leg.quaternion.slerp( q2, 0.05 );


	} else if (this.movement == 'dance') {
			var x = Math.sin( T/4 );
			var y = 0;
			var z = 0;
			var w = Math.cos( T/4 );
			var q1 = new THREE.Quaternion(x, y, z, w);
			var q2 = new THREE.Quaternion(x, y, z, -w);


			var q_left_upper_leg = this.left_upper_leg.quaternion.slerp(q1, 0.05);
		 	if (q_left_upper_leg.w < 0.72) {	 		
		 		this.left_upper_leg.quaternion.slerp( q2, 0.8 );
    	} 

    	var q_right_upper_leg = this.right_upper_leg.quaternion.slerp(q2, 0.05);
		 	if (q_right_upper_leg.w < 0.72) {	 		
		 		this.right_upper_leg.quaternion.slerp( q1, 0.8 );
    	} 

    	var q_left_lower_leg = this.left_lower_leg.quaternion.slerp(q1, 0.05);
		 	if (q_left_lower_leg.w < 0.72) {	 		
		 		this.left_lower_leg.quaternion.slerp( q2, 0.8 );
    	} 

    	var q_right_lower_leg = this.right_lower_leg.quaternion.slerp(q2, 0.05);
		 	if (q_right_lower_leg.w < 0.72) {	 		
		 		this.right_lower_leg.quaternion.slerp( q1, 0.8 );
    	} 


    	var x2 = Math.sin( T/4 );
			var y2 = Math.sin( T/3 );
			var z2 = 0;
			var w2 = Math.cos( T/4 );
			var q3 = new THREE.Quaternion(x2, y2, z2, w2);
			var q4 = new THREE.Quaternion(x2, y2, z2, -w2);

			this.left_upper_arm.position.y = 5;
			this.left_upper_arm.position.x = 5;
			this.left_hand.position.y = 10;
			this.left_hand.position.x = -3;

			var q_left_upper_arm = this.left_upper_arm.quaternion.slerp(q3, 0.07);
		 	if (q_left_upper_arm.w < 0.72) {	 		
		 		this.left_upper_arm.quaternion.slerp( q4, 0.8 );
    	} 

    	var q_right_upper_arm = this.right_upper_arm.quaternion.slerp(q4, 0.07);
		 	if (q_right_upper_arm.w < 0.72) {	 		
		 		this.right_upper_arm.quaternion.slerp( q3, 0.8 );
    	} 

    	var q_left_lower_arm = this.left_lower_arm.quaternion.slerp(q3, 0.07);
		 	if (q_left_lower_arm.w < 0.72) {	 		
		 		this.left_lower_arm.quaternion.slerp( q4, 0.8 );
    	} 

    	var q_right_lower_arm = this.right_lower_arm.quaternion.slerp(q4, 0.07);
		 	if (q_right_lower_arm.w < 0.72) {	 		
		 		this.right_lower_arm.quaternion.slerp( q3, 0.8 );
    	} 

	} 


};