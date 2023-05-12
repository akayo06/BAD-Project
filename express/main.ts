import express, { NextFunction, Request, Response } from "express";
import { print } from "listening-on";
import { sessionMiddleware } from "./session";

import { usersRoute } from "./routes/user.routes";
import { loginRoute } from "./routes/login.routes";
import Knex from "knex";
import { hasLogin } from "./guards";
import { signUpRoutes } from "./routes/signup.routes";
import { HttpError } from "./error";

const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

const app = express();

app.use(sessionMiddleware);
app.use(express.urlencoded());
app.use(express.json());

app.use(usersRoute);
app.use(loginRoute);
app.use(signUpRoutes);
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use("/app", hasLogin, express.static("private"));

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(error.statusCode || 500);
  // if ("statusCode" in error) {
  //   res.status(error.statusCode);
  // } else {
  //   res.status(500);
  // }
  let message = String(error);
  message = message.replace(/\w+: /, "");
  res.json({
    error: message,
  });
});

let port = 8100;
app.listen(port, () => {
  console.log(`start`);
  print(port);
});
