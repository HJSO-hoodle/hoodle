const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('normal_mode', {
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
    word_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    today: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'normal_mode',
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
