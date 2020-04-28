const prodKeys = require('./prod')
const devKeys = require('./dev')
const envConfig = (process.env.NODE_ENV !== 'production') ? devKeys : prodKeys
module.exports = envConfig


