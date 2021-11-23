Robot = function (x, y, z) {
    // constructor
    // console.log('new robot');

    // mesh head neck and torso
    var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromHelper[0];
    var material = fromHelper[1];
    var bones = fromHelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]); // anchor of our skeleton
    mesh.bind(skeleton);

    this.root = bones[0];
    this.root.position.set(x, y, z);

    // head
    this.head = bones[1]; //new THREE.Bone();
    // this.head.position.y = 40;


    // this.head.position.x = x;
    // this.head.position.y = y;
    // this.head.position.z = z;

    // neck
    this.neck = bones[2];//new THREE.Bone();
    this.neck.position.y = -10; // relative to the head

    // attach neck to the head
    // this.head.add(this.neck);

    //Torso
    this.torso = bones[3];//new THREE.Bone();
    this.torso.position.y = -30;
    // this.neck.add(this.torso);

    this.body_mesh = mesh;




    // left upper arm
    var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'red');
    var geometry = fromHelper[0];
    var material = fromHelper[1];
    var bones = fromHelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.neck.add(bones[0]);

    this.left_upper_arm = bones[1];//new THREE.Bone();
    this.left_upper_arm.position.y = -5;
    this.left_upper_arm.position.x = 5;
    //attach
    // this.neck.add(this.left_upper_arm);

    // left lower arm
    this.left_lower_arm = bones[2]; //new THREE.Bone();
    this.left_lower_arm.position.y = -15;
    this.left_lower_arm.position.x = 5;
    //attach

    // this.left_upper_arm.add(this.left_lower_arm);
    //left hand
    this.left_hand = bones[3];//new THREE.Bone();
    this.left_hand.position.y = -5
    this.left_hand.position.x = 5;
    //attach
    // this.left_lower_arm.add(this.left_hand);
    this.left_arm_mesh = mesh;


    // right arm
    var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'red');
    var geometry = fromHelper[0];
    var material = fromHelper[1];
    var bones = fromHelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.neck.add(bones[0]);
    this.right_upper_arm = bones[1];//new THREE.Bone();
    this.right_upper_arm.position.y = -5;
    this.right_upper_arm.position.x = -5;
    // attach
    // this.neck.add(this.right_upper_arm);

    // right lower arm
    this.right_lower_arm = bones[2];//new THREE.Bone();
    this.right_lower_arm.position.y = -15;
    this.right_lower_arm.position.x = -5;
    //attach
    // this.right_upper_arm.add(this.right_lower_arm);

    //right hand
    this.right_hand = bones[3]; //new THREE.Bone();
    this.right_hand.position.y = -5
    this.right_hand.position.x = -5;
    //attach
    // this.right_lower_arm.add(this.right_hand);
    this.right_arm_mesh = mesh;





    // left upper leg
    var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'red');
    var geometry = fromHelper[0];
    var material = fromHelper[1];
    var bones = fromHelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);
    this.torso.add(bones[0]);

    this.left_upper_leg = bones[1];//new THREE.Bone();
    this.left_upper_leg.position.y = -10;
    this.left_upper_leg.position.x = 5;
    // this.torso.add(this.left_upper_leg);
    // left lower leg
    this.left_lower_leg = bones[2];//new THREE.Bone();
    this.left_lower_leg.position.y = -20;
    this.left_lower_leg.position.x = 5;
    // this.left_upper_leg.add(this.left_lower_leg);

    //left foot
    this.left_foot = bones[3]//new THREE.Bone();
    this.left_foot.position.y = -5;
    this.left_foot.position.x = 5;
    // this.left_lower_leg.add(this.left_foot);
    this.left_leg_mesh = mesh;



    // right upper leg
    var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'red');
    var geometry = fromHelper[0];
    var material = fromHelper[1];
    var bones = fromHelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);
    this.torso.add(bones[0]);

    this.right_upper_leg = bones[1];//new THREE.Bone();
    this.right_upper_leg.position.y = -10;
    this.right_upper_leg.position.x = -5;
    // this.torso.add(this.right_upper_leg);
    // right lower leg
    this.right_lower_leg = bones[2];//new THREE.Bone();
    this.right_lower_leg.position.y = -20;
    this.right_lower_leg.position.x = -5;
    // this.right_upper_leg.add(this.right_lower_leg);

    //right foot
    this.right_foot = bones[3] //new THREE.Bone();
    this.right_foot.position.y = -5;
    this.right_foot.position.x = -5;
    this.right_leg_mesh = mesh;//.add(this.right_foot);





};
Robot.prototype.show = function (scene) {

    // console.log(this.neck.position);
    // rGroup = new THREE.Group();
    // rGroup.add(this.head);
    // scene.add(rGroup);

    // //skeleton helper
    // helper = new THREE.SkeletonHelper(rGroup);
    // scene.add(helper);
    scene.add(this.body_mesh);
    scene.add(this.left_arm_mesh);
    scene.add(this.right_arm_mesh);
    scene.add(this.left_leg_mesh);
    scene.add(this.right_leg_mesh);

};

