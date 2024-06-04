const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const create = async (userData) => {
    const hashedPassword = await hashPassword(userData.password);

    const user = new UserModel({
        userName: userData.userName,
        email: userData.email,
        password: hashedPassword,
    });

    await user.save();
    const userObject = user.toObject();
    return { ...userObject, id: userObject._id.toString()};
}

const getAll = async () => {
    return await UserModel.find().lean().exec();
};

const getById = async (id) => {
    return await UserModel.findById(id).lean().exec();
};

const findByEmail = async (email) => {
    console.log('email: ', email);

    const allUsers = await UserModel.find().lean().exec();
    console.log('allUsers: ', allUsers);

    return await UserModel.findOne({ email }).lean().exec();
};

module.exports = {
    create,
    getAll,
    getById,
    findByEmail,
}
