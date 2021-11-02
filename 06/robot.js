
      console.log("load");
      // Rendering the Robo
      Robot = function(x, y, z) {
        console.log('new robo', this)
          // Robo's Head
        this.head = new THREE.Bone();
        this.head.position.x = x;
        this.head.position.y = y;
        this.head.position.z = z;
          // Robo's Neck
        this.neck = new THREE.Bone();
        this.neck.position.y = -5;
        this.head.add(this.neck);
          // Robo's Torso
        this.torso = new THREE.Bone();
        this.torso.position.y = -15;
        this.neck.add(this.torso);
          // Robo's Arms
          // Robo's Right Arm
        this.armup_right = new THREE.Bone();
        this.armup_right.position.y = -5;
        this.armup_right.position.x = 5;
        this.neck.add(this.armup_right);
        this.armlow_right = new THREE.Bone();
        this.armlow_right.position.y = -10;
        this.armlow_right.position.x = 10;
        this.armup_right.add(this.armlow_right);
        this.rhand = new THREE.Bone();
        this.rhand.position.y = -15;
        this.rhand.position.x = 10;
        this.armlow_right.add(this.rhand);
          // Robo's Left Arm
        this.armup_left = new THREE.Bone();
        this.armup_left.position.y = -5;
        this.armup_left.position.x = -5;
        this.neck.add(this.armup_left);
        this.armlow_left = new THREE.Bone();
        this.armlow_left.position.y = -10;
        this.armlow_left.position.x = -10;
        this.armup_left.add(this.armlow_left);
        this.lhand = new THREE.Bone();
        this.lhand.position.y = -15;
        this.lhand.position.x = -10;
        this.armlow_left.add(this.lhand);
          // Robo's Legs
          // Robos Left Leg
        this.legup_left = new THREE.Bone();
        this.legup_left.position.y = -17;
        this.legup_left.position.x = -5;
        this.torso.add(this.legup_left);
        this.leglow_left = new THREE.Bone();
        this.leglow_left.position.y = -20;
        this.leglow_left.position.x = -10;
        this.legup_left.add(this.leglow_left);
        this.lfoot = new THREE.Bone();
        this.lfoot.position.y = -22;
        this.lfoot.position.x = -10;
        this.leglow_left.add(this.lfoot);
          // Robo's Right Leg
        this.legup_right = new THREE.Bone();
        this.legup_right.position.y = -17;
        this.legup_right.position.x = 5;
        this.torso.add(this.legup_right);
        this.leglow_right = new THREE.Bone();
        this.leglow_right.position.y = -20;
        this.leglow_right.position.x = 10;
        this.legup_right.add(this.leglow_right);
        this.rfoot = new THREE.Bone();
        this.rfoot.position.y = -22;
        this.rfoot.position.x = 10;
        this.leglow_right.add(this.rfoot);
        
        Robot.prototype.show = function(scene) {
          var rGroup = new THREE.Group();
          rGroup.add(this.head);
          var helper = new THREE.SkeletonHelper(rGroup);helper.material.linewidth = 3;
          scene.add(rGroup);
          scene.add(helper);
          this.movement = '';
          Robot.prototype.raiseLeftArm = function() {
            this.movement = 'raise_left_arm' }
          Robot.prototype.lowerLeftArm = function() {
            this.movement = 'lower_left_arm' }
          Robot.prototype.raiseRightArm = function() {
            this.movement = 'raise_right_arm' }
          Robot.prototype.lowerRightArm = function() {
            this.movement = 'lower_right_arm' }
          Robot.prototype.kick = function() {
            this.movement = 'kick' }
          
          
          Robot.prototype.onAnimate = function() {
          
            if (this.movement === 'raise_left_arm'){
              var T = Math.PI;
              this.armup_left.quaternion
                .slerp(
                  new THREE.Quaternion
                    (Math.sin(T/2), 0, 0, Math.cos(T/2)), 
                    0.1
                )
            } else if (this.movement === 'lower_left_arm') {
              this.armup_left.quaternion
                .slerp(
                  new THREE.Quaternion
                  (0, 0, 0, 1), 
                  0.1
                )
            } else if (this.movement === 'raise_right_arm'){
              var T = Math.PI;
              this.armup_right.quaternion
                .slerp(
                  new THREE.Quaternion
                  (Math.sin(T/2), 0, 0, Math.cos(T/2)), 
                  0.1
                )
            } else if (this.movement === 'lower_right_arm') {
              this.armup_right.quaternion
                .slerp(
                  new THREE.Quaternion
                  (0, 0, 0, 1), 
                  0.1
                )
            } else if (this.movement == 'kick') {
              if (this.armup_right.quaternion.w < 0.72) {
                this.movement = 'kick done';
              } else {
                var T = -Math.PI/2;
                this.legup_right.quaternion
                  .slerp(
                    new THREE.Quaternion
                    (Math.sin(T/2), 0, 0, Math.cos(T/2) ), 
                    0.1
                  );                               
              }

            } else if (this.movement == 'kick done') {
              this.legup_right.quaternion
                .slerp(
                  new THREE.Quaternion
                  (0, 0, 0, 1), 
                  0.1
                );
                }
              }
            }
        }