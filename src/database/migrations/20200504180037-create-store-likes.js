
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('store_likes', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    username: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'stores',
        key: 'username',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    liked: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('store_likes'),
};
