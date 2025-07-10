const express = require('express');
const router = express.Router();
const { getStatus, createOneStatus, updateOneStatus, deleteOneStatus} = require('../controllers/statusControllers');

router.get('/', getStatus);
router.post('/', createOneStatus);
router.put('/:id', updateOneStatus);
router.delete('/:id', deleteOneStatus)
module.exports = router