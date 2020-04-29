const prodKeys = require('./prod')
const devKeys = require('./dev')
const env = process.env.NODE_ENV || 'development'
const envConfig = (env !== 'production') ? devKeys : prodKeys
module.exports = envConfig


