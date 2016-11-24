describe("RectSpec", function() {

  	beforeEach(function() {
    	this.rect = new Rect(new Point(0, 0), new Point(50, 100));
  	});

  	it("center should be correct", function() {
  		expect(this.rect.getCenter()).toEqual(new Point(25, 50));
  	});

  	it("when rotate bounding rect should reflect", function() {
  		this.rect.rotate(1.5708);
  		expect(this.rect.getCenter()).toEqual(new Point(25, 50));
  		expect(this.rect.getBoundingRect().p1).toEqual(new Point(-25, 25));
  		expect(this.rect.getBoundingRect().p2).toEqual(new Point(75, 25));
  	});

});