const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const paths = require('./paths');

const pages = fs
  .readdirSync(paths.pages)
  .map((dir) => {
    const dirPath = `${paths.pages}/${dir}`;
    return fs
      .readdirSync(dirPath)
      .filter((fileName) => fileName.endsWith('.pug'))
      .map((page) => `${dir}/${page}`);
  })
  .flat();

module.exports = {
  entry: [paths.src + '/js/index.js'],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true,
  },
  plugins: [

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    ...pages.map(pagePath => {
      const page = pagePath.split('/').pop();

      return new HtmlWebpackPlugin({
        cache: process.env.NODE_ENV === 'development',
        template: `${paths.pages}/${pagePath}`,
        filename: `./${page.replace(/\.pug/,'.html')}`,
        inject: 'body',
        minify: false,
        templateParameters: {
          getModifiers: (className, modifiers) => (
            Object.entries(modifiers).map((item) => `${className}_${item.join('_')}`)
          ),
        }
      })
    })
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

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },

      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
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