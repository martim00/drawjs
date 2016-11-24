
describe("SelectToolSpec", function() {

  	beforeEach(function() {
    	this.document = new Document();
    	this.cursorService = jasmine.createSpyObj('cursorService', ['setCursor', 'setAwesomeCursor']);;
    	this.tool = new SelectTool(this.document, this.cursorService);
    	this.tool.activate();
  	});

	describe("select geometry behaviour", function() {
	  	beforeEach(function() {
	  		this.rect = addRect(this.document);
	  	});

		it("should select geometry if click inside", function() { 
	  		this.tool.onMouseLeftDown(new Point(5, 5));
	  		expect(this.document.getSelectedGeometry()).toEqual(this.rect);
		});

		it("should unselect geometry if click outside", function() { 
	  		this.tool.onMouseLeftDown(new Point(5, 5));
	  		this.tool.onMouseLeftDown(new Point(100, 100));
	  		expect(this.document.hasSelection()).toEqual(false);
		});

	});

	describe("cursor behaviour", function() {
	  	beforeEach(function() {
	  		this.rect = addRect(this.document);
	  		this.tool.onMouseLeftDown(new Point(5, 5));
	  	});

		it("begins with pointer cursor", function() { 
  			expect(this.cursorService.setCursor).toHaveBeenCalledWith("pointer");
		});

		it("changes the cursor if mouse move over a resize point", function() { 
			this.cursorService.setCursor.calls.reset();
	  		this.tool.onMouseMove({"point": new Point(10, 10)});
  			expect(this.cursorService.setCursor).toHaveBeenCalledWith("se-resize");
		});

		it("changes the cursor if mouse move over a rotate point", function() { 
			this.cursorService.setCursor.calls.reset();
	  		this.tool.onMouseMove({"point": new Point(5, -40)});
  			expect(this.cursorService.setCursor).toHaveBeenCalledWith("e-resize");
		});

		it("turns back to pointer when out of edit point", function() { 
			this.cursorService.setCursor.calls.reset();
	  		this.tool.onMouseMove({"point": new Point(20, 26)});
  			expect(this.cursorService.setCursor).toHaveBeenCalledWith("pointer");
		});
	});

	describe("rotate behaviour", function() {
	  	beforeEach(function() {
	  		this.rect = addRect(this.document);
	  		this.tool.onMouseLeftDown(new Point(5, 5));
	  	});

		it("on drag rotate point should rotate geometry", function() { 
	  		expect(this.document.getSelectedGeometry().getAngle()).toEqual(0);
	  		this.tool.onMouseLeftDown(new Point(5, -40)); // rotate point
	  		this.tool.onMouseDrag({ beginPoint: new Point(5, -40), endPoint: new Point(20, 5) });
	  		this.tool.onMouseRelease(new Point(20, 0));
	  		expect(this.document.hasSelection()).toEqual(true);
	  		expect(this.document.getSelectedGeometry().getAngle()).toEqual(1.5708);
	  		
	  		this.tool.onMouseLeftDown(new Point(5, 5));
	  		expect(this.document.getSelectedGeometry().getAngle()).toEqual(1.5708);
		});

	});



});