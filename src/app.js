const express = require('express');
const app = express();
const pool = require('./config/db.js');
const callsRoutes = require('./routes/callsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const statusRoutes = require('./routes/statusRoutes');
const sectorRoutes = require('./routes/sectorRoutes copy.js');
const responsibleRoutes = require('./routes/responsibleRoutes.js');

app.use(express.json());

app.use('/calls', callsRoutes);
app.use('/status', statusRoutes);
app.use('/users', usersRoutes);
app.use('/sector', sectorRoutes);
app.use('/responsible', responsibleRoutes);


module.exports = app