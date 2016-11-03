

GestureRecognizer = function() {
	this.onMouseMove = new Event();
	this.onMouseLeftDown = new Event();
	this.onMouseRightDown = new Event();
	this.onMouseRelease = new Event();
}

GestureRecognizer.prototype.handleMouseMove = function(mousePos) {
	// TODO: handle gesture here
	this.onMouseMove.notify(mousePos);
}

GestureRecognizer.prototype.handleMouseDown = function(mousePos, isRightButton) {
	// TODO: handle gesture here
	if (isRightButton)
		this.onMouseRightDown.notify(mousePos);
	else
		this.onMouseLeftDown.notify(mousePos);
}

GestureRecognizer.prototype.handleMouseRelease = function(mousePos) {
	// TODO: handle gesture here
	this.onMouseRelease.notify(mousePos);
}




