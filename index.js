const express = require("express");
const app = express();

let comando = "NADA";

// 📱 App (iOS / Android) envia comando
app.get("/device/123/set", (req, res) => {
  const cmd = req.query.set;
  if (cmd) {
    comando = cmd.toUpperCase();
    return res.send("OK");
  }
  res.send("SEM COMANDO");
});

// 🔌 Arduino faz HTTP pull
app.get("/device/123/cmd", (req, res) => {
  res.send(comando);
  comando = "NADA";
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor activo na porta " + PORT);
});
