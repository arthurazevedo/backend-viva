const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const StoreController = require('./app/controllers/StoreController');
const ProductController = require('./app/controllers/ProductController');
const CategoriesController = require('./app/controllers/CategoriesController');

const routes = Router();

routes.post('/user', UserController.store);

// rota de ver catalogos nao precisa de auth

routes.use(authMiddleware);

routes.put('/user', UserController.update);

routes.post('/store', StoreController.store);
routes.get('/store', StoreController.index);

const upload = multer(multerConfig);
routes.post('/product', upload.single('file'), ProductController.store);

routes.post('/category', CategoriesController.store);
routes.get('/categories', CategoriesController.index);

module.exports = routes;
