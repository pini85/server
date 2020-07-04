//figures out what set credentials to return

if (process.env.NODE_ENV === 'production') {
  //production
  module.exports = require('./prod');
} else {
  //in development
  module.exports = require('./dev');
}
