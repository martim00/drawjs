

Editor = function() {
	this.document = new Document();
	this.gestureRecognizer = new GestureRecognizer();

	this.canvas = document.querySelector("canvas");
  this.render = new Render(this.document, this.canvas);

	this.toolManager = new ToolManager();
	this.toolManager.addTool("LineTool", function() { return new LineTool(this.document); }.bind(this));
	this.toolManager.addTool("RectTool", function() { return new RectTool(this.document); }.bind(this));
	this.toolManager.addTool("RotateTool", function() { return new RotateTool(this.document); }.bind(this));
	this.toolManager.addTool("SelectTool", function() { return new SelectTool(this.document); }.bind(this), true);

	this.bindEvents();
}

Editor.prototype.activateTool = function(toolname) {
	this.toolManager.activateTool(toolname);
}

Editor.prototype.getMousePos = function(evt) {
    var rect = this.canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

Editor.prototype.bindEvents = function() {

	this.gestureRecognizer.onMouseMove.addListener(this.toolManager.onMouseMove.bind(this.toolManager));
	this.gestureRecognizer.onMouseDrag.addListener(this.toolManager.onMouseDrag.bind(this.toolManager));
	this.gestureRecognizer.onMouseLeftDown.addListener(this.toolManager.onMouseLeftDown.bind(this.toolManager));
	this.gestureRecognizer.onMouseRightDown.addListener(this.toolManager.onMouseRightDown.bind(this.toolManager));
	this.gestureRecognizer.onMouseRelease.addListener(this.toolManager.onMouseRelease.bind(this.toolManager));
	this.gestureRecognizer.onMouseDblClick.addListener(this.toolManager.onMouseDblClick.bind(this.toolManager));


	// this.document.invalidate.addListener(function() {
	// 	this.invalidate();

	// }.bind(this));

	this.canvas.addEventListener('mousemove', function(evt) {
        var mousePos = this.getMousePos(evt);
        //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
//        console.log(message);
        this.gestureRecognizer.handleMouseMove(mousePos);

    }.bind(this), false);

	this.canvas.addEventListener('mousedown', function(evt) {
        var mousePos = this.getMousePos(evt);
        var message = 'Mouse clicked at: ' + mousePos.x + ',' + mousePos.y;
        console.log(message);
        console.log(evt.button);
        this.gestureRecognizer.handleMouseDown(mousePos, evt.button === 2);

    }.bind(this), false);

    this.canvas.addEventListener('mouseup', function(evt) {
        var mousePos = this.getMousePos(evt);
        // var message = 'Mouse up at: ' + mousePos.x + ',' + mousePos.y;
        // console.log(message);
        this.gestureRecognizer.handleMouseRelease(mousePos);

    }.bind(this), false);

    this.canvas.addEventListener('dblclick', function(evt) {
        var mousePos = this.getMousePos(evt);
        var message = 'Mouse dblclick at: ' + mousePos.x + ',' + mousePos.y;
        console.log(message);
        this.gestureRecognizer.handleMouseDblClick(mousePos);

    }.bind(this), false);

    this.canvas.oncontextmenu = function (evt) {
    	evt.preventDefault();
	};

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