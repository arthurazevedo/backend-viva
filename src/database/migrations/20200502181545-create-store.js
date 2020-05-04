module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('stores', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      unique: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    description: {
      type: Sequelize.STRING(200),
    },
    address: {
      type: Sequelize.STRING,
    },
    whatsapp: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    url_image: {
      type: Sequelize.STRING,
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

  down: (queryInterface) => queryInterface.dropTable('stores'),
};
