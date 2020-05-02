const Store = require('../models/Store');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { userId } = req;

    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.shop_pass) return res.status(403).json({ error: 'User doesnt have a shop pass' });

    const {
      username, name, city, address, whatsapp, email,
    } = req.body;

    let { description, url_image } = req.body;

    if (!description) description = null;

    if (!url_image) url_image = null;

    await Store.create({
      username,
      name,
      id_user: userId,
      description,
      city,
      address,
      whatsapp,
      email,
      url_image,
    });

    const store = await Store.findOne({ where: { username } });

    return res.json(store);
  },
};
