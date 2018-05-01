var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
   entry: {
       app: './src/index.js'
   },
   output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'app.js'
   },
   module: {
       rules: [
           {
               test: /\.scss$/,
               use: ExtractTextPlugin.extract({
                   fallback: 'style-loader',
                   use: ['css-loader','sass-loader'],
                   publicPath: 'dist/css'
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
           filename: "style.css",
           allChunks: true
       })
   ]
}
