const loginService = require('../services/login.service');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await loginService.login(email, password);
        if (response.status === 'success') {
            res.json({ status: 'success', data: response });
        } else if (response.status === 'error' && response.message === 'User not found') {
            res.status(404).json({ status: 'error', message: response.message });
        } else if (response.status === 'error' && response.message === 'Invalid password') {
            res.status(401).json({ status: 'error', message: response.message });
        } else {
            res.status(400).json({ status: 'error', message: response.message });
        }
    } catch (error) {
        console.error(`Login error: ${error.message}`);
        res.status(500).json({ status: 'error', message: 'Login Server error' });
    }
};

module.exports = {
    login,
}
