import express from "express";
import { Folder } from "../data/folder.js";

const router = express.Router();
const f = new Folder();

router.get("/folder", async (req, res) => {
  let list = await f.getFolder();
  return res.status(200).json({ list });
});

router.post("/folder", async (req, res) => {
  try {
    await f.addFolder(req.body.name);
    return res.status(200).json({ message: "폴더가 생성되었습니다" });
  } catch (err) {
    next(err);
  }
});

router.put("/folder/:id", (req, res) => {});

router.delete("/folder/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await f.deleteFolder(id);
    return res.status(200).json({ message: "삭제완료" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
