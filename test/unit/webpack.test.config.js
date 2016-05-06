var path = require("path");
var webpack = require('webpack');

module.exports = {
  devtool: '#inline-source-map',
  
  module: {
    loaders: [
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
    ]
  },

  resolve: {
    packageAlias: 'browser',
    alias: {
      'src': path.resolve(__dirname, '../../src')
    }
  },

  plugins: [
  ],

  vue: {
    autoprefixer: {
      browsers: ['last 2 versions']
    }/*,
    loaders: {
      js: 'isparta'
    }*/
  }
 
};
