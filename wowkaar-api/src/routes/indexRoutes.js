const express = require('express');
const index = express.Router();
const indexController = require('../controllers/indexContorller')

index.get('/', indexController.index)


module.exports = index