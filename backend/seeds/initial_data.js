exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ads').del()
    .then(() => knex('votes').del())
    .then(() => knex('candidates').del())
    .then(() => knex('local_list_candidate').del())
    .then(() => knex('local_lists').del())
    .then(() => knex('party_lists').del())
    .then(() => knex('elections').del())
    .then(() => knex('users').del())
    .then(() => knex('admins').del())
    .then(() => {
      // Inserts seed entries
      return knex('admins').insert([
        { id: 1, name: 'Admin One', email: 'admin1@example.com', password: 'password123', is_active: true },
        { id: 2, name: 'Admin Two', email: 'admin2@example.com', password: 'password123', is_active: true }
      ]);
    })
    .then(() => {
      return knex('users').insert([
        { national_id: 123456789, email: 'user1@example.com', name: 'User One', city: 'City A', circle: 'Circle A', isVotedcircle: false, isVotedparty: false, password: 'password123', role: 'voter', isApproved: true, Whitepaper: null, type: 'مسلم', gender: 'male', isActivate: true },
        { national_id: 987654321, email: 'user2@example.com', name: 'User Two', city: 'City B', circle: 'Circle B', isVotedcircle: false, isVotedparty: false, password: 'password123', role: 'candidate', isApproved: false, Whitepaper: 1, type: 'مسيحي', gender: 'female', isActivate: true }
      ]);
    })
    .then(() => {
      return knex('elections').insert([
        { id: 1, name: 'Local Election 2024', start_date: '2024-01-01', end_date: '2024-01-10', type: 'local', status: 'upcoming' },
        { id: 2, name: 'Party Election 2024', start_date: '2024-02-01', end_date: '2024-02-10', type: 'party', status: 'upcoming' }
      ]);
    })
    .then(() => {
      return knex('party_lists').insert([
        { id: 1, name: 'Party List A', slogan: 'For a Better Tomorrow', election_id: 2 },
        { id: 2, name: 'Party List B', slogan: 'Unity and Progress', election_id: 2 }
      ]);
    })
    .then(() => {
      return knex('local_lists').insert([
        { id: 1, city: 'City A', circle: 'Circle A', list: 'List A1', name: 'Candidate A1', votes: 0 },
        { id: 2, city: 'City B', circle: 'Circle B', list: 'List B1', name: 'Candidate B1', votes: 0 }
      ]);
    })
    .then(() => {
      return knex('local_list_candidate').insert([
        { id: 1, candidate_national_id: 123456789, city: 'City A', party: 'Party A', slogan: 'Vote for Change', list_votes: 0, is_nominated: true, candidate_votes: 0, type: 'مسلم' },
        { id: 2, candidate_national_id: 987654321, city: 'City B', party: 'Party B', slogan: 'Progress for All', list_votes: 0, is_nominated: true, candidate_votes: 0, type: 'مسيحي' }
      ]);
    })
    .then(() => {
      return knex('candidates').insert([
        { id: 1, name: 'Candidate A1', city: 'City A', list: 'List A1', circle: 'Circle A', circle_list: 'Party List A', candidate_votes: 0, gender: 'male', type: 'مسلم', candidate_national_id: 123456789 },
        { id: 2, name: 'Candidate B1', city: 'City B', list: 'List B1', circle: 'Circle B', circle_list: 'Party List B', candidate_votes: 0, gender: 'female', type: 'مسيحي', candidate_national_id: 987654321 }
      ]);
    })
    .then(() => {
      return knex('votes').insert([
        { id: 1, voter_id: 123456789, election_id: 1, party_list_id: null, local_list_id: 1, vote_date: new Date() },
        { id: 2, voter_id: 987654321, election_id: 1, party_list_id: 1, local_list_id: null, vote_date: new Date() }
      ]);
    })
    .then(() => {
      return knex('ads').insert([
        { id: 1, candidate_id: 1, content: 'Ad content for Candidate A1', price: 100.00, start_date: '2024-01-01', end_date: '2024-01-10', status: 'active' },
        { id: 2, candidate_id: 2, content: 'Ad content for Candidate B1', price: 150.00, start_date: '2024-02-01', end_date: '2024-02-10', status: 'active' }
      ]);
    });
};
