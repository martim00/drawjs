
Point = function(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.distance = function(point) {
	var dx = this.x - point.x;
	var dy = this.y - point.y;
	return Math.sqrt(dx * dx + dy * dy);
}
