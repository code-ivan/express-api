// Bootstrap babel-register
require('babel-register')

// Ensure correct NODE_ENV
if (process.env.NODE_ENV !== 'test') {
  throw new Error('Running tests require NODE_ENV=test')
}

// Set up chai 
const chai  = require('chai')
global.expect = chai.expect

global.navigator = { userAgent: 'node.js' }

// Load tests
const glob = require('glob')
glob.sync('./src/**/*.spec.js').forEach(require)
