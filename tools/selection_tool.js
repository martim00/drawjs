SelectionTool = function(document) {
	this.document = document;
	this.movedGeo = null;
}
SelectionTool.prototype.activate = function() {
}

SelectionTool.prototype.deactivate = function() {
}

SelectionTool.prototype.onMouseDrag = function(args) {

	var geometry = this.document.findGeometryAt(args.beginPoint);
	if (geometry) {
		var movementVector = args.endPoint.minus(args.beginPoint);
		this.movedGeo = geometry.moveBy(movementVector);
		this.document.addEditionGeometry(this.movedGeo);
	}

}

SelectionTool.prototype.onMouseMove = function(args) {
	console.log(args.point);
}

SelectionTool.prototype.onMouseLeftDown = function(point) {
	var geometry = this.document.findGeometryAt(point);
	if (geometry) {
		console.log("found....");
		var editionRect = geometry.getBoundingRect();
		this.document.addEditionGeometry(editionRect);
	}
}

SelectionTool.prototype.onMouseRightDown = function(point) {
	console.log("mouse right down " + point.x + ", " + point.y);
}

SelectionTool.prototype.onMouseRelease = function(point) {
	console.log("mouse release " + point.x + ", " + point.y);
	if (this.movedGeo)
		this.document.addGeometry(this.movedGeo);
}