

Editor = function() {
	this.document = new Document();
	this.gestureRecognizer = new GestureRecognizer();

	this.canvas = document.querySelector("canvas");
	this.bindEvents();

	this.tools = {
		"LineTool": new LineTool(this.document),
		"RectTool": new RectTool(this.document),
		"SelectionTool": new SelectionTool(this.document)
	}

	this.currentTool = null;
}

Editor.prototype.activateTool = function(toolname) {
	if (this.currentTool) {
		this.currentTool.deactivate();
	}

	this.currentTool = this.tools[toolname];
	this.currentTool.activate();
}

Editor.prototype.onMouseDrag = function(args) {
	if (this.currentTool)
		this.currentTool.onMouseDrag(args);
}

Editor.prototype.onMouseMove = function(args) {
	if (this.currentTool)
		this.currentTool.onMouseMove(args);
}

Editor.prototype.onMouseLeftDown = function(point) {
	if (this.currentTool)
		this.currentTool.onMouseLeftDown(point);
}

Editor.prototype.onMouseRightDown = function(point) {
	if (this.currentTool)
		this.currentTool.onMouseRightDown(point);
}

Editor.prototype.onMouseRelease = function(point) {
	if (this.currentTool)
		this.currentTool.onMouseRelease(point);
}

/*Editor.prototype.unbindTool = function() {

	this.gestureRecognizer.onMouseMove.removeListener(this.currentTool.onMouseMove);
	this.gestureRecognizer.onMouseLeftDown.removeListener(this.currentTool.onMouseLeftDown);
	this.gestureRecognizer.onMouseRightDown.removeListener(this.currentTool.onMouseRightDown);
	this.gestureRecognizer.onMouseRelease.removeListener(this.currentTool.onMouseRelease);

}*/

Editor.prototype.getMousePos = function(evt) {
    var rect = this.canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

Editor.prototype.bindEvents = function() {

	this.gestureRecognizer.onMouseMove.addListener(this.onMouseMove.bind(this));
	this.gestureRecognizer.onMouseDrag.addListener(this.onMouseDrag.bind(this));
	this.gestureRecognizer.onMouseLeftDown.addListener(this.onMouseLeftDown.bind(this));
	this.gestureRecognizer.onMouseRightDown.addListener(this.onMouseRightDown.bind(this));
	this.gestureRecognizer.onMouseRelease.addListener(this.onMouseRelease.bind(this));

	this.document.invalidate.addListener(function() {
		this.invalidate();

	}.bind(this));

	this.canvas.addEventListener('mousemove', function(evt) {
        var mousePos = this.getMousePos(evt);
        //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
//        console.log(message);
        this.gestureRecognizer.handleMouseMove(mousePos);

    }.bind(this), false);

	this.canvas.addEventListener('mousedown', function(evt) {
        var mousePos = this.getMousePos(evt);
        // var message = 'Mouse clicked at: ' + mousePos.x + ',' + mousePos.y;
        // console.log(message);
        console.log(evt.button);
        this.gestureRecognizer.handleMouseDown(mousePos, evt.button === 2);

    }.bind(this), false);

    this.canvas.addEventListener('mouseup', function(evt) {
        var mousePos = this.getMousePos(evt);
        // var message = 'Mouse up at: ' + mousePos.x + ',' + mousePos.y;
        // console.log(message);
        this.gestureRecognizer.handleMouseRelease(mousePos);

    }.bind(this), false);

    this.canvas.oncontextmenu = function (evt) {
    	evt.preventDefault();
	};

}

Editor.prototype.addGeometry = function(geometry) {
	this.document.addGeometry(geometry);
}

Editor.prototype.drawGeometries = function(geometries) {

  	var context = this.canvas.getContext("2d");

  	geometries.forEach(function(geometry) {

  		if (geometry.strokeStyle)
  			context.strokeStyle = geometry.getStrokeStyle();

	  	context.beginPath();
  		for (var i = 0; i < geometry.getPoints().length; i++) {

  			var point = geometry.getPoints()[i];

  			if (i == 0) {
  				context.moveTo(point.x, point.y);
  			}
  			else {
  				context.lineTo(point.x, point.y);
  			}
  		}
  		context.stroke();

  		/*if (geometry instanceof Line) {
	  		context.beginPath();
	  		context.moveTo(geometry.p1.x, geometry.p1.y);
	  		context.lineTo(geometry.p2.x, geometry.p2.y);
	  		context.stroke();
  		}
  		else if (geometry instanceof Rect) {
	  		context.beginPath();
	  		context.moveTo(geometry.p1.x, geometry.p1.y);
	  		context.lineTo(geometry.p2.x, geometry.p1.y);
	  		context.lineTo(geometry.p2.x, geometry.p2.y);
	  		context.lineTo(geometry.p1.x, geometry.p2.y);
	  		context.lineTo(geometry.p1.x, geometry.p1.y);
	  		context.stroke();

  		}
  		else if (geometry instanceof Polygon) {

	  		context.beginPath();
	  		for (var i = 0; i < geometry.points.length; i++) {

	  			var point = geometry.points[i];

	  			if (i == 0) {
	  				context.moveTo(point[0], point[1]);
	  			}
	  			else {
	  				context.lineTo(point[0], point[1]);
	  			}
	  		}
	  		context.stroke();
  		}*/

  	});
}

Editor.prototype.invalidate = function() {

  	var context = this.canvas.getContext("2d");

	context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  	context.strokeStyle = "black";

  	this.drawGeometries(this.document.getGeometries());

  	context.strokeStyle = "red";
  	this.drawGeometries(this.document.getEditionGeometries());
}