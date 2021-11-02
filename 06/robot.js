Robot = function (x, y, z) {
    // constructor
    console.log('new robot', this);

    // head
    this.head = new THREE.Bone();
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;

    // neck
    this.neck = new THREE.Bone();
    this.neck.position.y = -10; // relative to the head

    // attach neck to the head
    this.head.add(this.neck);


    // left upper arm
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.y = -5;
    this.left_upper_arm.position.x = 5;

    //attach
    this.neck.add(this.left_upper_arm);

    // left lower arm
    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.y = -15;
    this.left_lower_arm.position.x = 5;
    this.left_upper_arm.add(this.left_lower_arm);

    //left hand
    this.left_hand = new THREE.Bone();
    this.left_hand.position.y = -5
    this.left_hand.position.x = 5;
    this.left_lower_arm.add(this.left_hand);


    // right arm
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.y = -5;
    this.right_upper_arm.position.x = -5;
    this.neck.add(this.right_upper_arm);

    // right lower arm
    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.y = -15;
    this.right_lower_arm.position.x = -5;
    this.right_upper_arm.add(this.right_lower_arm);

    //right hand
    this.right_hand = new THREE.Bone();
    this.right_hand.position.y = -5
    this.right_hand.position.x = -5;
    this.right_lower_arm.add(this.right_hand);


    //Torso
    this.torso = new THREE.Bone();
    this.torso.position.y = -30;
    this.neck.add(this.torso);

    // left upper leg
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.y = -10;
    this.left_upper_leg.position.x = 5;
    this.torso.add(this.left_upper_leg);
    // left lower leg
    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.y = -20;
    this.left_lower_leg.position.x = 5;
    this.left_upper_leg.add(this.left_lower_leg);

    //left foot
    this.left_foot = new THREE.Bone();
    this.left_foot.position.y = -5;
    this.left_foot.position.x = 5;
    this.left_lower_leg.add(this.left_foot);

    // right upper leg
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.y = -10;
    this.right_upper_leg.position.x = -5;
    this.torso.add(this.right_upper_leg);

    // right lower leg
    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.y = -20;
    this.right_lower_leg.position.x = -5;
    this.right_upper_leg.add(this.right_lower_leg);

    //right foot
    this.right_foot = new THREE.Bone();
    this.right_foot.position.y = -5;
    this.right_foot.position.x = -5;
    this.right_lower_leg.add(this.right_foot);





};



Robot.prototype.show = function () {

    console.log(this.neck.position);

    var rGroup = new THREE.Group();
    rGroup.add(this.head);

    var helper = new THREE.SkeletonHelper(rGroup);
    helper.material.linewidth = 3; // make the skeleton thick

    scene.add(rGroup);
    scene.add(helper);
}

Robot.prototype.raiseLeftArm = function () {
    this.movement = 'raise left arm';
}

Robot.prototype.lowerLeftArm = function () {
    this.movement = 'lower left arm';
}
Robot.prototype.lowerLeftArm = function () {
    this.movement = 'lower left arm';
}
Robot.prototype.kick = function () {
    this.movement = 'kick';
}

// this code is inspired by vlad to make some corrections
Robot.prototype.onAnimate = function () {
    // call on animation loop;

    if (this.movement == 'raise left arm') {
        //raising of left arm
        //rotation of 180degree around x
        var T = Math.PI;
        var x = Math.sin(T / 2);
        var y = 0;
        var y = 0;
        var z = 0;
        var w = Math.cos(T / 2);

        var q2 = new THREE.Quaternion(x, y, z, w);

        //slerping
        var q = this.left_upper_arm.quaternion;
        q.slerp(q2, 0.1);
    }
    else if (this.movement == 'lower left arm') {
        var q2 = new THREE.Quaternion(0, 0, 0, 1);

        //slerping
        var q = this.left_upper_arm.quaternion;
        q.slerp(q2, 0.1);
    }

    //kick
    else if (this.movement == 'kick') {
        if (this.right_upper_leg.quaternion.w < .72) {
            this.movement = 'kick done';
        }
        else {
            var T = -Math.PI / 2;
            this.right_upper_leg.quaternion.slerp(new THREE.Quaternion
                (Math.sin(T / 2), 0, 0, Math.cos(T / 2)), .01);
        }

    } else if (this.movement == 'kick done') {
        this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(
            0, 0, 0, 1), 0.1)
    }

}
