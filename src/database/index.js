require('dotenv').config();
const Sequelize = require('sequelize');

const User = require('../app/models/User');
const Store = require('../app/models/Store');
const Product = require('../app/models/Product');
const Categories = require('../app/models/Categories');

const configDB = require('../config/database');

const models = [User, Store, Product, Categories];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDB);

    models.map((model) => model.init(this.connection));
    models.map((model) => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new DataBase();
