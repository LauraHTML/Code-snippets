import "dotenv/config";
import app from "./src/app.js";

const porta = 8080;

app.listen(porta, () => {
  console.log("servidor rodando!", porta);
});