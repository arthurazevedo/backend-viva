const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class StoreLikes extends Model {
  static init(sequelize) {
    super.init({
      liked: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user' });
    this.belongsTo(models.Store, { foreignKey: 'username' });
  }
}

module.exports = StoreLikes;
