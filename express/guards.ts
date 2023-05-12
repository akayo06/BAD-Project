import { NextFunction, Request, Response } from "express";
import "./session";
import { HttpError } from "./express";

export function hasLogin(req: Request, res: Response, next: NextFunction) {
  // if (!req.session.user) {
  //   // assign sample user for testing
  //   req.session.user = { id: 1, name: 'demo', avatar: null }
  // }
  if (req.session.user) {
    next();
    return;
  } else {
    res.status(401);
    res.json({ error: "This API is only for authenticated users - hasLogin" });
    return;
  }
}

export function getSessionUser(req: Request) {
  let user = req.session.user;
  if (user) return user;
  throw new HttpError(
    401,
    "This API is only for authenticated users - GetSessionUser"
  );
}
// export class HttpError extends Error {
//   constructor(public statusCode: number, message: string) {
//     super(message);
//   }
// }
