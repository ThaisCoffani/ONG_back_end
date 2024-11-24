import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";
import configurarRotasPosts from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"))
app.use(express.json());

let conexao;

(async () => {
    conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

    configurarRotasPosts(app, conexao); // Configurar as rotas dos posts

    console.log("Servidor escutando...");
    app.listen(3000);
})();
