require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const auth = req.headers.authorization;
    const [, token] = auth.split(' ');

    const loginWith = req.query.by;

    const socialUser = (loginWith === 'facebook')
      ? await axios.get(`https://graph.facebook.com/me?access_token=${token}`)
      : await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);


    const { email, name } = socialUser.data;
    const url_image = socialUser.data.picture;

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
};
