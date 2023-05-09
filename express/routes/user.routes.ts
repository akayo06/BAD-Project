import express from "express";
import path from "path";
// import { hashPassword, comparePassword } from "../hash";
import { newForm } from "../formidable";
import { knex } from "../main";

export const usersRoute = express.Router();

//post profile pic
usersRoute.post("/food-pic", (req, res) => {
  // const user = req.session.user;
  // if (!user) {
  //   res.status(401);
  //   res.json({ error: "please login" });
  //   return;
  // }
  const form = newForm();
  form.parse(req, async (err: any, fields: any, files: any) => {
    console.log("photo received");
    try {
      let image = Array.isArray(files.image) ? files.image[0] : files.image;
      let filename = image?.newFilename;
      console.log({ filename });
      let { out_filename, items } = await requestToPython(filename);
      for (let item of items) {
        console.log(item);
        if (item.label.includes("Burger")) {
          item.label = "Burger";
        }
        if (item.label.includes("Twisty")) {
          item.label = "Twisty Pasta";
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
            "sugars",
            "sodium"
          )
          .where("type", "like", "%" + item.label + "%");
        item.suggestions = suggestions;
      }

      res.json({ out_filename, items });
    } catch (err) {
      console.log(err);

      res.json(err);
    }
  });
});

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
    items: json,
  };
}
