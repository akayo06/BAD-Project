import express from "express";
import { knex } from "../main";
import { getString, HttpError } from "../express";
import { hashPassword } from "../hash";
import "../session";

export let signUpRoutes = express.Router();

signUpRoutes.post(`/signUp`, async (req, res) => {
  let user_profile = await knex("user")
    .select("email")
    .where("email", req.body.email);

  if (user_profile.length > 0) {
    return res.json({ status: false, message: "This email has been used." })
  }

  let password = getString(req, "password");
  let confirmPassword = getString(req, "confirmPassword");
  let password_hash = await hashPassword(password);
  if (password !== confirmPassword) {
    throw new HttpError(409, "Password not match");
  }

  let newUser = await knex('user')
    .insert(
      [
        {
          username: "",
          email: req.body.email,
          is_admin: false,
          password: password_hash
        },
      ]).returning('id')



  req.session.user = {
    email: req.body.email,
    id: newUser[0].id,
  };


  req.session.save();

  return res.json({
    status: true,
    message: "Login success",
    id: user_profile[0].id,
  })
})

