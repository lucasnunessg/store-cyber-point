const express = require('express');

const { clientsRoute } = require('../src/routes')
const app = express();

app.use(express.json());

app.use('/', clientsRoute);

module.exports = app;