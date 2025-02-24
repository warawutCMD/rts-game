console.log("Hello RTS Game!");
import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

// ให้ Express ใช้งานไฟล์ static จาก public/
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
