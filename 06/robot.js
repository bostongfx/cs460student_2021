// part 2
// part 3 4 5 6 7 9
Robot = function(x, y ,z){

	// head
	this.head = new THREE.Bone();
	this.head.position.x = x;
	this.head.position.y = y;
	this.head.position.z = z;

  //neck and add it to head
  this.neck = new THREE.Bone();
  this.neck.position.y = -10;
  this.head.add(this.neck);

	//left upper arm, add it to neck
	this.left_upper_arm = new THREE.Bone();
	this.left_upper_arm.position.y = -5;
	this.left_upper_arm.position.x = 5;
	this.neck.add( this.left_upper_arm );

  //left lower arm, add it to left upper arm
  this.left_lower_arm = new THREE.Bone();
  this.left_lower_arm.position.y = -15;
  this.left_lower_arm.position.x = 5;
  this.left_upper_arm.add( this.left_lower_arm );

  //left hand, add it to left lower arm
  this.left_hand = new THREE.Bone();
  this.left_hand.position.y = -5;
  this.left_hand.position.x = 5;
  this.left_lower_arm.add( this.left_hand );

  //right upper arm, add it to neck
  this.right_upper_arm = new THREE.Bone();
  this.right_upper_arm.position.y = -5;
  this.right_upper_arm.position.x = -5;
  this.neck.add( this.right_upper_arm );

  //right lower arm, add it to right upper arm
  this.right_lower_arm = new THREE.Bone();
  this.right_lower_arm.position.y = -15;
  this.right_lower_arm.position.x = -5;
  this.right_upper_arm.add( this.right_lower_arm );

  //right hand, add it to right lower arm
  this.right_hand = new THREE.Bone();
  this.right_hand.position.y = -5;
  this.right_hand.position.x = -5;
  this.right_lower_arm.add( this.right_hand );

  //torso, add it to neck
  this.torso = new THREE.Bone();
  this.torso.position.y = -30;
  this.neck.add( this.torso );

  //left upper leg, add it to torso
  this.left_upper_leg = new THREE.Bone();
  this.left_upper_leg.position.y = -15;
  this.left_upper_leg.position.x = 10;
  this.torso.add( this.left_upper_leg );

  //left lower leg, add it to left upper leg
  this.left_lower_leg = new THREE.Bone();
  this.left_lower_leg.position.y = -15;
  this.left_lower_leg.position.x = 5;
  this.left_upper_leg.add( this.left_lower_leg );

  //left foot, add it to left lower leg
  this.left_foot = new THREE.Bone();
  this.left_foot.position.y = -5;
  this.left_foot.position.x = 5;
  this.left_lower_leg.add( this.left_foot );

	//right upper leg, add it to torso
	this.right_upper_leg = new THREE.Bone();
	this.right_upper_leg.position.y = -15;
	this.right_upper_leg.position.x = -10;
	this.torso.add( this.right_upper_leg );

  //right lower leg, add it to right upper leg
  this.right_lower_leg = new THREE.Bone();
  this.right_lower_leg.position.y = -15;
  this.right_lower_leg.position.x = -5;
  this.right_upper_leg.add( this.right_lower_leg );

  //right foot, add it to right lower leg
  this.right_foot = new THREE.Bone();
  this.right_foot.position.y = -5;
  this.right_foot.position.x = -5;
  this.right_lower_leg.add( this.right_foot );
};

// part 8
Robot.prototype.show = function(scene) {

	var rGroup = new THREE.Group();
	rGroup.add( this.head );

	var helper = new THREE.SkeletonHelper( rGroup );
  helper.material.linewidth = 3; // make the skeleton thick

  scene.add(rGroup);
  scene.add(helper);

};

Robot.prototype.raise_left_arm = function() {
	this.movement = 'raise left arm';
};

Robot.prototype.lower_left_arm = function() {
	this.movement = 'lower left arm';
};

Robot.prototype.kick_left = function() {
	this.movement = 'kick left';
};

Robot.prototype.kick_right = function() {
	this.movement = 'kick right';
};

Robot.prototype.dance = function() {
	this.movement = 'dance';
};

Robot.prototype.onAnimate = function() {
	
	if (this.movement == 'raise left arm') {
		var T = - Math.PI;
		this.left_upper_arm.quaternion.slerp(
			new THREE.Quaternion(
				Math.sin(T/2), 
				0,
				0,
				Math.cos(T/2) ), 0.1)
		console.log(this.left_upper_arm.quaternion.x);
	} else if (this.movement == 'lower left arm') {
		this.left_upper_arm.quaternion.slerp(
			new THREE.Quaternion(
				0, 
				0,
				0,
				1 ), 0.1)
	} else if (this.movement == 'kick right') {
		if (this.right_upper_leg.quaternion.w < 0.72){
			this.movement = 'kick back right';
		} else {
			var T = -Math.PI/2;
			this.right_upper_leg.quaternion.slerp(
				new THREE.Quaternion(
					Math.sin(T/2) , 
					0, 
					0, 
					Math.cos(T/2) ), 0.1 );
		}
	} else if (this.movement == 'kick back right'){
		this.right_upper_leg.quaternion.slerp(
			new THREE.Quaternion(
				0, 
				0, 
				0, 
				1 ), 0.1 );
	} else if (this.movement == 'kick left') {
		if (this.left_upper_leg.quaternion.w < 0.72){
			this.movement = 'kick back left';
		} else {
			var T = -Math.PI/2;
			this.left_upper_leg.quaternion.slerp(
				new THREE.Quaternion(
					Math.sin(T/2), 
					0, 
					0, 
					Math.cos(T/2) ), 0.1 );
		}
	} else if (this.movement == 'kick back left'){
		this.left_upper_leg.quaternion.slerp(
			new THREE.Quaternion(
				0, 
				0, 
				0, 
				1 ), 0.1 );
		
	} 
		// bonus 2
		else if (this.movement == 'dance'){
			if (this.right_upper_leg.quaternion.w < 0.72){
				this.movement = 'kick back left';
			} else {
				var T = -Math.PI/2;
				this.right_upper_leg.quaternion.slerp(
					new THREE.Quaternion(
						Math.sin(T/2), 
						0, 
						0, 
						Math.cos(T/2) ), 0.1 );
			}
			if (this.left_upper_leg.quaternion.w < 0.72){
				this.movement = 'kick back left';
			} else {
				var T = - Math.PI/2;
				this.left_upper_leg.quaternion.slerp(
					new THREE.Quaternion(
						Math.sin(T/2), 
						0, 
						0, 
						Math.cos(T/2) ), 0.1 );
			}
			if (this.left_upper_arm.w < 0.85){
				this.movement = 'lower left arm';
			} else {
				var T = - Math.PI;
				this.left_upper_arm.quaternion.slerp(
					new THREE.Quaternion(
						Math.sin(T/2), 
						0,
						0,
						Math.cos(T/2) ), 0.1);

			}
			if (this.right_upper_arm.w < 0.95){
				this.movement = 'raise left arm'
			} else {
				var T = -Math.PI;
				this.left_upper_arm.quaternion.slerp(
					new THREE.Quaternion(
					Math.sin(T/2), 
					0,
					0,
					Math.cos(T/2) ), 0.1)
			}
			var T = - Math.PI/2;
			this.neck.quaternion.slerp(
				new THREE.Quaternion(
					Math.sin(T/2), 
					1,
					2,
					Math.cos(T/2) ), 0.1);
		} 
	};
