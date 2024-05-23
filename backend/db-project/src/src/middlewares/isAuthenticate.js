
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secretpassword';

let allowlist = [];

let denylist = [];

function addToAllowlist(token) {
    allowlist.push(token);
}

function isInAllowlist(token) {
    return allowlist.includes(token);
}

function addToDenylist(token) {
    denylist.push(token);
}

function isInDenylist(token) {
    return denylist.includes(token);
}

const isAuthenticated = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido ou formato inválido' });
    }

    const token = authorization.split(' ')[1];

    if (isInDenylist(token)) {
        return res.status(401).json({ message: 'JWT Rejeitado' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.data.Client;
        addToAllowlist(token); 
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = {
    isAuthenticated,
    addToAllowlist,
    isInAllowlist,
    addToDenylist,
    isInDenylist
};
