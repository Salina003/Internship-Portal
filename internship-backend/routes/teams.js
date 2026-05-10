const express = require('express');
const router = express.Router();
const { Team, User } = require('../models');

// Get all teams with their users and project included
router.get('/', async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [
        { model: User, as: 'users' },
        'project'
      ]
    });
    res.json(teams);
  } catch (err) {
    console.error('Error fetching teams:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get team by id including users and project
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id, {
      include: [
        { model: User, as: 'users' },
        'project'
      ]
    });
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  } catch (err) {
    console.error('Error fetching team by id:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create team with associated users
router.post('/', async (req, res) => {
  try {
    const { name, description, projectId, userIds } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Team name is required.' });
    }

    // Ensure projectId is either null or number
    const projId = projectId ? Number(projectId) : null;

    const team = await Team.create({ name, description, projectId: projId });

    if (Array.isArray(userIds) && userIds.length > 0) {
      await team.setUsers(userIds.map(id => Number(id)));
    }

    const createdTeam = await Team.findByPk(team.id, {
      include: [{ model: User, as: 'users' }, 'project']
    });

    res.status(201).json(createdTeam);
  } catch (err) {
    console.error('Error creating team:', err);
    res.status(400).json({ error: err.message });
  }
});

// Update team and associated users
router.put('/:id', async (req, res) => {
  try {
    const { name, description, projectId, userIds } = req.body;
    const team = await Team.findByPk(req.params.id);

    if (!team) return res.status(404).json({ error: 'Team not found' });

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Team name is required.' });
    }

    const projId = projectId ? Number(projectId) : null;

    await team.update({ name, description, projectId: projId });

    if (Array.isArray(userIds)) {
      await team.setUsers(userIds.map(id => Number(id)));
    }

    const updatedTeam = await Team.findByPk(team.id, {
      include: [{ model: User, as: 'users' }, 'project']
    });

    res.json(updatedTeam);
  } catch (err) {
    console.error('Error updating team:', err);
    res.status(400).json({ error: err.message });
  }
});

// Delete team by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await Team.destroy({ where: { id: req.params.id } });
    if (deletedCount) {
      res.json({ message: 'Team deleted' });
    } else {
      res.status(404).json({ error: 'Team not found' });
    }
  } catch (err) {
    console.error('Error deleting team:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;