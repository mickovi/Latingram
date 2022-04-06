const { gql } = require('apollo-server');

const typeDefs = gql `

    # type Modelo: Todos los campos disponibles
    # input ModeloInput: Solo los campos que queremos mostrar (se pasa al resolver)

    type User {
        id: ID
        firstName: String 
        lastName: String 
        username: String 
        email: String 
        password: String 
        avatar: String 
        webSite: String 
        description: String
        createdAt: String
    }

    type Token {
        token: String
    }

    input UserInput {
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
    }

    input AuthUserInput {
        email: String!
        password: String!
    }

    type Query {
        # User
        getUser(token: String!): User
    }

    type Mutation {
        registerUser(input: UserInput): User
        authUser(input: AuthUserInput): Token
    }
`;

module.exports = typeDefs;