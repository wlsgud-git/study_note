import express from "express";
import { fi_db } from "../data/file.js";
const router = express.Router();

router.post("/file", async (req, res, next) => {
  try {
    let info = await fi_db.createFile(req.body);
    return res.status(200).json({ message: "새파일 생성완료", info });
  } catch (err) {
    next(err);
  }
});

router.put("/file/:id", (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.delete("/file/:id", (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

export default router;
