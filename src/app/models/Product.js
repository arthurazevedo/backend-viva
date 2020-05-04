const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING(50),
      price: Sequelize.DOUBLE,
      description: Sequelize.STRING(120),
      url_image: Sequelize.STRING,
      aspect_ratio: Sequelize.DOUBLE,
      category: Sequelize.STRING(20),
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Store, { foreignKey: 'username' });
  }
}

module.exports = Product;
