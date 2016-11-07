
Render = function(document, canvas) {
	this.document = document;
	this.canvas = canvas;
	this.document.invalidate.addListener(this.renderDocument.bind(this));
}

Render.prototype.renderDocument = function() {
  	var context = this.canvas.getContext("2d");

	context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  	context.strokeStyle = "black";

  	this.drawGeometries(this.document.getGeometries());

  	context.strokeStyle = "red";

  	this.drawGeometries(this.document.getEditionGeometries());
}


Render.prototype.drawGeometries = function(geometries) {

  	var context = this.canvas.getContext("2d");

  	geometries.forEach(function(geometry) {
		geometry.draw(context);
	}.bind(this));

}

  		// if (geometry.strokeStyle)
  		// 	context.strokeStyle = geometry.getStrokeStyle();

	  	// context.beginPath();
  		// for (var i = 0; i < geometry.getPoints().length; i++) {

  		// 	var point = geometry.getPoints()[i];

  		// 	if (i == 0) {
  		// 		context.moveTo(point.x, point.y);
  		// 	}
  		// 	else {
  		// 		context.lineTo(point.x, point.y);
  		// 	}
  		// }
  		// context.stroke();
