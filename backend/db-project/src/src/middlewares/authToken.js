const jwt = require('jsonwebtoken');
const { addToDenylist } = require('../middlewares/isAuthenticate');

const secret = process.env.JWT_SECRET || 'secretpassword';
const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256'
};

const generateToken = async (req, res) => {
    try {
        const { email } = req.body;
        const token = jwt.sign({ data: { Client: email } }, secret, jwtConfig);
        const path = req.originalUrl.replace(/\d+/g, '');
        const status = path === '/login' ? 200 : 201;

        const decoded = jwt.decode(token);
        if (decoded.exp * 1000 < Date.now()) {
            addToDenylist(token); 
            return res.status(401).json({ message: 'Token expirado' });
        }

        return res.status(status).json({ token });
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({ message: 'Falha interna de servidor' });
    }
};

module.exports = {
    generateToken,
};
