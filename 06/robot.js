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

  this.left_upper_arm = new THREE.Bone()
  this.left_upper_arm.position.y = -5
  this.left_upper_arm.position.x = 5

  this.neck.add(this.left_upper_arm)


}

Robot.prototype.show = function(scene) {
  console.log(this.head.position)

  rGroup = new THREE.Group()
  rGroup.add(this.head)

  scene.add(rGroup)
  
  helper = new THREE.SkeletonHelper(rGroup)

  scene.add(helper)
}