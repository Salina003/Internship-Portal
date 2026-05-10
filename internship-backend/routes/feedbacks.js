const express = require('express');
const { Feedback } = require('../models');
const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.json(feedbacks);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async(req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    feedback ? res.json(feedback) : res.status(404).json({ error: 'Feedback not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async(req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async(req, res) => {
  try {
    const [updated] = await Feedback.update(req.body, { where: { id: req.params.id } });
    if(updated) {
      const updatedFeedback = await Feedback.findByPk(req.params.id);
      res.json(updatedFeedback);
    } else res.status(404).json({ error: 'Feedback not found' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async(req, res) => {
  try {
    const deleted = await Feedback.destroy({ where: { id: req.params.id } });
    deleted ? res.json({ message: 'Feedback deleted' }) : res.status(404).json({ error: 'Feedback not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;