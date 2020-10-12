const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "nvicon.js",
    path: path.resolve(__dirname, "dist"),
    library: "NVICON",
    libraryTarget: "umd",
    globalObject: "this"
  },
  node:{
      fs:'empty'    
  },
  mode: "production",
};
