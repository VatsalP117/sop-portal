const { DataTypes, Model } = require("sequelize");

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        cgpa: {
          type: DataTypes.STRING,
        },
        resume: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "Student",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Project, {
      through: "ProjectStudent",
      foreignKey: "studentId",
      otherKey: "projectId",
      as: "projects",
    });
  }
}

module.exports = Student;
