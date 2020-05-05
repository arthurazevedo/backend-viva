const Product = require('../models/Product');
const Store = require('../models/Store');
const bucket = require('../../config/firebase');
const { ordenate } = require('../utils/ordenate');

module.exports = {
  async store(req, res) {
    const {
      name, price, description, category,
    } = req.body;
    const { username } = await Store.findOne({ where: { id_user: req.userId } });
    const { file } = req;

    const bucketName = process.env.BUCKET;

    const url_image = `http://storage.googleapis.com/${bucketName}/${file.filename}`;

    await bucket.upload(file.path, {
      public: true,
      metadata: { contentType: `image/${req.extension}` },
    }, (err, file) => {
      if (err) {
        console.log(err);
      }
    });

    await Product.create({
      username,
      name,
      price,
      description,
      url_image,
      category,
    });

    return res.json({ message: 'Product created' });
  },

  async index(req, res) {
    const { username, category } = req.params;
    const store = await Store.findOne({ where: { username } });

    const { name, description, url_image } = store;

    if (!category || category === 'all') {
      const products = await Product.findAll({ where: { username } });

      ordenate(products);

      return res.json({
        store: {
          username,
          name,
          description,
          url_image,
        },
        products,
      });
    }

    const products = await Product.findAll({ where: { username, category } });

    ordenate(products);

    return res.json({
      store: {
        username,
        name,
        description,
        url_image,
      },
      products,
    });
  },

};
