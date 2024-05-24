const express = require('express');

const { clientsRoute, loginRoute, productRoute, logoutRoute } = require('./routes') 

const app = express();

app.use(express.json());

app.use('/', clientsRoute);
app.use('/', loginRoute);
app.use('/', productRoute);
app.use('/', logoutRoute);

module.exports = app;