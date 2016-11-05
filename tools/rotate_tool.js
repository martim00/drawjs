
RotateTool = function(document) {
	this.document = document;
	this.rotatedGeo = null;
}

RotateTool.inherits(SelectionTool);

RotateTool.prototype.onMouseDrag = function(args) {
	var movementVector = args.endPoint.minus(args.beginPoint);
	this.rotatedGeo = this.selectedGeo.rotateBy(movementVector);
	this.document.addEditionGeometry(this.rotatedGeo);
}

