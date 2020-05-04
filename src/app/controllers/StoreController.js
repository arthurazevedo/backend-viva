const Store = require('../models/Store');
const User = require('../models/User');
const bucket = require('../../config/firebase');


module.exports = {
  async store(req, res) {
    const { userId } = req;

    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.shop_pass) return res.status(403).json({ error: 'User doesnt have a shop pass' });

    const {
      username, name, address, whatsapp, email,
    } = req.body;

    let { description } = req.body;

    const { file } = req;

    const bucketName = process.env.BUCKET;
    const url_image = `http://storage.googleapis.com/${bucketName}/${file.filename}`;

    if (file) {
      await bucket.upload(file.path, {
        public: true,
        metadata: { contentType: `image/${req.extension}` },
      }, (err, file) => {
        if (err) {
          console.log(err);
        }
      });
    }

    if (!description) description = null;

    await Store.create({
      username,
      name,
      id_user: userId,
      description,
      address,
      whatsapp,
      email,
      url_image,
    });

    const store = await Store.findOne({ where: { username } });

    return res.json(store);
  },

  async index(req, res) {
    const id_user = req.userId;
    const store = await Store.findOne({ where: { id_user } });

    const {
      username, name, description, url_image,
    } = store;

    return res.json({
      username,
      name,
      description,
      url_image,
    });
  },
};
