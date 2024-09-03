const { DataTypes, Model } = require("sequelize");

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        project_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
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
        facultyId: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: "users_details",
            key: "users_id",
          },
        },
      },
      {
        sequelize,
        modelName: "Project",
        tableName: "projects",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "facultyId", as: "faculty" });
    this.belongsToMany(models.User, {
      through: "ProjectStudent",
      foreignKey: "project_id",
      otherKey: "users_id",
      as: "students",
    });
  }
}

module.exports = Project;
