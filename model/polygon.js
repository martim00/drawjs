
Polygon = function() {
	this.points = [];
}

Polygon.inherits(Geometry);

Polygon.prototype.containsPoint = function(point) {
	pointInsidePolygon(point, this.points.map());
}

Polygon.prototype.getPoints = function() {
	return this.points;
}