// // controllers/adsController.js
// const knex = require('../db');

// // Get all ads
// const getAds = async (req, res) => {
//   try {
//     const ads = await knex('ads')
//       .join('candidates', 'ads.candidate_id', 'candidates.id')
//       .select('ads.*', 'candidates.name as candidate_name');

//     res.status(200).json(ads);
//   } catch (error) {
//     console.error('Error fetching ads:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Update ad status
// const updateAdStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   // Validate the status
//   const validStatuses = ['pending', 'approved', 'rejected', 'active', 'completed'];
//   if (!validStatuses.includes(status)) {
//     return res.status(400).json({ error: 'Invalid status' });
//   }

//   try {
//     const updated = await knex('ads')
//       .where({ id })
//       .update({ status, updated_at: knex.fn.now() });

//     if (updated) {
//       res.status(200).json({ message: 'Ad status updated successfully' });
//     } else {
//       res.status(404).json({ error: 'Ad not found' });
//     }
//   } catch (error) {
//     console.error('Error updating ad status:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = { getAds, updateAdStatus };


// controllers/adsController.js
const knex = require('../db');

// Get all ads
const getAds = async (req, res) => {
  try {
    const ads = await knex('ads')
      .join('candidates', 'ads.candidate_id', 'candidates.id')
      .select('ads.id', 'ads.content', 'ads.price', 'ads.start_date', 'ads.end_date', 'ads.status', 'ads.created_at', 'ads.updated_at', 'candidates.name as candidate_name');

    res.status(200).json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update ad status
const updateAdStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate the status
  const validStatuses = [ 'approved', 'rejected'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid or missing status' });
  }

  try {
    const updated = await knex('ads')
      .where({ id })
      .update({ status, updated_at: knex.fn.now() });

    if (updated) {
      res.status(200).json({ message: 'Ad status updated successfully' });
    } else {
      res.status(404).json({ error: 'Ad not found' });
    }
  } catch (error) {
    console.error('Error updating ad status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAds, updateAdStatus };
