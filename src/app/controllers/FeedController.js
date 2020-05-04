const Store = require('../models/Store');
const Product = require('../models/Product');
const StoreLikes = require('../models/StoreLikes');

module.exports = {
  async index(req, res) {
    const likes = await StoreLikes.findAll({ where: { id_user: req.userId } });

    const getStores = async () => {
      const stores = [];
      for (let i = 0; i < likes.length; i++) {
        const store = await Store.findOne({
          where: { username: likes[i].username },
        });

        stores.push(store.username);
      }

      return stores;
    };

    const storesLiked = await getStores();
    const getPosts = async () => {
      const posts = [];

      for (let i = 0; i < storesLiked.length; i++) {
        const post = await Product.findAll({
          where: { username: storesLiked[i] },
        });

        posts.push(post);
      }

      return posts;
    };

    const feed = await getPosts();

    return res.json(feed);
  },
};
