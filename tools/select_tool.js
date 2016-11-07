SelectTool = function(document) {
	this.document = document;
	this.movedGeo = null;
	this.selectedGeo = null;
}

SelectTool.inherits(Tool);

SelectTool.prototype.activate = function() {
}

SelectTool.prototype.deactivate = function() {
}

SelectTool.prototype.onMouseDrag = function(args) {

	var geometry = this.document.findGeometryAt(args.beginPoint);
	if (geometry) {
		console.log("mouse dragged");
		this.selectedGeo = geometry;

		var movementVector = args.endPoint.minus(args.beginPoint);
		this.movedGeo = geometry.moveBy(movementVector);
		this.document.clearEditionGeometries();
		this.document.addEditionGeometry(this.movedGeo, true);
		this.document.addEditionGeometry(this.movedGeo.getBoundingRect(), true);
	}

}

SelectTool.prototype.onMouseMove = function(args) {
	console.log("mouse moved");
}

SelectTool.prototype.onMouseLeftDown = function(point) {
	console.log("mouse left down");
	var geometry = this.document.findGeometryAt(point);
	if (!geometry) {
		this.clearSelection();
		return;
	}

	this.selectGeometry(geometry);
}

SelectTool.prototype.selectGeometry = function(geometry) {
	this.selectedGeo = geometry;

	//var editor = this.editorsFactory.build(this.selectedGeo);
	//this.document.addEditionGeometry(editor.getEditionGeometry());

	this.document.selectGeometry(geometry);

	var editionRect = geometry.getBoundingRect();
	this.document.addEditionGeometry(editionRect);
}

SelectTool.prototype.clearSelection = function() {
	this.selectedGeo = null;
	this.document.clearEditionGeometries();
}

SelectTool.prototype.onMouseRightDown = function(point) {
	console.log("mouse right down " + point.x + ", " + point.y);
	this.clearSelection();
}

SelectTool.prototype.onMouseRelease = function(point) {
	console.log("mouse release " + point.x + ", " + point.y);
	if (this.movedGeo) {
		this.document.clearEditionGeometries();
		this.document.removeGeometry(this.selectedGeo);
		this.document.addGeometry(this.movedGeo);
		this.selectGeometry(this.movedGeo);
		this.movedGeo = null;
	}
}