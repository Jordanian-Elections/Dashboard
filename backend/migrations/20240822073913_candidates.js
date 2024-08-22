exports.up = function (knex) {
    return knex.schema.createTable("candidates", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable(); // اسم المرشح
      table.string("city").notNullable(); // المدينة
      table.string("list"); // قائمة الانتخابات
      table.string("circle"); // الدائرة الانتخابية
      table.string("party"); // الاحزاب الانتخابية
      table.string("circle_list"); // اسم قائمة الحزب
      table.integer("candidate_votes"); // مجموع الناخبين
      table.integer("list_votes"); // مجموع الناخبين
      table.enu("gender", ["male", "female"]); // نوع الجنس
      table.enu("type", ["مسلم", "كوتا", "مسيحي", "شيشاني"]); // نوع الترشيح
      table.boolean("isActivate").defaultTo(true); //areej للداشبورد
      table.integer("party_votes"); // مجموع الناخبين
      table.boolean("isPass").defaultTo(false); //areej للداشبورد
      table.integer("totalSeats").defaultTo(0);
      table.boolean("isPassparty").defaultTo(false); //areej للداشبورد
      table.integer("totalSeatsparty").defaultTo(0);
  
      // Add foreign key column and reference to the users table
      table.integer("candidate_national_id").notNullable();
      table
        .foreign("candidate_national_id")
        .references("national_id")
        .inTable("users")
        .onDelete("CASCADE");
  
      // Add timestamps
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("candidates").dropTable("users");
  };