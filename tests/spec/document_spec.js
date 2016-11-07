
describe("DocumentSpec", function() {

  	beforeEach(function() {
    	this.document = new Document();
  	});

  	describe("add geometry", function() {
	  	beforeEach(function() {
	  		wasCalled = false;
	  		this.document.invalidate.addListener(function() {
	  			wasCalled = true;
	  		});
	  		addRect(this.document);
	  	});

	  	it("contains new geometry", function() {
	    	expect(this.document.getGeometryCount()).toEqual(1);
	  	});

	  	it("should invalidate document", function() {
	    	expect(wasCalled).toEqual(true);
	  	});
  	});

  	describe("remove geometry", function() {
	  	beforeEach(function() {
	  		var geometry = addRect(this.document);
	  		this.document.removeGeometry(geometry);
	  	});

	  	it("not contains the geometry anymore", function() {
	    	expect(this.document.getGeometryCount()).toEqual(0);
	  	});

  	});

  	describe("select geometry", function() {
	  	beforeEach(function() {
	  		this.geometry = addRect(this.document);
	  		this.document.selectGeometry(this.geometry);
	  	});

	  	it("should be selected", function() {
	    	expect(this.document.getSelectedGeometry()).toEqual(this.geometry);
	  	});

  	});

  	describe("add edition geometry", function() {

	  	beforeEach(function() {
	  		this.wasCalled = false;
	  		this.document.invalidate.addListener(function() {
	  			this.wasCalled = true;
	  		}.bind(this));
	  		addEditionRect(this.document, false);
	  	});

	  	it("contains new edition geometry", function() {
	    	expect(this.document.getEditionGeometryCount()).toEqual(1);
	  	});

	  	it("should invalidate document", function() {
	    	expect(this.wasCalled).toEqual(true);
	  	});

  		describe("add edition geometry keeping existent", function() {
		  	beforeEach(function() {
		  		addEditionRect(this.document, true);
		  	});

		  	it("should contain two edition geometry", function() {
		    	expect(this.document.getEditionGeometryCount()).toEqual(2);
		  	});

  		});

  		describe("clear edition geometry", function() {
		  	beforeEach(function() {
		    	this.wasCalled = false;
		  		this.document.clearEditionGeometries();
		  	});

		  	it("should invalidate document", function() {
		    	expect(this.wasCalled).toEqual(true);
		  	});

		  	it("removes all edition geometries", function() {
		    	expect(this.document.getEditionGeometryCount()).toEqual(0);
		  	});
  		});
  	});


 });