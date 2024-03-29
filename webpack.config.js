const path = require("path");
const pkg = require("./package.json");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    library: pkg.name,
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  externals: [
    nodeExternals(),
    {
      react: "react",
      "react-dom": "react-dom",
      "react-native": "react-native",
    },
  ],
  resolve: {
    alias: {
      "react-native": path.join(__dirname, "node_modules/react-native"),
    },
  },
};
