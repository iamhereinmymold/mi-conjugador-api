import express from "express";
import cors from "cors";
// 1. Importamos el traductor de lenguajes antiguos
import { createRequire } from "module";

// 2. Activamos el traductor
const require = createRequire(import.meta.url);
const conjugador = require("conjugator");

const app = express();
app.use(cors());

app.get("/conjugar/:verbo", (req, res) => {
  try {
    const verbo = req.params.verbo.toLowerCase().trim();
    let resultado;

    // 3. Probamos todas las formas clásicas en las que el autor pudo exportar su motor
    if (typeof conjugador === "function") {
      resultado = conjugador(verbo);
    } else if (typeof conjugador.conjugate === "function") {
      resultado = conjugador.conjugate(verbo);
    } else if (typeof conjugador.Conjugator === "function") {
      const motor = new conjugador.Conjugator();
      resultado = motor.conjugate(verbo);
    } else {
      // Si el autor la escondió en otro sitio, volcamos el diccionario completo para verlo
      return res.json({ alerta: "Llaves encontradas", contenido: Object.keys(conjugador) });
    }
    
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Tu servidor privado y traducido está funcionando 🚀");
});
