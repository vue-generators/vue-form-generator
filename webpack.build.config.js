var webpack = require("webpack");
var version = require("./package.json").version;
var banner = "/**\n" + " * vue-form-generator v" + version + "\n" + " * https://github.com/icebob/vue-form-generator\n" + " * Released under the MIT License.\n" + " */\n";
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var loaders = [
  {
    "test": /\.js?$/,
    "exclude": /node_modules/,
    "loader": "babel"
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
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                'process.env' : {
                    NODE_ENV : JSON.stringify('production')
                }
            }),
            new webpack.BannerPlugin(banner, {
                raw: true
            }),
            new ExtractTextPlugin('vue-form-generator.css'),
        ],

        module: {
            loaders: loaders
        },

        vue: {
            loaders: {
                css: ExtractTextPlugin.extract('css'),
                postcss: ExtractTextPlugin.extract('css'),
                // less: ExtractTextPlugin.extract('css!less'),
                // sass: ExtractTextPlugin.extract('css!sass?indentedSyntax'),
                sass: ExtractTextPlugin.extract('css!sass'),
                // stylus: ExtractTextPlugin.extract('css!stylus'),
                // styl: ExtractTextPlugin.extract('css!stylus')
            }
        },

        resolve: {
            packageAlias: 'browser'
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
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                'process.env' : {
                    NODE_ENV : JSON.stringify('production')
                }
            }),        
            new webpack.BannerPlugin(banner, {
                raw: true
            })
        ],

        module: {
            loaders: loaders
        },

        resolve: {
            packageAlias: 'browser'
        }        

    }

];