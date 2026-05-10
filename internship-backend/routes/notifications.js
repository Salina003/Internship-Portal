const express = require('express');
const { Notification } = require('../models');
const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async(req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    notification ? res.json(notification) : res.status(404).json({ error: 'Notification not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async(req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async(req, res) => {
  try {
    const [updated] = await Notification.update(req.body, { where: { id: req.params.id } });
    if(updated) {
      const updatedNotification = await Notification.findByPk(req.params.id);
      res.json(updatedNotification);
    } else res.status(404).json({ error: 'Notification not found' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async(req, res) => {
  try {
    const deleted = await Notification.destroy({ where: { id: req.params.id } });
    deleted ? res.json({ message: 'Notification deleted' }) : res.status(404).json({ error: 'Notification not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;