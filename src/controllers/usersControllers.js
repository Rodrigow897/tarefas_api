const pool = require('../config/db');

const getUsers = async (_, res) => {
    try{
        const user = await pool.query('SELECT * FROM tb_users');
        res.status(200).json(user.rows);
    } catch (err) {
        console.error('Error searching for users', err);
        res.status(500).json({error: 'Error searching for users'});
    }
};

const createOneUser = async (req, res) => {
    const {name} = req.body;
    try{
        const user = await pool.query(
            'INSERT INTO tb_users (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({error: 'Error creating user'})
    };
};

const updateOneUser = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    
    try{
        const user = await pool.query(
            'UPDATE tb_users SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
        
        if (user.rowCount === 0) {
            return res.status(404).json({error: 'users not found'});
        }

        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error('Error updating user', err);
        res.status(500).json({error: 'Error updating user'})
    }
};

const deleteOneUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await pool.query(
            'DELETE FROM tb_users WHERE id = $1 RETURNING *', [id]
        );
        if (user.rowCount === 0) {
            return res.status(404).json({error: 'user not found'});
        };

        res.status(200).json({message: 'user delete sucessfully'});
    } catch (err) {
        console.error('Error deleting user', err);
        res.status(500).json({erro: 'Error deleting user'});
    };
};

module.exports = {getUsers, createOneUser, updateOneUser, deleteOneUser};