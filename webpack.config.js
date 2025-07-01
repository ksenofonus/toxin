const path = require('path');
const webpack = require('webpack');
const PugPlugin = require('pug-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const sass = require('sass');

module.exports = (env) => {
  const isDev = env.mode === 'development';
  return {
    mode: env.mode ?? 'development',
    entry: './src/pages/index/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[contenthash][ext][query]',
      clean: true,
    },
    resolve: {
      alias: {
        Blocks: path.resolve(__dirname, 'src/components/blocks/'),
        Components: path.resolve(__dirname, 'src/components/'),
        Assets: path.resolve(__dirname, 'src/assets/'),
        Pages: path.resolve(__dirname, 'src/pages/'),
        Sass: path.resolve(__dirname, 'src/components/sass/'),
      },
      extensions: ['.js', '.ts'],
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev
      ? {
          port: 8080,
          watchFiles: ['src/**/**'],
          hot: true,
          open: ['http://localhost:8080/index.html'],
        }
      : undefined,
    plugins: [
      new PugPlugin({
        entry: './src/pages/',
        filename: ({ filename, chunk: { name } }) => {
          return '[name].html';
        },
        js: {
          // JS output filename
          filename: 'js/[name].[contenthash:8].js',
        },
        css: {
          // CSS output filename
          filename: 'css/[name].[contenthash:8].css',
        },
      }),
      new FaviconsWebpackPlugin({
        logo: './src/assets/favicons/group.png',
        mode: 'webapp',
        devMode: 'webapp',
        // manifest: './assets/favicons/manifest.webmanifest',
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'css-loader',
            'sass-loader',
            {
              loader: 'sass-loader',
              options: {
                api: 'modern-compiler',
              },
            },
          ],
        },
        {
          test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
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
              presets: [['@babel/preset-env', { targets: 'defaults' }]],
            },
          },
        },
        {
          test: /\.geojson$/,
          type: 'json',
        },
      ],
    },
    stats: {
      errorDetails: false,
    },
  };
};
