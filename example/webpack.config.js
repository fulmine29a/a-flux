const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );
const mode = process.env.NODE_ENV == 'development' ? 'development' : 'production';

module.exports = {
  mode,
  entry   : './src/index.tsx',
  module  : {
    rules : [
      {
        test    : /\.tsx?$/,
        use     : 'ts-loader',
        exclude : /node_modules/,
      }, {
        test : /\.css/,
        use  : [
          'style-loader', 'css-loader',
        ],
      },
    ],
  },
  resolve : {
    extensions : [ '.tsx', '.ts', '.js' ],
    alias      : {
      'a-flux'       : path.resolve(
        __dirname,
        '../a-flux',
      ),
      'a-flux-react' : path.resolve(
        __dirname,
        '../a-flux-react',
      ), /*
        алиас для избежания дублирования ядра реакта в a-flux-react
       */
      react          : path.resolve(
        __dirname,
        'node_modules/react',
      ),
    },
  },
  devtool : mode == 'development' ? 'inline-source-map' : false,
  plugins : [
    new HtmlWebpackPlugin(), new ESLintPlugin( {
      failOnError : true,
    } ),
  ],
};
