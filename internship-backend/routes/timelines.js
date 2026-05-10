const express = require('express');
const { Timeline } = require('../models');
const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const timelines = await Timeline.findAll();
    res.json(timelines);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async(req, res) => {
  try {
    const timeline = await Timeline.findByPk(req.params.id);
    timeline ? res.json(timeline) : res.status(404).json({ error: 'Timeline not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async(req, res) => {
  try {
    const timeline = await Timeline.create(req.body);
    res.status(201).json(timeline);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async(req, res) => {
  try {
    const [updated] = await Timeline.update(req.body, { where: { id: req.params.id } });
    if(updated) {
      const updatedTimeline = await Timeline.findByPk(req.params.id);
      res.json(updatedTimeline);
    } else res.status(404).json({ error: 'Timeline not found' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async(req, res) => {
  try {
    const deleted = await Timeline.destroy({ where: { id: req.params.id } });
    deleted ? res.json({ message: 'Timeline deleted' }) : res.status(404).json({ error: 'Timeline not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;