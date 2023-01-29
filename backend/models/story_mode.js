const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('story_mode', {
    num: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    word: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    chapter: {
      type: DataTypes.CHAR(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'story_mode',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "num" },
        ]
      },
    ]
  });
};
