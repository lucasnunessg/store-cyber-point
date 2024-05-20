const jwt = require('jsonwebtoken');
const { Client } = require('../models')

const secret = process.env.JWT_SECRET;
const jwtConfig = {
    expiredIn: '1d',
    algorithm: 'HS256'
};

const decodeToken = async (req, res) => {
    try{
        const { email } = req.body;
        const token = jwt.sign({ data: { Client: email } }, secret, jwtConfig);
        const path = req.originalUrl.replace(/\d+/g, '');
        const status = path === '/login' ? 200 : 201;
        return res.status(status).json({ token });
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Falha interna de servidor' })
    }
};


module.exports = {
    decodeToken,
}