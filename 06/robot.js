Robot = function(x, y, z){
    //constructor
    this.currentMove = 0;
    //head
    this.head = new THREE.Bone();
    this.head.position.x = x;
    this.head.position.z = z;
    //neck
    this.neck = new THREE.Bone();
    this.neck.position.y = -7; // relative to the head
    
    this.head.add(this.neck);
    //arms
    //left arm
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.y = -7;
    this.left_upper_arm.position.x = 5;
    
    this.neck.add(this.left_upper_arm);

    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.y = -5;
    this.left_lower_arm.position.x = 4;

    this.left_upper_arm.add(this.left_lower_arm);

    this.left_hand = new THREE.Bone();
    this.left_hand.position.y = -2;
    this.left_hand.position.x = 3;

    this.left_lower_arm.add(this.left_hand);
    
    //right arm
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.y = -7;
    this.right_upper_arm.position.x = -5;

    this.neck.add(this.right_upper_arm);

    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.y = -5;
    this.right_lower_arm.position.x = -4;

    this.right_upper_arm.add(this.right_lower_arm);

    this.right_hand = new THREE.Bone();
    this.right_hand.position.y = -2;
    this.right_hand.position.x = -3;

    this.right_lower_arm.add(this.right_hand);

    //torso
    this.torso = new THREE.Bone();
    this.torso.position.y = -20;
    this.neck.add(this.torso);

    //legs
    //left leg
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.y = -8;
    this.left_upper_leg.position.x = 10;

    this.torso.add(this.left_upper_leg);

    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.y = -7;
    this.left_lower_leg.position.x = 1;

    this.left_upper_leg.add(this.left_lower_leg);

    this.left_foot = new THREE.Bone();
    this.left_foot.position.y = -1;
    this.left_foot.position.x = 4;

    this.left_lower_leg.add(this.left_foot);

    //right leg
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.y = -8;
    this.right_upper_leg.position.x = -10;

    this.torso.add(this.right_upper_leg);

    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.y = -7;
    this.right_lower_leg.position.x = -1;

    this.right_upper_leg.add(this.right_lower_leg);

    this.right_foot = new THREE.Bone();
    this.right_foot.position.y = -1;
    this.right_foot.position.x = -4;

    this.right_lower_leg.add(this.right_foot);

    this.movement = '';
};

Robot.prototype.show = function(scene){
    rGroup = new THREE.Group();
    rGroup.add(this.head);
   
    scene.add(rGroup);

    helper = new THREE.SkeletonHelper(rGroup);
    helper.material.linewidth = 3;
    scene.add(helper); 
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
        var T = Math.PI; 
        var x = Math.sin(T/2);
        var y = 0;
        var z = 0;
        var w = Math.cos(T/2);

        var q2 = new THREE.Quaternion(x, y, z, w);

        //slerping
        var q = this.left_upper_arm.quaternion;
        q.slerp(q2, 0.1);

    }else if(this.movement == 'raise_right_arm'){
        var T =  Math.PI; 
        var x = Math.sin(T/2);
        var y = 0;
        var z = 0;
        var w = Math.cos(T/2);

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
