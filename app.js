import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const __dirname = path.resolve();

// middleware
app.use(express.static(path.join(__dirname, "src"), { maxAge: 20000 }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routing
import FolderRouter from "./routes/folder.js";
import FileRouter from "./routes/file.js";

app.use("/", FolderRouter);
app.use("/", FileRouter);

app.use((req, res, next) => {
  next();
});

app.use((err, req, res, next) => {
  console.log("무슨 에러냐:", err);
  res.status(400).json({ message: err.message });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("시작");
});
