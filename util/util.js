
function removeFromArray(array, element) {
	var index = array.indexOf(element);
	if (index == -1) 
		throw new Error("cant remove element");

    array.splice(index, 1);
}

function floatEquals(f1, f2) {
	var diff = Math.abs(f1 - f2);
	return diff >= 0 && diff < 0.1;
}

function getBoundingRect(points) {
	var leftX = 999999; // ugly
   	var leftY = 999999;
   	var rightX = 0;
   	var rightY = 0;

   	for (var i = 0; i < points.length; i++) {
      	var point = points[i];

      	if (point.x < leftX)
        	leftX = point.x;

      	if (point.y < leftY)
        	leftY = point.y;

      	if (point.x > rightX)
        	rightX = point.x;

      	if (point.y > rightY)
        	rightY = point.y
   	}

   return [new Point(leftX, leftY), new Point(rightX, leftY), new Point(rightX, rightY), new Point(leftX, rightY)];
}

function movePoints(points, vector) {
	return points.map(function(point, index, arr) {
		return point.sum(vector);
	});
}

function rotatePoints(points, center, angle) {
	return points.map(function(point, index, arr) {
		return point.rotate(center, angle);
	});
}

function getCenterPoint(points) {
	var bounds = getBoundingRect();
	var topLeft = bounds[0];
	var bottomRight = bounds[1];
	return new Point((topLeft.x + bottomRight.x) / 2, (topLeft.y + bottomRight.y) / 2);
}

function pointInsidePolygon(point, vs) {
	// https://github.com/substack/point-in-polygon

	/*The MIT License (MIT)

	Copyright (c) 2016 James Halliday
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.*/

    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point.x, y = point.y;
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};