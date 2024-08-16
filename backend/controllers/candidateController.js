

const knex = require('knex')(require('../knexfile').development);

async function toggleCandidateStatus(req, res) {
  const { circle, list, name, isActivate } = req.body;

  try {
    // Validate request body
    if (!circle || !list || !name || typeof isActivate !== 'boolean') {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Get the current status from the database
    const currentStatus = await knex('candidates')
      .where({ circle, list, name })
      .select('isActivate')
      .first();

    if (!currentStatus) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // Check if the current status matches the request
    if (currentStatus.isActivate === isActivate) {
      return res.status(200).json({ isActivate: currentStatus.isActivate });
    }

    // Update the candidate status
    await knex('candidates')
      .where({ circle, list, name })
      .update({ isActivate: !currentStatus.isActivate });

    // Fetch the updated status
    const updatedStatus = await knex('candidates')
      .where({ circle, list, name })
      .select('isActivate')
      .first();

    res.status(200).json({ isActivate: updatedStatus.isActivate });
  } catch (error) {
    console.error('Error updating candidate status:', error);
    res.status(500).json({ error: 'An error occurred while updating status' });
  }
}

module.exports = {
  toggleCandidateStatus,
};
