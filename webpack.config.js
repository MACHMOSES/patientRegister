const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Set the mode to 'development' or 'production'
  mode: 'development', 

  // Entry point of your React application
  entry: './src/main/js/App.js', 

  devtool: 'source-map',

  // Output configuration for the bundled files
  output: {
    // Path where the bundled files will be placed (Spring Boot static resources)
    path: path.resolve(__dirname, './target/classes/static/built/'), 
    filename: 'bundle.js', // Name of the bundled JavaScript file
    publicPath: '/built/', // Public path for assets within the bundle
  },

  // Configuration for the development server (for React development)
  devServer: {
    port: 3000, // Port for the React development server
    proxy: {
      '/api': 'http://localhost:8080' // Proxy API requests to Spring Boot backend
    },
    historyApiFallback: true, // Handle client-side routing
  },

  // Module rules for handling different file types
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Process .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel for transpilation
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets for ES6 and React
          },
        },
      },
      {
        test: /\.css$/, // Process .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
    ],
  },

  // Plugins for additional functionalities
  plugins: [
    new HtmlWebpackPlugin({
      template: './target/classes/templates/index.html', // Path to your HTML template
      filename: 'index.html', // Output filename relative to output.path
    }),
  ],

  // Resolve extensions for easier imports
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};