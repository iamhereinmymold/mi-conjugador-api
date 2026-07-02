const express = require("express");
const cors = require("cors");
const conjugador = require("conjugator");

const app = express();
app.use(cors());

app.get("/conjugar/:verbo", (req, res) => {
  try {
    const verbo = req.params.verbo.toLowerCase().trim();
    let resultado;

    // Ejecutamos el motor de la forma original para la que fue diseñado
    if (typeof conjugador.conjugate === "function") {
      resultado = conjugador.conjugate(verbo);
    } else if (typeof conjugador === "function") {
      resultado = conjugador(verbo);
    } else {
      resultado = { alerta: "No se encuentra el motor", pistas: Object.keys(conjugador) };
    }
    
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Tu servidor privado definitivo está funcionando 🚀");
});
