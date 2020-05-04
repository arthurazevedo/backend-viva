const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const auth = req.headers.authorization;
    const [, token] = auth.split(' ');

    const loginWith = req.query.by;

    const socialUser = (loginWith === 'facebook')
      ? await axios.get(`https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=${token}`)
      : await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);


    const { email, name } = socialUser.data;
    const { id } = socialUser.data;

    const url_image = (loginWith === 'facebook')
      ? `http://graph.facebook.com/${id}/picture?type=large`
      : socialUser.data.picture;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.json({
        user: {
          name: userExist.name,
          url_image: userExist.url_image,
          shop_pass: userExist.shop_pass,
        },
        token: jwt.sign({
          id: userExist.id,
        },
        process.env.JWT_SECRET),
      });
    }

    const user = await User.create({
      email,
      name,
      url_image,
    });

    return res.json({
      user: {
        name: user.name,
        url_image: user.url_image,
        shop_pass: user.shop_pass,
      },
      token: jwt.sign({
        id: user.id,
      },
      process.env.JWT_SECRET),
    });
  },

  async update(req, res) {
    const { email } = req.body;
    const id = req.userId;

    const userExist = await User.findByPk(id);
    if (!userExist) return res.status(404).json({ error: 'User not found' });

    if (userExist.email === email) {
      const { shop_pass } = req.body;
      await User.update({ shop_pass }, { where: { id } });
      const user = await User.findByPk(id);

      return res.json({
        email: user.email,
        name: user.name,
        shop_pass: user.shop_pass,
      });
    }

    return res.status(401).json({ error: 'Email does not match' });
  },
};
