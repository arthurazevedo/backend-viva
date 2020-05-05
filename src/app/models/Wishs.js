const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Wishs extends Model {
  static init(sequelize) {
    super.init({
      date: Sequelize.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
    this.belongsTo(models.Product, { foreignKey: 'id_product', as: 'product' });
    this.belongsTo(models.Store, { foreignKey: 'username' });
  }
}

module.exports = Wishs;
