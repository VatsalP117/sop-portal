const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        users_id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        users_name: DataTypes.STRING,
        users_type: DataTypes.STRING,
        users_designation: DataTypes.STRING,
        users_department: DataTypes.INTEGER,
        users_organization: DataTypes.STRING,
        users_contact_no: DataTypes.STRING(20),
        users_email_id: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        users_status: {
          type: DataTypes.INTEGER,
          comment: "Active or Inactive",
        },
        users_join_date: DataTypes.DATEONLY,
        users_leaving_date: DataTypes.DATEONLY,
        users_total_citations: DataTypes.INTEGER,
        users_h_index: DataTypes.INTEGER,
        users_i10_index: DataTypes.INTEGER,
        users_eigenfactor: DataTypes.INTEGER,
        users_h_index_norm: DataTypes.INTEGER,
        users_impact_factor: DataTypes.INTEGER,
        users_author_keywords: {
          type: DataTypes.INTEGER,
          comment: "Check",
        },
        users_course: {
          type: DataTypes.STRING,
          comment:
            "If students in users_designation FD, HD or PHD should be mentioned",
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users_details",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Project, { foreignKey: "facultyId", as: "projects" });

    // Adding the missing belongsToMany association
    this.belongsToMany(models.Project, {
      through: "ProjectStudent",
      foreignKey: "users_id",
      otherKey: "project_id",
      as: "students", // Alias to refer to projects where the user is a student
    });
  }
}

module.exports = User;
