const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');

const paths = require('./paths');

const pages = fs.readdirSync(paths.pages).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
  entry: [paths.src + '/js/index.js'],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true,
  },
  plugins: [

    new CopyWebpackPlugin({
      patterns: [{
          from: path.posix.join(
            path.resolve(__dirname, paths.src, 'components').replace(/\\/g, "/"),
            "*/images/*"
          ),
          to({
            context,
            absoluteFilename
          }) {
            return `${path.relative(path.join(context, 'src'), absoluteFilename)}`;
          },
          noErrorOnMissing: true,
        },
        {
          from: `${paths.src}/fonts`,
          to: './fonts'
        },
      ],
    }),

    ...pages.map(page => new HtmlWebpackPlugin({
      template: `${paths.pages}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`,
      inject: 'body',
      minify: false,

      templateParameters: {
        getModifiers: (className, modifiers) => (
          Object.entries(modifiers).map((item) => `${className}_${item.join('_')}`)
        ),
      }
    }))
  ],
  module: {
    rules: [
      // Pug
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {

        }
      },

      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      },
    ],
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.json'],
    alias: {
      '@': paths.src,
    },
  },
}