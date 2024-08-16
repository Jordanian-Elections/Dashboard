// const knex = require('../db'); // Adjust the path as needed

// // Fetch requests
// const getRequests = async (req, res) => {
//   try {
//     const localRequests = await knex('local_election_requests').select('*');
//     const partyRequests = await knex('party_election_requests').select('*');
//     res.json({ localRequests, partyRequests });
//   } catch (error) {
//     console.error('Error fetching requests:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Approve request
// const approveRequest = async (req, res) => {
//   const { type, id } = req.params;

//   // Validate the type parameter
//   if (!['local', 'party'].includes(type)) {
//     return res.status(400).json({ error: 'Invalid request type' });
//   }

//   try {
//     const request = await knex(`${type}_election_requests`).where({ id }).first();
//     if (!request) return res.status(404).json({ error: 'Request not found' });

//     await knex(`${type}_lists`).insert(request);
//     await knex(`${type}_election_requests`).where({ id }).del();
//     res.status(200).json({ message: 'Request approved' });
//   } catch (error) {
//     console.error('Error approving request:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Reject request
// const rejectRequest = async (req, res) => {
//   const { type, id } = req.params;

//   // Validate the type parameter
//   if (!['local', 'party'].includes(type)) {
//     return res.status(400).json({ error: 'Invalid request type' });
//   }

//   try {
//     const request = await knex(`${type}_election_requests`).where({ id }).first();
//     if (!request) return res.status(404).json({ error: 'Request not found' });

//     await knex(`${type}_election_requests`).where({ id }).del();
//     res.status(200).json({ message: 'Request rejected' });
//   } catch (error) {
//     console.error('Error rejecting request:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   getRequests,
//   approveRequest,
//   rejectRequest
// };


const knex = require('../db'); // Adjust the path as needed

// Fetch requests
const getRequests = async (req, res) => {
  try {
    const localRequests = await knex('local_election_requests')
      .where('is_deleted', false) // Filter out soft deleted records
      .select('*');

    const partyRequests = await knex('party_election_requests')
      .where('is_deleted', false) // Filter out soft deleted records
      .select('*');

    res.json({ localRequests, partyRequests });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Approve request
const approveRequest = async (req, res) => {
  const { type, id } = req.params;

  // Validate the type parameter
  if (!['local', 'party'].includes(type)) {
    return res.status(400).json({ error: 'Invalid request type' });
  }

  try {
    const request = await knex(`${type}_election_requests`).where({ id, is_deleted: false }).first();
    if (!request) return res.status(404).json({ error: 'Request not found' });

    if (type === 'party') {
      // Insert into party_lists
      await knex('party_lists').insert({
        name: request.party_list_name,
        slogan: 'Default Slogan', // Add appropriate fields or modify as necessary
        election_id: 1, // Replace with actual election_id
      });
    } else if (type === 'local') {
      // Insert into local_lists
      const members = JSON.parse(request.members);
      await Promise.all(
        members.map(member =>
          knex('local_lists').insert({
            city: member.city,
            circle: member.circle,
            list: request.local_list_name,
            name: member.name,
            votes: 0, // Initialize votes
          })
        )
      );
    }

    // Soft delete the request
    await knex(`${type}_election_requests`).where({ id }).update({ is_deleted: true });

    res.status(200).json({ message: 'Request approved' });
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Reject request
const rejectRequest = async (req, res) => {
  const { type, id } = req.params;

  // Validate the type parameter
  if (!['local', 'party'].includes(type)) {
    return res.status(400).json({ error: 'Invalid request type' });
  }

  try {
    const request = await knex(`${type}_election_requests`).where({ id, is_deleted: false }).first();
    if (!request) return res.status(404).json({ error: 'Request not found' });

    // Soft delete the request
    await knex(`${type}_election_requests`).where({ id }).update({ is_deleted: true });

    res.status(200).json({ message: 'Request rejected' });
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getRequests,
  approveRequest,
  rejectRequest,
};
