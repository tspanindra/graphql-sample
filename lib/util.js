const humps = require('humps');

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',


  fromSnakeCase(GrapQLType) {
    return {
      type: GrapQLType,
      resolve(obj, args, ctx, { fieldName }) {
        return obj[humps.decamelize(fieldName)];
      }
    }
  }

};