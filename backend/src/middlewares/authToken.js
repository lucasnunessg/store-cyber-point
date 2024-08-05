const jwt = require('jsonwebtoken');
const { loginService } = require('../service');

const secret = process.env.JWT_SECRET || 'secretpassword';
const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256'
};

const generateToken = async (req, res) => {
    try {
        const { email, password } = req.body;

        const client = await loginService.loginClient({ email, password });
        if (!client) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        const { role } = client;

        if (!role) {
          client.role = 'client';
      }

        const token = jwt.sign({ data: { email, role } }, secret, jwtConfig);
        res.localStorage('token', token, {httpOnly: true})
        const path = req.originalUrl.replace(/\d+/g, '');
        const status = path === '/login' ? 200 : 201;

        return res.status(status).json({ token });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: 'dados inválidos' });
    }
};

module.exports = {
    generateToken,
};
