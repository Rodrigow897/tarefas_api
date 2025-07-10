const express = require('express');
const router = express.Router();
const { getResponsible, createOneResponsible, updateOneResponsible, deleteOneResponsible } = require('../controllers/responsibleControllers');

router.get('/', getResponsible);
router.post('/', createOneResponsible);
router.put('/:id', updateOneResponsible);
router.delete('/:id', deleteOneResponsible)
module.exports = router