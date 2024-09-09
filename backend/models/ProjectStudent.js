const { DataTypes, Model } = require("sequelize");

class ProjectStudent extends Model {
  static init(sequelize) {
    super.init(
      {
        project_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "sopprojects",
            key: "project_id",
          },
        },
        users_id: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: "users_details",
            key: "users_id",
          },
        },
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
        tableName: "project_students",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Project, {
      foreignKey: "project_id",
    });
    this.belongsTo(models.User, { foreignKey: "users_id" });
  }
}

module.exports = ProjectStudent;
