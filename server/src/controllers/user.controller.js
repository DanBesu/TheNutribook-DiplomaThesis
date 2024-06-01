const userService = require('../services/user.service');

const create = async (req, res) => {
    try {
        const user = await userService.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send('Create User Server error');
    }
};

const getAll = async (req, res) => {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Get Users Server error');
    }
};

module.exports = {
    create,
    getAll
}
