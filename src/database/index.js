require('dotenv').config();
const Sequelize = require('sequelize');

const User = require('../app/models/User');

const configDB = require('../config/database');

const models = [User];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDB);

    models.map((model) => model.init(this.connection));
  }
}

module.exports = new DataBase();
