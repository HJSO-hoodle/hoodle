const Sequelize = require("sequelize");
const initModels = require("./init-models");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize.Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.models = initModels(sequelize);

module.exports = db;

// https://dc-choi.tistory.com/37
// sequelize-auto -o "./models" -d hoodle -h localhost -u root -p 3306 -x -e mysql