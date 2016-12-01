describe("RectSpec", function() {

  	beforeEach(function() {
    	this.rect = new Rect(new Point(0, 0), new Point(50, 0), new Point(50, 100), new Point(0, 100));
  	});

  	it("center should be correct", function() {
  		expect(this.rect.getCenter()).toEqual(new Point(25, 50));
  	});

  	it("when rotate bounding rect should reflect", function() {
  		this.rect = this.rect.rotate(1.5708);
  		expect(this.rect.getCenter()).toEqual(new Point(25, 50));
  		comparePoints(this.rect.getBoundingRect()[0], new Point(75, 25));
  		comparePoints(this.rect.getBoundingRect()[1], new Point(75, 75));
  		comparePoints(this.rect.getBoundingRect()[2], new Point(-25, 75));
  		comparePoints(this.rect.getBoundingRect()[3], new Point(-25, 25));
  	});

});