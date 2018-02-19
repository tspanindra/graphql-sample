const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql')

const { fromSnakeCase } = require('../lib/util');
const ContestsType = require('./contests');
const pgdb = require('../database/pgdb');
const mdb = require('../database/mdb');

module.exports = new GraphQLObjectType( {
  name: 'MeType',
  fields: {
    id: { type:GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    email: { type : new GraphQLNonNull(GraphQLString)},
    contests: {
      type: new GraphQLList(ContestsType),
      resolve(obj, args, { pgPool }) {
        // Read contests from db
        return pgdb(pgPool).getContests(obj);
      }
    },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName}) {
        return mdb(mPool).getCounts(obj, fieldName)
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName}) {
        return mdb(mPool).getCounts(obj, fieldName)
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName}) {
        return mdb(mPool).getCounts(obj, fieldName)
      }
    }
  }
})