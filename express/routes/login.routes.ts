import express from "express";
import { knex } from "../main";
import { hashPassword, comparePassword } from "../hash";

export const loginRoute = express.Router();

loginRoute.post(`/login`, async (req, res) => {
  console.log("req.body", req.body);
  let user_profile = await knex("user")
    .select("email", "password", "id")
    .where("email", req.body.email);

  console.log(user_profile);
  if (user_profile.length === 0) {
    return res.json({ status: false, message: "This email is not exist" });
  }
  if (req.body.password != user_profile[0].password) {
    return res.json({ status: false, message: "Password is wrong" });
  }
  req.session.user = {
    email: req.body.email,
    id: user_profile[0].id,
  };
  console.log("123");
  req.session.save();

  return res.json({
    status: true,
    message: "Login success",
    id: user_profile[0].id,
  });
});
