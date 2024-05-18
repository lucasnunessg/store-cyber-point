const express = require('express');

const { clientsRoute, loginRoute } = require('./routes') 

const app = express();

app.use(express.json());

app.use('/', clientsRoute);
app.use('/', loginRoute);

module.exports = app;