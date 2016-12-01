
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

	this.document.addEditionGeometry(this.currentGeometry, false);
	this.document.addEditionGeometry(new Line(this.lastPoint, args.point, 'red', null), true);
}

LineTool.prototype.onMouseLeftDown = function(point) {
	if (!this.currentGeometry) {
		this.currentGeometry = new Polyline();
	}

	if (this.lastPoint)
		this.currentGeometry.addLine(new Line(this.lastPoint, point));
	
	this.lastPoint = point;
}

LineTool.prototype.onMouseRightDown = function(point) {

	if (!this.currentGeometry)
		return false;

	if (this.currentGeometry.getPointsCount() > 1) 
		this.document.addGeometry(this.currentGeometry);

	this.document.clearEditionGeometries();
	this.currentGeometry = null;
	this.lastPoint = null;
	return true;
}

LineTool.prototype.onMouseRelease = function(point) {
	console.log("mouse release " + point.x + ", " + point.y);
}

LineTool.prototype.onMouseDblClick = function(point) {
	if (this.currentGeometry && this.currentGeometry.getPointsCount() > 1) {
		this.currentGeometry.closePolygon();
		this.document.addGeometry(this.currentGeometry);
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
