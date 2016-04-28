var path = require('path');
var webpack = require('webpack');

var loaders = [
  {
    "test": /\.js?$/,
    "exclude": /node_modules/,
    "loader": "babel",
    "query": {
      "presets": [
        "es2015",
        "stage-0"
      ],
      "plugins": []
    }
  },
  {
    "test": /\.css?$/,
    "loader": "style!css"
  },
  {
    "test": /\.scss?$/,
    "loader": "style!css!sass"
  },
  {
    "test": /\.jade?$/,
    "loader": "jade"
  },
  {
    "test": /\.vue?$/,
    "loader": "vue"
  },
  { 
    test: /\.(woff2?|svg)$/, 
    loader: 'url' 
    //loader: 'url?limit=10000' 
  },
  { 
    test: /\.(ttf|eot)$/, 
    loader: 'url' 
  }
];

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: path.resolve('dev', 'main.js')
  },
  output: {
    path: path.resolve('dev'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    loaders: loaders
  },

  vue: {
    autoprefixer: {
      browsers: ['last 2 versions']
    }
  }
};
