const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const ifNotTest = plugin => addPlugin(!env.test, plugin);

  return {
    entry: {
      app: './index.js',
      vendor: ['react', 'react-dom'],
    },
    output: {
      filename: 'bundle.[name].[chunkhash].js',
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod,
    },
    context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval',
    bail: true, 
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel!eslint', include: resolve(__dirname, 'src') },
        { test: /\.css$/, loader: 'style!css' },
      ],
    },
    plugins: [
      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })),
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        }
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        }
      })),
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      ifNotTest(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor', //must fix for tests!
      }))
    ].filter(i => !!i) //remove undefined
  }
}



//HMR
//Commons Chunk
//Router Chunking
//Prod and Dev
//Polyfill
//Tree shaking

