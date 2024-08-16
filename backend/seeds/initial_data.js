// const bcrypt = require('bcryptjs');

// exports.seed = async function(knex) {
//   // Deletes ALL existing entries
//   await knex('ads').del();
//   await knex('votes').del();
//   await knex('payments').del();
//   await knex('whitepaper').del();
//   await knex('candidates').del();
//   await knex('local_list_candidates').del();
//   await knex('local_lists').del();
//   await knex('party_lists').del();
//   await knex('elections').del();
//   await knex('users').del();
//   await knex('admins').del();
//   await knex('electoral_districts').del();

//   // Inserts seed entries
//   await knex('electoral_districts').insert([
//     { id: 1, name: 'عمان' },
//     { id: 2, name: 'الزرقاء' },
//     { id: 3, name: 'إربد' },
//     { id: 4, name: 'المفرق' },
//     { id: 5, name: 'الكرك' },
//     { id: 6, name: 'الطفيلة' },
//     { id: 7, name: 'الرمثا' }
//   ]);

//   await knex('admins').insert([
//     {
//       name: 'Areej Omar Abumuhfouz',
//       email: 'Areej@gmail.com',
//       password: bcrypt.hashSync('Areej123', 10), // Hashed password
//       role: 'super',
//       is_active: true,
//     },
//     {
//       name: 'Othman Daoud',
//       email: 'Othman@gmail.com',
//       password: bcrypt.hashSync('Othman123', 10), // Hashed password
//       role: 'admin',
//       is_active: true,
//     },
//     {
//       name: 'Tasneem Abuarqop',
//       email: 'Tasneem@gmail.com',
//       password: bcrypt.hashSync('Tasneem123', 10), // Hashed password
//       role: 'admin',
//       is_active: true,
//     },
//     {
//       name: 'AbedAlmajeed',
//       email: 'AbedAlmajeed@gmail.com',
//       password: bcrypt.hashSync('AbedAlmajeed123', 10), // Hashed password
//       role: 'admin',
//       is_active: true,
//     },
//     {
//       name: 'Omar',
//       email: 'Omar@gmail.com',
//       password: bcrypt.hashSync('Omar123', 10), // Hashed password
//       role: 'admin',
//       is_active: true,
//     }
//   ]);

//   await knex('users').insert([
//     { 
//       id: 1, 
//       national_id: 123456789, 
//       email: 'mohammed.jordan@example.com', 
//       name: 'محمد الاردني', 
//       city: 'عمان', 
//       circle: 'الدوار الأول', 
//       isVotedcircle: false, 
//       isVotedparty: false, 
//       password: bcrypt.hashSync('hashedpassword', 10), 
//       role: 'voter', 
//       isApproved: true, 
//       Whitepaper: 0, 
//       type: 'مسلم', 
//       gender: 'male', 
//       isActivate: true, 
//       otp: null, 
//       electoral_district_id: 1 
//     },
//     { 
//       id: 2, 
//       national_id: 987654321, 
//       email: 'sarah.jordan@example.com', 
//       name: 'سارة الأردنية', 
//       city: 'إربد', 
//       circle: 'المدينة', 
//       isVotedcircle: true, 
//       isVotedparty: false, 
//       password: bcrypt.hashSync('hashedpassword', 10), 
//       role: 'candidate', 
//       isApproved: true, 
//       Whitepaper: 1, 
//       type: 'مسيحي', 
//       gender: 'female', 
//       isActivate: true, 
//       otp: null, 
//       electoral_district_id: 3 
//     }
//   ]);

//   await knex('elections').insert([
//     { 
//       id: 1, 
//       name: 'انتخابات 2024', 
//       start_date: '2024-11-01', 
//       end_date: '2024-11-30', 
//       type: 'local', 
//       status: 'upcoming' 
//     },
//     { 
//       id: 2, 
//       name: 'انتخابات الحزب 2024', 
//       start_date: '2024-12-01', 
//       end_date: '2024-12-31', 
//       type: 'party', 
//       status: 'upcoming' 
//     }
//   ]);

//   await knex('party_lists').insert([
//     { id: 1, name: 'قائمة الحزب الوطني', slogan: 'الأفضل للأردن', election_id: 2 },
//     { id: 2, name: 'قائمة التغيير', slogan: 'نحو التقدم', election_id: 2 }
//   ]);

//   await knex('local_lists').insert([
//     { id: 1, city: 'عمان', circle: 'الدوار الأول', list: 'قائمة عمان', name: 'أحمد الشاب', votes: 150 },
//     { id: 2, city: 'إربد', circle: 'المدينة', list: 'قائمة إربد', name: 'سلمى الكردي', votes: 200 }
//   ]);

