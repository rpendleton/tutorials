// Model class

(function() {
	// this defines a class and its constructor

	function Model() {
		this.data = 0;
	}

	// this defines the increment method on the Model class
	Model.prototype.increment = function() {
		// update the value and emit an event
		this.emit('update', ++this.data);
	};

	// add the EventListener methods to the Model class
	Model.prototype.on = window.EventListener.on;
	Model.prototype.emit = window.EventListener.emit;

	// we need to set this on window so our controller can use it
	window.Model = Model;
})();
