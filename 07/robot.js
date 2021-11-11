Robot = function(x, y, z){
    //constructor
    this.currentMove = 0;
    
    var fromHelper = HELPER.cylinderSkeletonMesh(3, 3, 'red');
    var geometry = fromHelper[0];
    var material = fromHelper[1];
    var bones = fromHelper[2];

    this.bodyMesh = new THREE.SkinnedMesh (geometry, material);
    this.bodyMesh.add(bones[0]);

    var skeleton = new THREE.Skeleton(bones);
    this.bodyMesh.bind(skeleton);

    //head
    this.head = bones[0]; // new THREE.Bone();
    this.head.position.set(x, y, z);
     //neck
    this.neck = bones[1]; // new THREE.Bone();
    this.neck.position.y = -10; // relative to the head
    
     //torso
    this.torso = bones[2] // new THREE.Bone();
    this.torso.position.y = -30;

     //arms--------
    //------------------left arm---------------
    fromHelper = HELPER.cylinderSkeletonMesh(2, 3, 'red');
    geometry = fromHelper[0];
    material = fromHelper[1];
    bones = fromHelper[2];

    this.leftArmMesh = new THREE.SkinnedMesh (geometry, material);
    this.leftArmMesh.add(bones[0]);
    skeleton = new THREE.Skeleton(bones);
    this.leftArmMesh.bind(skeleton);

    this.left_upper_arm = bones[0];
    //this.left_upper_arm.position.y = -10;
    //this.left_upper_arm.position.x = 5;

    this.left_lower_arm = bones[1];
    this.left_lower_arm.position.y = -15;
    this.left_lower_arm.position.x = 5;

    this.left_hand = bones[2];
    this.left_hand.position.y = -8;
    this.left_hand.position.x = 5;

    this.neck.add(bones[0]);

    //--------------------right arm----------------------
    fromHelper = HELPER.cylinderSkeletonMesh(2, 3, 'red');
    geometry = fromHelper[0];
    material = fromHelper[1];
    bones = fromHelper[2];

    this.rightArmMesh = new THREE.SkinnedMesh (geometry, material);
    this.rightArmMesh.add(bones[0]);
    skeleton = new THREE.Skeleton(bones);
    this.rightArmMesh.bind(skeleton);
    
    this.right_upper_arm = bones[0];
    // this.right_upper_arm.position.y = -10;
    // this.right_upper_arm.position.x = -5;

    this.right_lower_arm = bones[1];
    this.right_lower_arm.position.y = -15;
    this.right_lower_arm.position.x = -5;

    this.right_hand = bones[2];
    this.right_hand.position.y = -8;
    this.right_hand.position.x = -5;

    this.neck.add(bones[0]);

    //legs
    //---------------left leg-------------
    fromHelper = HELPER.cylinderSkeletonMesh(2, 3, 'red');
    geometry = fromHelper[0];
    material = fromHelper[1];
    bones = fromHelper[2];

    this.leftLegMesh = new THREE.SkinnedMesh (geometry, material);
    this.leftLegMesh.add(bones[0]);
    skeleton = new THREE.Skeleton(bones);
    this.leftLegMesh.bind(skeleton);

    this.left_upper_leg = bones[0];
    this.left_upper_leg.position.y = 0;
    this.left_upper_leg.position.x = 0;

    this.left_lower_leg = bones[1];
    this.left_lower_leg.position.y = -16;
    this.left_lower_leg.position.x = 10;

    this.left_foot = bones[2];
    this.left_foot.position.y = -20;
    this.left_foot.position.x = 8;

    this.torso.add(bones[0]);

    //right leg
    fromHelper = HELPER.cylinderSkeletonMesh(2, 3, 'red');
    geometry = fromHelper[0];
    material = fromHelper[1];
    bones = fromHelper[2];

    this.rightLegMesh = new THREE.SkinnedMesh (geometry, material);
    this.rightLegMesh.add(bones[0]);
    skeleton = new THREE.Skeleton(bones);
    this.rightLegMesh.bind(skeleton);

    this.right_upper_leg = bones[0];
    this.right_upper_leg.position.y = 0;
    this.right_upper_leg.position.x = 0;

    this.right_lower_leg = bones[1];
    this.right_lower_leg.position.y = -16;
    this.right_lower_leg.position.x = -10;

    this.right_foot = bones[2];
    this.right_foot.position.y = -20;
    this.right_foot.position.x = -8;
    this.torso.add(bones[0]);

    this.movement = '';
};

Robot.prototype.show = function(scene){
    // rGroup = new THREE.Group();
    // rGroup.add(this.head);
   
    // scene.add(rGroup);

    // helper = new THREE.SkeletonHelper(rGroup);
    // helper.material.linewidth = 3;
    // scene.add(helper);
    scene.add(this.bodyMesh);
    scene.add(this.leftArmMesh);
    scene.add(this.rightArmMesh); 
    scene.add(this.leftLegMesh); 
    scene.add(this.rightLegMesh);
};

Robot.prototype.raiseLeftArm = function(){
    this.movement = 'raise_left_arm';
};

