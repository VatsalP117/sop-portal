const { DataTypes, Model } = require("sequelize");

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        status: {
          type: DataTypes.STRING,
          defaultValue: "pending",
        },
        tags: {
          type: DataTypes.STRING,
        },
        date: {
          type: DataTypes.STRING,
        },
        gpsrn: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "Project",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Faculty, { foreignKey: "facultyId", as: "faculty" });
    this.belongsToMany(models.Student, {
      through: "ProjectStudent",
      foreignKey: "projectId",
      otherKey: "studentId",
      as: "students",
    });
  }
}

module.exports = Project;
