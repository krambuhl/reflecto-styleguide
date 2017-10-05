const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
  // devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@app': path.resolve(__dirname, 'source/app'),
      '@components': path.resolve(__dirname, 'source/components'),
      '@tags': path.resolve(__dirname, 'source/tags'),
      '@styles': path.resolve(__dirname, 'source/styles')
    }
  },
  entry: {
    bundle: path.resolve(__dirname, 'source/bundle.js'),
    theme: path.resolve(__dirname, 'source/theme.js'),
    demo: path.resolve(__dirname, 'source/demo.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env']
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new DashboardPlugin(),
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default']
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: false,
    version: false,
    children: false
  }
}
