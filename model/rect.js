

Rect = function(p1, p2, strokeStyle) {
	this.p1 = p1;
	this.p2 = p2;
	this.angle = 0;
	this.strokeStyle = strokeStyle ? strokeStyle : 'black';
}

Rect.inherits(Geometry);

Rect.prototype.containsPoint = function(point) {
	return pointInsidePolygon(point, this.getPoints());
}

Rect.prototype.getPoints = function() {
	var center = this.getCenter();
	return [this.p1.rotate(center, this.angle), 
			new Point(this.p2.x, this.p1.y).rotate(center, this.angle), this.p2.rotate(center, this.angle), 
			new Point(this.p1.x, this.p2.y).rotate(center, this.angle), this.p1.rotate(center, this.angle)]
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

Rect.prototype.rotateBy = function(angle) {
	this.angle = angle;
	// return new Rect(
	// 	this.p1.rotate(this.getCenter(), angle),
	// 	this.p2.rotate(this.getCenter(), angle)
	// );
}


