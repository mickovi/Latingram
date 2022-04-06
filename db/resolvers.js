const userController = require('../controller/userController');

const resolvers = {
    Query: {
        getUser: (_, { token }) => userController.getUser(token),
    },
    Mutation: {
        registerUser: (_, { input }) => userController.registerUser(input),
        authUser: (_, { input }) => userController.authUser(input),
    }
};

module.exports = resolvers;