

// // const knex = require('../db'); // Adjust the path as needed

// // // Fetch requests
// // const getRequests = async (req, res) => {
// //   try {
// //     const localRequests = await knex('local_election_requests')
// //       .where('is_deleted', false) // Filter out soft deleted records
// //       .select('*');

// //     const partyRequests = await knex('party_election_requests')
// //       .where('is_deleted', false) // Filter out soft deleted records
// //       .select('*');

// //     res.json({ localRequests, partyRequests });
// //   } catch (error) {
// //     console.error('Error fetching requests:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };

// // const approveRequest = async (req, res) => {
// //   const { type, id } = req.params;

// //   if (!['local', 'party'].includes(type)) {
// //     return res.status(400).json({ error: 'Invalid request type' });
// //   }

// //   try {
// //     const request = await knex(`${type}_election_requests`)
// //       .where({ id, is_deleted: false })
// //       .first();

// //     if (!request) {
// //       return res.status(404).json({ error: 'Request not found' });
// //     }

// //     if (type === 'party') {
// //       await knex('party_lists').insert({
// //         name: request.party_list_name,
// //         slogan: request.party_list_slogan || 'Default Slogan',
// //         election_id: request.election_id || 1,
// //       });
// //     } else if (type === 'local') {
// //       let members;
// //       try {
// //         members = typeof request.members === 'string' ? JSON.parse(request.members) : request.members;
// //       } catch (error) {
// //         return res.status(400).json({ error: 'Invalid member data' });
// //       }

// //       // Validate the members data
// //       const validMembers = members.every(member => 
// //         member && typeof member.city === 'string' &&
// //         typeof member.circle === 'string' &&
// //         typeof member.name === 'string'
// //       );

// //       if (!validMembers) {
// //         return res.status(400).json({ error: 'Invalid member data format' });
// //       }

// //       // Insert candidates into the 'candidates' table
// //       await Promise.all(
// //         members.map(member => 
// //           knex('candidates').insert({
// //             name: member.name || null,
// //             city: member.city || null,
// //             circle: member.circle || null,
// //             list: request.local_list_name || null,
// //             circle_list: request.circle_list || 'Default Circle List',
// //             candidate_votes: 0,
// //             list_votes: 0,
// //             gender: member.gender || 'unknown', // Ensure you handle gender if needed
// //             type: member.type || 'unknown', // Ensure you handle type if needed
// //             isActivate: true,
// //             candidate_national_id: member.national_id // Ensure this field matches your data
// //           })
// //         )
// //       );
// //     }

// //     // Mark the request as approved
// //     await knex(`${type}_election_requests`).where({ id }).update({ is_deleted: true });

// //     res.status(200).json({ message: 'Request approved' });
// //   } catch (error) {
// //     console.error('Error approving request:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };


// // // Reject request
// // const rejectRequest = async (req, res) => {
// //   const { type, id } = req.params;

// //   if (!['local', 'party'].includes(type)) {
// //     return res.status(400).json({ error: 'Invalid request type' });
// //   }

// //   try {
// //     const request = await knex(`${type}_election_requests`).where({ id, is_deleted: false }).first();
// //     if (!request) return res.status(404).json({ error: 'Request not found' });

// //     await knex(`${type}_election_requests`).where({ id }).update({ is_deleted: true });

// //     res.status(200).json({ message: 'Request rejected' });
// //   } catch (error) {
// //     console.error('Error rejecting request:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };

// // module.exports = {
// //   getRequests,
// //   approveRequest,
// //   rejectRequest,
// // };


// // const knex = require('../db'); // Adjust the path as needed

// // // Fetch requests
// // const getRequests = async (req, res) => {
// //   try {
// //     const localRequests = await knex('local_election_requests')
// //       .where('is_deleted', false) // Filter out soft deleted records
// //       .select('*');

// //     const partyRequests = await knex('party_election_requests')
// //       .where('is_deleted', false) // Filter out soft deleted records
// //       .select('*');

// //     res.json({ localRequests, partyRequests });
// //   } catch (error) {
// //     console.error('Error fetching requests:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };

// // // Approve request
// // const approveRequest = async (req, res) => {
// //   const { type, id } = req.params;

// //   if (!['local', 'party'].includes(type)) {
// //     return res.status(400).json({ error: 'Invalid request type' });
// //   }

// //   try {
// //     const request = await knex(`${type}_election_requests`)
// //       .where({ id, is_deleted: false })
// //       .first();

// //     if (!request) {
// //       return res.status(404).json({ error: 'Request not found' });
// //     }

// //     if (type === 'party') {
// //       await knex('party_lists').insert({
// //         name: request.party_list_name,
// //         slogan: request.party_list_slogan || 'Default Slogan',
// //         election_id: request.election_id || 1,
// //       });
// //     } else if (type === 'local') {
// //       let members;
// //       try {
// //         members = typeof request.members === 'string' ? JSON.parse(request.members) : request.members;
// //       } catch (error) {
// //         return res.status(400).json({ error: 'Invalid member data' });
// //       }

