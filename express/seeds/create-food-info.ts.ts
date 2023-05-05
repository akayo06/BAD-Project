import { Knex } from "knex";
import xlsx from "xlsx";

export async function seed(knex: Knex): Promise<void> {
  let workBook = xlsx.readFile("food.xlsx");

  let foodSheet = workBook.Sheets.food;
  let foodRows = xlsx.utils.sheet_to_json(foodSheet);

  console.log(foodRows);

  await knex("food").insert(foodRows);
}
