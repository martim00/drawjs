
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

Geometry.prototype.drawSelection = function(context) {
	context.fillStyle = "#ff2626"; // Red color

    context.beginPath();
    var rect = this.getBoundingRect().getPoints();
    context.rect(rect[0].x - 5, rect[0].y - 5, 10, 10);
    context.closePath();
    context.rect(rect[1].x - 5, rect[1].y - 5, 10, 10);
    context.closePath();
    context.rect(rect[2].x - 5, rect[2].y - 5, 10, 10);
    context.closePath();
    context.rect(rect[3].x - 5, rect[3].y - 5, 10, 10);
    context.closePath();
    context.fill();
}