//   await knex('local_list_candidates').insert([
//     { 
//       id: 1, 
//       candidate_national_id: 123456789, 
//       city: 'عمان', 
//       party: 'الحزب الوطني', 
//       slogan: 'الأفضل للمدينة', 
//       list_votes: 100, 
//       is_nominated: true, 
//       candidate_votes: 50, 
//       type: 'مسلم' 
//     },
//     { 
//       id: 2, 
//       candidate_national_id: 987654321, 
//       city: 'إربد', 
//       party: 'التغيير', 
//       slogan: 'نحو الأفضل', 
//       list_votes: 120, 
//       is_nominated: true, 
//       candidate_votes: 80, 
//       type: 'مسيحي' 
//     }
//   ]);

//   await knex('candidates').insert([
//     { 
//       id: 1, 
//       name: 'أحمد الشاب', 
//       city: 'عمان', 
//       list: 'قائمة عمان', 
//       circle: 'الدوار الأول', 
//       circle_list: 'قائمة الحزب الوطني', 
//       candidate_votes: 50, 
//       list_votes: 100, 
//       gender: 'male', 
//       type: 'مسلم', 
//       candidate_national_id: 123456789 
//     },
//     { 
//       id: 2, 
//       name: 'سلمى الكردي', 
//       city: 'إربد', 
//       list: 'قائمة إربد', 
//       circle: 'المدينة', 
//       circle_list: 'قائمة التغيير', 
//       candidate_votes: 80, 
//       list_votes: 120, 
//       gender: 'female', 
//       type: 'مسيحي', 
//       candidate_national_id: 987654321 
//     }
//   ]);

//   await knex('whitepaper').insert([
//     { id: 1, locallist: 1, partylist: 2, total_count: 3 }
//   ]);

//   await knex('payments').insert([
//     { id: 1, stripe_payment_id: 'pay_1234567890', amount: 100.00, currency: 'JOD', status: 'completed', created_at: new Date() },
//     { id: 2, stripe_payment_id: 'pay_1234567890', amount: 500.00, currency: 'JOD', status: 'completed', created_at: new Date() },
//     { id: 3, stripe_payment_id: 'pay_1234567890', amount: 600.00, currency: 'JOD', status: 'completed', created_at: new Date() },
//   ]);

//   await knex('votes').insert([
//     { id: 1, voter_id: 123456789, election_id: 1, party_list_id: 1, local_list_id: 1, vote_date: new Date() }
//   ]);

//   await knex('ads').insert([
//     { id: 1, candidate_id: 1, content: 'إعلان دعم أحمد الشاب', price: 500.00, start_date: '2024-10-01', end_date: '2024-10-31', status: 'active' }
//   ]);
// };


