const { resolve } = require('path')

const { EnvironmentPlugin, DefinePlugin } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function(environment) {
  if (!environment) environment = process.env.NODE_ENV || 'development'

  const plugins = [
    new EnvironmentPlugin({ NODE_ENV: environment }),
    new HtmlWebpackPlugin({
      template: './src/index.html.js',
      minify: { collapseWhitespace: true },
      inject: false,
      excludeAssets: [/\.js$/]
    })
  ]

  // Customize output
  if (environment === 'production' || process.env.BUILDING) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsFilename: './coverage/client-bundle-stats.json'
      })
    )
  } else {
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false
      })
    )
    plugins.push(
      new DefinePlugin({
        __DEV__: true
      })
    )
  }

  return {
    entry: './src/index.js',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'app.js'
    },
    mode: environment === 'production' ? 'production' : 'development',
    plugins,
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      port: 4200
    }
  }
}
