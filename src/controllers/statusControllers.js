const pool = require('../config/db');

const getStatus = async (_, res) => {
    try{
        const user = await pool.query('SELECT * FROM tb_status');
        res.status(200).json(user.rows);
    } catch (err) {
        console.error('Error searching for users', err);
        res.status(500).json({error: 'Error searching for users'});
    }
};

const createOneStatus = async (req, res) => {
    const {name} = req.body;
    try{
        const status = await pool.query(
            'INSERT INTO tb_status (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.status(200).json(status.rows[0]);
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({error: 'Error creating user'})
    };
};

const updateOneStatus = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    
    try{
        const status = await pool.query(
            'UPDATE tb_status SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
        
        if (status.rowCount === 0) {
            return res.status(404).json({error: 'status not found'});
        }

        res.status(200).json(status.rows[0]);
    } catch (err) {
        console.error('Error updating status', err);
        res.status(500).json({error: 'Error updating status'})
    }
};

const deleteOneStatus = async (req, res) => {
    const {id} = req.params;

    try {
        const status = await pool.query(
            'DELETE FROM tb_status WHERE id = $1 RETURNING *', [id]
        );
        if (status.rowCount === 0) {
            return res.status(404).json({error: 'status not found'});
        };

        res.status(200).json({message: 'status deleted sucessfully'});
    } catch (err) {
        console.error('Error deleting status', err);
        res.status(500).json({erro: 'Error deleting status'});
    };
};

module.exports = {getStatus, createOneStatus, updateOneStatus, deleteOneStatus};