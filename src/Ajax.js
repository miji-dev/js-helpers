(function (context) {
	'use strict';

	// Based on https://github.com/alexanderbazo/mme-helper/blob/master/src/Ajax.js
	var Ajax = context.Ajax || {};

	Ajax.call = function (options) {
		var xhr = new XMLHttpRequest(),
			result;

		options.method = options.method || 'GET';

		function onreadystatechange() {
			if (xhr.readyState < 4) {
				return;
			}

			if (xhr.status !== 200) {
				return;
			}

			if (xhr.readyState === 4) {
				result = xhr.responseText;

				switch (options.dataType) {
				case undefined:
					break;
				case 'json':
					result = JSON.parse(result);
					break;
				default:
					break;
				}
				options.success(result);
			}
		}

		xhr.onreadystatechange = onreadystatechange;
		xhr.open(options.method, options.url, true);
		xhr.send();
	};

	if (context.Ajax === undefined) {
		context.Ajax = Ajax;
	}

}(window));
