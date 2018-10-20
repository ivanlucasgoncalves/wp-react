import '@babel/polyfill';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

export default {
	entry: ['@babel/polyfill', './src/index.js', './src/Components/Style.scss'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.min.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/style.min.css'
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				output: {
					comments: false
				}
			},
			sourceMap: true
		}),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3001,
			proxy: 'http://wp-react.local/',
			reload: false
		})
	]
};
