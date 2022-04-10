const { ApolloServer } = require('apollo-server');
const connectDB = require('./config/db');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolvers');

// Conectar a la base de datos
connectDB();

// Crear una instancia de ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Arrancar el servidor
server.listen().then(({url}) => {
    console.log(`🚀 Servidor ${url} listo!`);
});