const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const app = require('express')();
const graphqlHTTP = require('express-graphql');

// const query = process.argv[2];

const ncScheme = require('../schema');
const { graphql } = require('graphql');

//postgressql
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);

// mongo
const { MongoClient } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

MongoClient.connect(mConfig.url, (err, mPool) => {
  assert.equal(err, null);

  app.use( '/graphql', graphqlHTTP({
    schema: ncScheme,
    graphiql: true,
    context: { pgPool, mPool }
  }));
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('listening on port 3000');
  });
});


