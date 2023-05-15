import express from "express";
import { knex } from "../main";
import { hashPassword, comparePassword } from "../hash";
import { getString, getPhone, HttpError } from "../express";

export const loginRoute = express.Router();

loginRoute.post(`/login`, async (req, res) => {
  console.log(req.body);
  let user_profile = await knex("user")
    .select("email", "password", "id")
    .where("email", req.body.email);

  if (user_profile.length === 0) {
    return res.json({ status: false, message: "This email is not exist" });
  }

  if (
    !(await comparePassword({
      password: getString(req, "password"),
      password_hash: user_profile[0].password,
    }))
  ) {
    return res.json({ status: false, message: "Password is wrong" });
    // throw new HttpError(403, "wrong username or password");
  }

  // if (req.body.password != user_profile[0].password) {
  //   return res.json({ status: false, message: "Password is wrong" });
  // }

  req.session.user = {
    email: req.body.email,
    id: user_profile[0].id,
  };

  req.session.save();
  console.log("session saved");

  return res.json({
    status: true,
    message: "Login success",
    id: user_profile[0].id,
  });
});

loginRoute.get("/role", (req, res) => {
  res.json({
    user: req.session.user,
  });
  //新加以下來判斷是否登入，但爆error
  // res.json({
  //   role: req.session.user ? 'admin' : 'guest',
  //   username: req.session.user?.username,
  // })
});

loginRoute.post(`/logout`, async (req, res) => {
  req.session.destroy(() => {});
  res.json({ message: "logout success" });
});
// loginRoute.post("/logout", (req, res) => {
//   if (!req.session.user) {
//     res.json({ role: "guest" });
//     return;
//   }
//   req.session.destroy((err) => {
//     if (err) {
//       res.json({ role: "user" });
//     } else {
//       res.json({ role: "guest" });
//     }
//   });
// });
