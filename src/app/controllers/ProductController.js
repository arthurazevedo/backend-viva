const Product = require('../models/Product');
const Store = require('../models/Store');
const bucket = require('../../config/firebase');

module.exports = {
  async store(req, res) {
    const {
      name, price, description, category,
    } = req.body;
    const { username } = await Store.findByPk(req.userId);
    const { file } = req;

    const bucketName = process.env.BUCKET;

    const url_image = `http://storage.googleapis.com/${bucketName}/${file.name}`;

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
    const { category } = req.body;
    const { username } = req.params;
    const store = await Store.findOne({ where: { username } });

    const { name, description, url_image } = store;

    if (!category || category === 'all') {
      const products = await Product.findAll({ where: { username } });
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
