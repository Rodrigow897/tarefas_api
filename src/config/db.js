const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tarefas',
    password: 'Wcc@2023',
    port: 5432
});

pool.connect()
.then(() => console.log('Connected Server...'))
.catch(() => console.log('Connection failed...'))

module.exports = pool