(function (context) {
	'use strict';

	// Based on https://github.com/alexanderbazo/mme-helper/blob/master/src/Events.js
	context.EventPublisher = context.EventPublisher || function () {
		this.listeners = {};
	};

	context.EventPublisher.prototype.addEventListener = function (event, listener) {
		if (this.listeners[event] === undefined) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(listener);
	};

	context.EventPublisher.prototype.removeEventListener = function (event, listener) {
		var index;

		if (this.listeners[event] === undefined) {
			return;
		}

		index = this.listeners[event].indexOf(listener);

		if (index > -1) {
			this.listeners[event].splice(index, 1);
		}
	};

	context.EventPublisher.prototype.notifyAll = function (event, data) {
		var listeners = this.listeners[event];
		if (listeners) {
			listeners.forEach(function (listener) {
				listener({
					target: this,
					data: data
				});
			}, this);
		} else {
			console.log('no listeners registered');
		}
	};

}(window));
