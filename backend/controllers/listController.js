const knex = require('../db');

// Get all lists
exports.getAllLists = async (req, res) => {
  try {
    const lists = await knex('lists').select('*');
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lists', error: err });
  }
};

// Add a new list
exports.addList = async (req, res) => {
  const { name, description } = req.body;
  try {
    const [newList] = await knex('lists').insert({ name, description }).returning('*');
    res.json(newList);
  } catch (err) {
    res.status(500).json({ message: 'Error adding list', error: err });
  }
};

// Update a list
exports.updateList = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const [updatedList] = await knex('lists').where({ id }).update({ name, description }).returning('*');
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ message: 'Error updating list', error: err });
  }
};

// Toggle list active status
exports.toggleListActive = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const [updatedList] = await knex('lists').where({ id }).update({ active }).returning('*');
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ message: 'Error toggling list status', error: err });
  }
};

// Delete a list
exports.deleteList = async (req, res) => {
  const { id } = req.params;
  try {
    await knex('lists').where({ id }).del();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting list', error: err });
  }
};
