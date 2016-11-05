ToolManager = function() {
	this.tools = {};
	this.currentTool = null;
	this.defaultToolName = null;
}

ToolManager.prototype.addTool = function(toolName, tool, isDefault) {
	this.tools[toolName] = tool;
	if (isDefault)
		this.defaultToolName = toolName;
}

ToolManager.prototype.activateTool = function(toolName) {
	if (this.currentTool) {
		this.currentTool.deactivate();
	}

	this.currentTool = this.tools[toolName]();
	this.currentTool.activate();
}

ToolManager.prototype.activateDefaultTool = function() {
	if (this.defaultToolName)
		this.activateTool(this.defaultToolName);
}

ToolManager.prototype.deactivateTool = function() {
	this.currentTool.deactivate();
	this.currentTool = null;
	this.activateDefaultTool();
}

ToolManager.prototype.onMouseDrag = function(args) {
	if (this.currentTool)
		this.currentTool.onMouseDrag(args);
}

ToolManager.prototype.onMouseMove = function(args) {
	if (this.currentTool)
		this.currentTool.onMouseMove(args);
}

ToolManager.prototype.onMouseLeftDown = function(point) {
	if (this.currentTool)
		this.currentTool.onMouseLeftDown(point);
}

ToolManager.prototype.onMouseRightDown = function(point) {
	if (this.currentTool) {
		var handled = this.currentTool.onMouseRightDown(point);
		if (!handled) {
			this.deactivateTool();
		}
	}
}

ToolManager.prototype.onMouseRelease = function(point) {
	if (this.currentTool)
		this.currentTool.onMouseRelease(point);
}

ToolManager.prototype.onMouseDblClick = function(point) {
	if (this.currentTool)
		this.currentTool.onMouseDblClick(point);
}
