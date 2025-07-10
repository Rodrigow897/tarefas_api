const pool = require('../config/db');

const getResponsible = async (_, res) => {
    try{
        const responsible = await pool.query('SELECT * FROM tb_responsible');
        res.status(200).json(responsible.rows);
    } catch (err) {
        console.error('Error searching for responsible', err);
        res.status(500).json({error: 'Error searching for responsible'});
    }
};

const createOneResponsible = async (req, res) => {
    const {name} = req.body;
    try{
        const responsible = await pool.query(
            'INSERT INTO tb_responsible (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.status(200).json(responsible.rows[0]);
    } catch (err) {
        console.error('Error creating responsible', err);
        res.status(500).json({error: 'Error creating responsible'})
    };
};

const updateOneResponsible = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    
    try{
        const responsible = await pool.query(
            'UPDATE tb_responsible SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
        
        if (responsible.rowCount === 0) {
            return res.status(404).json({error: 'responsible not found'});
        }

        res.status(200).json(responsible.rows[0]);
    } catch (err) {
        console.error('Error updating responsible', err);
        res.status(500).json({error: 'Error updating responsible'})
    }
};

const deleteOneResponsible = async (req, res) => {
    const {id} = req.params;

    try {
        const responsible = await pool.query(
            'DELETE FROM tb_responsible WHERE id = $1 RETURNING *', [id]
        );
        if (responsible.rowCount === 0) {
            return res.status(404).json({error: 'responsible not found'});
        };

        res.status(200).json({message: 'responsible delete sucessfully'});
    } catch (err) {
        console.error('Error deleting responsible', err);
        res.status(500).json({erro: 'Error deleting responsible'});
    };
};

module.exports = {getResponsible, createOneResponsible, updateOneResponsible, deleteOneResponsible};