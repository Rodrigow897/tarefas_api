const express = require('express');
const router = express.Router();
const { getSector, createOneSector, updateOneSector, deleteOneSector } = require('./../controllers/sectorControllers');

router.get('/', getSector);
router.post('/', createOneSector);
router.put('/:id', updateOneSector);
router.delete('/:id', deleteOneSector)
module.exports = router