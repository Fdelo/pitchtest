const { ApolloServer, gql } = require('apollo-server');

const connString = require('./utils/database');


const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'pitch-app-test.cdtidpse7iwz.us-east-2.rds.amazonaws.com',
  user     : 'sudo01',
  password : 'sudo-password01',
  port: '3306',
  database : 'pitch_test_db'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

const typeDefs = gql`
  type Query {
      username: String
      password: String
      test: String
  }

  # type User {
  #   username: String
  #   password: String
  # }
`;

const resolvers = {
  Query: {
      username:  () => "test",
      password:  () => "test",
      test: () => "test"
  }
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen()
  .then(() => console.log('Server started! 🚀'));