// const path = require('path');

// module.exports = {
//   entry: ['./src/game.js', './src/index.js'],
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   // Add any additional configuration options here
// };

const path = require('path');

module.exports = {
  entry: {
    demo: './src/demo.js',
    game: './src/game.js'
  },
  output: {
    filename: '[name]_wp.js',
    path: path.resolve(__dirname, 'dist/webpack_bundled'),
  },
};