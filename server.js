import express from "express";
import * as conjugatorModule from "conjugator";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/conjugar/:verbo", (req, res) => {
  try {
    const verbo = req.params.verbo.toLowerCase().trim();
    
    // Intento 1: Extraer el motor correctamente
    let conjugador = conjugatorModule.default || conjugatorModule;
    
    // Intento 2: Si la librería es antigua y necesita instanciarse con "new"
    if (typeof conjugador === "function" && typeof conjugador.conjugate !== "function") {
      conjugador = new conjugador();
    }
    
    // Intento 3: Conjugar dependiendo de cómo el autor diseñó su código
    let resultado;
    if (typeof conjugador.conjugate === "function") {
      resultado = conjugador.conjugate(verbo);
    } else if (typeof conjugador === "function") {
      resultado = conjugador(verbo);
    } else {
      throw new Error("No encontramos la instrucción exacta de esta librería.");
    }
    
    res.json(resultado);
  } catch (error) {
    // AHORA SÍ: Mostramos el error técnico exacto en la pantalla
    res.status(500).json({ 
        "Alerta": "Este es el error real",
        "mensaje": error.message,
        "pistas": Object.keys(conjugatorModule)
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Tu servidor privado está funcionando 🚀");
});
