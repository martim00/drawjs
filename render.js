
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

  	/*if (this.document.hasSelection()) 
  		this.document.getSelectedGeometry().drawSelection(context);*/
}


Render.prototype.drawGeometries = function(geometries) {

  	var context = this.canvas.getContext("2d");

  	geometries.forEach(function(geometry) {
		geometry.draw(context);
	}.bind(this));

}

  
