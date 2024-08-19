
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

exports.getDebates = async (req, res) => {
  try {
    const debates = await db('debates')
      .leftJoin('users as candidate1', 'debates.candidate1_id', 'candidate1.national_id')
      .leftJoin('users as candidate2', 'debates.candidate2_id', 'candidate2.national_id')
      .select(
        'debates.id',
        'debates.name',
        'debates.start_time',
        'debates.end_time',
        'debates.code',
        'debates.isApproved',
        'candidate1.name as candidate1_name',
        'candidate2.name as candidate2_name'
      );

    res.json(debates);
  } catch (error) {
    console.error('Error fetching debates:', error);
    res.status(500).json({ message: 'Error fetching debates', error: error.message });
  }
};
exports.updateDebateStatus = async (req, res) => {
  const { id } = req.params;
  const { isApproved } = req.body;

  try {
    await db('debates').where({ id }).update({ isApproved });
    res.json({ message: 'Debate status updated successfully' });
  } catch (error) {
    console.error('Error updating debate status:', error);
    res.status(500).json({ message: 'Error updating debate status', error: error.message });
  }
};


// Update the code of a debate
exports.updateDebateCodes = async (req, res) => {
  const { id } = req.params;
  const { code } = req.body;

  // Validate input
  if (!id || isNaN(id) || !code || typeof code !== 'string') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const result = await db('debates').where({ id }).update({ code });
    
    if (result === 0) {
      return res.status(404).json({ message: 'Debate not found' });
    }

    res.status(200).json({ message: 'Debate code updated successfully' });
  } catch (error) {
    console.error('Error updating debate code:', error);
    res.status(500).json({ message: 'Error updating debate code', error: error.message });
  }
};
