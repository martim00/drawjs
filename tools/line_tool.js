
LineTool = function(document) {
	this.document = document;

	this.lastPoint = null;
	this.currentGeometry = null;
}
LineTool.inherits(Tool);

LineTool.prototype.onMouseDrag = function(args) {
}

LineTool.prototype.onMouseMove = function(args) {
	if (!this.lastPoint)
		return;

	this.document.addEditionGeometry(new Line(this.lastPoint, args.point));
}

LineTool.prototype.onMouseLeftDown = function(point) {
	console.log("mouse down " + point.x + ", " + point.y);
	if (!this.currentGeometry) {
		this.currentGeometry = new Polyline();
		this.document.addGeometry(this.currentGeometry);
	}

	if (!this.lastPoint) {
		this.lastPoint = point;
	}
	else {
		this.currentGeometry.addLine(new Line(this.lastPoint, point));
		///this.document.addGeometry(new Line(this.lastPoint, point));
		this.lastPoint = point;
	}
}

LineTool.prototype.onMouseRightDown = function(point) {
	if (!this.lastPoint)
		return false;

	this.document.clearEditionGeometries();
	this.lastPoint = null;
	return true;
}

LineTool.prototype.onMouseRelease = function(point) {
	console.log("mouse release " + point.x + ", " + point.y);
}

LineTool.prototype.onMouseDblClick = function(point) {
	if (this.currentGeometry) {
		this.currentGeometry.closePolygon();
		this.lastPoint = null;
		this.currentGeometry = null;
		this.document.clearEditionGeometries();
	}
}

LineTool.prototype.activate = function() {
	console.log("activating");
}

LineTool.prototype.deactivate = function() {

}
