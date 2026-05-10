const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

// Import route files
const userRouter = require('./routes/users');
const projectRouter = require('./routes/projects');
const applicationRouter = require('./routes/applications');
const teamRouter = require('./routes/teams');
const timelineRouter = require('./routes/timelines');
const progressUpdateRouter = require('./routes/progressupdates');
const feedbackRouter = require('./routes/feedbacks');
const gradeRouter = require('./routes/grades');
const certificateRouter = require('./routes/certificates');
const notificationRouter = require('./routes/notifications');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Mount routers
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/teams', teamRouter);
app.use('/api/timelines', timelineRouter);
app.use('/api/progressupdates', progressUpdateRouter);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api/grades', gradeRouter);
app.use('/api/certificates', certificateRouter);
app.use('/api/notifications', notificationRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server and connect to DB
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();

module.exports = app;