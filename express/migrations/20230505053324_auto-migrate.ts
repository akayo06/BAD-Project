import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("user"))) {
    await knex.schema.createTable("user", (table) => {
      table.increments("id");
      table.string("nickname", 32);
      table.string("email", 255);
      table.string("password", 255);
      table.boolean("is_male");
      table.boolean("is_admin");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("food"))) {
    await knex.schema.createTable("food", (table) => {
      table.increments("id");
      table.string("name", 255);
      table.string("type", 255);
      table.decimal("energy");
      table.decimal("protein");
      table.decimal("total_fat");
      table.decimal("saturated_fat");
      table.decimal("trans_fat");
      table.decimal("carbohydrate");
      table.decimal("sugar");
      table.decimal("sodium");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("diet_record"))) {
    await knex.schema.createTable("diet_record", (table) => {
      table.increments("id");
      table.datetime("date");
      table.integer("user_id").unsigned().references("user.id");
      table.enum("section", ["breakfast", "lunch", "dinner"]);
      table.boolean("active");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("food_in_diet"))) {
    await knex.schema.createTable("food_in_diet", (table) => {
      table.increments("id");
      table
        .integer("diet_record_id")
        .unsigned()

        .references("diet_record.id");
      table.integer("food_id").unsigned().references("food.id");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("shape_record"))) {
    await knex.schema.createTable("shape_record", (table) => {
      table.increments("id");
      table.integer("user_id").unsigned().references("user.id");
      table.datetime("date");
      table.decimal("height");
      table.decimal("weight");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("daily_nutrition_target"))) {
    await knex.schema.createTable("daily_nutrition_target", (table) => {
      table.increments("id");
      table.integer("user_id").unsigned().references("user.id");
      table.decimal("energy");
      table.decimal("protein");
      table.decimal("total_fat");
      table.decimal("saturated_fat");
      table.decimal("trans_fat");
      table.decimal("carbohydrate");
      table.decimal("sugars");
      table.decimal("sodium");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("set"))) {
    await knex.schema.createTable("set", (table) => {
      table.increments("id");
      table.integer("user_id").unsigned().references("user.id");
      table.string("set_name", 32);
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("mealset"))) {
    await knex.schema.createTable("mealset", (table) => {
      table.increments("id");
      table.integer("food_id").unsigned().references("food.id");
      table.integer("set_id").unsigned().references("set.id");
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("mealset");
  await knex.schema.dropTableIfExists("set");
  await knex.schema.dropTableIfExists("daily_nutrition_target");
  await knex.schema.dropTableIfExists("shape_record");
  await knex.schema.dropTableIfExists("food_in_diet");
  await knex.schema.dropTableIfExists("diet_record");
  await knex.schema.dropTableIfExists("food");
  await knex.schema.dropTableIfExists("user");
}
