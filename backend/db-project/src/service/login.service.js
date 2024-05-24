const { Client } = require('../models');

const loginClient = async ({ email, password }) => {
    const client = await Client.findOne({ where: { email, password } })

    return client
}

module.exports = {
    loginClient,
};