// controllers/circlesController.js
const db = require('../db'); // Update this path if necessary

// exports.getCircles = async (req, res) => {
//   try {
//     const circles = await db('circles').select('*');
//     res.json(circles);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching circles', error });
//   }
// };


exports.getCircles = async (req, res) => {
    try {
      const circles = await db('circles').select('*');
      res.json(circles);
    } catch (error) {
      console.error('Error fetching circles:', error); // Log detailed error information
      res.status(500).json({ message: 'Error fetching circles', error: error.message });
    }
  };
exports.createCircle = async (req, res) => {
  const { name, description, boundaries } = req.body;
  try {
    const [id] = await db('circles').insert({ name, description, boundaries });
    res.status(201).json({ id, name, description, boundaries });
  } catch (error) {
    res.status(400).json({ message: 'Error creating circle', error });
  }
};

exports.updateCircle = async (req, res) => {
  const { id } = req.params;
  const { name, description, boundaries } = req.body;
  try {
    const count = await db('circles').where({ id }).update({ name, description, boundaries });
    if (count) {
      res.json({ id, name, description, boundaries });
    } else {
      res.status(404).json({ message: 'Circle not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating circle', error });
  }
};

exports.deleteCircle = async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db('circles').where({ id }).del();
    if (count) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Circle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting circle', error });
  }
};
