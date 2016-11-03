
RectTool = function(document) {
	this.document = document;

	this.firstPoint = null;
}

RectTool.prototype.onMouseMove = function(point) {
	if (!this.firstPoint)
		return;

	console.log("mouse moving " + point.x + ", " + point.y);
	this.document.addEditionGeometry(new Rect(this.firstPoint, point));
}

RectTool.prototype.onMouseLeftDown = function(point) {
	console.log("mouse down " + point.x + ", " + point.y);
	if (!this.firstPoint) {
		this.firstPoint = point;
	}
	else {
		this.document.addGeometry(new Rect(this.firstPoint, point));
		this.firstPoint = null;
	}
}

RectTool.prototype.onMouseRightDown = function(point) {
	console.log("mouse right down " + point.x + ", " + point.y);
	// if (this.firstPoint)
	// 	this.document.addGeometry([[this.firstPoint.x, this.firstPoint.y], [point.x, point.y]]);
	this.document.clearEditionGeometries();
	this.firstPoint = null;
}

RectTool.prototype.onMouseRelease = function(point) {
	console.log("mouse release " + point.x + ", " + point.y);
}

RectTool.prototype.activate = function() {
	console.log("activating");
}

RectTool.prototype.deactivate = function() {
	console.log("deactivating");
}