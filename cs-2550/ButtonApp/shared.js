// Code shared by Model and View

(function() {
	// expose some functions that we can use to add event
	// capabilities to our classes

	window.EventListener = {
		// use this to add an event listener to an object

		on: function(name, callback) {
			// check to make sure the events object exists
			if(this.events === undefined) {
				this.events = {};
			}

			// check to make sure the array exists for our desired event
			if(this.events[name] === undefined) {
				this.events[name] = [];
			}

			// save the callback in the event's array
			this.events[name].push(callback);
		},

		// Use this to trigger event listeners.
		// You can pass additional arguments besides name, and they
		// will be passed on to the listener added in on

		emit: function(name) {
			// save self for the execution context later
			var self = this;

			// remove the name from the arguments, leaving oll
			// others alone
			var args = Array.prototype.slice.call(arguments, 1);

			// check to see if we have added events for this name
			if(this.events && this.events[name] !== undefined) {
				// iterate over each of the callbacks we've added

				for(var i = 0; i < this.events[name].length; i++)
				{
					// get the handler
					var handler = this.events[name][i];

					// execute it with the context of self, and the remaining arguments
					handler.apply(self, args);
				}
			}
		}
	};
})();
