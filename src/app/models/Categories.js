const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Categories extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING(20),
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Store, { foreignKey: 'username' });
  }
}

module.exports = Categories;
