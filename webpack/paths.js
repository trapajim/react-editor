const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'example/build'),
  entryPath: path.resolve(__dirname, '../', 'example/index.jsx'),
  templatePath: path.resolve(__dirname, '../', 'example/template.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
};
