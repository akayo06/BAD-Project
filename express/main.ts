import express, { NextFunction, Request, Response } from "express";
import { print } from "listening-on";
import { sessionMiddleware } from "./session";
// import { hasLogin } from "./guards";

// import { teamRoute } from "./routes/team.routes";
import { usersRoute } from "./routes/user.routes";
// import { chatRoute } from "./routes/chat.routes";
// import { eventRoute } from "./routes/event.routes";
// import { emailRoute } from "./routes/email.routes";

const app = express();

app.use(sessionMiddleware);
app.use(express.urlencoded());
app.use(express.json());

app.use(usersRoute);
// app.use(teamRoute);
// app.use(chatRoute);
// app.use(eventRoute);
// app.use(emailRoute);

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

let port = 8000;
app.listen(8000, () => {
  console.log(`start`);
  print(port);
});
