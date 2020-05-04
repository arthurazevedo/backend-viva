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
};
