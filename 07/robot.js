
      console.log("load");
      // Rendering the Robo
      Robot = function(x, y, z) {
        console.log('new robo', this)
        var fromhelper = HELPER.cylinderSkeletonMesh(2, 3, 'red');
        var geometry = fromhelper[0];
        var material = fromhelper[1];
        var bones = fromhelper[2];
        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton(bones);
        mesh.add(bones[0]);
        mesh.bind(skeleton);
          // Robo's Head
        this.head = bones[0];
        this.head.position.x = x;
        this.head.position.y = y;
        this.head.position.z = z;
          // Robo's Neck
        this.neck = bones[1];
        this.neck.position.y = -5;
        this.head.add(this.neck);
          // Robo's Torso
        this.torso = bones[2];
        this.torso.position.y = -15;
        this.neck.add(this.torso);
        this.body = mesh;
          // Robo's Arms
          // Robo's Right Arm
        var fromhelper = HELPER.cylinderSkeletonMesh(2, 3, 'red');
        var geometry = fromhelper[0];
        var material = fromhelper[1];
        var bones = fromhelper[2];
        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton(bones);
        mesh.add(bones[0]);
        mesh.bind(skeleton);
        this.armup_right = bones[0];
        this.armup_right.position.y = -5;
        this.armup_right.position.x = 5;
        this.neck.add(this.armup_right);
        this.armlow_right = bones[1];
        this.armlow_right.position.y = -10;
        this.armlow_right.position.x = 10;
        this.armup_right.add(this.armlow_right);
        this.rhand = bones[2];
        this.rhand.position.y = -15;
        this.rhand.position.x = 10;
        this.armlow_right.add(this.rhand)
        this.rarm = mesh;
          // Robo's Left Arm
        var fromhelper = HELPER.cylinderSkeletonMesh(2, 3, 'red');
        var geometry = fromhelper[0];
        var material = fromhelper[1];
        var bones = fromhelper[2];
        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton(bones);
        mesh.add(bones[0]);
        mesh.bind(skeleton);
        this.armup_left = bones[0];
        this.armup_left.position.y = -5;
        this.armup_left.position.x = -5;
        this.neck.add(this.armup_left);
        this.armlow_left = bones[1];
        this.armlow_left.position.y = -10;
        this.armlow_left.position.x = -10;
        this.armup_left.add(this.armlow_left);
        this.lhand = bones[2];
        this.lhand.position.y = -15;
        this.lhand.position.x = -10;
        this.armlow_left.add(this.lhand);
        this.larm = mesh;
          // Robo's Legs
          // Robos Left Leg
        var fromhelper = HELPER.cylinderSkeletonMesh(2, 3, 'red');
        var geometry = fromhelper[0];
        var material = fromhelper[1];
        var bones = fromhelper[2];
        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton(bones);
        mesh.add(bones[0]);
        mesh.bind(skeleton);
        this.legup_left = bones[0];
        this.legup_left.position.y = -17;
        this.legup_left.position.x = -5;
        this.torso.add(this.legup_left);
        this.leglow_left = bones[1];
        this.leglow_left.position.y = -20;
        this.leglow_left.position.x = -10;
        this.legup_left.add(this.leglow_left);
        this.lfoot = bones[2];
        this.lfoot.position.y = -22;
        this.lfoot.position.x = -10;
        this.leglow_left.add(this.lfoot);
        this.lleg = mesh;
          // Robo's Right Leg
        var fromhelper = HELPER.cylinderSkeletonMesh(2, 3, 'red');
        var geometry = fromhelper[0];
        var material = fromhelper[1];
        var bones = fromhelper[2];
        var mesh = new THREE.SkinnedMesh(geometry, material);
        var skeleton = new THREE.Skeleton(bones);
        mesh.add(bones[0]);
        mesh.bind(skeleton);
        this.legup_right = bones[0];
        this.legup_right.position.y = -17;
        this.legup_right.position.x = 5;
        this.torso.add(this.legup_right);
        this.leglow_right = bones[1];
        this.leglow_right.position.y = -20;
        this.leglow_right.position.x = 10;
        this.legup_right.add(this.leglow_right);
        this.rfoot = bones[2];
        this.rfoot.position.y = -22;
        this.rfoot.position.x = 10;
        this.leglow_right.add(this.rfoot);
        this.rleg = mesh;
        
        Robot.prototype.show = function(scene) {
          
          var rGroup = new THREE.Group();
          rGroup.add(this.head);
          var sh = new THREE.SkeletonHelper(rGroup);
          sh.material.linewidth = 3;
          scene.add(rGroup);
          scene.add(sh);
          this.movement = '';
          scene.add(this.body);
          scene.add(this.rarm);
          scene.add(this.larm);
          scene.add(this.lleg);
          scene.add(this.rleg);
          Robot.prototype.dance = function() {
            this.movement = 'dance';
          }
          
          
          Robot.prototype.onAnimate = function() {
          
             if (this.movement = 'dance') {
              if (typeof this.dancing == 'undefined') {
                this.dancing = setInterval(function() {
                  var headshake = Math.random();
                  if (Math.random() < .3) {
                    headshake *= -1;
                  }
                  var neckshake = Math.random();
                  if (Math.random() < .3) {
                    neckshake *= -1;
                  }
                  var hipshake = Math.random();
                  if (Math.random() < .3) {
                    hipshake *= -1;
                  }
                  this.head.position.x += headshake;
                  this.neck.position.x += neckshake;
                  this.torso.position.x += hipshake;

                }.bind(this), 500);
                }
              }
            }
          }
        }
      
  
              
           