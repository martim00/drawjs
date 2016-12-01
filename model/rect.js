

Rect = function(topLeft, topRight, bottomRight, bottomLeft, strokeStyle, fillStyle) {
	this.topLeft = topLeft;
	this.topRight = topRight;
	this.bottomLeft = bottomLeft;
	this.bottomRight = bottomRight;
	Geometry.call(this, strokeStyle, fillStyle, topLeft.getAngle(topRight));
}

Rect.build = function(points, strokeStyle, fillStyle) {
	return new Rect(points[0], points[1], points[2], points[3], strokeStyle, fillStyle);
}

Rect.build2 = function(topLeft, bottomRight, strokeStyle, fillStyle) {
	return new Rect(topLeft, new Point(bottomRight.x, topLeft.y), 
		bottomRight, new Point(topLeft.x, bottomRight.y), strokeStyle, fillStyle);
}

Rect.inherits(Geometry);

// Rect.prototype.containsPoint = function(point) {
// 	return pointInsidePolygon(point, this.getPoints());
// }

Rect.prototype.getPoints = function() {
	return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft, this.topLeft];
	// var center = this.getCenter();

	// //console.log("angle " + -this.angle);
	// var originP1 = this.p1.rotate(center, -this.angle);
	// //console.log("original p1 " + originP1.x + ", " + originP1.y);
	// var originP2 = this.p2.rotate(center, -this.angle);
	// //console.log("original p2 " + originP2.x + ", " + originP2.y);

	// return [this.p1, 
	// 		new Point(originP2.x, originP1.y).rotate(center, this.angle), 
	// 		this.p2, 
	// 		new Point(originP1.x, originP2.y).rotate(center, this.angle), 
	// 		this.p1]
	// return [this.p1.rotate(center, this.angle), 
	// 		new Point(this.p2.x, this.p1.y).rotate(center, this.angle), this.p2.rotate(center, this.angle), 
	// 		new Point(this.p1.x, this.p2.y).rotate(center, this.angle), this.p1.rotate(center, this.angle)]
}

Rect.prototype.getBoundingRect = function() {
	// return new Rect(this.p1.sum(new Point(-5, -5)), this.p2.sum(new Point(5, 5)), 'blue', null, this.angle);
	return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
}

Rect.prototype.moveBy = function(vector) {
	return new Rect(this.topLeft.sum(vector), this.topRight.sum(vector), 
		this.bottomRight.sum(vector), this.bottomLeft.sum(vector),
		this.strokeStyle, this.fillStyle);
}

Rect.prototype.getTop = function() {
	return this.topLeft.y;
}

Rect.prototype.getLeft = function() {
	return this.topLeft.x;
}

// Rect.prototype.getCenter = function() {
// 	var x = (this.p1.x + this.p2.x) / 2;
// 	var y = (this.p1.y + this.p2.y) / 2;

// 	return new Point(x, y);
// }

Rect.prototype.rotate = function(angle) {
	var diff = angle - this.angle;
	// this.angle = angle;
	console.log("rotate by " + diff);
	var center = this.getCenter();
	// console.log("center " + center.x + ", " + center.y);
	// var rotateP1 = this.p1.rotate(center, diff);
	// console.log("p1 " + rotateP1.x + ", " + rotateP1.y);
	// var rotateP2 = this.p2.rotate(center, diff);
	// console.log("p2 " + rotateP2.x + ", " + rotateP2.y);
	return new Rect(this.topLeft.rotate(center, diff), 
		this.topRight.rotate(center, diff), this.bottomRight.rotate(center, diff), 
		this.bottomLeft.rotate(center, diff), this.strokeStyle, this.fillStyle);
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


