

// // const knex = require('knex')(require('../knexfile').development);

// // async function getCirclesListsCandidates(req, res) {
// //   try {
// //     const result = await knex('local_lists')
// //       .select('circle')
// //       .distinct()
// //       .orderBy('circle');

// //     const circlesWithLists = [];

// //     for (const circle of result) {
// //       const circleName = circle.circle;

// //       const lists = await knex('local_lists')
// //         .select('list')
// //         .where('circle', circleName)
// //         .distinct()
// //         .orderBy('list');

// //       const listsWithCandidates = [];

// //       for (const list of lists) {
// //         const listName = list.list;

// //         const candidates = await knex('candidates')
// //           .select('name', 'isActivate') // Ensure you select 'isActivate'
// //           .where('circle', circleName)
// //           .andWhere('list', listName)
// //           .orderBy('name');

// //         listsWithCandidates.push({
// //           list: listName,
// //           candidates
// //         });
// //       }

// //       circlesWithLists.push({
// //         circle: circleName,
// //         lists: listsWithCandidates
// //       });
// //     }

// //     res.json(circlesWithLists);
// //   } catch (error) {
// //     console.error('Error fetching circles, lists, and candidates:', error);
// //     res.status(500).json({ error: 'An error occurred while fetching data' });
// //   }
// // }

// // async function addListWithCandidates(req, res) {
// //   const { circle, list, candidates } = req.body;

// //   if (!circle || !list || !Array.isArray(candidates)) {
// //     return res.status(400).json({ error: 'Invalid input data' });
// //   }

// //   try {
// //     await knex('local_lists').insert({ circle, list });

// //     for (const candidate of candidates) {
// //       await knex('candidates').insert({
// //         circle,
// //         list,
// //         name: candidate,
// //         isActivate: true // Default value for 'isActivate'
// //       });
// //     }

// //     res.status(201).json({ message: 'List and candidates added successfully' });
// //   } catch (error) {
// //     console.error('Error adding list and candidates:', error);
// //     res.status(500).json({ error: 'An error occurred while adding data' });
// //   }
// // }

// // module.exports = {
// //   getCirclesListsCandidates,
// //   addListWithCandidates
// // };

// // const knex = require('../db');

// // // Get all circles with lists and candidates
// // exports.getCirclesWithListsAndCandidates = async (req, res) => {
// //   try {
// //     const circles = await knex('candidates')
// //       .select('circle')
// //       .distinct()
// //       .orderBy('circle');

// //     const data = [];

// //     for (const circle of circles) {
// //       const lists = await knex('candidates')
// //         .select('list')
// //         .where('circle', circle.circle)
// //         .distinct()
// //         .orderBy('list');

// //       const listsWithCandidates = await Promise.all(
// //         lists.map(async list => {
// //           const candidates = await knex('candidates')
// //             .select('name', 'isActivate')
// //             .where({ circle: circle.circle, list: list.list });

// //           return {
// //             list: list.list,
// //             candidates
// //           };
// //         })
// //       );

// //       data.push({
// //         circle: circle.circle,
// //         lists: listsWithCandidates
// //       });
// //     }

// //     res.json(data);
// //   } catch (error) {
// //     console.error('Error fetching circles with lists and candidates:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };

// // // Toggle candidate activation status
// // exports.toggleCandidateStatus = async (req, res) => {
// //   const { circle, list, name, isActivate } = req.body;

// //   try {
// //     const [updatedCandidate] = await knex('candidates')
// //       .where({ circle, list, name })
// //       .update({ isActivate: !isActivate })
// //       .returning('*');

// //     if (updatedCandidate) {
// //       res.json(updatedCandidate);
// //     } else {
// //       res.status(404).json({ error: 'Candidate not found' });
// //     }
// //   } catch (error) {
// //     console.error('Error updating candidate status:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// //   exports.toggleCandidateStatus = async (req, res) => {
// //     const { circle, list, name, isActivate } = req.body;
  
