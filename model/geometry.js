
Geometry = function(strokeStyle, fillStyle, angle) {
   this.strokeStyle = strokeStyle ? strokeStyle : 'black';
   //this.fillStyle = fillStyle ? fillStyle : 'rgba(255, 255, 255, 0.0)';
   this.fillStyle = fillStyle ? fillStyle : undefined;
   this.angle = angle ? angle : 0;
   // DbC.requireNotNull(center, "center");
}

Geometry.prototype.containsPoint = function(point) {
   return pointInsidePolygon(point, this.getPoints());
}

Geometry.prototype.getCenter = function() {

   // return getCenterPoint();

   var leftX = 999999; // ugly
   var leftY = 999999;
   var rightX = 0;
   var rightY = 0;

   var points = this.getPoints();
   for (var i = 0; i < points.length; i++) {
      var point = points[i];

      if (point.x < leftX)
         leftX = point.x;

      if (point.y < leftY)
         leftY = point.y;

      if (point.x > rightX)
         rightX = point.x;

      if (point.y > rightY)
         rightY = point.y
   }

   return new Point((leftX + rightX) / 2, (leftY + rightY) / 2);
}

// Geometry.prototype.setCenter = function(center) {
//    this.center = center;
// }

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