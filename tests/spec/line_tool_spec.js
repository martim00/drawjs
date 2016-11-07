
describe("LineToolSpec", function() {

  	beforeEach(function() {
    	this.document = new Document();
    	this.tool = new LineTool(this.document);
  	});

  	describe("new line behaviour", function() {

  		beforeEach(function() {
  			this.tool.onMouseLeftDown(new Point(10, 10));
  			this.tool.onMouseMove(new Point(100, 100));
  			this.tool.onMouseLeftDown(new Point(100, 100));
  			this.tool.onMouseRightDown(new Point(200, 100));
  		});

	  	it("should contains a new line", function() {
	    	expect(this.document.getGeometryCount()).toEqual(1);
	  	});

	  	it("should not contains any edition geometry", function() {
	    	expect(this.document.getEditionGeometryCount()).toEqual(0);
	  	});

  	});

  	describe("line with one point could not be added", function() {
  		beforeEach(function() {
  			this.tool.onMouseLeftDown(new Point(10, 10));
  			this.tool.onMouseMove(new Point(100, 100));
  			this.tool.onMouseRightDown(new Point(200, 100));
  		});

	  	it("should not contains a new line", function() {
	    	expect(this.document.getGeometryCount()).toEqual(0);
	  	});
  	});

  	describe("close polygon behaviour", function() {
  		beforeEach(function() {
  			this.tool.onMouseLeftDown(new Point(10, 10));
  			this.tool.onMouseLeftDown(new Point(100, 100));
  			this.tool.onMouseLeftDown(new Point(200, 100));
  			this.tool.onMouseDblClick(new Point(200, 100));
  		});

	  	it("should closes polygon on double click", function() {
  			expect(this.document.getGeometryCount()).toEqual(1);
  			var geometry = this.document.getGeometryAt(0);
  			expect(geometry.getPoints().length).toEqual(6);
  			expect(geometry.isClosed()).toEqual(true);
	  	});

  	});

  	describe("cancel tool behaviour", function() {

	  	it("should return false if not handling edition", function() {
  			expect(this.tool.onMouseRightDown(new Point(200, 100))).toEqual(false);
	  	});

  		it("should return true if handling edition", function() {
  			this.tool.onMouseLeftDown(new Point(10, 10));
  			this.tool.onMouseMove(new Point(100, 100));
  			expect(this.tool.onMouseRightDown(new Point(200, 100))).toEqual(true);
	    	expect(this.document.getGeometryCount()).toEqual(0);
	    	expect(this.document.getEditionGeometryCount()).toEqual(0);
  		});
  	});


});