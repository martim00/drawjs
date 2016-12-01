describe("SelectionEditorSpec", function() {

  	beforeEach(function() {
    	this.rect = new Rect(new Point(0, 0), new Point(100, 0), new Point(100, 100), new Point(0, 100));
    	this.editor = new SelectionEditor(this.rect);
  	});

  	it("should have edition points", function() {

  		comparePoints(this.editor.getEditionPoints()[0], new Point(0, 0));
  		comparePoints(this.editor.getEditionPoints()[1], new Point(100, 0));
  		comparePoints(this.editor.getEditionPoints()[2], new Point(100, 100));
  		comparePoints(this.editor.getEditionPoints()[3], new Point(0, 100));
  		comparePoints(this.editor.getEditionPoints()[4], new Point(50, -40));
  	});

});