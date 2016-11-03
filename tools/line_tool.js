
LineTool = function(document) {
	this.document = document;

	this.firstPoint = null;
}

LineTool.prototype.onMouseMove = function(point) {
	if (!this.firstPoint)
		return;

	console.log("mouse moving> " + point.x + ", " + point.y);
	this.document.addEditionGeometry(new Line(this.firstPoint, point));
}

LineTool.prototype.onMouseLeftDown = function(point) {
	console.log("mouse down " + point.x + ", " + point.y);
	if (!this.firstPoint) {
		this.firstPoint = point;
	}
	else {
		this.document.addGeometry(new Line(this.firstPoint, point));
		this.firstPoint = point;
	}
}

LineTool.prototype.onMouseRightDown = function(point) {
	console.log("mouse right down " + point.x + ", " + point.y);
	// if (this.firstPoint)
	// 	this.document.addGeometry([[this.firstPoint.x, this.firstPoint.y], [point.x, point.y]]);
	this.document.clearEditionGeometries();
	this.firstPoint = null;
}

LineTool.prototype.onMouseRelease = function(point) {
	console.log("mouse release " + point.x + ", " + point.y);
}

LineTool.prototype.activate = function() {
	console.log("activating");
}

LineTool.prototype.deactivate = function() {

}