const { clientService } = require('../service');

const getAllClient = async (_req, res) => {
    try {
        const clients = await clientService.getAllClient()
        return res.status(200).json(clients);
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Não foi possível encontrar clientes' })
    };
}


module.exports = {
    getAllClient,
}