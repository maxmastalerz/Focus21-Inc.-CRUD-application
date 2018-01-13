'use strict';

exports.index = function (req, res) {
	res.render('index.html', {
		partials: {
			head: 'partials/head.html'
		}
	});
};