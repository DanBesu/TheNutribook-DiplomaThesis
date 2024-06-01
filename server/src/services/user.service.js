const UserDatabase = require('../database/user.database');

const create = async (data) => {
    return await UserDatabase.create(data);
}

const getAll = async () => {
    return await UserDatabase.getAll();
}

module.exports = {
    create,
    getAll
}
