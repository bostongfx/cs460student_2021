Robot = function(x, y, z) {

	// constructor
	console.log('new robot')

	this.head = new THREE.Bone();
	this.head.position.x = x;
	this.head.position.y = y;
	this.head.position.z = z;

	this.neck = new THREE.Bone();
	this.neck.position.y = -10; //relative to head

	this.head.add(this.neck);

	this.torso = new THREE.Bone();
	this.torso.position.y = -30;

	this.neck.add(this.torso);

	this.left_upper_arm = new THREE.Bone();
	this.left_upper_arm.position.y = -5;
	this.left_upper_arm.position.x = 5;

	this.neck.add(this.left_upper_arm);

	// other limbs...

	this.left_lower_arm = new THREE.Bone();
	this.left_lower_arm.position.y = -15;
	this.left_lower_arm.position.x = 5;

	this.left_upper_arm.add(this.left_lower_arm);

	this.left_hand = new THREE.Bone();
	this.left_hand.position.y = -5;
	this.left_hand.position.x = 5;

	this.left_lower_arm.add(this.left_hand);

	//right arm
	
	this.right_upper_arm = new THREE.Bone();
	this.right_upper_arm.position.y = -5;
	this.right_upper_arm.position.x = -5;

	this.neck.add(this.right_upper_arm);

	

	this.right_lower_arm = new THREE.Bone();
	this.right_lower_arm.position.y = -15;
	this.right_lower_arm.position.x = -5;

	this.right_upper_arm.add(this.right_lower_arm);

	this.right_hand = new THREE.Bone();
	this.right_hand.position.y = -5;
	this.right_hand.position.x = -5;

	this.right_lower_arm.add(this.right_hand);

	this.right_upperleg = new THREE.Bone();
	this.right_upperleg.position.x = -5;
	this.right_upperleg.position.y = -5;

	this.torso.add(this.right_upperleg);

	this.right_lowerleg = new THREE.Bone();
	this.right_lowerleg.position.x = -5;
	this.right_lowerleg.position.y = -15;

	this.right_upperleg.add(this.right_lowerleg);

	this.right_foot = new THREE.Bone();
	this.right_foot.position.x = -5;
	this.right_foot.position.y = -5;

	this.right_lowerleg.add(this.right_foot);

	//left leg

	this.left_upperleg = new THREE.Bone();
	this.left_upperleg.position.x = 5;
	this.left_upperleg.position.y = -5;

	this.torso.add(this.left_upperleg);

	this.left_lowerleg = new THREE.Bone();
	this.left_lowerleg.position.x = 5;
	this.left_lowerleg.position.y = -15;

	this.left_upperleg.add(this.left_lowerleg);

	this.left_foot = new THREE.Bone();
	this.left_foot.position.x = 5;
	this.left_foot.position.y = -5;

	this.left_lowerleg.add(this.left_foot);



	this.movement = '';








};

Robot.prototype.show = function(scene) {

	console.log(this.head.position);

	rGroup = new THREE.Group();
	rGroup.add(this.head);

	scene.add(rGroup);

	helper = new THREE.SkeletonHelper(rGroup);

	scene.add(helper);

};

Robot.prototype.raiseLeftArm = function () {
	this.movement = 'raise_left_arm';
}

Robot.prototype.lowerLeftArm = function () {
	this.movement = 'lower_left_arm';
}


Robot.prototype.onAnimate = function() {

	//this gets called in animation loop

	if (this.movement == 'raise_left_arm') {


	//raising the left arm
	//rotation of 180 degrees around X

	var T = Math.PI;
	var x = Math.sin(T/2);
	var y = 0;
	var z = 0;
	var w = Math.cos( T/2 );

	var q2 = new THREE.Quaternion(x, y, z, w);

	//slerp
	var q = this.left_upper_arm.quaternion;
	q.slerp(q2, 0.1);

	}

 else if (this.movement == 'lower_left_arm') {

	var q2 = new THREE.Quaternion(0, 0, 0, 1);

	//slerp
	var q = this.left_upper_arm.quaternion;
	q.slerp(q2, 0.1);


} else if (this.movement == 'kick') {

	if (this.right_upperleg.quaternion.w < .72) {
		this.movement = 'kick done';
	} else {

	var T = Math.PI;
	var x = Math.sin(T/2);
	var y = 0;
	var z = 0;
	var w = Math.cos( T/2 );

	var q2 = new THREE.Quaternion(x, y, z, w);

	//slerp
	var q = this.right_upperleg.quaternion;
	q.slerp(q2, 0.1);

}

} else if (this.movement == 'kick done') {
	this.right_upperleg.quaternion.slerp(new THREE.Quaternion(0,0,0,1), .1);
}
}