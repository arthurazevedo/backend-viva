const { fn } = require('sequelize');
const Store = require('../models/Store');

module.exports = {
  async index(req, res) {
    const stores = await Store.findAll({
      order: [fn('RANDOM')],
      limit: 10,
    });


    return res.json(stores);
  },
};
