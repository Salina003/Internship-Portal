'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const config = require(__dirname + '/../config/config.js')['development']; // Adjust based on your env

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  profile: DataTypes.JSONB
});

const Project = sequelize.define('Project', {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE
});

const Team = sequelize.define('Team', {
  name: DataTypes.STRING,
  description: DataTypes.TEXT
});

const Application = sequelize.define('Application', {
  status: DataTypes.STRING
});

const Timeline = sequelize.define('Timeline', {
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE
});

const ProgressUpdate = sequelize.define('ProgressUpdate', {
  content: DataTypes.TEXT,
  date: DataTypes.DATE
});

const Feedback = sequelize.define('Feedback', {
  comment: DataTypes.TEXT,
  rating: DataTypes.INTEGER
});

const Grade = sequelize.define('Grade', {
  score: DataTypes.INTEGER,
  grade: DataTypes.STRING
});

const Certificate = sequelize.define('Certificate', {
  title: DataTypes.STRING,
  issuedDate: DataTypes.DATE
});

const Notification = sequelize.define('Notification', {
  message: DataTypes.STRING,
  read: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// Associations

// User - Project (mentor)
User.hasMany(Project, { foreignKey: 'mentorId' });
Project.belongsTo(User, { as: 'mentor', foreignKey: 'mentorId' });

// Project - Application
Project.hasMany(Application, { foreignKey: 'projectId' });
Application.belongsTo(Project, { foreignKey: 'projectId' });

// User - Application (applicant)
User.hasMany(Application, { foreignKey: 'applicantId' });
Application.belongsTo(User, { foreignKey: 'applicantId' });

// Team - Application
Team.hasMany(Application, { foreignKey: 'teamId' });
Application.belongsTo(Team, { foreignKey: 'teamId' });

// Application - ProgressUpdate
Application.hasMany(ProgressUpdate, { foreignKey: 'applicationId' });
ProgressUpdate.belongsTo(Application, { foreignKey: 'applicationId' });

// ProgressUpdate - Feedback
ProgressUpdate.hasMany(Feedback, { foreignKey: 'progressUpdateId' });
Feedback.belongsTo(ProgressUpdate, { foreignKey: 'progressUpdateId' });

// Application - Grade (1:1)
Application.hasOne(Grade, { foreignKey: 'applicationId' });
Grade.belongsTo(Application, { foreignKey: 'applicationId' });

// User - Certificate
User.hasMany(Certificate, { foreignKey: 'userId' });
Certificate.belongsTo(User, { foreignKey: 'userId' });

// User - Notification
User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

// User - Team (Many to Many using UserTeams)
User.belongsToMany(Team, { through: 'UserTeams', foreignKey: 'userId', as: 'teams' });
Team.belongsToMany(User, { through: 'UserTeams', foreignKey: 'teamId', as: 'users' });

Team.belongsTo(Project, {
  foreignKey: 'projectId',
  as: 'project'
});

Project.hasMany(Team, {
  foreignKey: 'projectId',
  as: 'teams'
});

module.exports = {
  sequelize,
  Sequelize,
  User,
  Project,
  Application,
  Team,
  Timeline,
  ProgressUpdate,
  Feedback,
  Grade,
  Certificate,
  Notification
};