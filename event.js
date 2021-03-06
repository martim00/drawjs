
Event = function() {
	this.listeners = [];
}

Event.prototype.addListener = function(listener) {
	this.listeners.push(listener);
}

Event.prototype.getListenerCount = function(listener) {
	return this.listeners.length;
}

Event.prototype.removeListener = function(listener) {
	var index = this.listeners.indexOf(listener);
	if (index == -1) 
		throw new Error("cant remove listener");

    this.listeners.splice(index, 1);
}

Event.prototype.notify = function(args) {
	this.listeners.forEach(function(listener) {
		listener(args);
	}.bind(this));
}