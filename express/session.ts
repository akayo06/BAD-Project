import expressSession from "express-session";

export let sessionMiddleware = expressSession({
  secret: "Tecky Academy teaches typescript",
  resave: true,
  saveUninitialized: true,
});

declare module "express-session" {
  interface SessionData {
    user: {
      email: string;
      id: number;
    };
  }
}
