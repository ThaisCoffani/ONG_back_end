import express from "express";
import multer from "multer";
import cors from "cors";
import {
    listarPosts,
    listarPostPorID,
    listarPostsPorCategoria,
    postarNovoPost, 
    uploadImagem,
    atualizarNovoPost
} from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });
  
const upload = multer({ storage: storage });
  
export default function configurarRotasPosts(app, conexao) {
    app.use(cors(corsOptions));

    const router = express.Router();
  
    // Rota para listar todos os posts
    router.get("/", (req, res) => listarPosts(req, res, conexao));
    // Rota para listar um post por ID
    router.get("/:id", (req, res) => listarPostPorID(req, res, conexao));
    // Rota para listar posts por categoria
    router.get("/categoria/:categoria", (req, res) => listarPostsPorCategoria(req, res, conexao));
  
    // Rota para criar um novo post
    router.post("/", postarNovoPost);
  
    // Rota para fazer upload de uma imagem
    router.post("/upload", upload.single("imagem"), uploadImagem); // Aqui, "imagem" é o campo do arquivo no formulário

    router.put("/upload/:id", atualizarNovoPost)

    // Vincula o router às rotas do app
    app.use("/posts", router);
  }