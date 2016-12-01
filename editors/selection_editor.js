EditionPoints = {
	TopLeft: 0,
	TopRight: 1,
	BottomLeft: 2,
	BottomRight: 3,
	Angle: 4,
	None: -1,
}

SelectionEditor = function(targetGeo) {
	this.targetGeo = targetGeo;
}

/*
*	Edition points are the bounding rect points (scale points) plus 
*	angle point 
*/
SelectionEditor.prototype.getEditionPoints = function() {
	var boundingPoints = this.targetGeo.getBoundingRect();
	// var points = boundingRect.getPoints();
	boundingPoints.splice(4, 1); // removing last point (equals first)

	var center = this.targetGeo.getCenter();
	var originalP1 = boundingPoints[0].rotate(center, -this.targetGeo.getAngle());

	var anglePoint = new Point(center.x, originalP1.y - 40).rotate(center, this.targetGeo.getAngle());
	boundingPoints.push(anglePoint);

	return boundingPoints;
}

SelectionEditor.prototype.createRectFromPoint = function(point, angle) {
	var topLeft = point.minus2(5).rotate(point, angle);
	var topRight = point.sum(new Point(5, -5)).rotate(point, angle);
	var bottomRight = point.sum2(5).rotate(point, angle);
	var bottomLeft = point.sum(new Point(-5, 5)).rotate(point, angle);
	return new Rect(topLeft, topRight, bottomRight, bottomLeft, 'black', 'red');
}

SelectionEditor.prototype.getGeometries = function() {
	var geometries = [];

	var angle = this.targetGeo.getAngle();

	var rect = this.targetGeo.getBoundingRect();
	geometries = geometries.concat(new Rect(rect[0], rect[1], rect[2], rect[3], 'black', null));

	var editionPoints = this.getEditionPoints();


	geometries.push(this.createRectFromPoint(editionPoints[0], angle));
	geometries.push(this.createRectFromPoint(editionPoints[1], angle));
	geometries.push(this.createRectFromPoint(editionPoints[2], angle));
	geometries.push(this.createRectFromPoint(editionPoints[3], angle));
	// geometries.push(new Rect(editionPoints[0], editionPoints[0], 'black', 'red'));
	// geometries.push(new Rect(editionPoints[1], editionPoints[1], 'black', 'red'));
	// geometries.push(new Rect(editionPoints[2], editionPoints[2], 'black', 'red'));
	// geometries.push(new Rect(editionPoints[3], editionPoints[3], 'black', 'red'));

	var center = this.targetGeo.getCenter();
	console.log("CENTER: " + center.x + ", " + center.y);
	var originalP1 = editionPoints[0].rotate(center, -angle);

	var anglePoint = editionPoints[4]

	geometries.push(new Line(new Point(center.x, originalP1.y).rotate(center, angle), anglePoint));
	geometries.push(this.createRectFromPoint(anglePoint, angle));
	return geometries;
}

SelectionEditor.prototype.getSelectionCenter = function() {
	return this.targetGeo.getCenter();
}

SelectionEditor.prototype.getAngleFromCenter = function(point) {
	var angle = this.normalizeAngle(
		this.getSelectionCenter().getAngle(point) + 1.5708);
	return angle;
}

SelectionEditor.prototype.normalizeAngle = function(angle) {
    return Math.atan2(Math.sin(angle), Math.cos(angle));
} 

SelectionEditor.prototype.isOverSelectionPoints = function(point) {
   var MIN_DISTANCE = 10;
   var selectionPoints = this.getEditionPoints();
   for (var i = 0; i < selectionPoints.length; i++) {
      var distance = selectionPoints[i].distance(point);
      if (distance < MIN_DISTANCE) {
         return i;
      }
   }

   return -1;
}