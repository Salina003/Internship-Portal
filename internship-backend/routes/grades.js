const express = require('express');
const { Grade } = require('../models');
const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const grades = await Grade.findAll();
    res.json(grades);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async(req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    grade ? res.json(grade) : res.status(404).json({ error: 'Grade not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async(req, res) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json(grade);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async(req, res) => {
  try {
    const [updated] = await Grade.update(req.body, { where: { id: req.params.id } });
    if(updated) {
      const updatedGrade = await Grade.findByPk(req.params.id);
      res.json(updatedGrade);
    } else res.status(404).json({ error: 'Grade not found' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async(req, res) => {
  try {
    const deleted = await Grade.destroy({ where: { id: req.params.id } });
    deleted ? res.json({ message: 'Grade deleted' }) : res.status(404).json({ error: 'Grade not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;