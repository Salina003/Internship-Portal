const express = require('express');
const { Application } = require('../models');
const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const applications = await Application.findAll();
    res.json(applications);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async(req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    application ? res.json(application) : res.status(404).json({ error: 'Application not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async(req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async(req, res) => {
  try {
    const [updated] = await Application.update(req.body, { where: { id: req.params.id } });
    if(updated) {
      const updatedApplication = await Application.findByPk(req.params.id);
      res.json(updatedApplication);
    } else res.status(404).json({ error: 'Application not found' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async(req, res) => {
  try {
    const deleted = await Application.destroy({ where: { id: req.params.id } });
    deleted ? res.json({ message: 'Application deleted' }) : res.status(404).json({ error: 'Application not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;