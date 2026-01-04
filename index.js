const express = require("express");
const app = express();

// Permite receber texto simples (IP do Arduino)
app.use(express.text());

let comando = "NADA";
let ultimoIP = "DESCONHECIDO";

/* ===============================
   APP (Thunkable / Mobile)
   envia comando
================================ */
app.get("/device/123/set", (req, res) => {
  const cmd = req.query.set;

  if (cmd) {
    comando = cmd.toUpperCase();
    console.log("Comando recebido:", comando);
    return res.send("OK");
  }

  res.send("SEM COMANDO");
});

/* ===============================
   ARDUINO faz HTTP pull
================================ */
app.get("/device/123/cmd", (req, res) => {
  res.send(comando);
  comando = "NADA";
});

/* ===============================
   ARDUINO envia o IP STA
================================ */
app.post("/device/123/ip", (req, res) => {
  ultimoIP = req.body;
  console.log("IP STA recebido:", ultimoIP);
  res.send("OK");
});

/* ===============================
   APP / DEBUG lê IP
================================ */
app.get("/device/123/ip", (req, res) => {
  res.send(ultimoIP);
});

/* ===============================
   START SERVER (Render)
================================ */
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Servidor activo na porta " + PORT);
});
