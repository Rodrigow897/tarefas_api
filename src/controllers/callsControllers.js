const pool = require('./../config/db');

const getCalls = async (_, res) => {
    try{
        const calls = await pool.query('SELECT * FROM tb_calls');
        res.status(200).json(calls.rows);
    } catch (err) {
        console.error('Error searching for calls', err);
        res.status(500).json({error: 'Error searching for calls'});
    }
};

const createOneCall = async (req, res) => {
    const {title, description, users_id, status_id, sector_id, responsible_id} = req.body;
    try{
        const call = await pool.query(
            'INSERT INTO tb_calls (title, description, users_id, status_id, sector_id, responsible_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, description, users_id, status_id, sector_id, responsible_id]
        );
        res.status(200).json(call.rows[0]);
    } catch (err) {
        console.error('Error creating call', err);
        res.status(500).json({error: 'Error creating call'})
    };
};

const updateOneCall = async (req, res) => {
    const {id} = req.params;
    const {title, description, users_id, status_id, sector_id, responsible_id} = req.body;
    
    try{
        const call = await pool.query(
            'UPDATE tb_calls SET title = $1, description = $2, users_id = $3, status_id = $4, sector_id = $5, responsible_id = $6 WHERE id = $7 RETURNING *',
            [title, description, users_id, status_id, sector_id, responsible_id, id]
        );
        
        if (call.rowCount === 0) {
            return res.status(404).json({error: 'Calls not found'});
        }

        res.status(200).json(call.rows[0]);
    } catch (err) {
        console.error('Error updating call', err);
        res.status(500).json({error: 'Error updating call'})
    }
};

const deleteOneCall = async (req, res) => {
    const {id} = req.params;

    try {
        const call = await pool.query(
            'DELETE FROM tb_calls WHERE id = $1 RETURNING *', [id]
        );
        if (call.rowCount === 0) {
            return res.status(404).json({error: 'Call not found'});
        };

        res.status(200).json({message: 'call delete sucessfully'});
    } catch (err) {
        console.error('Error deleting call', err);
        res.status(500).json({erro: 'Error deleting call'});
    };
};

module.exports = {getCalls, createOneCall, updateOneCall, deleteOneCall};