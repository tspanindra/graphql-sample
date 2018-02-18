const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require ('graphql');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      description: "The *mandatory* Hello world example",
      resolve: () => 'world'
    },
  }
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = ncSchema;