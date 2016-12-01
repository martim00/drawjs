
Line = function(p1, p2, strokeStyle, fillStyle, angle, center) {
	this.p1 = p1;
	this.p2 = p2;
	Geometry.call(this, strokeStyle, fillStyle, angle, center);
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

// Line.prototype.getCenter = function() {
// 	var x = (this.p1.x + this.p2.x) / 2;
// 	var y = (this.p1.y + this.p2.y) / 2;

// 	return new Point(x, y);
// }

Line.prototype.rotateWithCenter = function(center, angle) {
	var diff = angle - this.angle;

	return new Line(this.p1.rotate(center, diff), this.p2.rotate(center, diff), 
		this.strokeStyle, this.fillStyle, angle, center);
}

Line.prototype.getStrokeStyle = function() {
	return this.strokeStyle;
}

Line.prototype.getPoints = function() {
	return [this.p1, this.p2];
}

Line.prototype.getBoundingRect = function() {

	var center = this.getCenter();
	var originalP1 = this.p1.rotate(center, -this.angle);
	var originalP2 = this.p2.rotate(center, -this.angle);

	var leftX = originalP1.x < originalP2.x ? originalP1.x : originalP2.x;
	var leftY = originalP1.y < originalP2.y ? originalP1.y : originalP2.y;

	var rightX = originalP1.x > originalP2.x ? originalP1.x : originalP2.x;
	var rightY = originalP1.y > originalP2.y ? originalP1.y : originalP2.y;

	return new Rect(new Point(leftX, leftY).rotate(center, this.angle), 
		new Point(rightX, rightY).rotate(center, this.angle), 'blue', null, this.angle, this.center);
}

Line.prototype.moveBy = function(vector) {
	return new Line(this.p1.sum(vector), this.p2.sum(vector), 
		this.strokeStyle, this.fillStyle, this.angle, this.center.sum(vector));
}

