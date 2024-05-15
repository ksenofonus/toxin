const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PugPlugin = require('pug-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env) => {
  const isDev = env.mode === 'development';
  return {
    mode: env.mode ?? 'development',
    // entry: './src/index.js',
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
    },
    resolve: {
      alias: {
        Components: path.resolve(__dirname, 'src/components/'),
        Assets: path.resolve(__dirname, 'src/assets/'),
      }
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev ? {
      port: 8080,
      watchFiles: ['src/**/**'],
      hot: true,
      open: ['http://localhost:8080/uikit.html']
    } : undefined,
  plugins: [
    new PugPlugin({
      entry: './src/pages',
      js: {
        // JS output filename
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        // CSS output filename
        filename: 'css/[name].[contenthash:8].css',
      }
  }),
    // !isDev && new MiniCssExtractPlugin({
    //   filename: 'css/[name][contenthash:8].css',
    //   // chunkFilename: 'css/[name][contenthash].css'
    // }),
  new FaviconsWebpackPlugin('./src/assets/favicons/group.png'),
  // new webpack.ProvidePlugin({
  //   $: 'jquery',
  //   jQuery: 'jquery',
  // })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
    ],
  },
 }
};