const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	devServer: {
		static: path.join(__dirname, 'dist'),
		host: '0.0.0.0',
		port: 3000
	},
	plugins: [
		new HtmlWebpackPlugin({
			title:   'Von Physik, Informatik und der Welt',
			favicon: 'public/favicon.ico',
			template: 'public/index.html'
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpe?g|gif|svg|pdf)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						esModule: false,
					}
				}]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource'
			}
		]
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js']
	},
	performance: {
		hints: false
	},
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	}
};