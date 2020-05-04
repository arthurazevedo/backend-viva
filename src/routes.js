const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const authMiddleware = require('./app/middlewares/auth');
const UserController = require('./app/controllers/UserController');
const StoreController = require('./app/controllers/StoreController');
const ProductController = require('./app/controllers/ProductController');

const routes = Router();

routes.post('/user', UserController.store);

routes.use(authMiddleware);

routes.put('/user', UserController.update);

routes.post('/store', StoreController.store);

const upload = multer(multerConfig);
routes.post('/product', upload.single('file'), ProductController.store);

module.exports = routes;
