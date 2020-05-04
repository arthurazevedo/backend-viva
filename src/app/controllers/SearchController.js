const Store = require('../models/Store');

module.exports = {
  async index(req, res) {
    const { username } = req.params;

    const store = await Store.findOne({ where: { username } });

    return res.json(store);
  },
};
