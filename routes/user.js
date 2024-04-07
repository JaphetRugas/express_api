var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');

// GET all users
router.get('/', UserController.getAllUsers);

// GET a specific user by ID
router.get('/:id', UserController.getUserById);

// POST a new user
router.post('/', UserController.createUser);

// DELETE all users
router.delete('/', UserController.deleteAllUsers);

// DELETE a specific user by ID
router.delete('/:id', UserController.deleteUserById);

// UPDATE a specific user by ID
router.put('/', UserController.updateUserById);

module.exports = router;
