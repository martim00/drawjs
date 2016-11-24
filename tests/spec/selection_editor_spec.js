describe("SelectionEditorSpec", function() {

  	beforeEach(function() {
    	this.rect = new Rect(new Point(0, 0), new Point(100, 100));
    	this.editor = new SelectionEditor(this.rect);
  	});

  	it("should have edition points", function() {
  		expect(this.editor.getEditionPoints()[0]).toEqual(new Point(-5, -5));
  		expect(this.editor.getEditionPoints()[1]).toEqual(new Point(105, -5));
  		expect(this.editor.getEditionPoints()[2]).toEqual(new Point(105, 105));
  		expect(this.editor.getEditionPoints()[3]).toEqual(new Point(-5, 105));
  		expect(this.editor.getEditionPoints()[4]).toEqual(new Point(50, -45));
  	});

});