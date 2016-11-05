

Rect = function(p1, p2, strokeStyle) {
	this.p1 = p1;
	this.p2 = p2;
	this.strokeStyle = strokeStyle ? strokeStyle : 'black';
}

Rect.prototype.containsPoint = function(point) {
	return pointInsidePolygon(point, this.getPoints());
}

Rect.prototype.getPoints = function() {
	return [this.p1, new Point(this.p2.x, this.p1.y), this.p2, new Point(this.p1.x, this.p2.y), this.p1]
}

Rect.prototype.getStrokeStyle = function() {
	return this.strokeStyle;
}

Rect.prototype.getBoundingRect = function() {
	return new Rect(this.p1.sum(new Point(-5, -5)), this.p2.sum(new Point(5, 5)), 'blue');
}

Rect.prototype.moveBy = function(vector) {
	return new Rect(this.p1.sum(vector), this.p2.sum(vector), this.strokeStyle);
}

Rect.prototype.getCenter = function() {
	var x = this.p1.x + this.p2.x / 2;
	var y = this.p1.y + this.p2.y / 2;

	return new Point(x, y);
}

Rect.prototype.rotateBy = function(vector) {
	return new Rect(
		this.p1.rotate(this.getCenter(), vector.getAngle(new Point(0, 0))),
		this.p2.rotate(this.getCenter(), vector.getAngle(new Point(0, 0)))
	);
}


