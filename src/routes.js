const { Router } = require('express');
const authMiddleware = require('./app/middlewares/auth');
const UserController = require('./app/controllers/UserController');

const routes = Router();

routes.post('/user', UserController.store);

routes.use(authMiddleware);
routes.put('/user/:id', UserController.update);

module.exports = routes;
