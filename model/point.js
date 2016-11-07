
Point = function(x, y) {
	this.x = x;
	this.y = y;
}

Point.inherits(Geometry);

Point.prototype.distance = function(point) {
	var dx = this.x - point.x;
	var dy = this.y - point.y;
	return Math.sqrt(dx * dx + dy * dy);
}

Point.prototype.sum = function(point) {
	return new Point(this.x + point.x, this.y + point.y);
}

Point.prototype.minus = function(point) {
	return new Point(this.x - point.x, this.y - point.y);
}

Point.prototype.getAngle = function(point) {
	var dx = point.x - this.x;
	var dy = point.y - this.y;

    if ((Math.abs(dx) + Math.abs(dy)) < 0.00000001)
        return 0.0;

    var angle = Math.atan2(dy, dx);
    if (angle < 0)
        angle = 2 * Math.PI + angle;
    return angle;
}

Point.prototype.rotate = function(reference, radius) {
	var dx = this.x - reference.x;
	var dy = this.y - reference.y;
	var cos = Math.cos(radius);
	var sin = Math.sin(radius);

	var x = reference.x + dx * cos - dy * sin;
	var y = reference.y + dx * sin + dy * cos;
	return new Point(x, y);
}

