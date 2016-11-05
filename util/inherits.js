
Function.prototype.inherits = function( parentClassOrObject ) { 
	function F() {}
	F.prototype = parentClassOrObject.prototype;
	this.prototype = new F;
}

//Function.prototype.inherits = function( parentClassOrObject ){ 
//	if ( parentClassOrObject.constructor == Function ) 
//	{ 
//		//Normal Inheritance 
//		this.prototype = new parentClassOrObject;
//		this.prototype.constructor = this;
//		this.prototype.parent = parentClassOrObject.prototype;
//	} 
//	else 
//	{ 
//		//Pure Virtual Inheritance 
//		this.prototype = parentClassOrObject;
//		this.prototype.constructor = this;
//		this.prototype.parent = parentClassOrObject;
//	} 
//	return this;
//} 

