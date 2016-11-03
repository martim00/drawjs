

Rect = function(p1, p2, strokeStyle) {
	this.p1 = p1;
	this.p2 = p2;
	this.strokeStyle = strokeStyle ? strokeStyle : 'black';
}

Rect.prototype.containsPoint = function(point) {
	
}

Rect.prototype.getStrokeStyle = function() {
	return this.strokeStyle;
}