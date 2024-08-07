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

        const { role = 'client', fullName } = client;

        const token = jwt.sign({ data: { email, role, fullName } }, secret, jwtConfig);

        const path = req.originalUrl.replace(/\d+/g, '');
        const status = path === '/login' ? 200 : 201;

        return res.status(status).json({ token, fullName });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: 'Dados inválidos' });
    }
};

module.exports = {
    generateToken,
};
