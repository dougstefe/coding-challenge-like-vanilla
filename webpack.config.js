const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    library: 'coding-challenge-like-vanilla',
    libraryTarget: 'umd',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};