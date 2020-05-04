module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('products', 'category', {
    type: Sequelize.STRING(20),
  }),

  down: (queryInterface) => queryInterface.removeColumn('products', 'category'),
};
