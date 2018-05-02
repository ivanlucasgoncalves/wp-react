const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const path = require('path');

module.exports = {
   entry: ['./src/index.js', './src/Components/Style.scss'],
   output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'app.min.js'
   },
   module: {
       rules: [
           {
               test: /\.scss$/,
               use: ExtractTextPlugin.extract({
                   fallback: ['style-loader'],
                   use: [
                    { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
                    'sass-loader',
                    'postcss-loader'
                   ]
               })
           },
           {
               test: /\.jsx?$/,
               exclude: /node_modules/,
               use: 'babel-loader'
           },
           {
               test: /\.(jpe?g|png|gif|svg)$/i,
               use: [
                   'file-loader?name=[name].[ext]&outputPath=images/&publicPath=http://wp-react.local/wp-react/wp-content/themes/wp-react/dist/images',
                   'image-webpack-loader'
               ]
           }
       ]
   },
   resolve: {
       extensions: ['.js', '.jsx']
   },
   plugins: [
       new ExtractTextPlugin({
         filename: "css/style.min.css",
         allChunks: true
       }),
       new UglifyJsPlugin({
         uglifyOptions: {
           ie8: true,
           safari10: true,
           mangle: false,
           output: {
             comments: false
           }
         },
         sourceMap: true
       }),
       new LiveReloadPlugin()
   ]
}
