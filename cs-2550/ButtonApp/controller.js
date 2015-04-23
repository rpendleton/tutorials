// Controller class

(function() {
	// this defines a class and its constructor

	function Controller() {
		/* global Model: true, View: true */

		var self = this;

		// initialize our Model and View
		this.model = new Model();
		this.view = new View();

		// add a listener to the button in the view

		this.view.on('click', function() {
			// increment the number in the model
			self.model.increment();
		});

		// add a listener to the number in the model

		this.model.on('update', function(number) {
			// update the view
			self.view.render(number);
		});

		// render the initial state of the view
		this.view.render(this.model.data);
	}

	window.Controller = Controller;
})();

// when the page loads, create our controller

window.addEventListener('load', function() {
	/* global Controller: true */
	var c = new Controller();
});
