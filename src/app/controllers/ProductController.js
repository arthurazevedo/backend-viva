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
};
