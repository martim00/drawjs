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
	var boundingRect = this.targetGeo.getBoundingRect();
	var points = boundingRect.getPoints();
	points.splice(4, 1); // removing last point (equals first)

	var center = boundingRect.getCenter();
	var originalP1 = points[0].rotate(center, -boundingRect.getAngle());

	var anglePoint = new Point(center.x, originalP1.y - 40).rotate(center, boundingRect.getAngle());
	points.push(anglePoint);

	return points;
}

SelectionEditor.prototype.getGeometries = function() {
	var geometries = [];

	var rect = this.targetGeo.getBoundingRect();
	geometries = geometries.concat(rect);

	var editionPoints = this.getEditionPoints();

	geometries.push(new Rect(editionPoints[0], editionPoints[0], 'black', 'red'));
	geometries.push(new Rect(editionPoints[1], editionPoints[1], 'black', 'red'));
	geometries.push(new Rect(editionPoints[2], editionPoints[2], 'black', 'red'));
	geometries.push(new Rect(editionPoints[3], editionPoints[3], 'black', 'red'));

	var center = rect.getCenter();
	var originalP1 = editionPoints[0].rotate(center, -rect.getAngle());

	var anglePoint = editionPoints[4]

	geometries.push(new Line(new Point(center.x, originalP1.y).rotate(center, rect.getAngle()), anglePoint));
	geometries.push(new Rect(anglePoint.minus2(5), anglePoint.sum2(5), 'black', 'red'));
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