// //       // Validate the members data
// //       if (!Array.isArray(members)) {
// //         return res.status(400).json({ error: 'Members data is not an array' });
// //       }

// //       const validMembers = members.every(member => 
// //         member && typeof member.city === 'string' &&
// //         typeof member.circle === 'string' &&
// //         typeof member.name === 'string'
// //       );

// //       if (!validMembers) {
// //         return res.status(400).json({ error: 'Invalid member data format' });
// //       }

// //       // Insert candidates into the 'candidates' table
// //       await Promise.all(
// //         members.map(member => 
// //           knex('candidates').insert({
// //             name: member.name || null,
// //             city: member.city || null,
// //             circle: member.circle || null,
// //             list: request.local_list_name || null,
// //             circle_list: request.circle_list || 'Default Circle List',
// //             candidate_votes: 0,
// //             list_votes: 0,
// //             gender: member.gender || 'unknown', // Ensure you handle gender if needed
// //             type: member.type || 'unknown', // Ensure you handle type if needed
// //             isActivate: true,
// //             candidate_national_id: member.national_id // Ensure this field matches your data
// //           })
// //         )
// //       );
// //     }

// //     // Mark the request as approved
// //     await knex(`${type}_election_requests`).where({ id }).update({ is_deleted: true });

// //     res.status(200).json({ message: 'Request approved' });
// //   } catch (error) {
// //     console.error('Error approving request:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };

// // // Reject request
// // const rejectRequest = async (req, res) => {
// //   const { type, id } = req.params;

// //   if (!['local', 'party'].includes(type)) {
// //     return res.status(400).json({ error: 'Invalid request type' });
// //   }

// //   try {
// //     const request = await knex(`${type}_election_requests`)
// //       .where({ id, is_deleted: false })
// //       .first();

// //     if (!request) {
// //       return res.status(404).json({ error: 'Request not found' });
// //     }

// //     await knex(`${type}_election_requests`).where({ id }).update({ is_deleted: true });

// //     res.status(200).json({ message: 'Request rejected' });
// //   } catch (error) {
// //     console.error('Error rejecting request:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };

// // module.exports = {
// //   getRequests,
// //   approveRequest,
// //   rejectRequest,
// // };


// const knex = require('../db'); // Adjust the path as needed

// // Fetch requests
// const getRequests = async (req, res) => {
//   try {
//     const localRequests = await knex('local_election_requests')
//       .where('is_deleted', false) // Filter out soft deleted records
//       .select('*');

//     const partyRequests = await knex('party_election_requests')
//       .where('is_deleted', false) // Filter out soft deleted records
//       .select('*');

//     res.json({ localRequests, partyRequests });
//   } catch (error) {
//     console.error('Error fetching requests:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Approve request
// const approveRequest = async (req, res) => {
//   const { type, id } = req.params;

//   if (!['local', 'party'].includes(type)) {
//     return res.status(400).json({ error: 'Invalid request type' });
//   }

//   try {
//     const request = await knex(`${type}_election_requests`)
//       .where({ id, is_deleted: false })
//       .first();

//     if (!request) {
//       return res.status(404).json({ error: 'Request not found' });
//     }

//     if (type === 'party') {
//       await knex('party_lists').insert({
//         name: request.party_list_name,
//         slogan: request.party_list_slogan || 'Default Slogan',
//         election_id: request.election_id || 1,
//       });
//     } else if (type === 'local') {
//       let members = request.members;

//       // Parse members if it's a JSON string
//       if (typeof members === 'string') {
//         try {
//           members = JSON.parse(members);
//         } catch (error) {
//           return res.status(400).json({ error: 'Invalid member data format' });
//         }
//       }

//       // Validate the members data
//       if (!Array.isArray(members)) {
//         return res.status(400).json({ error: 'Members data is not an array' });
//       }

//       const validMembers = members.every(member => 
//         member && typeof member.city === 'string' &&
//         typeof member.circle === 'string' &&
//         typeof member.name === 'string'
//       );

//       if (!validMembers) {
//         return res.status(400).json({ error: 'Invalid member data format' });
//       }

//       // Insert candidates into the 'candidates' table
//       await Promise.all(
//         members.map(member => 
//           knex('candidates').insert({
//             name: member.name || null,
//             city: member.city || null,
//             circle: member.circle || null,
//             list: request.local_list_name || null,
//             circle_list: request.circle_list || 'Default Circle List',
//             candidate_votes: 0,
//             list_votes: 0,
//             gender: member.gender || 'unknown', // Default gender
//             type: member.type || 'unknown', // Default type
//             isActivate: true,
//             candidate_national_id: member.national_id // Ensure this field matches your data
//           })
//         )
//       );
//     }

//     // Mark the request as approved
//     await knex(`${type}_election_requests`).where({ id }).update({ is_deleted: true });

//     res.status(200).json({ message: 'Request approved' });
//   } catch (error) {
//     console.error('Error approving request:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Reject request
// const rejectRequest = async (req, res) => {
//   const { type, id } = req.params;

//   if (!['local', 'party'].includes(type)) {
//     return res.status(400).json({ error: 'Invalid request type' });
//   }