Robot.prototype.raiseLeftArm = function () {
    this.movement = 'raise left arm';
}

Robot.prototype.lowerLeftArm = function () {
    this.movement = 'lower left arm';
}
Robot.prototype.kick = function () {
    this.movement = 'kick';
}
Robot.prototype.dance = function () {
    this.movement = 'dance'
}
Robot.prototype.stopDancing = function () {
    this.movement = 'stop dancing'
}
// walk animation
Robot.prototype.walk = function () {
    this.movement = 'walk'
}
// personal project
Robot.prototype.stopWalking = function () {
    this.movement = 'stop walking'
}
// on step prototpye
Robot.prototype.onStep = function () {
    this.root.translateZ(10); // local coordinate system
    // part  7
    if (this.root.position.x > 500 || this.root.position.x < -500) {
        //rotate 180 y-axis
        this.root.rotateY(180);
    }
    if (this.root.position.z > 500 || this.root.position.z < -500) {
        //rotate 180 y-axis
        this.root.rotateY(180);
    }

    for (var i in robot_array) {
        i = robot_array[i];
        // checking equal position so it doesn't spin
        if (i.root.position.equals(this.root.position)) {
            continue;
        }
        if (i.root.position.distanceTo(this.root.position) < 45) {
            this.root.rotateY(180);
        }
    }
}

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
    // walking animation
    else if (this.movement == 'walk') {
        if (this.left_upper_leg.quaternion.w < 0.93) {
            this.movement = 'walk2';
        }
        this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);
        var T = -Math.PI / 4;
        this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),
            0, 0, Math.cos(T / 2)), 0.1)
        //onstep
        this.onStep();

    }
    // walk2
    else if (this.movement == 'walk2') {
        if (this.right_upper_leg.quaternion.w < 0.93) {
            this.movement = 'walk';
        }
        this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);
        var T = -Math.PI / 4;
        this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),
            0, 0, Math.cos(T / 2)), 0.1);

        //on step
        this.onStep();


    }
    // dancing 
    // from daniel solution
    else if (this.movement == 'dance') {
        if (typeof this.dancer === 'undefined') {

            this.dancer = setInterval(function () {

                // 
                // some random translation
                //
                var shakehead = 3 * Math.random();
                if (Math.random() < .5) {
                    shakehead *= -1;
                }

                var shakeneck = 3 * Math.random();
                if (Math.random() < .5) {
                    shakeneck *= -1;
                }

                var shaketorso = 3 * Math.random();
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
                    this.raiseLeftArm();
                }

                if (Math.random() < .3) {
                    this.lowerLeftArm();
                }

                if (Math.random() < .3) {
                    this.kick();
                }

                if (Math.random() < .3) {
                    this.movement = 'kick done';
                }

            }.bind(this), 500);

        }
        // stop walking 
        else if (this.movement = 'stop walking') {

            // this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);

            // this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);

            this.movement = 'kick done';


        }



    }

}