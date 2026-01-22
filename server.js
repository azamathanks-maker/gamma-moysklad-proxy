import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const MOYSKLAD_API = "https://api.moysklad.ru/api/remap/1.2";

app.get("/", (req, res) => {
  res.send("GAMMA MoySklad proxy is running");
});

app.get("/api/products", async (req, res) => {
  try {
    const response = await fetch(
      `${MOYSKLAD_API}/entity/product?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch products",
      details: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
// first railway deploy
