console.log('args', process.argv)
// for benchmark tests
var karmaConfig = {
  testFiles: [
    'src/**/*.spec.js'
  ],
  frameworks: ['mocha', 'sinon-chai'],
  plugins: [
    require('karma-sinon-chai'),
    require('karma-mocha-reporter'),
    require('karma-notify-reporter')
  ],
  reporters: ['mocha', 'notify']
}
if(process.argv.indexOf('--benchmark') > -1) {
  karmaConfig = Object.assign(karmaConfig, {
    testFiles: 'src/**/*.bench.js',
    frameworks: ['benchmark'],
    plugins: [
      require('karma-benchmark-reporter'),
      require('karma-benchmark'),
      require('karma-json-result-reporter')
    ],
    reporters: ['benchmark', 'json-result'],
    extra: {
      jsonResultReporter: {
        outputFile: 'benchmark-result.json'
      }
    }
  })
  //throw new Error('implement benchmark')
}


module.exports = {
  type: 'react-app',
  babel: {
    plugins: ['transform-async-to-generator', 'transform-flow-strip-types']
  },
  karma: karmaConfig,
  webpack: {
    // uglify: {
    //   compress: {
    //     screw_ie8: true,
    //     warnings: false,
    //   },
    //   mangle: false,
    //   output: {
    //     comments: true,
    //     screw_ie8: true,
    //   }
    // },

    extra: {
      loaders: [
        { test: /\.po/, loader: 'json-loader!po-loader'}
      ],
      resolve: {
        modulesDirectories: ['node_modules', 'src/npm_modules', 'src'],
        alias: {
          'reflux': 'core'
        }
      }
    }
  }
}
