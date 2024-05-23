const jwt = require('jsonwebtoken');
const Redis = require('ioredis');
const secret = process.env.JWT_SECRET || 'secretpassword';

const redisClient = new Redis();

const isAuthenticated = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido ou formato inválido' });
    }

    const token = authorization.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Sem token' });
    }

    const inDenyList = await redisClient.get(`bl_${token}`);
    if (inDenyList) {
        return res.status(401).json({ message: 'JWT Rejeitado' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.data.Client;
        req.tokenExp = decoded.exp;
        req.token = token;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = {
    isAuthenticated,
};
