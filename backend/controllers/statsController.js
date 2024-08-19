
const db = require('../db'); // Adjust the path to your database module

// Function to get statistics
exports.getStats = async (req, res) => {
  try {
    // Example implementation
    const totalUsersResult = await db('users').count('id as count');
    const totalUsers = totalUsersResult[0].count;

    const circleVotedResult = await db('users').count('* as count').where('isVotedcircle', true);
    const circleVotedCount = circleVotedResult[0].count;

    const partyVotedResult = await db('users').count('* as count').where('isVotedparty', true);
    const partyVotedCount = partyVotedResult[0].count;

    const circleVotedPercentage = totalUsers > 0 ? (circleVotedCount / totalUsers) * 100 : 0;
    const partyVotedPercentage = totalUsers > 0 ? (partyVotedCount / totalUsers) * 100 : 0;

    res.json({
      circleVotedCount,
      circleVotedPercentage: circleVotedPercentage.toFixed(2),
      partyVotedCount,
      partyVotedPercentage: partyVotedPercentage.toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// exports.getRecentElections = async (req, res) => {
//   try {
//     // Fetch recent elections from your database
//     const recentElections = await db('elections_time')
//       .orderBy('start_date', 'desc')  // Ordering by start_date
//       .limit(10);
//     res.json(recentElections);
//   } catch (error) {
//     console.error('Error fetching recent elections:', error);
//     res.status(500).json({ message: 'Error fetching recent elections' });
//   }
// };

// exports.addElection = async (req, res) => {
//   const { startDate, endDate } = req.body;
//   try {
//     await db('elections_time').insert({
//       start_date: new Date(startDate),
//       end_date: new Date(endDate)
//     });
//     res.status(201).json({ message: 'Election time added successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add election time' });
//   }
// };

// // Get the upcoming election
// exports.getUpcomingElection = async (req, res) => {
//   try {
//     const [election] = await db('elections_time')
//       .where('start_date', '>', new Date())
//       .orderBy('start_date', 'asc')
//       .limit(1);

//     if (election) {
//       res.json(election);
//     } else {
//       res.status(404).json({ message: 'No upcoming elections' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch election time' });
//   }
// };

