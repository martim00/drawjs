
Geometry = function(strokeStyle, fillStyle, angle) {
   this.strokeStyle = strokeStyle ? strokeStyle : 'black';
   //this.fillStyle = fillStyle ? fillStyle : 'rgba(255, 255, 255, 0.0)';
   this.fillStyle = fillStyle ? fillStyle : undefined;
   this.angle = angle ? angle : 0;
}

Geometry.prototype.getAngle = function() {
   return this.angle;
}

Geometry.prototype.getStrokeStyle = function() {
   return this.strokeStyle;
}

Geometry.prototype.getFillStyle = function() {
   return this.fillStyle;
}

Geometry.prototype.draw = function(context) {
  	// var context = canvas.getContext("2d");

	if (this.strokeStyle)
      context.strokeStyle = this.getStrokeStyle();

   if (this.fillStyle)
      context.fillStyle = this.getFillStyle();

	context.beginPath();
  	for (var i = 0; i < this.getPoints().length; i++) {

  		var point = this.getPoints()[i];

  		if (i == 0) {
  			context.moveTo(point.x, point.y);
  		}
  		else {
  			context.lineTo(point.x, point.y);
  		}
  	}
  	context.stroke();

   if (this.fillStyle)
      context.fill();
}