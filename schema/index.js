const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require ('graphql');

const pgdb = require('../database/pgdb');
const MeType = require('../types/me');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      description: "The *mandatory* Hello world example",
      resolve: () => 'world'
    },
    me: {
      type: MeType,
      description: "The current user identified by an api key",
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, { pgPool }) => {
        // Read user information from database
        // using args.key as the api key
        // pgPool...
        return pgdb(pgPool).getUser(args.key);
      }
    }
  }
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = ncSchema;