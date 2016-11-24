

CursorService = function() {

}

CursorService.prototype.setCursor = function(cursor) {
	document.body.style.cursor = cursor;
}

CursorService.prototype.setAwesomeCursor = function(cursor) {
	$('body').awesomeCursor(cursor);
}