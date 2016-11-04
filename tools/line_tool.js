
LineTool = function(document) {
	this.document = document;

	this.lastPoint = null;
	this.currentGeometry = null;
}

LineTool.prototype.onMouseDrag = function(args) {
}

LineTool.prototype.onMouseMove = function(args) {
	if (!this.lastPoint)
		return;

	console.log("mouse moving> " + args.point.x + ", " + args.point.y);
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
	console.log("mouse right down " + point.x + ", " + point.y);
	// if (this.lastPoint)
	// 	this.document.addGeometry([[this.lastPoint.x, this.lastPoint.y], [point.x, point.y]]);
	this.document.clearEditionGeometries();
	this.lastPoint = null;
}

LineTool.prototype.onMouseRelease = function(point) {
	console.log("mouse release " + point.x + ", " + point.y);
}

LineTool.prototype.activate = function() {
	console.log("activating");
}

LineTool.prototype.deactivate = function() {

}