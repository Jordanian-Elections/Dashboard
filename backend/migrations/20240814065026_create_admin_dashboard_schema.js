exports.up = function(knex) {
    return knex.schema
      // Table for storing admin users
      .createTable('admins', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);
      })
  
      // Table for storing users
      .createTable('users', table => {
        table.integer('national_id').notNullable().unique().primary(); // National ID as primary key (INTEGER)
        table.string('email').notNullable().unique(); // Email field, must be unique
        table.string('name').notNullable(); // Name field
        table.string('city').notNullable(); // City field
        table.string('circle'); 
        table.boolean('isVotedcircle').defaultTo(false); // Boolean to check if the user has voted in the circle
        table.boolean('isVotedparty').defaultTo(false); // Boolean to check if the user has voted in the party
        table.string('password').notNullable(); // Password field
        table.enu('role', ['voter', 'candidate']).notNullable(); // Enum for role
        table.boolean('isApproved').defaultTo(false); // Boolean for admin approval
        table.integer('Whitepaper').nullable(); // Integer field for Whitepaper
        table.enu('type', ['مسلم', 'كوتا', 'مسيحي', 'شيشاني']); // نوع الترشيح
        table.enu('gender', ['male', 'female']);     // نوع الجنس
        table.boolean('isActivate').defaultTo(true); // Boolean for admin approval
        table.timestamps(true, true);
      })
  
      // Table for storing elections
      .createTable('elections', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
        table.enu('type', ['local', 'party']).notNullable();
        table.enu('status', ['upcoming', 'active', 'completed']).defaultTo('upcoming');
        table.timestamps(true, true);
      })
  
      // Table for storing party lists
      .createTable('party_lists', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('slogan');
        table.integer('election_id').unsigned().notNullable();
        table.foreign('election_id').references('id').inTable('elections').onDelete('CASCADE');
        table.timestamps(true, true);
      })
  
      // Table for storing local lists
      .createTable('local_lists', table => {
        table.increments('id').primary(); // Primary key
        table.string('city').notNullable(); // City
        table.string('circle').notNullable(); // Circle
        table.string('list').notNullable(); // List
        table.string('name').notNullable(); // Candidate Name
        table.integer('votes').notNullable(); // Number of Votes
        table.timestamps(true, true);
      })
  
      // Table for storing local list candidates
      .createTable('local_list_candidate', table => {
        table.increments('id').primary(); // Primary key for local_list_candidate table
        
        // Foreign key referencing users table
        table.integer('candidate_national_id').notNullable();
        table.foreign('candidate_national_id').references('national_id').inTable('users').onDelete('CASCADE');
  
        // Foreign key referencing city from the users table
        table.string('city').notNullable();
        // Foreign key referencing party from the users table
        table.string('party').notNullable();
        table.string('slogan'); // Slogan of the candidate
        table.integer('list_votes').defaultTo(0); // Votes for the list
        table.boolean('is_nominated').defaultTo(false); // Whether the candidate is nominated
        table.integer('candidate_votes').defaultTo(0); // Votes for the candidate
        table.enu('type', ['مسلم', 'كوتا', 'مسيحي', 'شيشاني']); // Candidate type
  
        // Add timestamps
        table.timestamps(true, true);
      })
  
      // Table for storing candidates
      .createTable('candidates', table => {
        table.increments('id').primary(); 
        table.string('name').notNullable(); // اسم المرشح
        table.string('city').notNullable(); // المدينة
        table.string('list'); // قائمة الانتخابات
        table.string('circle'); // الدائرة الانتخابية
        table.string('circle_list'); // اسم قائمة الحزب
        table.integer('candidate_votes');
        table.integer('list_votes'); // مجموع الناخبين 
        table.enu('gender', ['male', 'female']); // نوع الجنس
        table.enu('type', ['مسلم', 'كوتا', 'مسيحي', 'شيشاني']); // نوع الترشيح
        table.integer('candidate_national_id').notNullable();
        table.foreign('candidate_national_id').references('national_id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
      })
  
      // Table for storing votes
      .createTable('votes', table => {
        table.increments('id').primary();
        table.integer('voter_id').notNullable();
        table.foreign('voter_id').references('national_id').inTable('users').onDelete('CASCADE');
        table.integer('election_id').unsigned().notNullable();
        table.foreign('election_id').references('id').inTable('elections').onDelete('CASCADE');
        table.integer('party_list_id').unsigned();
        table.foreign('party_list_id').references('id').inTable('party_lists').onDelete('SET NULL');
        table.integer('local_list_id').unsigned();
        table.foreign('local_list_id').references('id').inTable('local_lists').onDelete('SET NULL');
        table.timestamp('vote_date').defaultTo(knex.fn.now());
        table.unique(['voter_id', 'election_id']);
        table.timestamps(true, true);
      })
  
      // Table for storing advertisements
      .createTable('ads', table => {
        table.increments('id').primary();
        table.integer('candidate_id').unsigned().notNullable();
        table.foreign('candidate_id').references('id').inTable('candidates').onDelete('CASCADE');
        table.text('content').notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
        table.enu('status', ['pending', 'approved', 'rejected', 'active', 'completed']).defaultTo('pending');
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('ads')
      .dropTableIfExists('votes')
      .dropTableIfExists('candidates')
      .dropTableIfExists('local_list_candidate') // Correct table name
      .dropTableIfExists('local_lists')
      .dropTableIfExists('party_lists')
      .dropTableIfExists('elections')
      .dropTableIfExists('users')
      .dropTableIfExists('admins');
  };
  