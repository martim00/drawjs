describe("RectSpec", function() {

  	beforeEach(function() {
    	this.rect = new Rect(new Point(0, 0), new Point(100, 100));
  	});

  	it("center should be correct", function() {
  		expect(this.rect.getCenter()).toEqual(new Point(50, 50));
  	});

});