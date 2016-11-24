
Line = function(p1, p2, strokeStyle, fillStyle) {
	this.p1 = p1;
	this.p2 = p2;
	Geometry.call(this, strokeStyle, fillStyle, 0);
	// this.strokeStyle = strokeStyle ? strokeStyle : 'black';
}

Line.inherits(Geometry);

Line.prototype.distance = function() {
	return new Point(this.p1.x, this.p1.y).distance(this.p2);
}

Line.prototype.containsPoint = function(point) {

	var d1 = new Point(point.x, point.y).distance(this.p1);
	var d2 = new Point(point.x, point.y).distance(this.p2);

	var d1d2 = d1 + d2;
	var distance = this.distance();

	return floatEquals(d1 + d2, this.distance());
}

Line.prototype.getStrokeStyle = function() {
	return this.strokeStyle;
}

Line.prototype.getPoints = function() {
	return [this.p1, this.p2];
}

Line.prototype.getBoundingRect = function() {
	var leftX = this.p1.x < this.p2.x ? this.p1.x : this.p2.x;
	var leftY = this.p1.y < this.p2.y ? this.p1.y : this.p2.y;

	var rightX = this.p1.x > this.p2.x ? this.p1.x : this.p2.x;
	var rightY = this.p1.y > this.p2.y ? this.p1.y : this.p2.y;

	return new Rect(new Point(leftX - 5, leftY - 5), new Point(rightX + 5, rightY + 5));
}

Line.prototype.moveBy = function(vector) {
	return new Line(this.p1.sum(vector), this.p2.sum(vector), this.strokeStyle);
}

