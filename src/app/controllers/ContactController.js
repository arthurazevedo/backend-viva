const Store = require('../models/Store');

module.exports = {
  async index(req, res) {
    const { username } = req.params;

    const store = await Store.findOne({ where: { username } });

    const { whatsapp, email } = store;

    return res.json({
      whatsapp,
      email,
    });
  },
};
