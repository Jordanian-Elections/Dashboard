const knex = require('knex')(require('../knexfile').development);

async function getCirclesListsCandidates(req, res) {
  try {
    const result = await knex('local_lists')
      .select('circle')
      .distinct()
      .orderBy('circle')
      .then(async circles => {
        const circlesWithLists = [];

        for (const circle of circles) {
          const circleName = circle.circle;

          // Fetch lists for the current circle
          const lists = await knex('local_lists')
            .select('list')
            .where('circle', circleName)
            .distinct()
            .orderBy('list');

          const listsWithCandidates = [];

          for (const list of lists) {
            const listName = list.list;

            // Fetch candidates for the current list
            const candidates = await knex('candidates')
              .select('name')
              .where('circle', circleName)
              .andWhere('list', listName)
              .orderBy('name');

            listsWithCandidates.push({
              list: listName,
              candidates
            });
          }

          circlesWithLists.push({
            circle: circleName,
            lists: listsWithCandidates
          });
        }

        return circlesWithLists;
      });

    res.json(result);
  } catch (error) {
    console.error('Error fetching circles, lists, and candidates:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}

module.exports = {
  getCirclesListsCandidates
};
