import express from "express";

export const scanRoute = express.Router();

scanRoute.post("/insert", async (req, res) => {
  console.log(req.body);
});

