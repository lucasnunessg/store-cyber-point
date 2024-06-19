const { Client } = require('../models');

const getAllClient = async() => {
    const clients = await Client.findAll({
        attributes: ['fullName', 'address', 'contact']
    });

    return clients
};

const getClientByName = async (id, name) => {
    const client = await Client.findOne({ where: { id, name,
        attributes: ['fullName', 'address', 'contact']
     } });

    return client
};

const getClientById = async(id) => {
    const clients = await Client.findOne({ where: { id },
        attributes: ['fullName', 'address', 'contact'] });

    return clients
}

const updateClient = async (id, fullName, address, contact, email, password, role) => {
    const [updatedRows] = await Client.update(
        { fullName, address, contact, email, password, role }, 
        { where: { id } }
    );

    return updatedRows; 
}

const createClient = async(fullName, address, contact, email, password, role) => {
    const newClient = await Client.create({ fullName, address, contact, email, password, role });

    return newClient
}

const deleteClient = async(id) => {
    const client = await Client.destroy({ where: { id } })

    return client;
};

module.exports = {
    getAllClient,
    getClientById,
    getClientByName, 
    updateClient,
    createClient,
    deleteClient,
}