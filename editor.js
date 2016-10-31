

Editor = function() {
	this.geometries = [];
}

Editor.prototype.addPolygon = function(polygon) {
	this.geometries.push(polygon);
}

Editor.prototype.draw = function() {

	var canvas = document.querySelector("canvas");
  	var context = canvas.getContext("2d");
  	context.strokeStyle = "red";

  	this.geometries.forEach(function(geometry) {
  		context.beginPath();
  		for (var i = 0; i < geometry.length; i++) {

  			var point = geometry[i];

  			if (i == 0) {
  				context.moveTo(point[0], point[1]);
  			}
  			else {
  				context.lineTo(point[0], point[1]);
  			}
  		}
  		context.stroke();
  	});

  	//context.fillRect(10, 10, 100, 50);

}