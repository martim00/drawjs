
describe("SelectToolSpec", function() {

  	beforeEach(function() {
    	this.document = new Document();
    	this.tool = new SelectTool(this.document);
  	});

	describe("select geometry behaviour", function() {
	  	beforeEach(function() {
	  		this.rect = addRect(this.document);
	  	});

		it("should select geometry if click inside", function() { 
	  		this.tool.onMouseLeftDown(new Point(5, 5));
	  		expect(this.document.getSelectedGeometry()).toEqual(this.rect);
		});

	});


});