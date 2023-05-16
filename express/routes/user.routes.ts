import express from "express";
import path from "path";
// import { hashPassword, comparePassword } from "../hash";
import { newForm } from "../formidable";
import { knex } from "../main";
import { HttpError } from "../error";
import { hasLogin } from "../guards";
import { getSessionUser } from "../guards";
import { error } from "console";

export const usersRoute = express.Router();

//post profile pic
usersRoute.post(
  "/food-pic",
  // hasLogin,
  (req, res, next) => {
    const form = newForm();
    form.parse(req, async (err: any, fields: any, files: any) => {
      try {
        if (err) {
          throw new HttpError(500, err);
        }

        let { mealDate, mealTime } = fields;
        console.log(fields);

        let image = Array.isArray(files.image) ? files.image[0] : files.image;
        let filename = image?.newFilename;

        if (!mealDate) throw new HttpError(400, "missing mealDate");
        if (!mealTime) throw new HttpError(400, "missing mealTime");
        if (!filename) throw new HttpError(400, "missing image");

        let { error, out_filename, boxes } = await requestToPython(filename);
        if (error) throw new HttpError(502, error);

        for (let box of boxes) {
          console.log(box);
          if (box.label.includes("Burger")) {
            box.label = "Burger";
          }
          if (box.label.includes("Twisty")) {
            box.label = "Twisty Pasta";
          }
          let suggestions = await knex("food")
            .select(
              "id",
              "name",
              "type",
              "energy",
              "protein",
              "total_fat",
              "saturated_fat",
              "trans_fat",
              "carbohydrate",
              "sugar",
              "sodium"
            )
            .where("type", "like", "%" + box.label + "%");
          box.suggestions = suggestions;
        }

        res.json({ out_filename, items: boxes });
      } catch (error) {
        next(error);
      }
    });
  }
);

async function requestToPython(in_filename: string) {
  let out_filename = in_filename.replace(".", "-out.");
  let res = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      in_file_path: path.resolve("uploads", in_filename),
      out_file_path: path.resolve("uploads", out_filename),
    }),
  });
  let json = await res.json();
  return {
    out_filename,
    ...json,
  };
}

usersRoute.post("/insert-result", async (req, res, next) => {
  try {
    let food_diet_record_id: { id: number }[] = await knex("diet_record")
      .returning("id")
      .insert([
        {
          date: req.body.mealDate,
          section: req.body.mealTime.toLowerCase(),
          active: true,
          user_id: req.body.id,
          // food_id: food_item.id,
        },
      ]);

    for (let food_item of req.body.food_items) {
      let food_in_diet = await knex("food_in_diet").insert([
        {
          diet_record_id: food_diet_record_id[0].id,
          food_id: food_item.id,
        },
      ]);
    }
    return res.json({
      status: true,
      message: "You have successfully insert to diet record.",
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
});

usersRoute.post(`/addWeight`, async (req, res) => {
  try {
    let weightRecord = await knex("shape_record")
      .select("user_id", "date")
      .where("user_id", getSessionUser(req).id);

    let newWeight = await knex("shape_record")
      .insert([
        {
          date: req.body.date,
          user_id: getSessionUser(req).id,
          height: 172,
          weight: req.body.weight,
        },
      ])
      .returning("id");

    res.json({ dateCheck: weightRecord, newWeight });
  } catch (error) {
    return res.json({ error: error });
  }
});

usersRoute.get(`/weightRecord`, async (req, res) => {
  try {
    let weightRecord = await knex("shape_record")
      .select("weight", "user_id", "date")
      .where("user_id", getSessionUser(req).id)
      .orderBy("date", "desc")
      .limit(7);

    res.json({ items: weightRecord });
  } catch (error) {
    return res.json({ error: error });
  }
});

usersRoute.get(`/getTodayCalories`, async (req, res) => {
  try {
    let todayCalories = await knex("diet_record")
      .join("food_in_diet", { "diet_record.id": "food_in_diet.diet_record_id" })
      .join("food", { "food_in_diet.food_id": "food.id" })
      .where({ user_id: getSessionUser(req).id });
    res.json({ items: todayCalories });
  } catch (error) {
    return res.json({ error: error });
  }
});
