const knex = require('../db');

// Get all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await knex('candidates').select('*');
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidates', error: err });
  }
};

// Add a new candidate
exports.addCandidate = async (req, res) => {
  const { name, list_id, details } = req.body;
  try {
    const [newCandidate] = await knex('candidates').insert({ name, list_id, details }).returning('*');
    res.json(newCandidate);
  } catch (err) {
    res.status(500).json({ message: 'Error adding candidate', error: err });
  }
};

// Update a candidate
exports.updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { name, details } = req.body;
  try {
    const [updatedCandidate] = await knex('candidates').where({ id }).update({ name, details }).returning('*');
    res.json(updatedCandidate);
  } catch (err) {
    res.status(500).json({ message: 'Error updating candidate', error: err });
  }
};

// Delete a candidate
exports.deleteCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    await knex('candidates').where({ id }).del();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting candidate', error: err });
  }
};
