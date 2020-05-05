const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const StoreController = require('./app/controllers/StoreController');
const ProductController = require('./app/controllers/ProductController');
const CategoriesController = require('./app/controllers/CategoriesController');
const SearchController = require('./app/controllers/SearchController');
const StoreLikesController = require('./app/controllers/StoreLikesController');
const FeedController = require('./app/controllers/FeedController');
const ExplorerController = require('./app/controllers/ExplorerController');
const WishsController = require('./app/controllers/WishsController');
const ContactController = require('./app/controllers/ContactController');

const routes = Router();

routes.post('/user', UserController.store);

// rota de ver catalogos nao precisa de auth
routes.get('/products/:username/:category', ProductController.index);
routes.get('/search/:username', SearchController.index);
routes.get('/contact/:username', ContactController.index);

routes.use(authMiddleware);

routes.put('/user', UserController.update);
routes.get('/user', UserController.index);

const upload = multer(multerConfig);
routes.post('/product', upload.single('file'), ProductController.store);

routes.post('/store', upload.single('file'), StoreController.store);
routes.get('/store', StoreController.index);

routes.post('/category', CategoriesController.store);
routes.get('/categories/:username', CategoriesController.index);

routes.post('/store-like/:username', StoreLikesController.store);
routes.get('/store-like', StoreLikesController.index);

routes.get('/feed', FeedController.index);

routes.get('/explorer', ExplorerController.index);

routes.post('/wish/:username/:id_product', WishsController.store);
routes.get('/wishs', WishsController.index);

module.exports = routes;
