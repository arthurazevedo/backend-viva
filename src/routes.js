const { Router } = require('express');
const UserController = require('./app/controllers/UserController');

const routes = Router();

routes.post('/user', UserController.store);

module.exports = routes;
