const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Store extends Model {
  static init(sequelize) {
    super.init({
      username: Sequelize.STRING(20),
      name: Sequelize.STRING,
      description: Sequelize.STRING(200),
      address: Sequelize.STRING,
      whatsapp: Sequelize.STRING,
      email: Sequelize.STRING,
      url_image: Sequelize.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user' });
  }
}

module.exports = Store;
