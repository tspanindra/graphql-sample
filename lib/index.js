const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const app = require('express')();
const graphqlHTTP = require('express-graphql');

// const query = process.argv[2];

const ncScheme = require('../schema');
const { graphql } = require('graphql');

app.use( '/graphql', graphqlHTTP({
  schema: ncScheme,
  graphiql: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('listening on port 3000');

});