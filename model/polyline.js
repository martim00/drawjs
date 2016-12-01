
Polyline = function(strokeStyle, fillStyle, angle) {
	// this.lines = [];
	this.points = [];
	Geometry.call(this, strokeStyle, fillStyle, angle);
}

Polyline.inherits(Geometry);

Polyline.prototype.isClosed = function() {
	return this.getLastPoint() == this.getFirstPoint();
}

Polyline.prototype.addLine = function(line) {
	// this.lines.push(line);
	// TODO: tratar pontos repetidos
	this.points.push(line.p1);
	this.points.push(line.p2);
}

// Polyline.prototype.getLineCount = function() {
// 	return this.lines.length;
// }

Polyline.prototype.getPointsCount = function() {
	return this.points.length;
}

Polyline.prototype.getPoints = function() {
	return this.points;
	// var points = [];
	// this.lines.forEach(function(line) {
	// 	points.push(line.p1);
	// 	points.push(line.p2);
	// });
	// return points;
}

// Polyline.prototype.containsPoint = function(point) {
// 	return this.getBoundingRect().containsPoint(point);
// }

// Polyline.prototype.getCenter = function() {
// 	return this.getBoundingRect().getCenter();
// }

Polyline.prototype.addPoint = function(point) {
	this.points.push(point);
}

Polyline.prototype.rotate = function(angle) {
	var polyline = new Polyline(this.strokeStyle, this.fillStyle, angle);

	var diff = angle - this.angle;
	var center = this.getCenter();
	// this.lines.forEach(function(line) {
	// 	polyline.addLine(line.rotateWithCenter(center, angle));
	// });
	var rotated = this.rotatePoints(this.points, center, diff);
	polyline.setPoints(rotated);

	return polyline;
}

Polyline.prototype.setPoints = function(points) {
	this.points = points;
}

Polyline.prototype.rotatePoints = function(points, center, angle) {
	return rotatePoints(points, center, angle);

	// var rotated = [];

	// points.forEach(function(point) {
	// 	rotated.push(point.rotate(center, diff));
	// });

	// return rotate;
}

Polyline.prototype.getBoundingRect = function() {
	var rotated = this.rotatePoints(this.getPoints(), this.getCenter(), -this.angle);
	var rect = getBoundingRect(rotated);
	return this.rotatePoints(rect, this.getCenter(), this.angle);

	// var leftX = 999999; // ugly
	// var leftY = 999999;
	// var rightX = 0;
	// var rightY = 0;

	// for (var i = 0; i < this.lines.length; i++) {
	// 	var line = this.lines[i];

	// 	var lineBoundRect = line.getBoundingRect();
	// 	if (lineBoundRect.p1.x < leftX)
	// 		leftX = lineBoundRect.p1.x;

	// 	if (lineBoundRect.p2.x < leftX)
	// 		leftX = lineBoundRect.p2.x;

	// 	if (lineBoundRect.p1.y < leftY)
	// 		leftY = lineBoundRect.p1.y;

	// 	if (lineBoundRect.p2.y < leftY)
	// 		leftY = lineBoundRect.p2.y;

	// 	if (lineBoundRect.p1.x > rightX)
	// 		rightX = lineBoundRect.p1.x;

	// 	if (lineBoundRect.p2.x > rightX)
	// 		rightX = lineBoundRect.p2.x;

	// 	if (lineBoundRect.p1.y > rightY)
	// 		rightY = lineBoundRect.p1.y;

	// 	if (lineBoundRect.p2.y > rightY)
	// 		rightY = lineBoundRect.p2.y;
	// }

	// return new Rect(new Point(leftX, leftY), 
	// 	new Point(rightX, rightY), 'blue', null, this.angle, this.center);
}

Polyline.prototype.moveBy = function(vector) {
	var moved = new Polyline(this.strokeStyle, this.fillStyle, this.angle);

	// var movedPoints = this.points.map(function(point, index, arr) {
	// 	return point.sum(vector);
	// });
	var movedPoints = movePoints(this.points, vector);

	moved.setPoints(movedPoints);
	// this.lines.forEach(function(line) {
	// 	moved.addLine(line.moveBy(vector));
	// });

	return moved;
}

Polyline.prototype.getLastPoint = function() {
	return this.points[this.points.length-1];
	// return this.lines[this.lines.length-1].p2;
}

Polyline.prototype.getFirstPoint = function() {
	return this.points[0];
	// return this.lines[0].p1;
}

Polyline.prototype.closePolygon = function() {
	this.points.push(this.getFirstPoint());

	// var angle = this.getLastPoint().getAngle(this.getFirstPoint());
	// this.addLine(new Line(this.getLastPoint(), this.getFirstPoint(), this.strokeStyle, 
	// 	this.fillStyle, angle, this.center));
}


