const { Client } = require('../models');

const getAllClient = async() => {
    const clients = await Client.findAll({
        attributes: [fullName, address, contact]
    });

    return clients
};

const getClientById = async(id) => {
    const clients = await Client.findOne({ where: { id } });

    return clients
}

module.exports = {
    getAllClient,
    getClientById,
}