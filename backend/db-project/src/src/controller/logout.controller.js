const { redisClient } = require('../app');
const { isAuthenticated } = require('../middlewares/isAuthenticate'); 

const logout = async(req, res) => {
    try{
        const token = req.token;
        const token_key = `bl_${token}`;

        await redisClient.set(token_key, token);
        await redisClient.expireAt(token_key, req.tokenExp); 
        return res.status(200).json({ message: 'Deslogado com sucesso!' })
    } catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Erro ao invalidar token' })
    }
};

module.exports = {
    logout,
};
