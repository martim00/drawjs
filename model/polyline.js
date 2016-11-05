
Polyline = function() {
	this.lines = [];
}

Polyline.prototype.addLine = function(line) {
	this.lines.push(line);
}

Polyline.prototype.getPoints = function() {
	var points = [];
	this.lines.forEach(function(line) {
		points.push(line.p1);
		points.push(line.p2);
	});
	return points;
}

Polyline.prototype.containsPoint = function(point) {
	for (var i = 0; i < this.lines.length; i++) {
		if (this.lines[i].containsPoint(point)) {
			return true;
		}
	}

	return false;
}

Polyline.prototype.getBoundingRect = function() {
	var leftX = 999999; // ugly
	var leftY = 999999;
	var rightX = 0;
	var rightY = 0;

	for (var i = 0; i < this.lines.length; i++) {
		var line = this.lines[i];

		var lineBoundRect = line.getBoundingRect();
		if (lineBoundRect.p1.x < leftX)
			leftX = lineBoundRect.p1.x;

		if (lineBoundRect.p1.y < leftY)
			leftY = lineBoundRect.p1.y;

		if (lineBoundRect.p2.x > rightX)
			rightX = lineBoundRect.p2.x;

		if (lineBoundRect.p2.y > rightY)
			rightY = lineBoundRect.p2.y;
	}

	return new Rect(new Point(leftX, leftY), new Point(rightX, rightY), 'blue');
}

Polyline.prototype.moveBy = function(vector) {
	var moved = new Polyline();

	this.lines.forEach(function(line) {
		moved.addLine(line.moveBy(vector));
	});

	return moved;
}

Polyline.prototype.getLastPoint = function() {
	return this.lines[this.lines.length-1].p2;
}

Polyline.prototype.getFirstPoint = function() {
	return this.lines[0].p1;
}

Polyline.prototype.closePolygon = function() {
	this.addLine(new Line(this.getLastPoint(), this.getFirstPoint()));
}


