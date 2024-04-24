import express from "express";
import { fol_db } from "../data/folder.js";

const router = express.Router();

router.get("/folder", async (req, res, next) => {
  try {
    let list = await fol_db.getFolder();
    return res.status(200).json({ list });
  } catch (err) {
    next(err);
  }
});

router.post("/folder", async (req, res, next) => {
  try {
    await fol_db.addFolder(req.body.name);
    return res.status(200).json({ message: "폴더가 생성되었습니다" });
  } catch (err) {
    next(err);
  }
});

router.put("/folder/:id", async (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name;
  try {
    await fol_db.modifyFolder({ id, name });
    return res.status(200).json({ message: "바꿈" });
  } catch (err) {
    next(err);
  }
});

router.delete("/folder/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await fol_db.deleteFolder(id);
    return res.status(200).json({ message: "삭제완료" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
