
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('products', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING(20),
      allowNull: false,
      references: {
        model: 'stores',
        key: 'username',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(120),
      defaultValue: 'Produto sem descrição',
    },
    url_image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    aspect_ratio: {
      type: Sequelize.DOUBLE,
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

  down: (queryInterface) => queryInterface.dropTable('products'),
};
