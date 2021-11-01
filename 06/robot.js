Robot = function(x, y, z){
	
  this.head = new THREE.Bone();
  this.head.position.set( x, y, z );


  this.neck = new THREE.Bone();
  this.torso = new THREE.Bone();
  
  this.neck.position.y = -10; 
  this.torso.position.y = -30; 
  
  this.head.add( this.neck );
  this.neck.add( this.torso );

  // whole right arm
  this.right_UpperArm = new THREE.Bone();
  this.right_UpperArm.position.x = -10; 
  this.right_UpperArm.position.y = -5;
  this.neck.add( this.right_UpperArm);

  this.right_LowerArm = new THREE.Bone();
  this.right_LowerArm.position.x = -10; 
  this.right_LowerArm.position.y = -20;
  this.right_UpperArm.add(this.right_LowerArm);

  this.right_hand = new THREE.Bone();
  this.right_hand.position.x = 1; 
  this.right_hand.position.y = -5;
  this.right_LowerArm.add( this.right_hand );
  
  // Whole right leg below
  this.right_UpperLeg = new THREE.Bone();
  this.right_UpperLeg.position.x = -10; 
  this.right_UpperLeg.position.y = -30;

  this.torso.add( this.right_UpperLeg);

  this.right_LowerLeg = new THREE.Bone();
  this.right_LowerLeg.position.y = -25; 
  this.right_UpperLeg.add( this.right_LowerLeg);

  this.right_foot = new THREE.Bone();
  this.right_foot.position.x = -5; 
  this.right_LowerLeg.add( this.right_foot );
  
   // Whole Left arm
  this.left_UpperArm = new THREE.Bone();
  this.left_UpperArm.position.x = 10; 
  this.left_UpperArm.position.y = -5;
  this.neck.add( this.left_UpperArm );

  this.left_LowerArm = new THREE.Bone();
  this.left_LowerArm.position.x = 10; 
  this.left_LowerArm.position.y = -20;
  this.left_UpperArm.add( this.left_LowerArm);

  this.left_hand = new THREE.Bone();
  this.left_hand.position.x = -1; 
  this.left_hand.position.y = -5;
  this.left_LowerArm.add( this.left_hand);

  // Whole left leg
  this.left_UpperLeg = new THREE.Bone();
  this.left_UpperLeg.position.x = 10; 
  this.left_UpperLeg.position.y = -30;
  this.torso.add( this.left_UpperLeg);


  this.left_LowerLeg = new THREE.Bone();
  this.left_LowerLeg.position.y = -25; 
  this.left_UpperLeg.add( this.left_LowerLeg);

  this.left_foot = new THREE.Bone();
  this.left_foot.position.x = 5; 
  this.left_LowerLeg.add( this.left_foot);  
  
  this.movement = null; // what about this?

	
	Robot.prototype.show = function(scene) 
	{
		var rGroup = new THREE.Group();
		rGroup.add( this.head );
		var helper = new THREE.SkeletonHelper( rGroup );
		helper.material.linewidth = 30; // make the skeleton thick
		scene.add(rGroup);
		scene.add(helper);
	};	
	
	
	Robot.prototype.raiseLeftArm = function() {
	this.movement = 'raise left arm';
	};

	Robot.prototype.lowerLeftArm = function() {
		this.movement = 'lower left arm';
	};
	Robot.prototype.kick = function() {
		this.movement = 'kick';
	};

    Robot.prototype.onAnimate = function() {

    if( this.movement == 'raise left arm' ) {

    } 
	else if( this.movement == 'lower left arm' ) {

    } 
    else if( this.movement == 'kick' ) {
		

    }
 };
}
