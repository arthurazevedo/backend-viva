const Store = require('../models/Store');
const Product = require('../models/Product');
const StoreLikes = require('../models/StoreLikes');

const { ordenate } = require('../utils/ordenate');

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
      const postStore = [];

      for (let i = 0; i < storesLiked.length; i++) {
        const post = await Product.findAll({
          where: { username: storesLiked[i] },
        });

        postStore.push(post);
      }
      const posts = [];

      for (let i = 0; i < postStore.length; i++) {
        for (let j = 0; j < postStore[i].length; j++) {
          posts.push(postStore[i][j]);
        }
      }

      return posts;
    };

    let feed = await getPosts();

    ordenate(feed);

    // paginate

    const { page } = req.query;

    if (page < 1) page = 1;

    const limit = 10 * page;
    const skip = 10 * (page - 1);
    const total_products = feed.length;
    const total_pages = (total_products / 10) | 0;

    feed = feed.slice(skip, limit);

    return res.json({
      page,
      total_pages,
      total_products,
      posts: feed,
    });
  },
};
