

Rect = function(p1, p2, strokeStyle, fillStyle, angle) {
	this.p1 = p1;
	this.p2 = p2;
	Geometry.call(this, strokeStyle, fillStyle, angle);
}

Rect.inherits(Geometry);

Rect.prototype.containsPoint = function(point) {
	return pointInsidePolygon(point, this.getPoints());
}

Rect.prototype.getPoints = function() {
	var center = this.getCenter();

	//console.log("angle " + -this.angle);
	var originP1 = this.p1.rotate(center, -this.angle);
	//console.log("original p1 " + originP1.x + ", " + originP1.y);
	var originP2 = this.p2.rotate(center, -this.angle);
	//console.log("original p2 " + originP2.x + ", " + originP2.y);

	return [this.p1, 
			new Point(originP2.x, originP1.y).rotate(center, this.angle), 
			this.p2, 
			new Point(originP1.x, originP2.y).rotate(center, this.angle), 
			this.p1]
	// return [this.p1.rotate(center, this.angle), 
	// 		new Point(this.p2.x, this.p1.y).rotate(center, this.angle), this.p2.rotate(center, this.angle), 
	// 		new Point(this.p1.x, this.p2.y).rotate(center, this.angle), this.p1.rotate(center, this.angle)]
}

Rect.prototype.getBoundingRect = function() {
	// return new Rect(this.p1.sum(new Point(-5, -5)), this.p2.sum(new Point(5, 5)), 'blue', null, this.angle);
	return new Rect(this.p1, this.p2, 'blue', null, this.angle);
}

Rect.prototype.moveBy = function(vector) {
	return new Rect(this.p1.sum(vector), this.p2.sum(vector), this.strokeStyle, this.fillStyle, this.angle);
}

Rect.prototype.getTop = function() {
	return this.p1.y;
}

Rect.prototype.getLeft = function() {
	return this.p1.x;
}

Rect.prototype.getCenter = function() {
	var x = (this.p1.x + this.p2.x) / 2;
	var y = (this.p1.y + this.p2.y) / 2;

	return new Point(x, y);
}

Rect.prototype.rotate = function(angle) {
	var diff = angle - this.angle;
	// this.angle = angle;
	console.log("rotate by " + diff);
	var center = this.getCenter();
	console.log("center " + center.x + ", " + center.y);
	var rotateP1 = this.p1.rotate(center, diff);
	console.log("p1 " + rotateP1.x + ", " + rotateP1.y);
	var rotateP2 = this.p2.rotate(center, diff);
	console.log("p2 " + rotateP2.x + ", " + rotateP2.y);
	return new Rect(rotateP1, rotateP2, this.strokeStyle, this.fillStyle, angle);
	// return new Rect(
	// 	this.p1.rotate(this.getCenter(), angle),
	// 	this.p2.rotate(this.getCenter(), angle)
	// );
}

// Rect.prototype.drawSelection = function(context) {
// 	context.fillStyle = "#ff2626"; // Red color

//     context.beginPath();
//     var center = this.getCenter();
//     console.log(center.x);
//     console.log(center.y);
//     context.rect(center.x - 5, center.y - 5, 10, 10);
//     context.closePath();

//     var rect = this.getBoundingRect().getPoints();
//     context.rect(rect[0].x - 5, rect[0].y - 5, 10, 10);
//     context.closePath();
//     context.rect(rect[1].x - 5, rect[1].y - 5, 10, 10);
//     context.closePath();
//     context.rect(rect[2].x - 5, rect[2].y - 5, 10, 10);
//     context.closePath();
//     context.rect(rect[3].x - 5, rect[3].y - 5, 10, 10);
//     context.closePath();
//     context.fill();
// }


