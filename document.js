
Document = function() {
	this.geometries = [];
	this.editionGeometries = [];
	this.invalidate = new Event();
}

Document.prototype.getGeometries = function() {
	return this.geometries;
}

Document.prototype.getEditionGeometries = function() {
	return this.editionGeometries;
}

Document.prototype.addGeometry = function(geometry) {
	this.geometries.push(geometry);
	this.invalidate.notify();
}

Document.prototype.addEditionGeometry = function(geometry) {
	this.clearEditionGeometries();
	this.editionGeometries.push(geometry);
	this.invalidate.notify();
}

Document.prototype.clearEditionGeometries = function() {
	this.editionGeometries.length = 0;
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




