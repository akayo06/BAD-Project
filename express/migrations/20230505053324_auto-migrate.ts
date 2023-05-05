import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("user"))) {
    await knex.schema.createTable("user", (table) => {
      table.increments("id");
      table.string("username", 32).notNullable();
      table.string("email", 60).notNullable();
      table.string("password", 30).notNullable();
      table.boolean("is_admin").notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("food"))) {
    await knex.schema.createTable("food", (table) => {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.string("type", 255).notNullable();
      table.decimal("energy").notNullable();
      table.decimal("protein").notNullable();
      table.decimal("total_fat").notNullable();
      table.decimal("saturated_fat").notNullable();
      table.decimal("trans_fat").notNullable();
      table.decimal("carbonhydrate").notNullable();
      table.decimal("sugars").notNullable();
      table.decimal("sodium").notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("diet_record"))) {
    await knex.schema.createTable("diet_record", (table) => {
      table.increments("id");
      table.datetime("date").notNullable();
      table.integer("user_id").unsigned().notNullable().references("user.id");
      table.enum("section", ["breakfast", "lunch", "dinner"]).notNullable();
      table.boolean("active").notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("food_in_diet"))) {
    await knex.schema.createTable("food_in_diet", (table) => {
      table.increments("id");
      table
        .integer("diet_record_id")
        .unsigned()
        .notNullable()
        .references("diet_record.id");
      table.integer("food_id").unsigned().notNullable().references("food.id");
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("shape_record"))) {
    await knex.schema.createTable("shape_record", (table) => {
      table.increments("id");
      table.integer("user_id").unsigned().notNullable().references("user.id");
      table.datetime("date").notNullable();
      table.decimal("height").notNullable();
      table.decimal("weight").notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("daily_nutrition_target"))) {
    await knex.schema.createTable("daily_nutrition_target", (table) => {
      table.increments("id");
      table.integer("user_id").unsigned().notNullable().references("user.id");
      table.decimal("energy").notNullable();
      table.decimal("protein").notNullable();
      table.decimal("total_fat").notNullable();
      table.decimal("saturated_fat").notNullable();
      table.decimal("trans_fat").notNullable();
      table.decimal("carbonhydrate").notNullable();
      table.decimal("sugars").notNullable();
      table.decimal("sodium").notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("set"))) {
    await knex.schema.createTable("set", (table) => {
      table.increments("id");
      table.integer("user_id").unsigned().notNullable().references("user.id");
      table.string("set_name", 32).notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable("mealset"))) {
    await knex.schema.createTable("mealset", (table) => {
      table.increments("id");
      table.integer("food_id").unsigned().notNullable().references("food.id");
      table.integer("set_id").unsigned().notNullable().references("set.id");
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
