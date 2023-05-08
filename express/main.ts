import express, { NextFunction, Request, Response } from "express";
import { print } from "listening-on";
import { sessionMiddleware } from "./session";

import { usersRoute } from "./routes/user.routes";

const app = express();

app.use(sessionMiddleware);
app.use(express.urlencoded());
app.use(express.json());

app.use(usersRoute);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  if ("statusCode" in error) {
    res.status(error.statusCode);
  } else {
    res.status(500);
  }
  let message = String(error);
  message = message.replace(/\w+: /, "");
  res.json({
    error: message,
  });
});
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));
app.use(express.static("private"));

let port = 8100;
app.listen(port, () => {
  console.log(`start`);
  print(port);
});
