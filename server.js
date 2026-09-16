const express = require("express");
const db = require("./database");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route Utama / Prospek
app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM prospek");
    res.render("index", { prospek: rows });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send(
        `Gagal memuat database: Table 'prospek' tidak ditemukan atau error koneksi (${err.message})`,
      );
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
