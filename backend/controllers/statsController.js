

const db = require('../db'); // Adjust the path to your database module

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
