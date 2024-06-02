const loginService = require('../services/login.service');

const login = async (req, res) => {
    try {
        const response = await loginService.loginRequest(req.body);
        res.json(response);
    } catch (error) {
        res.status(500).send('Login Error');
    }
}

module.exports = {
    login,
}