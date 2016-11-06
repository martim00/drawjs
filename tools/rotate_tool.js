
RotateTool = function(document) {
	this.document = document;
	this.rotatedGeo = null;
}

RotateTool.inherits(SelectionTool);

RotateTool.prototype.onMouseDrag = function(args) {
	var angle = this.selectedGeo.getCenter().getAngle(args.endPoint);
	//var angle = args.endPoint.getAngle(this.selectedGeo.getCenter());
	console.log(angle * 57.2958);
	this.rotatedGeo = this.selectedGeo.rotateBy(angle);
	this.document.addEditionGeometry(this.rotatedGeo);
}

