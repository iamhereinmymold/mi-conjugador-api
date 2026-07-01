const express = require("express");
const conjugator = require("conjugator");
const cors = require("cors");

const app = express();
// Permitimos que tu WordPress se conecte por seguridad (CORS)
app.use(cors());

// Creamos la ruta para que WordPress pregunte por los verbos
app.get("/conjugar/:verbo", (req, res) => {
  try {
    const verbo = req.params.verbo.toLowerCase().trim();
    // El motor inteligente hace la magia aquí
    const resultado = conjugator.conjugate(verbo);
    res.json(resultado);
  } catch (error) {
    res.status(404).json({ error: "Verbo no encontrado o formato incorrecto." });
  }
});

// Encendemos el servidor
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Tu servidor privado de verbos está funcionando 🚀");
});
