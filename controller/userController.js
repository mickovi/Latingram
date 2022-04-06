const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
require('dotenv').config({ path: 'variable.env'} );

const createToken = (user, key, expiresIn) => {
    // console.log(user);
    const { id, firstName, lastName, username, email } = user;
    const payload = { 
        id, 
        firstName, 
        lastName, 
        username, 
        email 
    };
    // Firmar el token
    return jwt.sign(payload, key, { expiresIn });
};

// QUERY

const getUser = async token => {
    // Verificar el token
    const userID = await verify(token, process.env.AUTH_KEY);
    return userID;
};

// MUTATION

const registerUser = async input => {

    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();
    const { username, email, password } = newUser;

    // 1. Revisar si el el usuario ya está registrado.
    const existUsername = await User.findOne({ username });
    if (existUsername) throw new Error('El usuario ya está registrado. Intenta con otro.');

    const existEmail = await User.findOne({ email });
    if (existEmail) throw new Error('El email ya está registrado. Intenta con otro.');

    // 2. Hashear el password.
    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(password, salt);

    // 3. Guardarlo en la base de datos.
    try {
        const user = new User(newUser);
        user.save();
        return user;
    } catch (error) {
        console.log(error);
    }
};

const authUser = async input => {
    const { email, password } = input;

    // 1. Verificar que el usuario exista
    const existUser = await User.findOne({ email });
    if (!existUser) throw new Error('El usuario o contraseña es incorrecta o no existe.'); // El usuario no existe.

    // 2. Verificar si el password es correcto
    const passwordSuccess = await bcryptjs.compare(password, existUser.password);
    if (!passwordSuccess) throw new Error('El usuario o contraseña es incorrecta o no existe.'); // La contraseña es incorrecta.
    
    // 3. Crear el token
    return {
        token: createToken(existUser, process.env.AUTH_KEY, '12h')
    };
};

module.exports = {
    getUser,
    registerUser,
    authUser,
}