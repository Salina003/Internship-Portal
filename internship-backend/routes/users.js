const express = require('express');
const { User } = require('../models');
const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async(req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    user ? res.json(user) : res.status(404).json({ error: 'User not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async(req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async(req, res) => {
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });
    if(updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else res.status(404).json({ error: 'User not found' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async(req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    deleted ? res.json({ message: 'User deleted' }) : res.status(404).json({ error: 'User not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;