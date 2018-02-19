const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} = require('graphql')

const { fromSnakeCase } = require('../lib/util');

module.exports = new GraphQLObjectType( {
  name: 'MeType',
  fields: {
    id: { type:GraphQLID },
    firstName: fromSnakeCase(GraphQLString),
    lastName: fromSnakeCase(GraphQLString),
    createdAt: fromSnakeCase(GraphQLString),
    email: { type : new GraphQLNonNull(GraphQLString)}
  }
})