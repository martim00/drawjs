

GestureRecognizer = function() {
	this.onMouseMove = new Event();
	this.onMouseLeftDown = new Event();
	this.onMouseRightDown = new Event();
	this.onMouseRelease = new Event();
	this.onMouseDrag = new Event();
	this.onMouseDblClick = new Event();

	this.lastClick = null;
}

GestureRecognizer.prototype.handleMouseDblClick = function(mousePos) {
	this.onMouseDblClick.notify(new Point(mousePos.x, mousePos.y));
}

GestureRecognizer.prototype.handleMouseMove = function(mousePos) {
	// TODO: handle gesture here
	if (this.lastClick) {
		this.onMouseDrag.notify(
			{
				"beginPoint": this.lastClick, 
				"endPoint": new Point(mousePos.x, mousePos.y)
			});
	}
	else {

		this.onMouseMove.notify({"point": new Point(mousePos.x, mousePos.y)});
	}
}

GestureRecognizer.prototype.handleMouseDown = function(mousePos, isRightButton) {
	// TODO: handle gesture here
	var point = new Point(mousePos.x, mousePos.y);
	if (isRightButton) {
		this.onMouseRightDown.notify(point);
	}
	else {
		this.onMouseLeftDown.notify(point);
		this.lastClick = point;
	}
}

GestureRecognizer.prototype.handleMouseRelease = function(mousePos) {
	// TODO: handle gesture here
	this.onMouseRelease.notify(new Point(mousePos.x, mousePos.y));
	this.lastClick = null;
}




