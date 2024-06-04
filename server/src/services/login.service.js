const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDatabase = require('../database/user.database');

const verifyPassword = async (plainTextPassword, hashedPassword) => {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
};

const generateToken = (user) => {
    const payload = {
        userId: user._id.toString(),
        email: user.email
    };
    const options = { expiresIn: '8h' };
    const secret = process.env.JWT_SECRET;
    console.log('secret: ', secret);
    const token = jwt.sign(payload, secret, options);
    return token;
};


const login = async (email, password) => {
    try {
        console.log('email: ', email);

        const user = await userDatabase.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = generateToken(user);

        return { status: 'success', token, user };
    } catch (error) {
        console.error('Login error:', error.message);
        return { status: 'error', message: error.message };
    }
};

module.exports = {
    login,
}