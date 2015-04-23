// View class

(function() {
	// this defines a class and its constructor

	function View() {
		var self = this;

		// save our button
		this.button = document.getElementById('button');

		// add an event listener to the button, and emit it on our view
		this.button.addEventListener('click', function() {
			self.emit('click');
		});
	}

	// this defines the render method on the View class
	View.prototype.render = function(data) {
		this.button.innerText = data;
	};

	// add the EventListener methods to the View class
	View.prototype.on = window.EventListener.on;
	View.prototype.emit = window.EventListener.emit;

	// we need to set this on window so our controller can use it
	window.View = View;
})();
