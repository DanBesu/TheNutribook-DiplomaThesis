const userService = require('../services/user.service');

const create = async (req, res) => {
    try {
        console.log(req.body)
        const user = await userService.create(req.body);
        res.json({ status: 'success', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Create User Server Error'});
    }
};

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.json({ status: 'success', data: users });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Get Users Server Error' });
    }
};

module.exports = {
    create,
    getAll
}
