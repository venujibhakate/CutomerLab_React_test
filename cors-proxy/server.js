import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/proxy", async (req, res) => {
  const response = await fetch("https://webhook.site/4c37a3c6-a3a9-49e5-8335-5cf908201381", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
  res.status(response.status).send(await response.text());
});

app.listen(5000, () => console.log("CORS proxy running on port 5000"));