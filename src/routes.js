const { Router } = require('express');
const authMiddleware = require('./app/middlewares/auth');
const UserController = require('./app/controllers/UserController');
const StoreController = require('./app/controllers/StoreController');

const routes = Router();

routes.post('/user', UserController.store);

routes.use(authMiddleware);
routes.put('/user', UserController.update);
routes.post('/store', StoreController.store);

module.exports = routes;
