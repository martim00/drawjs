
describe("RenderSpec", function() {

  	beforeEach(function() {
    	this.document = new Document();
    	//this.canvas = jasmine.createSpyObj('canvas', ['drawLine']);
    	this.context = jasmine.createSpyObj('context', ['clearRect']);;
    	this.canvas = { getContext: function() {
    		return this.context;
    	}.bind(this)};
    	this.render = new Render(this.document, this.canvas);
  	});
  	
  	it("should track document invalidate", function() {
  		expect(this.document.invalidate.getListenerCount()).toEqual(1);
  	});

  	describe("render one geometry", function() {
  		beforeEach(function() {
  			// addRect(this.document);
  			this.mockedGeo = jasmine.createSpyObj('rect', ['draw']);
  			this.document.addGeometry(this.mockedGeo);
  		});

  		it("should render the geometry", function() {
  			expect(this.mockedGeo.draw).toHaveBeenCalledWith(this.context);
  		});
  	});

});