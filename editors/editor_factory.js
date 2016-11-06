EditorFactory = function() {

}

EditorFactory.prototype.build = function(geometry) {
	if (geometry.constructor.name == "Rect")
		return new RectEditor(geometry);

	throw new Error("not implemented");
}
