const { loginService } = require('../service');

const loginClient = async (req, res) => {
    try {
        const { email, password } = req.body
        const client = await loginService.loginClient({ email, password });
        if(!client){
            return res.status(400).json({ message: 'Dados incorretos!' });
        } 
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Erro interno de servidor' })
    }
};

module.exports = {
    loginClient,
}