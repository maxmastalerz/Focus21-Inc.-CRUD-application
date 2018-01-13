'use strict';

exports.dumpRequest = function (req, res) {
	res.render('dump.html', {
		title: 'Dump of some request header values',
		dumpValues: req.headers,
		partials: {
			head: 'partials/head.html'
		}
	});
};