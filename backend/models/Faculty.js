const { DataTypes, Model } = require("sequelize");

class Faculty extends Model {
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
        description: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: "Faculty",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Project, { foreignKey: "facultyId", as: "projects" });
  }
}

module.exports = Faculty;
