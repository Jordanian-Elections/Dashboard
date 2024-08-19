

// const db = require('../db'); // Ensure this is your Knex instance

// // Get all election times
// exports.getElectionTimes = async (req, res) => {
//   try {
//     const electionTimes = await db('elections_time').select('*');
//     res.json(electionTimes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// // Add or update an election time
// exports.addOrUpdateElectionTime = async (req, res) => {
//   const { id, start_date, end_date } = req.body;

//   try {
//     if (id) {
//       // Update existing election time
//       const [updatedElectionTime] = await db('elections_time')
//         .where({ id })
//         .update({ start_date, end_date })
//         .returning('*');
//       res.json(updatedElectionTime);
//     } else {
//       // Add new election time
//       const [newElectionTime] = await db('elections_time')
//         .insert({ start_date, end_date })
//         .returning('*');
//       res.json(newElectionTime);
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// // Delete an election time
// exports.deleteElectionTime = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await db('elections_time').where({ id }).del();
//     res.send('Election time deleted');
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
