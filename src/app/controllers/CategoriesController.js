const Store = require('../models/Store');
const Categories = require('../models/Categories');

module.exports = {
  async store(req, res) {
    const { name } = req.body;

    const store = await Store.findOne({ where: { id_user: req.userId } });
    const { username } = store;

    await Categories.create({
      username,
      name,
    });

    return res.json({ message: 'Category created' });
  },

  async index(req, res) {
    const store = await Store.findOne({ where: { id_user: req.userId } });

    const categories = await Categories.findAll({
      where:
      { username: store.username },
    });

    return res.json(categories);
  },


};
