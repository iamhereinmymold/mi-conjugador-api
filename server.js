import express from "express";
import * as conjugatorModule from "conjugator";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/conjugar/:verbo", (req, res) => {
  try {
    const verbo = req.params.verbo.toLowerCase().trim();
    
    // Adaptación inteligente para leer la librería en su versión más moderna
    const conjugador = conjugatorModule.default || conjugatorModule;
    const resultado = conjugador.conjugate(verbo);
    
    res.json(resultado);
  } catch (error) {
    res.status(404).json({ error: "Verbo no encontrado o formato incorrecto." });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Tu servidor privado de verbos está funcionando 🚀");
});
