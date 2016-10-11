module.exports = {
  type: 'react-app',
  webpack: {
    uglify: {
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: false,
      output: {
        comments: false,
        screw_ie8: true,
      }
    },
    extra: {
      resolve: {
        modulesDirectories: ['node_modules', 'src/npm_modules', 'src'],
        alias: {
          'reflux': 'core'
        }
      }
    }
  }
}
