module.exports = function(wallaby) {
  return {
    env: {
      type: 'node'
    },
    testFramework: 'mocha',

    files: [
      'src/**/*.ts',
      'test/bootstrap.ts',
      'test/unit/**/_suite.ts'
    ],
    tests: [
      '!test/unit/**/_suite.ts',
      'test/unit/**/*.ts'
    ],

    setup: function() {
      require('./test/bootstrap');
      // const mock = require('mock-require');
      // console.log(__dirname)
      // console.log(require.resolve('./src/did-you-mean/index.html'));
      // mock('./src/did-you-mean/index.html', {});
    },
    teardown: function() {
      require('./test/teardown');
      // const mock = require('mock-require');
      // mock.stopAll();
    }
  }
}
