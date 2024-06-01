const UserModel = require('../models/user.model');

const create = async (data) => {
    const user = new UserModel(data);
    await user.save();
    const userObject = user.toObject();
    return { ...userObject, id: userObject._id.toString()};
}

const getAll = async () => {
    return await User.find();
}

module.exports = {
    create,
    getAll
}
