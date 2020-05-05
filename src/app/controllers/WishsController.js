const Wish = require('../models/Wishs');
const Store = require('../models/Store');
const Product = require('../models/Product');
const User = require('../models/User');

module.exports = {

  async store(req, res) {
    const { username, id_product } = req.params;

    const { date } = req.body;

    await Wish.create({
      id_user: req.userId,
      id_product,
      username,
      date,
    });

    return res.json({ message: 'Wish created' });
  },

  async index(req, res) {
    const store = await Store.findOne({ where: { id_user: req.userId } });

    const { username } = store;

    const wishs = await Wish.findAll({
      where: { username },
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'price', 'description'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    return res.json(wishs);
  },

};
