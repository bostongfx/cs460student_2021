console.log("loaded")

Robot = function(x, y, z) {

  // constructor
  console.log('new robot', this)

  this.head = new THREE.Bone()
  this.head.position.x = x
  this.head.position.y = y
  this.head.position.z = z

  this.neck = new THREE.Bone()
  this.neck.position.y = -10

  this.head.add(this.neck)

  this.torso = new THREE.Bone()
  this.torso.position.y = -30

  this.neck.add(this.torso)
  
  // LEFT ARM
  // ===========================================

  this.left_upper_arm = new THREE.Bone()
  this.left_upper_arm.position.y = -5
  this.left_upper_arm.position.x = 5

  this.neck.add(this.left_upper_arm)

  this.left_lower_arm = new THREE.Bone()
  this.left_lower_arm.position.y = -15
  this.left_lower_arm.position.x = 10

  this.left_upper_arm.add(this.left_lower_arm)

  this.left_hand = new THREE.Bone()
  this.left_hand.position.y = -5
  this.left_hand.position.x = -1

  this.left_lower_arm.add(this.left_hand)

  // RIGHT ARM
  //================================================

  this.right_upper_arm = new THREE.Bone()
  this.right_upper_arm.position.y = -5
  this.right_upper_arm.position.x = -5

  this.neck.add(this.right_upper_arm)

  this.right_lower_arm = new THREE.Bone()
  this.right_lower_arm.position.y = -15
  this.right_lower_arm.position.x = -10

  this.right_upper_arm.add(this.right_lower_arm)

  this.right_hand = new THREE.Bone()
  this.right_hand.position.y = -5
  this.right_hand.position.x = 1

  this.right_lower_arm.add(this.right_hand)

  // LEFT LEG
  // ====================================================

  this.left_upper_leg = new THREE.Bone()
  this.left_upper_leg.position.y = -5
  this.left_upper_leg.position.x = 5

  this.torso.add(this.left_upper_leg)

  this.left_lower_leg = new THREE.Bone()
  this.left_lower_leg.position.y = -15
  this.left_lower_leg.position.x = 10

  this.left_upper_leg.add(this.left_lower_leg)

  this.left_foot = new THREE.Bone()
  this.left_foot.position.y = -5
  this.left_foot.position.x = 1

  this.left_lower_leg.add(this.left_foot)

  // RIGHT LEG
  // ====================================================

  this.right_upper_leg = new THREE.Bone()
  this.right_upper_leg.position.y = -5
  this.right_upper_leg.position.x = -5

  this.torso.add(this.right_upper_leg)

  this.right_lower_leg = new THREE.Bone()
  this.right_lower_leg.position.y = -15
  this.right_lower_leg.position.x = -10

  this.right_upper_leg.add(this.right_lower_leg)

  this.right_foot = new THREE.Bone()
  this.right_foot.position.y = -5
  this.right_foot.position.x = -1

  this.right_lower_leg.add(this.right_foot)



  this.movement = ''


}

Robot.prototype.show = function(scene) {
  console.log(this.head.position)

  rGroup = new THREE.Group()
  rGroup.add(this.head)

  scene.add(rGroup)
  
  helper = new THREE.SkeletonHelper(rGroup)

  scene.add(helper)
}

Robot.prototype.raiseLeftArm = function() {
  this.movement = 'raise_left_arm'
}
Robot.prototype.lowerLeftArm = function() {
  this.movement = 'lower_left_arm'
}


Robot.prototype.onAnimate = function() {

  if (this.movement === 'raise_left_arm'){
    // raise of left arm
    // rotation of 180 degrees around x
    var T = Math.PI;
    var x = Math.sin(T/2) 
    var y = 0
    var z = 0
    var w = Math.cos(T/2)
    
    var q2 = new THREE.Quaternion(x, y, z, w)
  
    var q = this.left_upper_arm.quaternion
    q.slerp(q2, 0.1)
  } else if (this.movement === 'lower_left_arm') {
    var T = Math.PI;
    var x = Math.sin(T/2) 
    var y = 0
    var z = 0
    var w = Math.cos(T/2)
    
    var q2 = new THREE.Quaternion(0, 0, 0, 1)
  
    var q = this.left_upper_arm.quaternion
    q.slerp(q2, 0.1)
  }

}