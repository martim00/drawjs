SelectTool = function(document, cursorService) {
	this.document = document;
	this.movedGeo = null;
	this.cursorService = cursorService;
	this.currentMovement = EditionPoints.None;
}

SelectTool.inherits(Tool);

SelectTool.prototype.activate = function() {
	this.cursorService.setCursor("pointer");
}

SelectTool.prototype.deactivate = function() {
}

SelectTool.prototype.isScaling = function() {
	return this.currentMovement >= 0 && this.currentMovement < 4;
}

SelectTool.prototype.isRotating = function() {     
	return this.currentMovement == EditionPoints.Angle; 
}

SelectTool.prototype.isIdle = function() {     
	return this.currentMovement == EditionPoints.None; 
}

SelectTool.prototype.onMouseDrag = function(args) {

	console.log("mouse dragged");

	if (this.selectionEditor) {
		console.log("has selection editor");

		if (this.isIdle()) {
			this.currentMovement = this.selectionEditor.isOverSelectionPoints(args.beginPoint);
			console.log(this.currentMovement);
		}

		if (this.isScaling()) {
			console.log("scalingggg");
			return true;
		}
		else if (this.isRotating()) {
			console.log("rotatingg");
			var angle = this.selectionEditor.getAngleFromCenter(args.endPoint);
			console.log(angle * 57.2958);
			var geometry = this.document.getSelectedGeometry();
			this.movedGeo = geometry.rotate(angle);

			this.document.clearEditionGeometries();
			this.document.addEditionGeometry(this.movedGeo, true);
			this.document.addEditionGeometry(Rect.build(this.movedGeo.getBoundingRect()), true);
			return true;

		} else { // moving

			console.log("moving");
			var geometry = this.document.getSelectedGeometry();

			var movementVector = args.endPoint.minus(args.beginPoint);
			this.movedGeo = geometry.moveBy(movementVector);

			this.document.clearEditionGeometries();
			this.document.addEditionGeometry(this.movedGeo, true);
			this.document.addEditionGeometry(Rect.build(this.movedGeo.getBoundingRect()), true);
		}
	}
}

SelectTool.prototype.onMouseMove = function(args) {
	console.log("mouse moved");
	if (this.selectionEditor) {
		var selectionPoint = this.selectionEditor.isOverSelectionPoints(args.point);

		switch(selectionPoint) {
			case EditionPoints.TopLeft: 
				this.cursorService.setCursor("nw-resize");
				break;
			case EditionPoints.TopRight:
				this.cursorService.setCursor("ne-resize");
				break;
			case EditionPoints.BottomLeft:
				this.cursorService.setCursor("se-resize");
				break;
			case EditionPoints.BottomRight:
				this.cursorService.setCursor("sw-resize");
				break;
			case EditionPoints.Angle:
				this.cursorService.setCursor("e-resize");
				break;
			default:
				this.cursorService.setCursor("pointer");
		}
	}
	return true;
}

SelectTool.prototype.onMouseLeftDown = function(point) {

	console.log("mouse left down");
	if (this.selectionEditor && this.selectionEditor.isOverSelectionPoints(point) != EditionPoints.None)
		return;

	var geometry = this.document.findGeometryAt(point);
	if (!geometry) {
		this.clearSelection();
		return;
	}

	this.selectGeometry(geometry);
}

SelectTool.prototype.selectGeometry = function(geometry) {
	this.document.selectGeometry(geometry);

	console.log("SELECTING GEOMETRY ANGLE: " + geometry.getAngle());

	this.selectionEditor = new SelectionEditor(geometry);
	this.document.addEditionGeometries(this.selectionEditor.getGeometries());
}

SelectTool.prototype.clearSelection = function() {
	this.selectionEditor = null;
	this.document.clearEditionGeometries();
	this.document.clearSelection();
}

SelectTool.prototype.onMouseRightDown = function(point) {
	console.log("mouse right down " + point.x + ", " + point.y);
	this.clearSelection();
}

SelectTool.prototype.onMouseRelease = function(point) {
	console.log("mouse release " + point.x + ", " + point.y);
	if (this.movedGeo) {
		this.document.clearEditionGeometries();
		this.document.removeGeometry(this.document.getSelectedGeometry());
		this.document.addGeometry(this.movedGeo);
		this.selectGeometry(this.movedGeo);
		this.movedGeo = null;
		this.currentMovement = EditionPoints.None;
	}
}