//   try {
//     const request = await knex(`${type}_election_requests`)
//       .where({ id, is_deleted: false })
//       .first();

//     if (!request) {
//       return res.status(404).json({ error: 'Request not found' });
//     }

//     await knex(`${type}_election_requests`).where({ id }).update({ is_deleted: true });

//     res.status(200).json({ message: 'Request rejected' });
//   } catch (error) {
//     console.error('Error rejecting request:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   getRequests,
//   approveRequest,
//   rejectRequest,
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
// const approveRequest = async (req, res) => {
//   const { type, id } = req.params;

//   if (!['local', 'party'].includes(type)) {
//     return res.status(400).json({ error: 'Invalid request type' });
//   }

//   try {
//     const request = await knex(`${type}_election_requests`)
//       .where({ id, is_deleted: false })
//       .first();

//     if (!request) {
//       return res.status(404).json({ error: 'Request not found' });
//     }

//     if (type === 'party') {
//       await knex('party_lists').insert({
//         name: request.party_list_name,
//         slogan: request.party_list_slogan || 'Default Slogan',
//         election_id: request.election_id || 1,
//       });
//     } else if (type === 'local') {
//       let members = request.members;

//       // Ensure members is a valid array
//       if (typeof members === 'string') {
//         try {
//           members = JSON.parse(members);
//         } catch (error) {
//           return res.status(400).json({ error: 'Invalid member data format' });
//         }
//       }

//       // Validate the members data
//       if (!Array.isArray(members)) {
//         return res.status(400).json({ error: 'Members data is not an array' });
//       }

//       const validMembers = members.every(member => 
//         member && typeof member.city === 'string' &&
//         typeof member.circle === 'string' &&
//         typeof member.name === 'string'
//       );

//       if (!validMembers) {
//         return res.status(400).json({ error: 'Invalid member data format' });
//       }

//       // Insert candidates into the 'candidates' table
//       await Promise.all(
//         members.map(member => 
//           knex('candidates').insert({
//             name: member.name || null,
//             city: member.city || null,
//             circle: member.circle || null,
//             list: request.local_list_name || null,
//             circle_list: request.circle_list || 'Default Circle List',
//             candidate_votes: 0,
//             list_votes: 0,
//             gender: member.gender || 'unknown', // Default gender
//             type: member.type || 'unknown', // Default type
//             isActivate: true,
//             candidate_national_id: member.national_id // Ensure this field matches your data
//           })
//         )
//       );
//     }

//     // Mark the request as approved
//     await knex(`${type}_election_requests`).where({ id }).update({ is_deleted: true });

//     res.status(200).json({ message: 'Request approved' });
//   } catch (error) {
//     console.error('Error approving request:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const approveRequest = async (req, res) => {
  const { type, id } = req.params;

  if (!['local', 'party'].includes(type)) {
    return res.status(400).json({ error: 'Invalid request type' });
  }

  try {
    const request = await knex(`${type}_election_requests`)
      .where({ id, is_deleted: false })
      .first();

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (type === 'party') {
      await knex('party_lists').insert({
        name: request.party_list_name,
        slogan: request.party_list_slogan || 'Default Slogan',
        election_id: request.election_id || 1,
      });
    } else if (type === 'local') {
      let members;
      try {
        // Check if the 'members' field exists and is of type string before parsing
        if (request.members) {
          members = typeof request.members === 'string' ? JSON.parse(request.members) : request.members;
        } else {
          return res.status(400).json({ error: 'Members data is missing' });
        }
      } catch (error) {
        return res.status(400).json({ error: 'Invalid member data' });
      }

      // Log members data for debugging
      console.log('Members data:', members);

      // Validate the members data
      if (!Array.isArray(members)) {
        return res.status(400).json({ error: 'Members data is not an array' });
      }

      const validMembers = members.every(member => 
        member &&
        typeof member.city === 'string' &&
        typeof member.circle === 'string' &&
        typeof member.name === 'string'
      );

      if (!validMembers) {
        return res.status(400).json({ error: 'Invalid member data format' });
      }

      // Insert candidates into the 'candidates' table
      await Promise.all(
        members.map(member => 
          knex('candidates').insert({
            name: member.name || 'Unknown Name',  // Provide default values if needed
            city: member.city || 'Unknown City',  // Provide default values if needed
            circle: member.circle || 'Unknown Circle',  // Provide default values if needed
            list: request.local_list_name || 'Unknown List',
            circle_list: request.circle_list || 'Default Circle List',
            candidate_votes: 0,
            list_votes: 0,
            gender: member.gender || 'unknown',
            type: member.type || 'unknown',
            isActivate: true,
            candidate_national_id: member.national_id || 'Unknown ID'  // Ensure this field matches your data
          })
        )
      );
    }

    // Mark the request as approved
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

  if (!['local', 'party'].includes(type)) {
    return res.status(400).json({ error: 'Invalid request type' });
  }

  try {
    const request = await knex(`${type}_election_requests`)
      .where({ id, is_deleted: false })
      .first();

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

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
