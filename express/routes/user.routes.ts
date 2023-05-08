import express from "express";
// import { hashPassword, comparePassword } from "../hash";
import { form } from "../formidable";

export const usersRoute = express.Router();

//post profile pic
usersRoute.post("/food-pic", (req, res) => {
  // const user = req.session.user;
  // if (!user) {
  //   res.status(401);
  //   res.json({ error: "please login" });
  //   return;
  // }
  form.parse(req, (err: any, fields: any, files: any) => {
    console.log("photo received");
    try {
      let image = Array.isArray(files.image) ? files.image[0] : files.image;
      let filename = image?.newFilename;

      res.json({ filename });
    } catch (err) {
      console.log(err);

      res.json(err);
    }
  });
});

async function requestToPython() {
  let res = await fetch("");
}
