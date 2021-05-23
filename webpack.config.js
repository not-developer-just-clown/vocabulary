const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "production",
  context: path.resolve(__dirname, 'src'),
  entry: '/index.jsx',
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: '../public/index.html',
      favicon: "../public/outline_article_black_24dp.png"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './public/outline_article_black_24dp.png'),
          to: path.resolve(__dirname, './build')
        },
        {
          from: path.resolve(__dirname, './public/manifest.json'),
          to: path.resolve(__dirname, './build')
        },
        {
          from: path.resolve(__dirname, './src/sw.js'),
          to: path.resolve(__dirname, './build')
        }
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      }
    ]
  },
  devServer: {
    port: 3000
  }
}
