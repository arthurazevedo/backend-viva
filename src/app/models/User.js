const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      email: Sequelize.STRING,
      name: Sequelize.STRING,
      url_image: Sequelize.STRING,
      shop_pass: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });
  }
}

module.exports = User;