// //     try {
// //       const [updatedCandidate] = await knex('candidates')
// //         .where({ circle, list, name })
// //         .update({ isActivate: !isActivate })
// //         .returning('*');
  
// //       if (updatedCandidate) {
// //         res.json(updatedCandidate);
// //       } else {
// //         res.status(404).json({ error: 'Candidate not found' });
// //       }
// //     } catch (error) {
// //       console.error('Error updating candidate status:', error);
// //       res.status(500).json({ error: 'Internal Server Error' });
// //     }
// //   };
// // };



// const knex = require('../db');

// // Get all circles with lists and candidates
// exports.getCirclesWithListsAndCandidates = async (req, res) => {
//   try {
//     const circles = await knex('candidates')
//       .select('circle')
//       .distinct()
//       .orderBy('circle');

//     const data = [];

//     for (const circle of circles) {
//       const lists = await knex('candidates')
//         .select('list')
//         .where('circle', circle.circle)
//         .distinct()
//         .orderBy('list');

//       const listsWithCandidates = await Promise.all(
//         lists.map(async list => {
//           const candidates = await knex('candidates')
//             .select('*') // Return all details for each candidate
//             .where({ circle: circle.circle, list: list.list });

//           return {
//             list: list.list,
//             candidates
//           };
//         })
//       );

//       data.push({
//         circle: circle.circle,
//         lists: listsWithCandidates
//       });
//     }

//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching circles with lists and candidates:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const knex = require('../db');

// Get all circles with lists and candidates
exports.getCirclesWithListsAndCandidates = async (req, res) => {
  try {
    // Fetch all distinct circles
    const circles = await knex('candidates')
      .select('circle')
      .distinct()
      .orderBy('circle');

    const data = [];

    // Iterate over each circle to fetch lists and candidates
    for (const circle of circles) {
      // Fetch all distinct lists within the current circle
      const lists = await knex('candidates')
        .select('list')
        .where('circle', circle.circle)
        .distinct()
        .orderBy('list');

      // Fetch candidates for each list within the current circle
      const listsWithCandidates = await Promise.all(
        lists.map(async list => {
          const candidates = await knex('candidates')
            .select('*') // Return all details for each candidate
            .where({ circle: circle.circle, list: list.list });

          return {
            list: list.list,
            candidates
          };
        })
      );

      data.push({
        circle: circle.circle,
        lists: listsWithCandidates
      });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching circles with lists and candidates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Toggle candidate activation status
// exports.toggleCandidateStatus = async (req, res) => {
//   const { candidate_national_id } = req.params;

//   try {
//     // Retrieve the candidate's current status
//     const [currentCandidate] = await knex('candidates')
//       .select('isActivate')
//       .where({ candidate_national_id });

//     if (!currentCandidate) {
//       return res.status(404).json({ error: 'Candidate not found' });
//     }

//     // Toggle the status
//     const [updatedCandidate] = await knex('candidates')
//       .where({ candidate_national_id })
//       .update({ isActivate: !currentCandidate.isActivate })
//       .returning('*');

//     res.json(updatedCandidate);
//   } catch (error) {
//     console.error('Error updating candidate status:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// Toggle candidate activation status
exports.toggleCandidateStatus = async (req, res) => {
  const { candidate_national_id } = req.params;

  try {
    // Retrieve the candidate's current status
    const [currentCandidate] = await knex('candidates')
      .select('isActivate')
      .where({ candidate_national_id });

    if (!currentCandidate) {
      return res.status(404).json({ error: 'المرشح غير موجود' });
    }

    // Toggle the status
    const [updatedCandidate] = await knex('candidates')
      .where({ candidate_national_id })
      .update({ isActivate: !currentCandidate.isActivate })
      .returning('*');

    if (!updatedCandidate) {
      return res.status(500).json({ error: 'فشل في تحديث حالة المرشح' });
    }

    res.json(updatedCandidate);
  } catch (error) {
    console.error('Error updating candidate status:', error);
    res.status(500).json({ error: 'فشل في تحديث حالة المرشح. يرجى المحاولة لاحقًا.' });
  }
};
