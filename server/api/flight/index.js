'use strict';

var express = require('express');
var controller = require('./flight.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/scheduled', controller.scheduled);
router.get('/path', controller.getPath);
router.get('/path/:id', controller.showPath);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
