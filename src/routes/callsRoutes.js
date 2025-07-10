const express = require('express');
const router = express.Router();
const { getCalls, createOneCall, updateOneCall, deleteOneCall } = require('./../controllers/callsControllers');

router.get('/', getCalls);
router.post('/', createOneCall);
router.put('/:id', updateOneCall);
router.delete('/:id', deleteOneCall)
module.exports = router