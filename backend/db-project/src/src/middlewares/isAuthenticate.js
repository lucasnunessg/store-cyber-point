const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secretpassword';

const isAuthenticated = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido ou formato inválido' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.data.Client; 
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = {
    isAuthenticated,
};
