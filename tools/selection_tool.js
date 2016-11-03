SelectionTool = function(document) {
	this.document = document;
}
SelectionTool.prototype.activate = function() {
}

SelectionTool.prototype.deactivate = function() {
}

SelectionTool.prototype.onMouseMove = function(point) {
}

SelectionTool.prototype.onMouseLeftDown = function(point) {
	var geometry = this.document.findGeometryAt(point);
	if (geometry) {
		console.log("found....");
		var editionRect = geometry.getRect();
		this.document.addEditionGeometry(editionRect);

	}

}

SelectionTool.prototype.onMouseRightDown = function(point) {
	console.log("mouse right down " + point.x + ", " + point.y);
}

SelectionTool.prototype.onMouseRelease = function(point) {
	console.log("mouse release " + point.x + ", " + point.y);
}