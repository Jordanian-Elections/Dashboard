const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ads').del();
  await knex('votes').del();
  await knex('payments').del();
  await knex('whitepaper').del();
  await knex('local_list_candidates').del();
  await knex('local_lists').del();
  await knex('party_lists').del();
  await knex('party_election_requests').del();
  await knex('local_election_requests').del();
  await knex('candidates').del();
  await knex('admins').del();
  await knex('electoral_districts').del();
  await knex('contact_request').del();
  await knex('users').del();
  await knex('elections').del();

  // Seed entries
  await knex('electoral_districts').insert([
    { id: 1, name: 'عمان' },
    { id: 2, name: 'الزرقاء' },
    { id: 3, name: 'إربد' },
    { id: 4, name: 'المفرق' },
    { id: 5, name: 'الكرك' },
    { id: 6, name: 'الطفيلة' },
    { id: 7, name: 'الرمثا' },
    { id: 8, name: 'السلط' },
    { id: 9, name: 'مادبا' },
    { id: 10, name: 'جرش' }
  ]);

  await knex('admins').insert([
   
  { id: 1, name: 'Areej Omar Abumuhfouz', email: 'Areej@gmail.com', password: await bcrypt.hash('Areej123', 10), role: 'super', is_active: true },
  { id: 2, name: 'Othman Daoud', email: 'Othman@gmail.com', password: await bcrypt.hash('Othman123', 10), role: 'admin', is_active: true },
  { id: 3, name: 'Tasneem Abuarqop', email: 'Tasneem@gmail.com', password: await bcrypt.hash('Tasneem123', 10), role: 'admin', is_active: true },
  { id: 4, name: 'AbedAlmajeed', email: 'AbedAlmajeed@gmail.com', password: await bcrypt.hash('AbedAlmajeed123', 10), role: 'admin', is_active: true },
  { id: 5, name: 'Omar', email: 'Omar@gmail.com', password: await bcrypt.hash('Omar123', 10), role: 'admin', is_active: true },
  { id: 6, name: 'Layla Hassan', email: 'Layla@gmail.com', password: await bcrypt.hash('Layla123', 10), role: 'admin', is_active: true }

  ]);

  await knex('users').insert([
    { id: 1, national_id: '123456789', email: 'mohammed.jordan@example.com', name: 'محمد الاردني', city: 'عمان', circle: 'الدوار الأول', isVotedcircle: false, isVotedparty: false, password: bcrypt.hashSync('hashedpassword', 10), role: 'voter', isApproved: true, Whitepaper: 0, type: 'مسلم', gender: 'male', isActivate: true, otp: null, electoral_district_id: 1 },
    { id: 2, national_id: '987654321', email: 'sarah.jordan@example.com', name: 'سارة الأردنية', city: 'إربد', circle: 'المدينة', isVotedcircle: true, isVotedparty: false, password: bcrypt.hashSync('hashedpassword', 10), role: 'candidate', isApproved: true, Whitepaper: 1, type: 'مسيحي', gender: 'female', isActivate: true, otp: null, electoral_district_id: 3 },
    { id: 3, national_id: '456789123', email: 'ahmad.jordan@example.com', name: 'أحمد الخالدي', city: 'الزرقاء', circle: 'الزرقاء الأولى', isVotedcircle: false, isVotedparty: true, password: bcrypt.hashSync('hashedpassword', 10), role: 'voter', isApproved: true, Whitepaper: 1, type: 'مسلم', gender: 'male', isActivate: true, otp: null, electoral_district_id: 2 },
    { id: 4, national_id: '789123456', email: 'laila.jordan@example.com', name: 'ليلى العمري', city: 'الكرك', circle: 'الكرك الأولى', isVotedcircle: true, isVotedparty: true, password: bcrypt.hashSync('hashedpassword', 10), role: 'candidate', isApproved: true, Whitepaper: 2, type: 'مسلم', gender: 'female', isActivate: true, otp: null, electoral_district_id: 5 },
    { id: 5, national_id: '321654987', email: 'omar.jordan@example.com', name: 'عمر الحسيني', city: 'المفرق', circle: 'المفرق الأولى', isVotedcircle: false, isVotedparty: false, password: bcrypt.hashSync('hashedpassword', 10), role: 'voter', isApproved: true, Whitepaper: 0, type: 'مسلم', gender: 'male', isActivate: true, otp: null, electoral_district_id: 4 },
    { id: 6, national_id: '112233445', email: 'fatima.jordan@example.com', name: 'فاطمة العلي', city: 'عمان', circle: 'الدوار الثاني', isVotedcircle: false, isVotedparty: false, password: bcrypt.hashSync('hashedpassword', 10), role: 'voter', isApproved: true, Whitepaper: 0, type: 'مسلم', gender: 'female', isActivate: true, otp: null, electoral_district_id: 1 },
    { id: 7, national_id: '556677889', email: 'noor.jordan@example.com', name: 'نور سليم', city: 'الزرقاء', circle: 'الزرقاء الثانية', isVotedcircle: false, isVotedparty: false, password: bcrypt.hashSync('hashedpassword', 10), role: 'voter', isApproved: true, Whitepaper: 0, type: 'مسلم', gender: 'female', isActivate: true, otp: null, electoral_district_id: 2 },
    { id: 8, national_id: '667788990', email: 'ali.jordan@example.com', name: 'علي القادري', city: 'الكرك', circle: 'الكرك الثانية', isVotedcircle: false, isVotedparty: false, password: bcrypt.hashSync('hashedpassword', 10), role: 'voter', isApproved: true, Whitepaper: 0, type: 'مسلم', gender: 'male', isActivate: true, otp: null, electoral_district_id: 5 }
  ]);

  await knex('elections').insert([
    { id: 1, name: 'انتخابات 2024', start_date: '2024-11-01', end_date: '2024-11-30', type: 'local', status: 'upcoming' },
    { id: 2, name: 'انتخابات الحزب 2024', start_date: '2024-12-01', end_date: '2024-12-31', type: 'party', status: 'upcoming' },
    { id: 3, name: 'انتخابات البلدية 2025', start_date: '2025-03-01', end_date: '2025-03-15', type: 'local', status: 'upcoming' },
    { id: 4, name: 'انتخابات الشباب 2024', start_date: '2024-09-01', end_date: '2024-09-15', type: 'local', status: 'upcoming' }
  ]);

  await knex('party_lists').insert([
    { id: 1, name: 'قائمة الحزب الوطني', slogan: 'الأفضل للأردن', election_id: 2 },
    { id: 2, name: 'قائمة التغيير', slogan: 'نحو التقدم', election_id: 2 },
    { id: 3, name: 'قائمة الإصلاح', slogan: 'معاً نبني الوطن', election_id: 2 },
    { id: 4, name: 'قائمة المستقبل', slogan: 'نحو غد أفضل', election_id: 2 },
    { id: 5, name: 'قائمة العدالة', slogan: 'العدل أساس الملك', election_id: 2 }
  ]);

  await knex('local_lists').insert([
    { id: 1, city: 'عمان', circle: 'الدوار الأول', list: 'قائمة عمان', name: 'أحمد الشاب', votes: 150 },
    { id: 2, city: 'إربد', circle: 'المدينة', list: 'قائمة إربد', name: 'سلمى الكردي', votes: 200 },
    { id: 3, city: 'الزرقاء', circle: 'الزرقاء الأولى', list: 'قائمة الزرقاء', name: 'محمد العمري', votes: 180 },
    { id: 4, city: 'الكرك', circle: 'الكرك الأولى', list: 'قائمة الكرك', name: 'ليلى الحسن', votes: 120 },
    { id: 5, city: 'المفرق', circle: 'المفرق الأولى', list: 'قائمة المفرق', name: 'عمر الخالد', votes: 90 }
  ]);

  await knex('local_list_candidates').insert([
    { id: 1, candidate_national_id: '123456789', city: 'عمان', party: 'الحزب الوطني', slogan: 'الأفضل للمدينة', list_votes: 100, is_nominated: true, candidate_votes: 50, type: 'مسلم' },
    { id: 2, candidate_national_id: '987654321', city: 'إربد', party: 'التغيير', slogan: 'نحو الأفضل', list_votes: 120, is_nominated: true, candidate_votes: 80, type: 'مسيحي' },
    { id: 3, candidate_national_id: '456789123', city: 'الزرقاء', party: 'الإصلاح', slogan: 'معاً للتطوير', list_votes: 90, is_nominated: true, candidate_votes: 40, type: 'مسلم' },
    { id: 4, candidate_national_id: '789123456', city: 'الكرك', party: 'المستقبل', slogan: 'نبني المستقبل', list_votes: 80, is_nominated: true, candidate_votes: 30, type: 'مسلم' },
    { id: 5, candidate_national_id: '321654987', city: 'المفرق', party: 'العدالة', slogan: 'العدل للجميع', list_votes: 70, is_nominated: true, candidate_votes: 25, type: 'مسلم' }
  ]);

  await knex('candidates').insert([
    { id: 1, name: 'أحمد الشاب', city: 'عمان', list: 'قائمة عمان', circle: 'الدوار الأول', circle_list: 'قائمة الحزب الوطني', candidate_votes: 50, list_votes: 100, gender: 'male', type: 'مسلم', candidate_national_id: '123456789' },
    { id: 2, name: 'سلمى الكردي', city: 'إربد', list: 'قائمة إربد', circle: 'المدينة', circle_list: 'قائمة التغيير', candidate_votes: 80, list_votes: 120, gender: 'female', type: 'مسيحي', candidate_national_id: '987654321' },
    { id: 3, name: 'محمد العمري', city: 'الزرقاء', list: 'قائمة الزرقاء', circle: 'الزرقاء الأولى', circle_list: 'قائمة الإصلاح', candidate_votes: 40, list_votes: 90, gender: 'male', type: 'مسلم', candidate_national_id: '456789123' },
    { id: 4, name: 'ليلى العمري', city: 'الكرك', list: 'قائمة الكرك', circle: 'الكرك الأولى', circle_list: 'قائمة المستقبل', candidate_votes: 30, list_votes: 80, gender: 'female', type: 'مسلم', candidate_national_id: '789123456' },
    { id: 5, name: 'عمر الخالد', city: 'المفرق', list: 'قائمة المفرق', circle: 'المفرق الأولى', circle_list: 'قائمة العدالة', candidate_votes: 25, list_votes: 70, gender: 'male', type: 'مسلم', candidate_national_id: '321654987' }
  ]);

  await knex('whitepaper').insert([
    { id: 1, locallist: 10, partylist: 20, total_count: 30 }
  ]);

  await knex('payments').insert([
    { stripe_payment_id: 'payment_1', amount: 100.00, currency: 'USD', status: 'completed' },
    { stripe_payment_id: 'payment_2', amount: 200.00, currency: 'USD', status: 'pending' },
  ]);

  await knex('party_election_requests').insert([
    { national_id: '123456789', party_list_name: 'قائمة الحزب الأول', is_deleted: false },
    { national_id: '987654321', party_list_name: 'قائمة الحزب الثاني', is_deleted: false },
  ]);

  await knex('local_election_requests').insert([
    { national_id: '123456789', local_list_name: 'قائمة محلية أولى', members: JSON.stringify([{ name: 'محمد الاردني', votes: 100 }]), is_deleted: false },
    { national_id: '987654321', local_list_name: 'قائمة محلية ثانية', members: JSON.stringify([{ name: 'سارة الأردنية', votes: 150 }]), is_deleted: false },
  ]);

  await knex('contact_request').insert([
    { contact_name: 'Ahmed', contact_national_id: '123456789', phone: '1234567890', subject: 'استفسار عن العملية الانتخابية', message: 'أريد معرفة المزيد عن كيفية العملية الانتخابية.' },
    { contact_name: 'Fatima', contact_national_id: '987654321', phone: '0987654321', subject: 'طلب معلومات عن المرشحين', message: 'أحتاج إلى مزيد من المعلومات عن المرشحين.' },
  ]);

  await knex('votes').insert([
    { voter_id: '123456789', election_id: 1, party_list_id: 1, local_list_id: 1, vote_date: new Date() },
    { voter_id: '987654321', election_id: 2, party_list_id: 2, local_list_id: 2, vote_date: new Date() },
  ]);

  await knex('ads').insert([
    { candidate_id: 1, content: 'دعم محمد الاردني لانتخابات الدوار الأول', price: 50.00, start_date: '2024-01-01', end_date: '2024-01-15', status: 'approved' },
    { candidate_id: 2, content: 'دعم سارة الأردنية لانتخابات المدينة', price: 75.00, start_date: '2024-01-16', end_date: '2024-01-31', status: 'rejected' },
  ]);
};
