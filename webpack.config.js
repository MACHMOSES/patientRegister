const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",  // Changed from "development" for optimized, production-ready builds

  entry: "./src/main/js/index.js",

  // devtool: "source-map",  // Commented out for production (removes source maps to reduce bundle size)

  output: {
    path: path.resolve(__dirname, "./build/"),
    filename: "bundle.js",
    publicPath: "/build/",
  },

  // devServer: { ... },  // Commented out for production builds (not needed in Docker)

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // Added rules for .json and .wasm (Webpack 5 built-in support)
      {
        test: /\.json$/,
        type: "json",
      },
      {
        test: /\.wasm$/,
        type: "webassembly/async",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/main/resources/static/index.html",
      filename: "index.html",
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
  },

  // Added for WebAssembly support if needed
  experiments: {
    asyncWebAssembly: true,
  },
};