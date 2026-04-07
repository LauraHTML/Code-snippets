import "dotenv/config";
import app from "./src/app.js";

const porta = 8080;

app.post("/", async (req, res) => {
  try {
    console.log("bateu na rota")
    console.log(req.body)

    res.status(200).json({ ok: true })

  } catch (error) {
    console.error("ERRO:", error)
    res.status(500).json({ error: error.message })
  }
})

app.listen(porta, () => {
  console.log("servidor rodando!", porta);
});