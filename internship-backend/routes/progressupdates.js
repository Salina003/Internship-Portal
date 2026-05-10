const express = require('express');
const { ProgressUpdate } = require('../models');
const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const updates = await ProgressUpdate.findAll();
    res.json(updates);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async(req, res) => {
  try {
    const update = await ProgressUpdate.findByPk(req.params.id);
    update ? res.json(update) : res.status(404).json({ error: 'Progress update not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async(req, res) => {
  try {
    const update = await ProgressUpdate.create(req.body);
    res.status(201).json(update);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async(req, res) => {
  try {
    const [updated] = await ProgressUpdate.update(req.body, { where: { id: req.params.id } });
    if(updated) {
      const updatedUpdate = await ProgressUpdate.findByPk(req.params.id);
      res.json(updatedUpdate);
    } else res.status(404).json({ error: 'Progress update not found' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async(req, res) => {
  try {
    const deleted = await ProgressUpdate.destroy({ where: { id: req.params.id } });
    deleted ? res.json({ message: 'Progress update deleted' }) : res.status(404).json({ error: 'Progress update not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;