
Geometry = function() {

}

Geometry.prototype.draw = function(context) {
  	// var context = canvas.getContext("2d");

	if (this.strokeStyle)
  		context.strokeStyle = this.getStrokeStyle();

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
}