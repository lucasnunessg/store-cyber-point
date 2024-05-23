const express = require('express');

const { clientsRoute, loginRoute, productRoute } = require('./routes') 

const app = express();

app.use(express.json());

app.use('/', clientsRoute);
app.use('/', loginRoute);
app.use('/', productRoute);

module.exports = app;