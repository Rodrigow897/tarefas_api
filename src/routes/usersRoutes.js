const express = require('express');
const router = express.Router();
const { getUsers, createOneUser, updateOneUser, deleteOneUser } = require('./../controllers/usersControllers');

router.get('/', getUsers);
router.post('/', createOneUser);
router.put('/:id', updateOneUser);
router.delete('/:id', deleteOneUser)
module.exports = router