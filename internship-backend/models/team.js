'use strict';

module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    'Team',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Name cannot be empty'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Projects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    },
    {
      tableName: 'Teams',
      timestamps: true
    }
  );

  Team.associate = models => {
    Team.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });

    Team.belongsToMany(models.User, {
      through: 'UserTeams',
      as: 'users',
      foreignKey: 'teamId',
      otherKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return Team;
};