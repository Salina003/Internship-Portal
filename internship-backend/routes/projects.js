const express = require('express');
const { Project, User } = require('../models');
const router = express.Router();

// Get all projects with mentor info
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({ include: [{ model: User, as: 'mentor' }] });
    res.json(projects);
  } catch (err) {
    console.error('Get all projects error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get project by id with mentor info
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, { include: [{ model: User, as: 'mentor' }] });
    if (project) res.json(project);
    else res.status(404).json({ error: 'Project not found' });
  } catch (err) {
    console.error('Get project by id error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create new project with detailed error logging
router.post('/', async (req, res) => {
  console.log('Creating project with data:', req.body);
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error('Project creation error:', err);
    res.status(400).json({ error: err.message, details: err.errors });
  }
});

// Update project by id with detailed error logging
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Project.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedProject = await Project.findByPk(req.params.id);
      res.json(updatedProject);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    console.error('Project update error:', err);
    res.status(400).json({ error: err.message, details: err.errors });
  }
});

// Delete project by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: 'Project deleted' });
    else res.status(404).json({ error: 'Project not found' });
  } catch (err) {
    console.error('Project delete error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;