const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ads').del();
  await knex('votes').del();
  await knex('payments').del();
  await knex('whitepaper').del();
  await knex('candidates').del();
  await knex('local_list_candidates').del();
  await knex('local_lists').del();
  await knex('party_lists').del();
  await knex('elections').del();
  await knex('users').del();
  await knex('admins').del();
  await knex('electoral_districts').del();

  // Inserts seed entries
  await knex('electoral_districts').insert([
    { id: 1, name: 'عمان' },
    { id: 2, name: 'الزرقاء' },
    { id: 3, name: 'إربد' },
    { id: 4, name: 'المفرق' },
    { id: 5, name: 'الكرك' },
    { id: 6, name: 'الطفيلة' },
    { id: 7, name: 'الرمثا' }
  ]);

  await knex('admins').insert([
    {
      name: 'Areej Omar Abumuhfouz',
      email: 'Areej@gmail.com',
      password: bcrypt.hashSync('Areej123', 10),
      role: 'super',
      is_active: true,
    },
    {
      name: 'Othman Daoud',
      email: 'Othman@gmail.com',
      password: bcrypt.hashSync('Othman123', 10),
      role: 'admin',
      is_active: true,
    },
    {
      name: 'Tasneem Abuarqop',
      email: 'Tasneem@gmail.com',
      password: bcrypt.hashSync('Tasneem123', 10),
      role: 'admin',
      is_active: true,
    },
    {
      name: 'Abed Almajeed',
      email: 'AbedAlmajeed@gmail.com',
      password: bcrypt.hashSync('AbedAlmajeed123', 10),
      role: 'admin',
      is_active: true,
    },
    {
      name: 'Omar',
      email: 'Omar@gmail.com',
      password: bcrypt.hashSync('Omar123', 10),
      role: 'admin',
      is_active: true,
    }
  ]);

  await knex('users').insert([
    { 
      id: 1, 
      national_id: 123456789, 
      email: 'mohammed.jordan@example.com', 
      name: 'محمد الاردني', 
      city: 'عمان', 
      circle: 'الدوار الأول', 
      isVotedcircle: false, 
      isVotedparty: false, 
      password: bcrypt.hashSync('hashedpassword', 10), 
      role: 'voter', 
      isApproved: true, 
      Whitepaper: 0, 
      type: 'مسلم', 
      gender: 'male', 
      isActivate: true, 
      otp: null, 
      electoral_district_id: 1 
    },
    { 
      id: 2, 
      national_id: 987654321, 
      email: 'sarah.jordan@example.com', 
      name: 'سارة الأردنية', 
      city: 'إربد', 
      circle: 'المدينة', 
      isVotedcircle: true, 
      isVotedparty: false, 
      password: bcrypt.hashSync('hashedpassword', 10), 
      role: 'candidate', 
      isApproved: true, 
      Whitepaper: 1, 
      type: 'مسيحي', 
      gender: 'female', 
      isActivate: true, 
      otp: null, 
      electoral_district_id: 3 
    }
  ]);

  await knex('elections').insert([
    { id: 1, name: 'انتخابات 2024', start_date: '2024-11-01', end_date: '2024-11-30', type: 'local', status: 'upcoming' },
    { id: 2, name: 'انتخابات الحزب 2024', start_date: '2024-12-01', end_date: '2024-12-31', type: 'party', status: 'upcoming' }
  ]);

  await knex('party_lists').insert([
    { id: 1, name: 'قائمة الحزب الوطني', slogan: 'الأفضل للأردن', election_id: 2 },
    { id: 2, name: 'قائمة التغيير', slogan: 'نحو التقدم', election_id: 2 }
  ]);

  await knex('local_lists').insert([
    { id: 1, city: 'عمان', circle: 'الدوار الأول', list: 'قائمة عمان', name: 'أحمد الشاب', votes: 150 },
    { id: 2, city: 'إربد', circle: 'المدينة', list: 'قائمة إربد', name: 'سلمى الكردي', votes: 200 }
  ]);

  await knex('local_list_candidates').insert([
    { id: 1, candidate_national_id: 123456789, city: 'عمان', party: 'الحزب الوطني', slogan: 'الأفضل للمدينة', list_votes: 100, is_nominated: true, candidate_votes: 50, type: 'مسلم' },
    { id: 2, candidate_national_id: 987654321, city: 'إربد', party: 'التغيير', slogan: 'نحو الأفضل', list_votes: 120, is_nominated: true, candidate_votes: 80, type: 'مسيحي' }
  ]);

  await knex('candidates').insert([
    { id: 1, name: 'أحمد الشاب', city: 'عمان', list: 'قائمة عمان', circle: 'الدوار الأول', circle_list: 'قائمة الحزب الوطني', candidate_votes: 50, list_votes: 100, gender: 'male', type: 'مسلم', candidate_national_id: 123456789 },
    { id: 2, name: 'سلمى الكردي', city: 'إربد', list: 'قائمة إربد', circle: 'المدينة', circle_list: 'قائمة التغيير', candidate_votes: 80, list_votes: 120, gender: 'female', type: 'مسيحي', candidate_national_id: 987654321 }
  ]);

  await knex('whitepaper').insert([
    { id: 1, locallist: 1, partylist: 2, total_count: 3 }
  ]);

  await knex('payments').insert([
    { id: 1, stripe_payment_id: 'pay_12345', amount: 100.00, currency: 'USD', status: 'completed' }
  ]);

  await knex('party_election_requests').insert([
    { id: 1, national_id: 123456789, party_list_name: 'قائمة الحزب الوطني' }
  ]);

  await knex('local_election_requests').insert([
    { id: 1, national_id: 987654321, local_list_name: 'قائمة إربد', members: JSON.stringify([{ name: 'سلمى الكردي', role: 'candidate' }]) }
  
  ]);

  await knex('contact_request').insert([
    { id: 1, contact_name: 'محمد', contact_national_id: 123456789, phone: '0771234567', subject: 'استفسار', message: 'هذا استفسار حول الانتخابات.' }
  ]);

  await knex('votes').insert([
    { id: 1, voter_id: 123456789, election_id: 1, party_list_id: 1, local_list_id: 1, vote_date: '2024-11-15T12:00:00Z' }
  ]);

  await knex('ads').insert([
    { id: 1, candidate_id: 1, content: 'إعلان رائع', price: 50.00, start_date: '2024-11-01', end_date: '2024-11-30', status: 'active' }
  ]);
};
