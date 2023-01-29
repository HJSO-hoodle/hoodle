var DataTypes = require("sequelize").DataTypes;
var _normal_mode = require("./normal_mode");
var _story_mode = require("./story_mode");
var _user = require("./user");
var _user_check = require("./user_check");

function initModels(sequelize) {
  var normal_mode = _normal_mode(sequelize, DataTypes);
  var story_mode = _story_mode(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_check = _user_check(sequelize, DataTypes);


  return {
    normal_mode,
    story_mode,
    user,
    user_check,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
