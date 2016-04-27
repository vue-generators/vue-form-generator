var webpack = require("webpack");
var version = require("../package.json").version;
var banner = "/**\n" + " * vue-form-generator v" + version + "\n" + " * https://github.com/icebob/vue-form-generator\n" + " * Released under the MIT License.\n" + " */\n";

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
    "test": /\.vue?$/,
    "loader": "vue"
  }
];

module.exports = [

{
    entry: "./src/index",
    output: {
        path: "./dist",
        filename: "vue-form-generator.js",
        library: "VueFormGenerator",
        libraryTarget: "umd"
    },
    plugins: [
    new webpack.BannerPlugin(banner, {
        raw: true
    })],
    module: {
        loaders: loaders
    }
},

{
    entry: "./src/index",
    output: {
        path: "./dist",
        filename: "vue-form-generator.min.js",
        library: "VueFormGenerator",
        libraryTarget: "umd"
    },
    plugins: [
    new webpack.optimize.UglifyJsPlugin,
    new webpack.BannerPlugin(banner, {
        raw: true
    })],
    module: {
        loaders: loaders
    }
}

];