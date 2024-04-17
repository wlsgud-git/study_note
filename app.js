import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "src"), { maxAge: 20000 }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("시작");
});
