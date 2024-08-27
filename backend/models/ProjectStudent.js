const { DataTypes, Model } = require("sequelize");

class ProjectStudent extends Model {
  static init(sequelize) {
    super.init(
      {
        status: {
          type: DataTypes.STRING,
        },
        remarks: {
          type: DataTypes.TEXT,
        },
        category: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "ProjectStudent",
      }
    );
  }
}

module.exports = ProjectStudent;
