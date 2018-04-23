'use strict'

const { basename } = require('path')
const pkg = require('./package')
const exe = basename(process.argv[0])

module.exports = require('yargs')
  .usage(`Usage: ${exe} [options]`)
  .wrap(78)
  .env(pkg.name.toUpperCase())

  .demand(0, 1)

  .option('ip', {
    type: 'string',
    normalize: true,
    describe: 'IP to use for GRPC server.',
      default: '0.0.0.0'
  })

  .option('port', {
    type: 'number',
    describe: 'Port for the GRPC server',
      default: 50051
    })

  .help('help')
  .version(pkg.version)
