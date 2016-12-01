function addRect(document) {
	var rect = new Rect(new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10))
	document.addGeometry(rect);
	return rect;
}

function addEditionRect(document, keep) {
	var rect = new Rect(new Point(0, 0), new Point(10, 0), new Point(10, 10), new Point(0, 10))
	document.addEditionGeometry(rect, keep);
	return rect;
}

function comparePoints(p1, p2) {
	if (!floatEquals(p1.x, p2.x) || !floatEquals(p1.y, p2.y))
		throw new Error("Points are not equal: {" + 
			p1.x + ", " + p1.y + "}, {" + p2.x + ", " + p2.y + "}");
}