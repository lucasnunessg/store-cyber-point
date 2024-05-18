const { schemaLogin } = require('../schemas');

const validateLogin = async(req, res, next) => {
    try {
    const { email, password } = req.body;
    const { error } = schemaLogin.validate({ email, password });
    if(error) {
        return res.status(400).json({ message: 'Dados inválidos!' });
    }
    next();
    }catch(e) {
        console.log(e.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
};

module.exports = {
    validateLogin,
}