Robot.prototype.raiseRightArm = function(){
    this.movement = 'raise_right_arm';
};

Robot.prototype.lowerLeftArm = function(){
    this.movement = 'lower_left_arm';
};

Robot.prototype.lowerRightArm = function(){
    this.movement = 'lower_right_arm';
};
Robot.prototype.kickBackward = function(){
    this.movement = 'kick_backward';
};

Robot.prototype.kickForward = function(){
    this.movement = 'kick_forward';
}

Robot.prototype.kickBackwardRightLeg = function(){
    this.movement = 'kick_backward_right_leg';
};

Robot.prototype.kickForwardRightLeg = function(){
    this.movement = 'kick_forward_right_leg';
}
Robot.prototype.kick = function(){
    this.movement = 'kick';
}

var stop = false;

Robot.prototype.dance = function(){

    var self = this;

    var moveSequence = [
        function(){ self.raiseRightArm() },
        function(){ self.kickBackward() },
        function(){ self.kickForward() },
        function(){ self.kickBackwardRightLeg() },
        function(){ self.kickForwardRightLeg() },
        function(){ self.lowerRightArm() },
        function(){ self.kickBackward() },
        function(){ self.kickForward() },
        function(){ self.kickBackwardRightLeg() },
        function(){ self.kickForwardRightLeg() },
        function(){ self.raiseLeftArm() },
        function(){ self.kickBackward() },
        function(){ self.kickForward() },
        function(){ self.kickBackwardRightLeg() },
        function(){ self.kickForwardRightLeg() },
        function(){ self.lowerLeftArm() }
    ];

    if(stop){
        this.lowerLeftArm();
        this.lowerRightArm();
        this.kickForwardRightLeg();
        this.kickForward();    
    }else
        moveSequence[self.currentMove++]();

    if(self.currentMove >= moveSequence.length)
        self.currentMove = 0;
    
    if(!stop){
        setTimeout(function(){
            self.dance();
        }, 300);
    }
}

Robot.prototype.stop = function(){
    stop = true;
};

Robot.prototype.onAnimate = function(){
    //it is called in animation loop
    //raise left arm. Rotation 180 degree around x axies
    if(this.movement == 'raise_left_arm'){
        var T = Math.PI/2; 
        var x = Math.sin(T/2);
        var y = 0;
        var z = 0;
        var w = -Math.cos(T/2);

        var q2 = new THREE.Quaternion(x, y, z, w);

        //slerping
        var q = this.left_upper_arm.quaternion;
        q.slerp(q2, 0.1);

    }else if(this.movement == 'raise_right_arm'){
        var T =  Math.PI/2; 
        var x = Math.sin(T/2);
        var y = 0;
        var z = 0;
        var w = -Math.cos(T/2);

        var q2 = new THREE.Quaternion(x, y, z, w);

        //slerping
        var q = this.right_upper_arm.quaternion;
        q.slerp(q2, 0.1);

    }else if( this.movement == 'lower_left_arm'){
        var q2 = new THREE.Quaternion(0, 0, 0, 1);
        //slerping
        var q = this.left_upper_arm.quaternion;
        q.slerp(q2, 0.1);
    }else if( this.movement == 'lower_right_arm'){
        var q2 = new THREE.Quaternion(0, 0, 0, 1);
        //slerping
        var q = this.right_upper_arm.quaternion;
        q.slerp(q2, 0.1);
    }else if(this.movement == 'kick_backward'){
        var T = -Math.PI;
        var x = Math.sin(T/2);
        var y = 0;
        var z = 0;
        var w = Math.cos(T/2);

        var q2 = new THREE.Quaternion(x, y, z, w);

        //slerping
        var q = this.left_upper_leg.quaternion;
        q.slerp(q2, 0.1);
    }else if (this.movement == 'kick_forward'){
        var q2 = new THREE.Quaternion(0, 0, 0, 1);
        var q = this.left_upper_leg.quaternion;
        q.slerp(q2, 0.1);
    }else if(this.movement == 'kick_backward_right_leg'){
        var T = -Math.PI;
        var x = Math.sin(T/2);
        var y = 0;
        var z = 0;
        var w = Math.cos(T/2);

        var q2 = new THREE.Quaternion(x, y, z, w);

        //slerping
        var q = this.right_upper_leg.quaternion;
        q.slerp(q2, 0.1);
    }else if (this.movement == 'kick_forward_right_leg'){
        var q2 = new THREE.Quaternion(0, 0, 0, 1);
        var q = this.right_upper_leg.quaternion;
        q.slerp(q2, 0.1);
    }else if (this.movement == 'kick'){
        if(this.right_upper_leg.quaternion.w < 0.72) {
            this.movement = 'kick_done';
        }else{
            var T = -Math.PI/2;
            this.right_upper_leg.quaternion.slerp (new THREE.Quaternion ( Math.sin (T/2),
                                    0,
                                    0,
                                    Math.cos (T/2)), 
            0.1 );
        }
    } else if (this.movement == 'kick_done') {
        this.right_upper_leg.quaternion.slerp (new THREE.Quaternion(0, 0, 0, 1), 0.1);
    }
};
