const StoreLikes = require('../models/StoreLikes');
const Store = require('../models/Store');

module.exports = {
  async store(req, res) {
    const { username } = req.params;

    const store = await Store.findOne({ where: { username } });

    if (!store) return res.status(401).json({ error: 'Store not found' });

    await StoreLikes.create({
      id_user: req.userId,
      username,
    });

    return res.json({ message: 'Liked' });
  },

  async index(req, res) {
    const likes = await StoreLikes.findAll({ where: { id_user: req.userId } });

    const getStores = async () => {
      const stores = [];
      for (let i = 0; i < likes.length; i++) {
        const store = await Store.findOne({ where: { username: likes[i].username } });

        stores.push({
          username: store.username,
          name: store.name,
          url_image: store.url_image,
        });
        console.log(stores);
      }

      return stores;
    };

    const storesLiked = await getStores();

    return res.json(storesLiked);
  },
};
