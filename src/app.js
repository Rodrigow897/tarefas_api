const express = require('express');
const app = express();
const pool = require('./config/db.js');
const callsRoutes = require('./routes/callsRoutes');
const usersRoutes = require('./routes/usersRoutes')

app.use(express.json());

module.exports = app