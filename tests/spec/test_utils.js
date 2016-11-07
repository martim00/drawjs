function addRect(document) {
	var rect = new Rect(new Point(0, 0), new Point(10, 10))
	document.addGeometry(rect);
	return rect;
}

function addEditionRect(document, keep) {
	var rect = new Rect(new Point(0, 0), new Point(10, 10))
	document.addEditionGeometry(rect, keep);
	return rect;
}