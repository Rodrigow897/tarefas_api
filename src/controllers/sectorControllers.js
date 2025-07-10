const pool = require('../config/db');

const getSector = async (_, res) => {
    try{
        const sector = await pool.query('SELECT * FROM tb_sector');
        res.status(200).json(sector.rows);
    } catch (err) {
        console.error('Error searching for sector', err);
        res.status(500).json({error: 'Error searching for sector'});
    }
};

const createOneSector = async (req, res) => {
    const {name} = req.body;
    try{
        const sector = await pool.query(
            'INSERT INTO tb_calls (name) VALUES ($1) RETURNING *',
            [name]
        );
        res.status(200).json(sector.rows[0]);
    } catch (err) {
        console.error('Error creating sector', err);
        res.status(500).json({error: 'Error creating sector'})
    };
};

const updateOneSector = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    
    try{
        const sector = await pool.query(
            'UPDATE tb_sector SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );
        
        if (sector.rowCount === 0) {
            return res.status(404).json({error: 'sector not found'});
        }

        res.status(200).json(sector.rows[0]);
    } catch (err) {
        console.error('Error updating sector', err);
        res.status(500).json({error: 'Error updating sector'})
    }
};

const deleteOneSector = async (req, res) => {
    const {id} = req.params;

    try {
        const sector = await pool.query(
            'DELETE FROM tb_sector WHERE id = $1 RETURNING *', [id]
        );
        if (sector.rowCount === 0) {
            return res.status(404).json({error: 'sector not found'});
        };

        res.status(200).json({message: 'sector delete sucessfully'});
    } catch (err) {
        console.error('Error deleting sector', err);
        res.status(500).json({erro: 'Error deleting sector'});
    };
};

module.exports = {getSector, createOneSector, updateOneSector, deleteOneSector};