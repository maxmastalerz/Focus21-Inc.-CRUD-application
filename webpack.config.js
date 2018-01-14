const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: './lib/public/javascripts/app.js',
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['react','es2015', 'stage-0'],
					plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
				}
			}
		]
	},
	output: {
		filename: 'dist/lib/public/javascripts/bundle.js'
	}, plugins: [
		new UglifyJsPlugin()
	]
};