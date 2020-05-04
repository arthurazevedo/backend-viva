
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('categories', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      references: {
        model: 'stores',
        key: 'username',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    name: {
      type: Sequelize.STRING(20),
      primaryKey: true,
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

  down: (queryInterface) => queryInterface.dropTable('categories'),
};
