const { clientService } = require('../service');

const getAllClient = async (_req, res) => {
    try {
        const clients = await clientService.getAllClient()
        return res.status(200).json(clients);
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Não foi possível encontrar clientes' })
    };
};

const getClientByName = async (req, res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;

    const client = await clientService.getClientByName(id, name)
    if(!client) return res.status(404).json({ message: 'Cliente não encontrado' })
        return res.status(200).json(client);
    }catch(e){
        console.log(e.message)
            return res.status(500).json({ message: 'error' })
        }
    }


const getClientById = async (req, res) => {
    try{
        const { id } = req.params
        const clients = await clientService.getClientById(id);
        if(!clients) return res.status(404).json({ message: 'Não foi possível encontrar cliente' })
        return res.status(200).json(clients)
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Error' })
    }
};

const createClientController = async (req, res) => {
  try {
      const { fullName, address, contact, email, password, role } = req.body;
      console.log("teste Controller 01", fullName, address, contact, email, password, role)
      const newClient = await clientService.createClient({fullName, address, contact, email, password, role});
      console.log("teste Controller 02", fullName, address, contact, email, password, role)
      return res.status(201).json(newClient);

  } catch (e) {
      console.error(e.message);
      return res.status(500).json({ message: 'Error' });
  }
};

const updateClient = async(req,res) => {
    try{
        const { id } = req.params;
        const { fullName, address, contact, email, password, role } = req.body

        const updateClient = await clientService
        .updateClient(id, fullName, address, contact, email, password, role)
        
        if(!updateClient) return res.status(404).json({ message: 'Não foi possível atualizar' });
        return res.status(200).json({ message: 'Usuário atualizado!' })
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Error' })
    };
}

const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        await clientService.deleteClient(id)
        return res.status(200).json({ message: 'Cliente deletado com sucesso!' })

    }catch(e){
        console.log(e.message)
        return res.status(403).json({ message: 'error' })
    }
}
module.exports = {
    getAllClient,
    getClientById,
    getClientByName,
    updateClient,
    createClientController,
    deleteClient,
}