
Document = function() {
	this.geometries = [];
	this.editionGeometries = [];
	this.invalidate = new Event();
	this.selectedGeometry = null;
}

Document.prototype.getGeometries = function() {
	return this.geometries;
}

Document.prototype.getGeometryAt = function(index) {
	return this.geometries[index];
}

Document.prototype.getGeometryCount = function() {
	return this.geometries.length;
}

Document.prototype.getEditionGeometries = function() {
	return this.editionGeometries;
}

Document.prototype.getEditionGeometryCount = function() {
	return this.editionGeometries.length;
}

Document.prototype.addGeometry = function(geometry) {
	this.geometries.push(geometry);
	this.invalidateDocument();
}

Document.prototype.removeGeometry = function(geometry) {
	removeFromArray(this.geometries, geometry);
}

Document.prototype.selectGeometry = function(geometry) {
	this.selectedGeometry = geometry;
}

Document.prototype.getSelectedGeometry = function(geometry) {
	return this.selectedGeometry;
}

Document.prototype.hasSelection = function(geometry) {
	return this.selectedGeometry != null;
}

Document.prototype.clearSelection = function() {
	this.selectedGeometry = null;
	this.invalidateDocument();
}

Document.prototype.addEditionGeometry = function(geometry, keep) {
	if (!keep)
		this.editionGeometries.length = 0;
	this.editionGeometries.push(geometry);
	this.invalidateDocument();
}

Document.prototype.clearEditionGeometries = function() {
	this.editionGeometries.length = 0;
	this.invalidateDocument();
}

Document.prototype.invalidateDocument = function() {
	this.invalidate.notify();
}

Document.prototype.findGeometryAt = function(point) {

	for (var i = 0; i < this.geometries.length; i++) {
		var geometry = this.geometries[i];
		if (geometry.containsPoint(point))
			return geometry;
	}

	return null;
}




